---
sidebar_position: 4
---

# JSON tables (legacy workflow)

A simple workflow for text only, without Unity Localization tables. It was inspired by [ikuko/ULocalization](https://github.com/ikuko/ULocalization).

:::note
Smart Strings and localized sprites, textures, audio and GameObjects are described under [Unity String Tables](./unity-tables.md) and [Localized assets](./assets.md). Use that workflow for them.
:::

## Setup without code

1. Open **Tools > LCG Localization > Legacy JSON Table** and click **Create Localization Manager**.
2. Click **Save Table** and save the JSON under `Assets`.
3. Select text objects, or their parent, then click **Bind Selected Text**.
4. Enter the translations. Add any language code, such as `en`, `th`, `ja` or `zh-hant`.
5. Click **Save Table**, then save the scene.

**Bind Selected Text** supports TextMeshPro and legacy UI Text, including inactive children. The current text becomes the default translation, and keys are created for you. Text that belongs to another manager isn't changed. The component Inspector has a key picker.

## Table format

```json
{
  "en": { "hello": "Hello" },
  "th": { "hello": "สวัสดี" }
}
```

The table is read once for each manager at runtime. Restart Play mode to see edits to the file.

## Language buttons

Add **LCG Language Button**, assign the manager and enter a language code. Leave the code empty to cycle through languages.

| Button type | Setup |
|---|---|
| Unity UI Button | Click **Wire UI Button** in the Inspector |
| World object with a collider | Works through `Interact()` |

## Missing text

**Default Language** supplies missing translations. If it has none either, the text component shows its **Fallback Text**. `Get(key)` returns the key itself.

For numbers, you can format the text yourself:

```csharp
// "Score: {0}" in the table
label.text = string.Format(localization.Get("score"), score);
```

## Fonts

TextMeshPro fonts need glyphs for every language you show. Add suitable fonts or fallback fonts. Localization changes the text, not the font.

## Example

Open `LocalizationExample.unity` from the sample and enter Play mode. The English, Thai and Japanese buttons are already connected. The **LocalizationExample** object has a **RunChecks** event that sets `checksPassed`.
