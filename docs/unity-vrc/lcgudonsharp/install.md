---
sidebar_position: 2
---

# LCGUdonSharp Installation & Setup

> Documentation version: **0.3.10** · [Release notes](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10)

> **Upgrade from 0.3.2**
>
> The `0.3.2` distribution was packaged incorrectly and could leave new projects without the compiler payload. Update to `0.3.10`; the installer repairs the compiler after Unity refreshes.

## Requirements

LCGUdonSharp 0.3.10 installs an embedded **SBP compatibility 1.21.26** dependency through VPM before Unity compiles, preventing the VRChat SDK `ExtensionMethods` collision on fresh installs and upgrades. It is based on Unity SBP 1.21.25, preserves upstream source/GUIDs and the Unity Companion License, and survives `Library` regeneration. Unity Localization 1.4.5 remains supported. See [installation](./install.md); manual installs require **both** release ZIPs.

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.5** (strict — other versions are refused)

## Install via VCC or ALCOM (recommended)

Add the [LogicCuteGuy VPM listing](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) in VCC or ALCOM, then install or update **LCGUdonSharp** to `0.3.10`. The package manager resolves `com.vrchat.worlds` 3.10.5 as a VPM dependency.

For manual installation, **close Unity first**. Download the named [LCGUdonSharp 0.3.10 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10) and [SBP compatibility 1.21.26 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/sbp-compatibility-1.21.26). Extract their contents to `Packages/com.logiccuteguy.lcgudonsharp` and `Packages/com.unity.scriptablebuildpipeline` respectively, with each `package.json` directly inside its package folder, before reopening Unity. A `file:` reference to LCGUdonSharp still requires SBP embedded in the project. Do not use GitHub's automatic **Source code (zip)** archive. Do not rely on a PackageCache edit or a post-compilation hook: cache regeneration can remove that fix.

## Setup steps

1. Install/update `0.3.10` and its SBP compatibility dependency through VCC/ALCOM, or complete the two-ZIP manual installation above while Unity is closed.
2. Open Unity and let it compile. The installer verifies the SDK, backs up the bundled UdonSharp, and installs the compiler automatically.
3. *(Optional)* Force setup any time via **Tools > LCGUdonSharp > Install or Repair**.
4. Build/test your world as usual.

After automatic compiler installation completes, import **LCGUdonSharp Examples** from the package samples in Unity's Package Manager. The released ZIP stores examples under `Samples~/Examples`; repository guides use `Example/`. See [ScriptableObject Data](./scriptableobjects.md) for the new shop sample.

## Menu Commands

| Command | Description |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | Force the installer to re-run (backup + install + remove bundled copy). |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | Restore the SDK-bundled copy and remove the generated compiler folder — run this before uninstalling. |
| **Assets > Create > U# Script** | Create a U# script and its paired program asset. |
| **Assets > Create > U# Assembly Definition** | Register a selected `.asmdef` with UdonSharp. |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | Recompile every UdonSharp program asset. |

There are no example-builder menu commands; the example scene and paired `.asset` files ship with the package.

## Diagnostics

If a script compiles in Unity but UdonSharp ignores it, its `.asmdef` is probably not registered. Select the `.asmdef`, choose **Assets > Create > U# Assembly Definition**, then refresh all UdonSharp assets.

LCG network logging is off by default. Enable **Edit > Project Settings > Udon Sharp > Debugging > LCG network diagnostics** before compiling to include pickup and packet-delivery output, then recompile UdonSharp programs.

## Uninstalling

> **Important**
>
> Use **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** before removing the package. This restores the backed-up SDK copy and removes the generated compiler folder.

## See also

- [Troubleshooting](./troubleshooting.md) — common install and compile issues
- [Examples](./examples.md) — runnable sample scenes shipped with the package

## Localization in 0.3.9

LCGUdonSharp 0.3.9 adds [text and asset localization](./localization.md): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.

Current install: Unity Localization **1.4.5** and embedded `com.unity.scriptablebuildpipeline` **1.21.26** via VPM. This compatibility distribution is based on Unity **1.21.25**, not a new upstream Unity SBP release. The manifest retains the UPM 1.21.25 declaration, but pins the VPM compatibility dependency to 1.21.26. Install it before Unity compiles; see [installation](./install.md).
