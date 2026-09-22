---
sidebar_position: 1
---

# LCGUdonSharp Overview

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) is an interface-enabled UdonSharp compiler for VRChat. It extends UdonSharp with C# interfaces, build-time `async`/`await`, synchronous `try`/`catch`/`finally`, extended language constructs, and a manual packet networking layer — while keeping every modified source file inside `Packages/com.logiccuteguy.lcgudonsharp` instead of the VRChat SDK or `Assets`.

:::info Status
Interfaces, synchronous exceptions, async lowering, and extended-language support are ready for world testing. Manual packet networking (`[LCGPacket]` / `LCGNetworkZone`) is **experimental** — its wire protocol may change between versions.
:::

## Features

| Feature | What you get |
|---|---|
| **C# Interfaces** | Source-defined interfaces implemented by `UdonSharpBehaviour` classes — method calls, parameters, return values, properties, multiple implementations, interface arrays. |
| **Async/Await** | Build-time lowering for `await Task.Yield()`, `await Task.Delay(int)`, and one VRChat SDK await per behaviour (string/image downloads, video, GPU readback, serialization, Creator Economy). |
| **Synchronous Exceptions** | Compiler-managed `try`/`catch`/`finally`, explicit `throw`s, rethrow, and guarded null, index, and integral divide/modulo failures — without relying on unavailable Udon exception opcodes. |
| **Extended Language** | `ref`/`out` (including `out var` and recursion), closed generics, interface diamonds, LINQ lambdas with captures, proven `dynamic`, array-backed `Span<T>`. |
| **Manual Packet Networking** *(experimental)* | `[LCGPacket]` fields and methods with versioned frames, authority checks, replay protection, field coalescing, verified-sender callbacks, targeted PlayerObject delivery. |
| **Network Zones** | `LCGNetworkZone` scopes packet recipients and ownership to a trigger volume; manual object-sync replaces `VRC_ObjectSync` inside zones. |
| **Clean Installation** | Automatic, idempotent setup with backup/restore — no modified files inside `com.vrchat.worlds` or `Assets`. |

## How It Works

### 1. Automatic installer

After the package is imported, a small bootstrap assembly (`Editor/LCGUdonSharpInstaller.cs`) runs automatically:

```text
1. Verify VRChat Worlds SDK 3.10.5 is installed
2. Back up SDK-bundled Integrations/UdonSharp
   → Library/LogicCuteGuy.LCGUdonSharp/Backups
3. Install the interface-enabled compiler at
   → Packages/com.logiccuteguy.lcgudonsharp/UdonSharp
4. Remove the SDK-bundled copy so Unity sees
   exactly one set of UdonSharp.* assemblies
```

Setup is idempotent — if an SDK/package refresh restores the bundled copy, setup runs again. On any SDK version other than `3.10.5`, setup stops instead of modifying an untested package.

### 2. Compiler extensions

The compiler keeps the original `UdonSharp` namespaces and assembly names, then adds lowering passes:

```text
Your C# source
   │
   ├─ interfaces ─────────► program-variable / custom-event ABI calls
   ├─ async/await ────────► frame-pool continuation lowering
   ├─ try/catch/finally ──► hidden payload state + guarded control flow
   ├─ ref/out, closures,
   │  closed generics,
   │  dynamic, Span<T> ───► concrete array/offset/length locals + loops
   └─ [LCGPacket] ────────► versioned packet frames + mailbox delivery
   │
   ▼
Udon assembly (runs in VRChat)
```

### 3. Manual packet networking

`[LCGPacket]` does not use native Udon variable sync. Instead:

- Assigning a packet field queues a send — repeated assignments in one frame are coalesced to the latest value; unchanged values are skipped; `ForceSendPacket(nameof(field))` bypasses suppression.
- Packet methods are delivered through a PlayerObject mailbox; `SendCustomNetworkEvent(...)` is lowered to packet delivery only when the target method has `[LCGPacket]`.
- Frames are versioned and validated with authority checks and replay protection.
- Owners provide snapshots when players are restored; departing-player state is discarded.

## Guides

- [Installation & Setup](./install.md)
- [Interfaces](./interfaces.md)
- [Async/Await](./async-await.md)
- [Synchronous Exception Handling](./exceptions.md)
- [Extended Language](./extended-language.md)
- [Manual Packet Networking & Network Zones](./networking.md)
- [Examples](./examples.md)
- [Troubleshooting](./troubleshooting.md)

## Acknowledgements

LCGUdonSharp builds on [UdonSharp](https://github.com/MerlinSan/UdonSharp), originally created by Merlin, and on the VRChat Worlds SDK. The compiler retains UdonSharp's original namespaces and assembly names so existing projects continue to work unchanged.

## License

MIT © 2026 LogicCuteGuy — see [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) for release history.
