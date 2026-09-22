---
sidebar_position: 2
---

# LCGUdonSharp Installation & Setup

## Requirements

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.5** (strict — other versions are refused)

## Install via VCC (only supported method)

Add the [LogicCuteGuy VPM listing](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) in the VRChat Creator Companion (or click **Install via VCC** on the site landing page), then add **LCGUdonSharp** to your project. The VCC resolves `com.vrchat.worlds` 3.10.5 automatically as a VPM dependency. Other installation methods (Git URL, local file reference) are not supported.

## Setup steps

1. Add the package to your project via VCC from the LogicCuteGuy VPM listing.
2. Open Unity and let it compile. The installer verifies the SDK, backs up the bundled UdonSharp, and installs the compiler automatically.
3. *(Optional)* Force setup any time via **Tools > LCGUdonSharp > Install or Repair**.
4. Build/test your world as usual.

## Menu Commands

| Command | Description |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | Force the installer to re-run (backup + install + remove bundled copy). |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | Restore the SDK-bundled copy and remove the generated compiler folder — run this before uninstalling. |

There are no example-builder menu commands; the example scene and paired `.asset` files ship with the package.

## Diagnostics

LCG network logging is off by default. Enable **Edit > Project Settings > Udon Sharp > Debugging > LCG network diagnostics** before compiling to include pickup and packet-delivery output, then recompile UdonSharp programs.

## Uninstalling

:::caution Important
Use **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** before removing the package. This restores the backed-up SDK copy and removes the generated compiler folder.
:::

## See also

- [Troubleshooting](./troubleshooting.md) — common install and compile issues
- [Examples](./examples.md) — runnable sample scenes shipped with the package
