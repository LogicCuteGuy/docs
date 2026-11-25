---
sidebar_position: 7
---

# Networking

> Documentation version: **0.5.0** · [Release notes](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 contains no networking code. `[LCGPacket]`, `LCGNetworkZone`, `SendLCGNetworkEvent`, `ForceSendPacket` and `LCGNetwork.RequestObjectSync` are no longer part of the compiler. For synced state and events, use VRChat's native `[UdonSynced]` variables and `[NetworkCallable]` methods, which work with this compiler.

Packet networking is being developed as a separate package that works with stock UdonSharp.
