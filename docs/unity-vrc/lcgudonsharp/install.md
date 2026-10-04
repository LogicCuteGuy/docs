---
sidebar_position: 2
---

# LCGUdonSharp Installation & Setup

> Documentation version: **0.3.7** · [Release notes](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.7)

:::warning Upgrade from 0.3.2
The `0.3.2` distribution was packaged incorrectly and could leave new projects without the compiler payload. Update to `0.3.7`; the installer repairs the compiler after Unity refreshes.
:::

## Requirements

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.5** (strict — other versions are refused)

## Install via VCC or ALCOM (recommended)

Add the [LogicCuteGuy VPM listing](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) in VCC or ALCOM, then install or update **LCGUdonSharp** to `0.3.7`. The package manager resolves `com.vrchat.worlds` 3.10.5 as a VPM dependency.

For a local package reference, download and extract the named `com.logiccuteguy.lcgudonsharp-0.3.7.zip` asset from [GitHub Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.7), then reference the extracted folder. Do not use GitHub's automatic **Source code (zip)** archive: it is not an installable Unity package.

## Setup steps

1. Install or update the package to `0.3.7` through VCC/ALCOM, or extract the named release ZIP for a local package reference.
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

:::caution Important
Use **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** before removing the package. This restores the backed-up SDK copy and removes the generated compiler folder.
:::

## See also

- [Troubleshooting](./troubleshooting.md) — common install and compile issues
- [Examples](./examples.md) — runnable sample scenes shipped with the package
