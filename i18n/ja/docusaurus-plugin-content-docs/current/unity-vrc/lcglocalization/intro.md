---
sidebar_position: 1
---

# LCG Localization

> ドキュメントバージョン: **0.1.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGLocalization/releases/tag/0.1.0)

**LCG Localization**（`com.logiccuteguy.lcglocalization`）は、VRChat ワールドの UdonSharp にテキストとアセットのローカライズを追加します。Unity の String Table と Asset Table を Udon にベイクするため、翻訳はワールドに含まれます。

## 機能

- Unity の String Table と Asset Table を Udon にベイクします。
- マネージャーの直接呼び出し、ドロップダウン、コールバックに対応します。
- 変数、choose、plural に対応した Smart Strings。
- スプライト、テクスチャ、音声、プレハブの言語別バリアントとフォールバック。
- 従来の JSON テーブル方式。
- VRChat SDK の UdonSharp で動作します。LCGUdonSharp は任意です。

## 要件

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 以降（UdonSharp）
- Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.26 以降（依存関係としてインストールされます）

## インストール

### VCC / ALCOM

1. VCC/ALCOM に [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合はリストを更新します。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **LCG Localization**（`com.logiccuteguy.lcglocalization`）を探して **0.1.0** を追加します。
4. Unity でプロジェクトを開き、パッケージのインポートを待ちます。

### Unity Package Manager / 手動

**Window > Package Manager > + > Add package from git URL** に次を入力します。

```text
https://github.com/LogicCuteGuy/LCGLocalization.git#0.1.0
```

コピーの重複を避けるため、**インストール方法はプロジェクトごとに 1 つ**にしてください。GitHub が自動生成する **Source code (zip)** は使わないでください。

## クイックスタート

1. Package Manager で **LCG Localization Examples** をインポートし、サンプル内の `UnityLocalization.md` で設定方法を確認します。
2. **Tools > LCG Localization > Create Unity Manager** でシーンにマネージャーを追加し、public フィールドに割り当てます。
3. 次の例のように、UdonSharp スクリプトからマネージャーを呼び出します。

```csharp
using UdonSharp;
using UnityEngine;

[UdonBehaviourSyncMode(BehaviourSyncMode.None)]
public class ShopSign : UdonSharpBehaviour
{
    public LCGLocalization localization;
    public LCGLocalizedText priceText;

    private void Start()
    {
        Debug.Log(localization.Get("hello"));
        Debug.Log(localization.GetOrDefault("maybe_missing", "Fallback text"));
    }

    // Button: switch this player's language. Returns false for an unsupported code.
    public void UseThai() { localization.SetLanguage("th"); }

    // For Smart Strings such as "{price} coins".
    public void SetPrice(int price)
    {
        localization.SetVariable("price", price.ToString()); // every text on this manager
        priceText.SetVariable("price", price.ToString());    // one text; the name must already be listed on it
    }

    // Add this behaviour to the manager's Language Changed Targets.
    public void LocalizationChanged()
    {
        Debug.Log("Now using " + localization.CurrentLanguage);
    }
}
```

## マネージャーのメンバー

| メンバー | 用途 |
|---|---|
| `Get(key)` | 翻訳を返します。ない場合はキーを返します |
| `GetOrDefault(key, fallback)` | 翻訳を返します。ない場合は `fallback` を返します |
| `GetWithVariables(key, fallback, names, values)` | その呼び出しだけの Smart 変数を使って翻訳を返します |
| `SetLanguage(code)` | 言語を選択し、クライアント言語への追従を止めます |
| `NextLanguage()` | 言語を順に切り替えます |
| `FollowClientLanguage()` | VRChat で選択した言語に戻します |
| `CurrentLanguage`、`GetLanguages()` | 現在の言語、またはすべての言語を取得します |
| `SetVariable(name, value)` | 共有の Smart 変数を設定し、すべてのテキストを更新します |

言語の選択はプレイヤーごとのローカル設定です。同期せず、訪問をまたいで保存もしません。

スクリプトが独自の assembly definition にある場合は、`LogicCuteGuy.LCGLocalization.Runtime` を参照し、そのアセンブリに U# assembly definition を作成してください。

## 次のステップ

- [Unity String Table](./unity-tables.md): 設定、言語の切り替え、Smart Strings。
- [アセットのローカライズ](./assets.md): スプライト、テクスチャ、音声、GameObject。
- [JSON テーブル](./legacy-json.md): テキスト専用の従来方式。
