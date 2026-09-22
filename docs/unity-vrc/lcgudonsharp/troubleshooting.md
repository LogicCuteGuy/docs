---
sidebar_position: 9
---

# LCGUdonSharp Troubleshooting

| Problem | Fix |
|---|---|
| "The associated script cannot be loaded" | The `.cs` is missing its paired UdonSharp `.asset`. Use **Assets > Create > U# Script** so Unity generates both files together. |
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
