---
sidebar_position: 2
---

# Unity String Tables

This is the main workflow. You author with Unity Localization's **Locales**, **String Table Collections** and **Localize String Event**. The tables are baked into the temporary Play mode or build scene. Your own scene keeps Unity's components, and the built world loads no Addressables.

## Try the example

Drop `UnityLocalizationExample.prefab` from the **LCG Localization Examples** sample into a scene, enter Play mode and use the English, Thai and Japanese buttons. Open its tables with **Tools > LCG Localization > Unity Tables**.

The example font is a subset of Noto Sans. Provide full fonts when you add other text.

## Set up your own UI

1. Create locales and a **String Table Collection** in Unity Localization.
2. Choose **Tools > LCG Localization > Create Unity Manager**. Assign the collection on **Unity Localization Source**, and set the manager's **Default Language** to a locale code in the collection.
3. Add **Localize String Event** to your TextMeshPro or UI Text. Choose the collection and key, then connect **On Update String** to the dynamic `Text.text` or `TMP_Text.text` setter.
4. Click **Bake / Validate Now** on the source to check the connections.
5. Save the scene and press Play. Re-enter Play mode after editing a table.

- Use one manager per collection in each scene.
- A text and its manager must be in the same scene. Inactive text is included.
- Unsupported setups **stop the bake**.

## Which language is shown

The manager follows the VRChat client's language until the player chooses one. The choice is local, and isn't saved between visits.

A code such as `en-US` falls back to `en`. An unsupported client language uses the default language. A missing or empty translation uses the default language, then the original text or the key.

## Switching language

From Udon, call `SetLanguage("th")`, `SetLanguageByIndex(i)`, `NextLanguage()` or `FollowClientLanguage()`. An invalid code or index keeps the current language.

From a Unity UI event, target the **Udon Behaviour's `SendCustomEvent`** with the event name. A direct callback to the script component doesn't survive a VRChat build. For an event without parameters, set `selectedLanguage`, then send `SelectLanguage`.

### Dropdown

1. Assign **Language Dropdown** or **Language TMP Dropdown** on the manager.
2. Enter the language code of each option in **Dropdown Languages**.
3. Click **Wire Language Dropdown**.

When the language changes, the dropdown updates without firing its own event again.

**LCG Language Button** is an optional shortcut for a single-language button.

### Reacting to a change

Add your behaviour to **Language Changed Targets** and write `LocalizationChanged()`, or change **Language Changed Event**. Read `CurrentLanguage` inside it. It is sent only when the language changes, not when a variable changes.

## Smart Strings

Mark an entry **Smart** in the String Table. A subset of Unity's Smart Strings runs in Udon.

| Syntax | Example |
|---|---|
| Named or numbered value | `{name}`, `{0}` |
| Number format | `{count:000}`, `{score:F2}`, `{ratio:P0}` |
| Choose, fallback required | `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` |
| English plural, two forms | `{count:plural:One item\|{} items}` |
| Thai, Japanese or Chinese plural, one form | `{count:plural:{} items}` |
| Literal braces | `{{name}}` |

Numbers are formatted with invariant culture, and the `D` format isn't supported. A missing variable keeps its placeholder. Inserted values are plain text.

**Not supported**, and the bake stops: reflection selectors, Unity's persistent global variable groups, runtime argument objects, date, list, conditional or custom formatters, nested named placeholders, and plural rules for other languages.

## Variables

Values are strings, so convert numbers with invariant formatting.

| To set | Use |
|---|---|
| A value for all text | `manager.SetVariable(name, value)` |
| Starting values | The **Variable Names** and **Variable Values** arrays |
| A value for one text | `binding.SetVariable(name, value)` on its `LCGLocalizedText` |
| One lookup without changing anything | `GetWithVariables(key, fallback, names, values)` |

Local variables on a **Localize String Event** are baked into that text and override global ones. `binding.SetVariable` works only for names already listed on the text.

Next: [Localized assets](./assets.md).
