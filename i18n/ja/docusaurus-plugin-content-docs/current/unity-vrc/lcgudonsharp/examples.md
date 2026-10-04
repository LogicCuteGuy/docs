---
sidebar_position: 9
---

# サンプル

> ドキュメントバージョン: **0.3.8**

[LCGUdonSharp リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp)の `Example/` には各機能の実行可能な scene と script があります。各 `.cs` には同じ名前の `UdonSharpProgramAsset` があり、example `.asmdef` には別の U# assembly-definition asset が含まれています。

| フォルダー | 内容 |
|---|---|
| `AsyncAwait` | Yield、Delay、string/image/video、GPU readback、serialization、Creator Economy |
| `Interfaces` | `INumberOperation` の Add/Multiply 実装 |
| `Networking` | Native/LCG lamp、packet field/method、zone moving cube、任意実行の native/LCG high-bandwidth load generator |
| `GenericRestrictions` | collection/JSON/binary と、拒否される generic/interface 形状 |
| `ExtendedLanguage` | 例外、ref/out、generic、LINQ、dynamic、Span |

## 実行方法

1. 他の C# compile error を解決します。
2. `Example/TestLCGUdonSharp.unity` を開くか、example component を scene に追加します。
3. Play Mode に入り Console を確認します。

## 0.3.8 の装備サンプル

`ScriptableObjectEquipmentExample.prefab` は `TestLCGUdonSharp.unity` の `(12, 0, 3)` にあります。基底型の `item` に `TrainingSword.asset` を割り当て、`catalog` は `FireSpell.asset` も含みます。それぞれ固有の economy アセットを参照します。剣は 35 コイン・45 damage、魔法は 20 コイン・80 power / 12 mana です。ボードで購入し、隣のスイッチまたは `SelectNext` で選択を切り替えます。`TestDataFeatures` は入れ子の読み取り、継承フィールド、型判定、成功・null・無効なキャスト、多態的な入れ子配列の防御的コピーを確認します。購入はローカルで同期しません。

## 0.3.7 の ScriptableObject ショップ

自動コンパイラー設定の完了後、パッケージのサンプルから **LCGUdonSharp Examples** をインポートしてください。`Example/ScriptableObjects/ScriptableObjectShopExample.prefab` は `Example/TestLCGUdonSharp.unity` の `(7, 0, 3)` に配置されています。ClientSim でピンクのボードを操作すると、所持金 100 が 65、30 になり、3 回目の購入は拒否されます。商品データは `StrawberryMilk.asset` と `GreenTea.asset` から読みます。`TestArrayCopy` で配列コピーを確認できます。購入はローカル動作で、プレイヤー間では同期しません。

Inspector の `item` と `catalog` を変更する前に [ScriptableObject データ](./scriptableobjects.md) を確認してください。

## 0.3.6 の Networking prefab

- **`NetworkExamples.prefab`** は zone 外の native synced lamp、zone 内の LCG packet lamp、LCG sync moving cube を配線済みです。2 client で再入場、late join、owner 退出、current-state snapshot を確認できます。
- **`HighBandwidthExamples.prefab`** は既定で停止している 2 つの load generator を含みます。`NativeHighBandwidthExample` は Manual `[UdonSynced] byte[]` を送り、`LCGHighBandwidthExample` は bounded motion queue で最大 32 個の converted object-sync cube を動かします。
- LCG dashboard は local sample、local owned object、pending motion、dispatch batch、last batch size を表示します。診断値であり、remote delivery や network throughput の証明ではありません。
- [タイ語の setup と 2-client checklist](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/Networking/README.th.md)もあります。

Cross-client delivery、late join、ownership contention、bandwidth、FPS は複数 client の VRChat Build & Test で検証してください。1-player ClientSim で確認できるのは compile、配線、local interaction です。

:::tip 2 種類のアセット
各 U# `.cs` には同名の program asset が必要です。`Assembly-CSharp` 以外の `.asmdef` には U# assembly definition も必要です。それぞれ **Assets > Create > U# Script** と **Assets > Create > U# Assembly Definition** で作成できます。
:::
