---
sidebar_position: 8
---

# Text and Asset Localization

> Documentation version: **0.3.9**

LCGUdonSharp bakes Unity Localization String and Asset Tables into Udon in the temporary Play Mode/build scene. Native authoring components remain editable in the source scene; the built world does not load Addressables. Install [LCGUdonSharp](./install.md) first. Package dependencies are Unity Localization **1.4.5** and Scriptable Build Pipeline **1.21.25**, with Unity 2022.3 and Worlds SDK 3.10.5.

## Unity Tables setup

1. Create Locales and a String Table Collection in Unity Localization.
2. Choose **Tools > LCGUdonSharp > Localization > Create Unity Manager**. Assign the collection on **Unity Localization Source**, and set the manager's **Default Language** to a code in the collection.
3. Add **Localize String Event** to TextMeshPro or UI Text. Select the collection/key and connect **On Update String** to the **dynamic** `TMP_Text.text` or `Text.text` setter, not a fixed argument.
4. Use **Bake / Validate Now** on the source component, save the scene, then enter Play Mode or rebuild the world.

Use one manager per collection per scene. Manager and text must be in the same scene; inactive text is included. Edit tables through **Tools > LCGUdonSharp > Localization > Unity Tables**. Rebuild after changing translations or assets.

## Language selection and notifications

The manager follows the VRChat client language until manually selected. Regional codes such as `en-US` fall back to `en`; unsupported client languages use the default. Missing/empty translations use the default, then original text/key. Selection is local, not network-synchronized and not persisted between visits.

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

`LCGLanguageButton` is optional. APIs include `CurrentLanguage`, `Get(key)`, `GetOrDefault(key, fallback)`, `GetLanguages()`, `SetLanguageByIndex(index)`, `NextLanguage()`, `FollowClientLanguage()` and `RefreshAll()`. Invalid language codes/indices leave selection unchanged. For a parameterless event, set `selectedLanguage` via `SetProgramVariable`, then send `SelectLanguage`.

Assign **Language Dropdown** or **Language TMP Dropdown**, fill **Dropdown Languages**, then click **Wire Language Dropdown**. Set **Language Changed Targets** and implement `LocalizationChanged()` (or customize **Language Changed Event**); read `CurrentLanguage` in the callback. Only language changes notify; variable changes refresh text. Unity UI events must target the backing **Udon Behaviour > SendCustomEvent**. Direct proxy callbacks do not survive VRChat builds.

## Validated Smart Strings

Mark String Table entries **Smart**. Supported syntax:

| Syntax | Behavior |
|---|---|
| `{name}`, `{0}` | Named/numbered scalar placeholders |
| `{count:000}`, `{score:F2}`, `{ratio:P0}` | Invariant numeric formatting |
| `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` | Choice outputs plus required final fallback |
| `{count:plural:One item\|{} items}` | English: two forms |
| `{count:plural:{} items}` | Thai/Japanese/Chinese: one form |
| `{{name}}` | Escaped braces |

Variables are strings; format numbers invariantly. Initial **Variable Names** and **Variable Values** must have matching lengths. Scalar local variables on **Localize String Event** are baked into each text binding and override globals; update with `binding.SetVariable(name, value)`. `GetWithVariables(key, fallback, names, values)` formats without changing state. Missing variables retain placeholders; inserted values are literal text.

Reflection selectors, persistent Unity global-variable groups, runtime Unity argument objects, date/list/conditional/custom formatters, nested named placeholders and other locale plural rules are unsupported. Unsupported syntax stops baking; this is not the full Unity Smart Strings engine.

## Localized assets

Assign **Asset Table Collections** on the source. Connect native dynamic events:

- **Localize Sprite Event** → `Image.sprite`.
- **Localize Texture Event** → `RawImage.texture`.
- **Localize Audio Clip Event** → `AudioSource.clip`.
- **LCGUdonSharp > Localization > Localize Prefab Event** → no callback. Use `LCGLocalizePrefabEvent` rather than Unity 1.4.5's original prefab event to avoid Edit Mode preview-destruction errors. Baking creates child variants and toggles the selected locale locally; it does not spawn network objects.

Named subassets resolve at bake time. Missing translations fall back to default, then the original component asset. Arbitrary asset callbacks and per-text/per-asset locale overrides are rejected. Default locale must exist in asset collections. Included variants increase world build size.

For existing scene GameObjects/materials, put **LCG Localized Asset** on an always-active parent; assign manager, locale codes and matching **Variants**/**Assets** arrays. Use **Target Renderer** for materials, or the corresponding sprite/texture/clip target. One binding holds one localized set. **Play Audio On Change** is optional; default behavior changes the clip and stops previous playback.

## Examples and legacy JSON

Import optional **LCGUdonSharp Examples** after compiler setup. In the repository open `Example/TestLCGUdonSharp.unity`: **UnityLocalizationExample** is at `(17, 0, 0)`, with EN/TH/JA buttons, direct calls, dropdown, variables, sprites/textures, short audio tones and prefab variants. Tones are not spoken translations. Release samples live under `Samples~/Examples`.

The subset Noto Sans JP/Thai fonts include OFL licenses; supply full fonts/fallbacks for additional glyphs. Localization changes text, not fonts.

Legacy JSON remains available via **Tools > LCGUdonSharp > Localization > Legacy JSON Table**: create a manager, save the table under Assets, select text/parents and **Bind Selected Text**, add translations, save table and scene. Tables are read once per manager; restart Play Mode for edits. `Example/Localization/LocalizationExample.unity` demonstrates the legacy flow.

## Troubleshooting and checks

- Bake failure: check collection/key, same-scene manager, unique manager per collection, matching variable arrays and dynamic text/asset setters.
- Missing glyphs: provide multilingual TMP fonts/fallbacks.
- SDK/SBP assembly conflict: 0.3.9 includes a compatibility hook that excludes automatically referenced plugin DLLs from SBP's editor assembly while preserving explicit Unity references; the SDK DLL is unchanged.
- Run **LCGUnityLocalizationTests** and **LCGLocalizationTests** in Unity EditMode. The example's `RunChecks` event checks compiled local behavior in Play Mode. These are user-side validation instructions, not tests run by this documentation build.

See [examples](./examples.md) and the [version-pinned upstream setup](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.9/Example/Localization/UnityLocalization.md).

