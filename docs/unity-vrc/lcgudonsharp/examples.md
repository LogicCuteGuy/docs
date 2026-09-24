---
sidebar_position: 8
---

# Examples

> Documentation version: **0.3.4**

The `Example/` folder in the [LCGUdonSharp repository](https://github.com/LogicCuteGuy/LCGUdonSharp) contains runnable scenes and scripts for every feature. Each example `.cs` ships with its same-named `UdonSharpProgramAsset`; the example `.asmdef` also ships with a separate U# assembly-definition asset so the compiler can discover it.

| Folder | Covers |
|---|---|
| `Example/AsyncAwait` | Async lowering — `Task.Yield()`, `Task.Delay`, string/image/video awaits, GPU readback, serialization, Creator Economy. |
| `Example/Interfaces` | Interface MVP — `INumberOperation` with Add/Multiply implementations invoked through the interface. Input 10 → 15, 30. |
| `Example/Networking` | LCG manual packets — coalesced packet fields with callbacks, broadcast/targeted packet methods, zone-scoped object sync. |
| `Example/GenericRestrictions` | Collections and restrictions — runnable collection/JSON/binary examples plus rejected open generics, generic heap objects, interfaces, multiple bases, and `Task<T>` notes. |
| `Example/ExtendedLanguage` | Extended C# — `try`/`catch`/`finally`, `ref`/`out`, closed generics & interface diamonds, LINQ closures, `dynamic`, `Span<T>`. |

## Quick start: run an example

1. Fix any unrelated C# compilation errors and let Unity finish compiling.
2. Open `Example/TestLCGUdonSharp.unity`, or add an example component to a GameObject in your own scene — every example `.cs` already ships with its same-named `UdonSharpProgramAsset`.
3. Enter Play Mode and inspect the Console.

:::tip Program assets and assembly registration
Every U# `.cs` needs a same-named `UdonSharpProgramAsset`. Use **Assets > Create > U# Script** so Unity creates both files together. Scripts outside `Assembly-CSharp` also need their `.asmdef` registered through **Assets > Create > U# Assembly Definition**.
:::

## See also

- [Installation & Setup](./install.md)
- [Troubleshooting](./troubleshooting.md)
