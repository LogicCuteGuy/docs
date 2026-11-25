---
sidebar_position: 2
---

# LCGUdonSharp Installation & Setup

> Documentation version: **0.5.0** · [Release notes](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 hooks the Worlds SDK's UdonSharp instead of replacing it. There is no installer, nothing to repair, and nothing is copied or backed up.

## Requirements

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.6** (`>=3.10.6 <3.11.0`). The compiler is built against that SDK's UdonSharp internals.

## Install via VCC or ALCOM (recommended)

Add the [LogicCuteGuy VPM listing](../packages.md) (`https://vpm.logiccuteguy.com/index.json`), then install or update **LCGUdonSharp** to `0.5.0`. Open Unity and let it compile.

For a manual install, extract the [named release ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0) into `Packages/com.logiccuteguy.lcgudonsharp` with `package.json` directly inside that folder. Do not use GitHub's automatic **Source code (zip)** archive. No SBP compatibility package is needed any more.

After Unity compiles, import **LCGUdonSharp Examples** from the package's samples in Package Manager.

## Upgrading from 0.4.x or earlier

0.4.x and earlier deleted the SDK's bundled UdonSharp and ran a copy from this package. Your program assets point at the SDK copy's original GUIDs, so that copy must come back intact:

1. Close Unity.
2. Update LCGUdonSharp to `0.5.0`. This removes the old compiler copy.
3. Reinstall `com.vrchat.worlds` in VCC/ALCOM so `Integrations/UdonSharp` is present with its original metas.
4. Open Unity and run **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets**.

Removed in 0.5.0: `SendLCGNetworkEvent`, `ForceSendPacket`, `LCGNetwork.RequestObjectSync`, the **LCG network diagnostics** setting and the **Tools > LCGUdonSharp** menu. Localization is in [LCG Localization](../lcglocalization/intro.md).

## Menu commands and settings

| Command | Description |
|---|---|
| **Edit > Project Settings > Udon Sharp > LCGUdonSharp** | Async task frame capacity (1-256 frames per behaviour), stored in `ProjectSettings/LogicCuteGuy.LCGUdonSharp.json`. |
| **Assets > Create > U# Script** | Create a U# script and its paired program asset. |
| **Assets > Create > U# Assembly Definition** | Register a selected `.asmdef` with UdonSharp. |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | Recompile every UdonSharp program asset. |

## Diagnostics

If a script compiles in Unity but UdonSharp ignores it, its `.asmdef` is probably not registered. Select the `.asmdef`, choose **Assets > Create > U# Assembly Definition**, then refresh all UdonSharp assets.

## Uninstalling

Remove the package. The SDK's UdonSharp was never modified, so it compiles on its own after the next domain reload; scripts using LCG-only syntax then report errors from the stock compiler.

## See also

- [Troubleshooting](./troubleshooting.md): common install and compile issues
- [Examples](./examples.md): runnable sample scenes shipped with the package
