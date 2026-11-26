---
sidebar_position: 2
---

# Unity String Table

基本の方式です。Unity Localization の **Locale**、**String Table Collection**、**Localize String Event** で作成します。テーブルは Play モードやビルドの一時シーンにベイクされます。元のシーンには Unity のコンポーネントが残り、ビルドしたワールドは Addressables を読み込みません。

## サンプルを試す

**LCG Localization Examples** サンプルの `UnityLocalizationExample.prefab` をシーンに置き、Play モードに入って英語、タイ語、日本語のボタンを押します。テーブルは **Tools > LCG Localization > Unity Tables** で開きます。

サンプルのフォントは Noto Sans のサブセットです。ほかの文字を追加する場合は、完全なフォントを用意してください。

## 自分の UI を設定する

1. Unity Localization で Locale と **String Table Collection** を作成します。
2. **Tools > LCG Localization > Create Unity Manager** を選びます。**Unity Localization Source** にコレクションを割り当て、マネージャーの **Default Language** にコレクション内の locale コードを設定します。
3. TextMeshPro または UI Text に **Localize String Event** を追加します。コレクションとキーを選び、**On Update String** を dynamic の `Text.text` または `TMP_Text.text` setter に接続します。
4. Source の **Bake / Validate Now** を押して接続を確認します。
5. シーンを保存して Play を押します。テーブルを編集したら、Play モードに入り直します。

- コレクションごとのマネージャーは、シーンに 1 つです。
- テキストとマネージャーは同じシーンに置きます。非アクティブなテキストも対象です。
- 対応していない設定があると、**ベイクが停止します**。

## 表示される言語

プレイヤーが選ぶまで、マネージャーは VRChat クライアントの言語に追従します。選択はローカルで、訪問をまたいで保存しません。

`en-US` のようなコードは `en` にフォールバックします。未対応のクライアント言語には既定言語を使います。翻訳がないか空の場合は既定言語、その次に元のテキストかキーを使います。

## 言語の切り替え

Udon からは `SetLanguage("th")`、`SetLanguageByIndex(i)`、`NextLanguage()`、`FollowClientLanguage()` を呼びます。無効なコードやインデックスの場合、言語は変わりません。

Unity の UI イベントからは、**Udon Behaviour の `SendCustomEvent`** を対象にしてイベント名を指定します。スクリプトコンポーネントへの直接コールバックは、VRChat のビルドでは残りません。引数のないイベントでは、`selectedLanguage` を設定してから `SelectLanguage` を送ります。

### ドロップダウン

1. マネージャーに **Language Dropdown** または **Language TMP Dropdown** を割り当てます。
2. **Dropdown Languages** に各選択肢の言語コードを入力します。
3. **Wire Language Dropdown** を押します。

言語が変わると、ドロップダウンは自身のイベントを再発火せずに更新されます。

**LCG Language Button** は、1 つの言語に切り替えるボタン用の任意の機能です。

### 変更への反応

**Language Changed Targets** に Behaviour を追加して `LocalizationChanged()` を実装します。名前は **Language Changed Event** で変更できます。中で `CurrentLanguage` を読みます。このイベントは言語が変わったときだけ送られ、変数の変更では送られません。

## Smart Strings

String Table の項目を **Smart** にします。Unity の Smart Strings の一部が Udon で動作します。

| 構文 | 例 |
|---|---|
| 名前または番号付きの値 | `{name}`、`{0}` |
| 数値書式 | `{count:000}`、`{score:F2}`、`{ratio:P0}` |
| Choose（フォールバック必須） | `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` |
| 英語の複数形（2 形式） | `{count:plural:One item\|{} items}` |
| タイ語・日本語・中国語の複数形（1 形式） | `{count:plural:{} items}` |
| 波括弧そのもの | `{{name}}` |

数値は invariant culture で書式化します。`D` 書式は非対応です。ない変数はプレースホルダーのまま残ります。挿入した値は通常のテキストとして扱います。

**非対応**（ベイクが停止します）: リフレクションセレクター、Unity の永続グローバル変数グループ、実行時の引数オブジェクト、date・list・conditional・custom のフォーマッター、入れ子の名前付きプレースホルダー、その他の言語の複数形ルール。

## 変数

値は文字列なので、数値は invariant 形式で変換します。

| 設定対象 | 使うもの |
|---|---|
| すべてのテキストの値 | `manager.SetVariable(name, value)` |
| 初期値 | **Variable Names** と **Variable Values** の配列 |
| 1 つのテキストの値 | そのテキストの `LCGLocalizedText` で `binding.SetVariable(name, value)` |
| 何も変更しない 1 回だけの取得 | `GetWithVariables(key, fallback, names, values)` |

**Localize String Event** のローカル変数はそのテキストにベイクされ、グローバル変数より優先されます。`binding.SetVariable` は、そのテキストに登録済みの名前にだけ使えます。

次: [アセットのローカライズ](./assets.md)。
