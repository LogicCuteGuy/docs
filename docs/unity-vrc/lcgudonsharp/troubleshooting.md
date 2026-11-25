---
sidebar_position: 9
---

# LCGUdonSharp Troubleshooting

> Documentation version: **0.5.0**

| Problem | Fix |
|---|---|
| "The associated script cannot be loaded" | The `.cs` is missing its same-named `UdonSharpProgramAsset`. Use **Assets > Create > U# Script** so Unity generates both files together, or copy the `.asset` with the `.cs`. |
| `MissingMethodException` from `LCGUdonSharpHook` on load | The installed Worlds SDK changed a hooked UdonSharp method. Use an SDK inside `>=3.10.6 <3.11.0`; until then stock UdonSharp compiles and LCG-only syntax errors. |
| Program assets lost their script after upgrading from 0.4.x | The SDK's UdonSharp metas carry regenerated GUIDs. Reinstall `com.vrchat.worlds` from VCC, then refresh all UdonSharp assets. |
| Installing a release ZIP fails | Use the named `com.logiccuteguy.lcgudonsharp-0.5.0.zip` release asset, not GitHub's automatic **Source code (zip)** archive. |
| Need to uninstall | Remove the package; nothing else to undo. |
| Script compiles in Unity but UdonSharp ignores it | Its assembly is not registered. `Assembly-CSharp` is always scanned; scripts in an `.asmdef` need a `UdonSharpAssemblyDefinition` pointing to that `.asmdef`. |

## Reporting compiler issues

Bug reports, feature requests, and pull requests are welcome in the [project repository](https://github.com/LogicCuteGuy/LCGUdonSharp). When reporting a compiler diagnostic, include:

1. Unity version
2. Worlds SDK version
3. The smallest snippet that reproduces the issue

## See also

- [Installation & Setup](./install.md) — menu commands and diagnostics toggles
