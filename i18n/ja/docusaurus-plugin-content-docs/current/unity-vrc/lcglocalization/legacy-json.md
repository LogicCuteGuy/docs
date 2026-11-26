---
sidebar_position: 4
---

# JSON テーブル（従来方式）

Unity Localization のテーブルを使わない、テキスト専用の簡単な方式です。[ikuko/ULocalization](https://github.com/ikuko/ULocalization) を参考にしています。

:::note
Smart Strings と、スプライト・テクスチャ・音声・GameObject のローカライズは [Unity String Table](./unity-tables.md) と[アセットのローカライズ](./assets.md)で説明しています。これらが必要な場合は、そちらの方式を使ってください。
:::

## コードを書かずに設定する

1. **Tools > LCG Localization > Legacy JSON Table** を開き、**Create Localization Manager** を押します。
2. **Save Table** を押し、JSON を `Assets` 以下に保存します。
3. テキストオブジェクトかその親を選択し、**Bind Selected Text** を押します。
4. 翻訳を入力します。`en`、`th`、`ja`、`zh-hant` など、任意の言語コードを追加できます。
5. **Save Table** を押してから、シーンを保存します。

**Bind Selected Text** は TextMeshPro と従来の UI Text に対応し、非アクティブな子も含みます。現在の文字列が既定の翻訳になり、キーは自動で作成されます。別のマネージャーに属するテキストは変更しません。コンポーネントの Inspector にはキーの選択欄があります。

## テーブルの形式

```json
{
  "en": { "hello": "Hello" },
  "th": { "hello": "สวัสดี" }
}
```

テーブルは実行時にマネージャーごとに 1 回読み込みます。ファイルの編集を反映するには、Play モードに入り直してください。

## 言語切り替えボタン

**LCG Language Button** を追加し、マネージャーを割り当てて言語コードを入力します。コードを空にすると、言語を順に切り替えます。

| ボタンの種類 | 設定 |
|---|---|
| Unity UI Button | Inspector の **Wire UI Button** を押します |
| コライダー付きのワールドオブジェクト | `Interact()` で動作します |

## 翻訳がない場合

足りない翻訳には **Default Language** を使います。そこにもない場合、テキストコンポーネントは **Fallback Text** を表示します。`Get(key)` はキーそのものを返します。

数値は自分で書式化することもできます。

```csharp
// "Score: {0}" in the table
label.text = string.Format(localization.Get("score"), score);
```

## フォント

TextMeshPro のフォントには、表示するすべての言語のグリフが必要です。適切なフォントかフォールバックフォントを追加してください。ローカライズはテキストを変更しますが、フォントは変更しません。

## サンプル

サンプルの `LocalizationExample.unity` を開いて Play モードに入ります。英語、タイ語、日本語のボタンは接続済みです。**LocalizationExample** オブジェクトの **RunChecks** イベントは `checksPassed` を設定します。
