---
sidebar_position: 8
---

# テキストとアセットのローカライズ

> ドキュメントバージョン: **0.3.9**

Unity Localization の String/Asset Tables を、一時的な Play Mode・ビルドシーンで Udon にベイクします。元シーンのネイティブ編集コンポーネントは保持され、ビルド済みワールドは Addressables を読み込みません。[インストール](./install.md)後に設定してください。依存関係は Unity Localization **1.4.5**、Scriptable Build Pipeline **1.21.25**、Unity 2022.3、Worlds SDK 3.10.5 です。

## Unity Tables の設定

1. Unity Localization で Locales と String Table Collection を作成します。
2. **Tools > LCGUdonSharp > Localization > Create Unity Manager** を選択します。**Unity Localization Source** にコレクションを割り当て、**Default Language** に収録されている言語コードを設定します。
3. TextMeshPro/UI Text に **Localize String Event** を追加し、コレクションとキーを選択します。**On Update String** を固定引数ではなく **dynamic** の `TMP_Text.text` / `Text.text` setter に接続します。
4. Source の **Bake / Validate Now** で確認し、シーンを保存して Play Mode またはワールドビルドを実行します。

シーン内の同じコレクションにはマネージャーを一つだけ使用します。マネージャーとテキストは同じシーンに置いてください。非アクティブなテキストも対象です。**Tools > LCGUdonSharp > Localization > Unity Tables** で編集し、翻訳・アセット変更後は再ビルドします。

## 言語選択と通知

手動選択するまでは VRChat クライアントの言語に追従します。`en-US` などは `en` にフォールバックし、未対応のクライアント言語は既定言語を使用します。空・未登録の翻訳は既定言語、その後元のテキスト/キーに戻ります。選択はローカルで、同期も訪問間の保存も行いません。

```csharp
using UdonSharp;

public class LanguageExample : UdonSharpBehaviour
{
    public LCGLocalization localization;

    public override void Interact()
    {
        localization.SetLanguage("th");
        localization.SetVariable("name", "Player");
        localization.SetVariable("count", "3");
    }
}
```

`LCGLanguageButton` は任意です。`CurrentLanguage`、`Get(key)`、`GetOrDefault(key, fallback)`、`GetLanguages()`、`SetLanguageByIndex(index)`、`NextLanguage()`、`FollowClientLanguage()`、`RefreshAll()` を使用できます。無効なコード・インデックスは選択を変更しません。引数なしイベントでは `SetProgramVariable` で `selectedLanguage` を設定し、`SelectLanguage` を送ります。

**Language Dropdown** / **Language TMP Dropdown** と **Dropdown Languages** を設定し、**Wire Language Dropdown** を押します。**Language Changed Targets** に通知先を設定し、`LocalizationChanged()`（**Language Changed Event** で変更可能）内で `CurrentLanguage` を読みます。言語変更だけが通知され、変数変更はテキストの再描画だけです。Unity UI は backing **Udon Behaviour > SendCustomEvent** に接続してください。直接 proxy を呼ぶ接続は VRChat ビルドで維持されません。

## 検証付き Smart Strings

String Table の項目を **Smart** に設定します。

| 構文 | 動作 |
|---|---|
| `{name}`、`{0}` | 名前・番号付きスカラー |
| `{count:000}`、`{score:F2}`、`{ratio:P0}` | invariant culture の数値形式 |
| `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` | 選択肢と必須の最終フォールバック |
| `{count:plural:One item\|{} items}` | 英語は二つの形式 |
| `{count:plural:{} items}` | タイ語・日本語・中国語は一つの形式 |
| `{{name}}` | 波括弧のエスケープ |

変数の値は文字列です。数値は invariant 形式で渡します。初期 **Variable Names** / **Variable Values** の長さを一致させてください。**Localize String Event** のスカラー局所変数は binding にベイクされ、グローバル変数より優先されます。`binding.SetVariable(name, value)` で更新します。`GetWithVariables(key, fallback, names, values)` は状態を変更せず整形します。欠けた変数は placeholder を保持し、挿入値は文字列として扱います。

Reflection selector、Unity の永続グローバル変数グループ、実行時 Unity argument、date/list/conditional/custom formatter、入れ子の名前付き placeholder、その他の言語の複数形ルールは非対応です。未対応構文はベイクを停止します。Unity Smart Strings 全体の実装ではありません。

## アセットの切り替え

Source の **Asset Table Collections** に追加し、ネイティブイベントを dynamic setter に接続します。

- **Localize Sprite Event** → `Image.sprite`。
- **Localize Texture Event** → `RawImage.texture`。
- **Localize Audio Clip Event** → `AudioSource.clip`。
- **LCGUdonSharp > Localization > Localize Prefab Event** → callback 不要。`LCGLocalizePrefabEvent` を使用すると、Unity 1.4.5 の元イベントによる Edit Mode preview 削除エラーを避けられます。ベイク時に各言語の子オブジェクトを作り、ローカルで切り替えます。ネットワーク spawn はしません。

名前付き subasset はベイク時に解決されます。欠けた翻訳は既定言語、その後元のアセットに戻ります。任意の callback とテキスト/アセットごとの locale override は拒否されます。Asset collection に既定 locale が必要です。収録する variant が多いほどビルド容量が増えます。

既存 GameObject・material には、常にアクティブな親へ **LCG Localized Asset** を追加します。マネージャー、言語コード、対応する **Variants** / **Assets** を設定します。Material は **Target Renderer**、その他は対応する sprite/texture/clip target を使用します。一つの binding は一つのアセットセットを保持します。**Play Audio On Change** は任意で、既定では再生を停止して clip を変更するだけです。

## サンプルと従来の JSON

コンパイラー設定後に **LCGUdonSharp Examples** をインポートします。リポジトリの `Example/TestLCGUdonSharp.unity` の `(17, 0, 0)` に **UnityLocalizationExample** があります。EN/TH/JA ボタン、直接 API、dropdown、変数、画像、短い音、prefab variant を含みます。音は音声翻訳ではありません。配布 ZIP のサンプルは `Samples~/Examples` にあります。

Noto Sans JP/Thai の subset と OFL ライセンスが付属します。追加の文字には完全なフォント・fallback を用意してください。ローカライズはテキストを変更し、フォントは変更しません。

従来の JSON は **Tools > LCGUdonSharp > Localization > Legacy JSON Table** で使用できます。Manager を作り、Assets 内へ保存し、テキスト/親を選択して **Bind Selected Text**、翻訳を追加し、テーブルとシーンを保存します。実行時は manager ごとに一度読み込むため、編集後は Play Mode を再開始します。`Example/Localization/LocalizationExample.unity` が従来のサンプルです。

## トラブルシューティングと確認

- ベイク失敗: コレクション/キー、同じシーンの manager、コレクションごとに一つの manager、変数配列長、dynamic setter を確認します。
- 文字欠け: 多言語 TMP font/fallback を追加します。
- SDK/SBP assembly 衝突: 0.3.9 の互換フックは SBP editor assembly から自動参照 plugin DLL を除外し、明示的な Unity 参照を保持します。SDK DLL は変更しません。
- Unity EditMode で **LCGUnityLocalizationTests** / **LCGLocalizationTests**、Play Mode でサンプルの `RunChecks` を実行できます。これは利用者側の手順であり、docs ビルドで Unity テストを実行したという意味ではありません。

[サンプル](./examples.md)と[バージョン固定の上流ガイド](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.9/Example/Localization/UnityLocalization.md)も参照してください。

