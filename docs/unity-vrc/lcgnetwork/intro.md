---
sidebar_position: 1
---

# LCG Network System

> Documentation version: **0.1.0** · [Release](https://github.com/LogicCuteGuy/LCGNetwork/releases/tag/0.1.0)

**LCG Network System** (`com.logiccuteguy.lcgnetwork`) adds zone-scoped, event-driven networking to VRChat worlds. Put networked objects under an `LCGNetworkZone`, and their synced variables and network events reach only the players inside that zone.

You keep writing normal Udon networking. At build time, and when entering Play Mode, the package rewrites each compiled Udon program so that `RequestSerialization`, `SendCustomNetworkEvent` and `NetworkCalling.CallingPlayer` go through LCG. This works on the compiled program, so **UdonSharp, Udon Graph and Udon Assembly** all behave the same, and no special compiler is needed.

## Features

- **Zones**: a trigger volume limits packets, ownership and object sync to the players inside it.
- **Normal code**: existing `[UdonSynced]` + `RequestSerialization` and `SendCustomNetworkEvent` code is routed automatically. Objects outside every zone use the whole instance as their zone.
- **Every coding style**: the VRChat SDK's UdonSharp, Udon Graph and Udon Assembly, plus [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro), which builds on the SDK's UdonSharp.
- **UdonSharp extras**: `[LCGPacket]` fields and methods with an authority (`Any`, `ObjectOwner`, `Master`), receive callbacks, and `LCGRuntime.SendToPlayer` for sending to one player.
- **Zone object sync**: `LCGManualObjectSync` replaces `VRC Object Sync` inside zones, and an ownership guard refuses requests from outsiders.
- **Late join and re-entry**: owners send a snapshot to players who join or enter a zone.
- **Non-destructive**: generated components and rewritten programs exist only in the build or Play Mode copy. Your scene and program assets are not modified.

## Requirements

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.8.1 or newer (`com.vrchat.worlds`)

## License

MIT.

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) to VCC/ALCOM, or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if it is already added.
2. Open **Manage Project** for your Unity project.
3. Find **LCG Network System** (`com.logiccuteguy.lcgnetwork`) and add **0.1.0**.

### Unity Package Manager / manual

In **Window > Package Manager > + > Add package from git URL**, enter:

```text
https://github.com/LogicCuteGuy/LCGNetwork.git#0.1.0
```

Choose **one installation method per project**. Do not use GitHub's automatic **Source code (zip)** archive. LCGUdonSharp 0.5.0 and later no longer contain networking, so they can be installed alongside it.

## Quick start

1. Create a GameObject with a **Collider** set to **Is Trigger**, and add the **LCGNetworkZone** component.
2. Move your networked objects under it.
3. Enter Play Mode or build.

```csharp
using UdonSharp;
using VRC.SDKBase;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class ZoneCounter : UdonSharpBehaviour
{
    [UdonSynced] private int count;

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        count++;
        RequestSerialization();      // sent only to players in this zone
    }

    public override void OnDeserialization() { /* update visuals */ }
}
```

The same code written as an Udon Graph or Udon Assembly program behaves the same way.

Next: [Using LCG Network](./usage.md).

## Status

This is a preview. It is verified in Play Mode with [ClientSim Net](../clientsimnet/intro.md) and two simulated players, but **not yet in a real multi-client VRChat build**. Test with **Build & Test** using two clients before publishing a world. The wire protocol may change between versions.
