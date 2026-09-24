---
sidebar_position: 9
---

# LCGUdonSharp Troubleshooting

> Documentation version: **0.3.4**

| Problem | Fix |
|---|---|
| "The associated script cannot be loaded" | The `.cs` is missing its same-named `UdonSharpProgramAsset`. Use **Assets > Create > U# Script** so Unity generates both files together, or copy the `.asset` with the `.cs`. |
| Script compiles in Unity but UdonSharp ignores it | Its assembly is not registered. `Assembly-CSharp` is always scanned; scripts in an `.asmdef` need a `UdonSharpAssemblyDefinition` pointing to that `.asmdef`. |
| Fresh install has no compiler payload | Update from the incorrectly packaged `0.3.2` release to `0.3.4`, then let Unity refresh or run **Install or Repair**. |
| Installing a release ZIP fails | Use the named `com.logiccuteguy.lcgudonsharp-0.3.4.zip` release asset, not GitHub's automatic **Source code (zip)** archive. |
| Installer stops immediately | SDK version must be exactly **3.10.5**. Setup refuses other versions by design. |
| Duplicate `UdonSharp.*` assemblies | Run **Tools > LCGUdonSharp > Install or Repair** — the SDK's bundled copy may have been restored. |
| Packet fields not syncing after upgrade | Protocol is versioned (v2): recompile all UdonSharp programs and rebuild the world. |
| Build fails around `LCGNetworkZone` | Zones fail closed on Continuous bodies, Udon Graph behaviours, overlapping parent/child zones, `[UdonSynced]` under a zone, and PlayerObject templates sharing a hierarchy. Zones in separate hierarchies may overlap. |
| Need to uninstall | Run **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** first, then remove the package. |

## Reporting compiler issues

Bug reports, feature requests, and pull requests are welcome in the [project repository](https://github.com/LogicCuteGuy/LCGUdonSharp). When reporting a compiler diagnostic, include:

1. Unity version
2. Worlds SDK version
3. The smallest snippet that reproduces the issue

## See also

- [Installation & Setup](./install.md) — menu commands and diagnostics toggles
- [Manual Packet Networking](./networking.md) — zone rules and protocol versioning
