---
sidebar_position: 8
---

# Examples

> Documentation version: **0.5.0**

:::warning No examples ship with 0.5.0
The 0.5.0 release ZIP and the repository at that tag contain no example files. `package.json` still lists an **LCGUdonSharp Examples** sample, but its folder is missing, so there is nothing to import.
:::

## Older examples

The [`Example/` folder at tag 0.3.12](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example) can still be read as reference code.

| Folder | Covers |
|---|---|
| [`AsyncAwait`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/AsyncAwait) | `Task.Yield()`, `Task.Delay`, string, image and video awaits, GPU readback, serialization, Creator Economy |
| [`Interfaces`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/Interfaces) | `INumberOperation` with add and multiply implementations. Input 10 gives 15 and 30. |
| [`ExtendedLanguage`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ExtendedLanguage) | `try`/`catch`/`finally`, `ref`/`out`, closed generics, interface diamonds, LINQ closures, `dynamic`, `Span<T>` |
| [`GenericRestrictions`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/GenericRestrictions) | Collections, JSON and binary data, plus constructs that are rejected |
| [`ScriptableObjects`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ScriptableObjects) | ScriptableObject shop and equipment data |

These were written for the 0.3.x compiler and **haven't been verified with 0.5.0**. To try one, create a script with **Assets > Create > U# Script** and paste in the code you need.

Don't import the whole old folder. Its networking examples use features that 0.5.0 removed. For networking, see [LCG Network System](../lcgnetwork/intro.md). For localization, see [LCG Localization](../lcglocalization/intro.md).

:::tip Program assets and assembly registration
Every U# `.cs` needs a `UdonSharpProgramAsset` with the same name. **Assets > Create > U# Script** creates both. Scripts outside `Assembly-CSharp` also need their `.asmdef` registered with **Assets > Create > U# Assembly Definition**.
:::

## See also

- [Installation & Setup](./install.md)
- [Troubleshooting](./troubleshooting.md)
