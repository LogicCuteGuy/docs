---
sidebar_position: 1
---

# LCG Localization

> Documentation version: **0.1.0** · [Release](https://github.com/LogicCuteGuy/LCGLocalization/releases/tag/0.1.0)

**LCG Localization** (`com.logiccuteguy.lcglocalization`) adds text and asset localization to UdonSharp in VRChat worlds. Unity String and Asset Tables bake into Udon, so translations ship inside the world.

## Features

- Unity String and Asset Tables baked into Udon.
- Direct manager calls, dropdowns and callbacks.
- Smart Strings with variables, choose and plural.
- Sprite, texture, audio and prefab variants, with fallback.
- A legacy JSON table workflow.
- Works with the VRChat SDK's UdonSharp. LCGUdonSharp is optional.

## Requirements

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 or newer (UdonSharp)
- Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.26 or newer (installed as dependencies)

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) to VCC/ALCOM, or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if it is already added.
2. Open **Manage Project** for your Unity project.
3. Find **LCG Localization** (`com.logiccuteguy.lcglocalization`) and add **0.1.0**.
4. Open the project in Unity and let the package import.

### Unity Package Manager / manual

In **Window > Package Manager > + > Add package from git URL**, enter:

```text
https://github.com/LogicCuteGuy/LCGLocalization.git#0.1.0
```

Choose **one installation method per project** to avoid duplicate copies. Do not use GitHub's automatic **Source code (zip)** archive.

## Quick start

1. Import **LCG Localization Examples** from Package Manager, then read `UnityLocalization.md` in the sample for setup.
2. Choose **Tools > LCG Localization > Create Unity Manager** to add a manager to your scene, then assign it to a public field.
3. Call the manager from your UdonSharp scripts, as shown below.

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

## Manager members

| Member | Purpose |
|---|---|
| `Get(key)` | Translation, or the key when missing |
| `GetOrDefault(key, fallback)` | Translation, or `fallback` when missing |
| `GetWithVariables(key, fallback, names, values)` | Translation with one-off Smart variables |
| `SetLanguage(code)` | Select a language and stop following the client language |
| `NextLanguage()` | Cycle through languages |
| `FollowClientLanguage()` | Return to VRChat's selected language |
| `CurrentLanguage`, `GetLanguages()` | Read the current language or all languages |
| `SetVariable(name, value)` | Set a shared Smart variable and refresh all text |

Language choice is local to each player. It is not synced or saved between visits.

If your script is in its own assembly definition, reference `LogicCuteGuy.LCGLocalization.Runtime` and give that assembly a U# assembly definition.
