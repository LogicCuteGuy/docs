---
sidebar_position: 6.5
---

# ScriptableObject データ

> ドキュメントバージョン: **0.3.9**

通常の独自 Unity `ScriptableObject` アセットを、型付きの UdonSharp behaviour フィールドに直接割り当てられます。特別な基底クラス、属性、手動コピーは不要です。コンパイラーはシリアライズ済みデータを読み取り専用の Udon スナップショットへ変換します。

## データの定義と割り当て

```csharp
using UnityEngine;
using UdonSharp;

// ItemData.cs (ordinary C# data class)
[CreateAssetMenu(menuName = "My World/Item")]
public class ItemData : ScriptableObject
{
    public string displayName;
    public int price;
    public string[] descriptions;
    public Texture2D icon;
}

// Shop.cs (paired with Shop.asset, its UdonSharpProgramAsset)
public class Shop : UdonSharpBehaviour
{
    public ItemData item;
    public override void Interact()
    {
        if (item == null) return;
        Debug.Log(item.displayName + ": " + item.price);
    }
}
```

データクラスと behaviour は別ファイルに保存し、**Assets > Create > My World > Item** で作成したアセットを Inspector の `Shop.item` に割り当てます。Behaviour には通常の program asset と assembly 登録が必要です。データクラスには program asset は不要で、通常の C# assembly に配置できます。

## 入れ子アセットと多態的な参照

独自 ScriptableObject の入れ子フィールドと配列に対応します。派生型の `WeaponDefinition` と `SpellDefinition` を `ItemDefinition` または `ItemDefinition[]` に割り当てられます。実行時の型タグで `is`、宣言パターン、`as`、チェック付き明示的キャストに対応し、継承フィールドの位置を保持します。

アップキャストはスナップショットを保持します。互換性のない `as` は null、互換性のない明示的キャストはコンパイラー管理の `InvalidCastException` になります。null のキャストは null のまま、型判定は false です。データアセットのプロパティや仮想メソッドは非対応なので、UdonSharp 側で型判定やデータフィールドからゲーム動作を選択してください。

同じベイク済みグラフの繰り返し参照はスナップショットを共有します。Behaviour の独立したトップレベルフィールドは別々にベイクされます。基底フィールドを先に配置し、実行時の型タグを含みます。**0.3.8 への更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。古いスナップショットとはレイアウトが異なります。**

```csharp
// Fields and method inside an UdonSharpBehaviour.
// Data classes are provided by the optional equipment sample.
public ItemDefinition item;

public override void Interact()
{
    if (item == null) return;
    Debug.Log(item.economy.price);
    if (item is WeaponDefinition weapon)
        Debug.Log(weapon.damage);
    SpellDefinition spell = item as SpellDefinition;
    if (spell != null) Debug.Log(spell.power);
}
```

## スナップショットの動作

各 behaviour は、決定的なフィールド順序を持つ独自の `object[]` スナップショットを受け取ります。同じアセットを複数フィールドに割り当てても、参照の同一性は保証されません。アセットのデータやスキーマを変更したらワールドを再ビルドしてください。再生中の編集は反映されません。

配列フィールドの読み取りごとに新しい浅いコピーを返し、null 配列は null のままです。ループではローカル変数に一度保存し、繰り返し割り当てを避けてください。参照先の Unity オブジェクトは通常の変更可能な API を保持します。ヒープの読み戻しは Inspector の元の割り当てを保持し、アセットには書き戻しません。`UdonProduct` など SDK のネイティブ型は従来どおり動作します。

## 対応データ

- public インスタンスフィールドと private `[SerializeField]` フィールド。継承フィールドも含みます。
- プリミティブ数値、bool、char、string、enum。
- `Vector2/3/4`、`Quaternion`、`Color/Color32`、`Rect`、`Bounds`、`Matrix4x4`、`LayerMask`、`VRCUrl`。
- テクスチャ、オーディオクリップ、マテリアルなど Udon 対応の Unity オブジェクト参照。
- 対応フィールド型の一次元配列と、behaviour のデータアセット配列フィールド。

## 制限

データフィールドへの書き込み、プロパティ、インスタンス/static メソッド、独自データアセット上の Unity API、実行時の `new`/`ScriptableObject.CreateInstance`、`object`/ネイティブアセット型へのキャスト、インターフェース、配列の共変性、任意の独自クラス、コレクション、多次元・ジャグ配列、`[SerializeReference]` は非対応です。データアセットのフィールド/配列には `[UdonSynced]` を使用できません。

データアセット配列の `GetValue`、`SetValue`、`Clone`、`GetType` は拒否されます。型付きのインデックスアクセスと `Length` を使用してください。循環参照（A → B → A）と 128 アセットを超える入れ子は明確なベイクエラーになります。

変更や同期が必要な値は通常のゲーム状態フィールドへコピーしてください。返された配列を変更しても、そのコピーだけが変わります。

## 0.3.8 の装備サンプル

`ScriptableObjectEquipmentExample.prefab` は `TestLCGUdonSharp.unity` の `(12, 0, 3)` にあります。基底型の `item` に `TrainingSword.asset` を割り当て、`catalog` は `FireSpell.asset` も含みます。それぞれ固有の economy アセットを参照します。剣は 35 コイン・45 damage、魔法は 20 コイン・80 power / 12 mana です。ボードで購入し、隣のスイッチまたは `SelectNext` で選択を切り替えます。`TestDataFeatures` は入れ子の読み取り、継承フィールド、型判定、成功・null・無効なキャスト、多態的な入れ子配列の防御的コピーを確認します。購入はローカルで同期しません。

## ショップの例

コンパイラー設定の完了後、**LCGUdonSharp Examples** をインポートします。`Example/ScriptableObjects/ScriptableObjectShopExample.prefab`、`StrawberryMilk.asset`、`GreenTea.asset` が含まれます。`TestLCGUdonSharp.unity` の `(7, 0, 3)` にあるピンクのボードを操作すると、所持金 100 が 65、30 となり、3 回目の購入は拒否されます。ビルド前に Inspector の `item` と `catalog` を変更できます。`TestArrayCopy` はローカル配列の変更がスナップショットに影響しないことを確認します。購入はローカル動作で、同期しません。

[サンプル](./examples.md)、[インストール](./install.md)、[上流のバージョン固定ガイド](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.8/Example/ScriptableObjects/README.md) も参照してください。
