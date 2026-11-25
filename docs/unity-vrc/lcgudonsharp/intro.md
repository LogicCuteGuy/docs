---
sidebar_position: 1
---

# LCGUdonSharp Overview

> Documentation version: **0.5.0** · [Release notes](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) is an interface-enabled UdonSharp compiler for VRChat. It extends UdonSharp with C# interfaces, build-time `async`/`await`, synchronous `try`/`catch`/`finally`, C# collections and JSON, extended language constructs — by hooking the VRChat SDK's UdonSharp instead of replacing it. No SDK file is modified.

> **Status**
>
> Interfaces, synchronous exceptions, async lowering, and extended-language support are ready for world testing.

## What's new in 0.5.0

- **Hook, not replace.** The LCG compiler compiles into the SDK's `UdonSharp.Editor`/`UdonSharp.Runtime` through `.asmref` files, and Harmony redirects the stock compile entry points to it. The installer, `Payload~`, backups and the **Tools > LCGUdonSharp** menu are gone.
- Requires Worlds SDK `>=3.10.6 <3.11.0`; includes the SDK 3.10.6 compiler fixes.
- **Breaking:** compiler-side networking is removed (`SendLCGNetworkEvent`, `ForceSendPacket`, `LCGNetwork.RequestObjectSync`, the network diagnostics setting). Localization moved to [LCG Localization](../lcglocalization/intro.md) in 0.4.0.
- The async frame capacity setting moved to **Project Settings > Udon Sharp > LCGUdonSharp**.
- Upgrading from 0.4.x: see [Installation & Setup](./install.md#upgrading-from-04x-or-earlier).

## Features

| Feature | What you get |
|---|---|
| **C# Interfaces** | Source-defined interfaces implemented by `UdonSharpBehaviour` classes — method calls, parameters, return values, properties, multiple implementations, interface arrays. |
| **Async/Await** | Build-time lowering for `await Task.Yield()`, `await Task.Delay(int)`, and one VRChat SDK await per behaviour (string/image downloads, video, GPU readback, serialization, Creator Economy). |
| **Synchronous Exceptions** | Compiler-managed `try`/`catch`/`finally`, explicit `throw`s, rethrow, and guarded null, index, and integral divide/modulo failures — without relying on unavailable Udon exception opcodes. |
| **Extended Language** | `ref`/`out` (including `out var` and recursion), closed generics, interface diamonds, LINQ lambdas with captures, proven `dynamic`, array-backed `Span<T>`. |
| **C# Collections & JSON** | Exact `List<T>` and `Dictionary<TKey,TValue>` syntax lowered to `DataList`/`DataDictionary`, plus a VRCJson-backed `System.Text.Json` facade and manual synced-collection payloads. |
| **Hook, not replace** | The SDK's bundled UdonSharp stays installed and unmodified; LCGUdonSharp joins its assemblies through `.asmref` files and redirects compilation with Harmony. |

## Key terms

| Term | Meaning |
|---|---|
| **Program asset** (`UdonSharpProgramAsset`) | The asset paired with one U# script: `MyScript.cs` ↔ `MyScript.asset`, in the same folder with the same basename. |
| **U# assembly definition** (`UdonSharpAssemblyDefinition`) | An asset that registers one `.asmdef` for UdonSharp compilation through its `sourceAssembly` field. This is not a compiled program asset. |
| **Assembly scanning** | `Assembly-CSharp` is always included. Every other assembly containing U# behaviours needs a U# assembly-definition asset. |
| **Extern** | A Unity/SDK method mapped to a built-in Udon node. Faults raised inside an extern cannot be caught by compiler-managed `try`/`catch`. |

## How It Works

### 1. Compiler hook

```text
Packages/com.logiccuteguy.lcgudonsharp
├─ Editor/UdonSharp.Editor.asmref   → compiles into the SDK's UdonSharp.Editor
│  ├─ Compiler/                     LCG compiler (namespace UdonSharp.LCGCompiler)
│  ├─ Serialization/                List/Dictionary + ScriptableObject data serializers
│  └─ LCGUdonSharpHook.cs           Harmony entry hook
└─ Runtime/UdonSharp.Runtime.asmref → adds VRCAsync, UdonException, System.Text.Json facade
```

On every domain reload the hook patches the stock `UdonSharpCompilerV1.Compile`, `CompileSync` and `WaitForCompile` so they run the LCG compiler, resets its assembly cache with the stock one, maps List/Dictionary/ScriptableObject data fields to Udon types, and registers their serializers. If an SDK update renames a hooked method, the hook logs a `MissingMethodException` and stock UdonSharp compiles instead.

### 2. Compiler extensions

The LCG compiler is UdonSharp's compiler with these lowering passes added:

```text
Your C# source
   │
   ├─ interfaces ─────────► program-variable / custom-event ABI calls
   ├─ async/await ────────► frame-pool continuation lowering
   ├─ try/catch/finally ──► hidden payload state + guarded control flow
   ├─ ref/out, closures,
   │  closed generics,
   │  dynamic, Span<T> ───► concrete array/offset/length locals + loops
   └─ List/Dictionary/JSON ► DataList/DataDictionary + VRCJson helpers
   │
   ▼
Udon assembly (runs in VRChat)
```

## Guides

- [Installation & Setup](./install.md)
- [Interfaces](./interfaces.md)
- [Async/Await](./async-await.md)
- [Synchronous Exception Handling](./exceptions.md)
- [Extended Language](./extended-language.md)
- [Collections, JSON, Bytes & Bits](./collections-json.md)
- [Examples](./examples.md)
- [Troubleshooting](./troubleshooting.md)

## Acknowledgements

LCGUdonSharp builds on [UdonSharp](https://github.com/MerlinSan/UdonSharp), originally created by Merlin, and on the VRChat Worlds SDK. It hooks the SDK's UdonSharp rather than replacing it, so existing projects keep the SDK's assemblies and asset GUIDs.

## License

MIT © 2026 LogicCuteGuy — see [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) for release history.
