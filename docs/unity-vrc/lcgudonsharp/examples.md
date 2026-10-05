---
sidebar_position: 8
---

# Examples

> Documentation version: **0.3.10**

The `Example/` folder in the [LCGUdonSharp repository](https://github.com/LogicCuteGuy/LCGUdonSharp) contains runnable scenes and scripts for every feature. Each example `.cs` ships with its same-named `UdonSharpProgramAsset`; the example `.asmdef` also ships with a separate U# assembly-definition asset so the compiler can discover it.

| Folder | Covers |
|---|---|
| `Example/AsyncAwait` | Async lowering — `Task.Yield()`, `Task.Delay`, string/image/video awaits, GPU readback, serialization, Creator Economy. |
| `Example/Interfaces` | Interface MVP — `INumberOperation` with Add/Multiply implementations invoked through the interface. Input 10 → 15, 30. |
| `Example/Networking` | Native and LCG lamps, packet fields/methods, zone-scoped moving cubes, and opt-in native/LCG high-bandwidth load generators. |
| `Example/GenericRestrictions` | Collections and restrictions — runnable collection/JSON/binary examples plus rejected open generics, generic heap objects, interfaces, multiple bases, and `Task<T>` notes. |
| `Example/ExtendedLanguage` | Extended C# — `try`/`catch`/`finally`, `ref`/`out`, closed generics & interface diamonds, LINQ closures, `dynamic`, `Span<T>`. |

## Quick start: run an example

1. Fix any unrelated C# compilation errors and let Unity finish compiling.
2. Open `Example/TestLCGUdonSharp.unity`, or add an example component to a GameObject in your own scene — every example `.cs` already ships with its same-named `UdonSharpProgramAsset`.
3. Enter Play Mode and inspect the Console.

## Equipment example in 0.3.8

`ScriptableObjectEquipmentExample.prefab` is at `(12, 0, 3)` in `TestLCGUdonSharp.unity`. The base-typed `item` holds `TrainingSword.asset`; `catalog` also contains `FireSpell.asset`. Each references its own economy asset. The sword costs 35 coins and has 45 damage; the spell costs 20 coins and has 80 power / 12 mana. Interact with the board to purchase and use the adjacent switch or `SelectNext` to change selection. `TestDataFeatures` checks nested reads, inherited fields, type tests, successful/null/invalid casts, and defensive copies of nested polymorphic arrays. Purchases are local and not synchronized.

## ScriptableObject shop in 0.3.7

Import **LCGUdonSharp Examples** from the package samples after automatic compiler installation completes. `Example/ScriptableObjects/ScriptableObjectShopExample.prefab` is also placed at `(7, 0, 3)` in `Example/TestLCGUdonSharp.unity`. In ClientSim, interact with its pink board: 100 coins become 65, then 30; the third purchase is refused. `StrawberryMilk.asset` and `GreenTea.asset` provide the item data. `TestArrayCopy` checks defensive array copies. Purchases are local and are not synchronized between players.

See [ScriptableObject Data](./scriptableobjects.md) before replacing the Inspector `item` and `catalog` references.

## Networking prefabs in 0.3.6

- **`NetworkExamples.prefab`** wires a native synced lamp outside the zone, an LCG packet lamp inside it, and an LCG-synced moving cube. Use it for two-client checks of re-entry, late join, owner departure and current-state snapshots.
- **`HighBandwidthExamples.prefab`** contains two stopped-by-default load generators: `NativeHighBandwidthExample` sends a Manual `[UdonSynced] byte[]`, while `LCGHighBandwidthExample` drives up to 32 converted object-sync cubes through the bounded motion queue.
- The LCG load dashboard shows locally produced samples, locally owned objects, pending motion, dispatched batches and the last batch size. These counters are diagnostic and do not prove remote delivery or network throughput.
- [`Example/Networking/README.th.md`](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/Networking/README.th.md) provides Thai setup and two-client validation instructions.

Cross-client delivery, late join, ownership contention, bandwidth and FPS require VRChat Build & Test with multiple clients; single-player ClientSim only verifies compilation, wiring and local interaction.

:::tip Program assets and assembly registration
Every U# `.cs` needs a same-named `UdonSharpProgramAsset`. Use **Assets > Create > U# Script** so Unity creates both files together. Scripts outside `Assembly-CSharp` also need their `.asmdef` registered through **Assets > Create > U# Assembly Definition**.
:::

## See also

- [Installation & Setup](./install.md)
- [Troubleshooting](./troubleshooting.md)

## Localization in 0.3.9

LCGUdonSharp 0.3.9 adds [text and asset localization](./localization.md): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.
