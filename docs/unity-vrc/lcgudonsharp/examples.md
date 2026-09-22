---
sidebar_position: 8
---

# Examples

The `Example/` folder in the [LCGUdonSharp repository](https://github.com/LogicCuteGuy/LCGUdonSharp) contains runnable scenes and scripts for every feature. Each example `.cs` already ships with its paired UdonSharp `.asset`.

| Folder | Covers |
|---|---|
| `Example/AsyncAwait` | Async lowering — `Task.Yield()`, `Task.Delay`, string/image/video awaits, GPU readback, serialization, Creator Economy. |
| `Example/Interfaces` | Interface MVP — `INumberOperation` with Add/Multiply implementations invoked through the interface. Input 10 → 15, 30. |
| `Example/Networking` | LCG manual packets — coalesced packet fields with callbacks, broadcast/targeted packet methods, zone-scoped object sync. |
| `Example/GenericRestrictions` | Build-time diagnostics — rejected/accepted pairs for open generics, `List<T>`, interface contracts, multiple bases, `Task<T>`. |
| `Example/ExtendedLanguage` | Extended C# — `try`/`catch`/`finally`, `ref`/`out`, closed generics & interface diamonds, LINQ closures, `dynamic`, `Span<T>`. |

## Quick start: run an example

1. Fix any unrelated C# compilation errors and let Unity finish compiling.
2. Open `Example/TestLCGUdonSharp.unity`, or add an example component to a GameObject in your own scene — every example `.cs` already ships with its paired UdonSharp `.asset`.
3. Enter Play Mode and inspect the Console.

:::tip Required: paired UdonSharp program assets
If you create your own scripts, every `.cs` needs a paired UdonSharp `.asset`. Use **Assets > Create > U# Script** so Unity generates both files together.
:::

## See also

- [Installation & Setup](./install.md)
- [Troubleshooting](./troubleshooting.md)
