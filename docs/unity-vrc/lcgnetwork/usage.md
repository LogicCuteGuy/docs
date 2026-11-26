---
sidebar_position: 2
---

# Using LCG Network

## How routing works

When a scene is built, or loaded for Play Mode, every `UdonBehaviour` is checked. If its program uses networking, it gets a rewritten copy of that program for this build:

| You write | With LCG |
|---|---|
| `[UdonSynced]` + `RequestSerialization()` (Manual sync) | The owner sends each synced variable in an LCG packet. Receivers get one `OnDeserialization`. `OnPreSerialization` and `OnPostSerialization` still run. `byteCount` is always 0. |
| `SendCustomNetworkEvent(target, "Event", args...)` | Sent as an LCG packet to zone members. `All`, `Others`, `Owner` and `Self` keep their meaning. |
| `NetworkCalling.CallingPlayer` | The verified sender of the packet being handled. |

A behaviour's zone is its nearest parent `LCGNetworkZone`. Behaviours outside every zone use zone 0, which is the whole instance.

The same rules as native networking apply:

- Synced variables accept values only from the object owner.
- Events need a behaviour whose sync mode is not `None`.
- Events whose name starts with `_` stay local unless the method is `[NetworkCallable]`.

## What stays native

- **Continuous sync.** Inside a zone this fails the build unless the zone's **Allow Native Sync Passthrough** is ticked. Those variables then reach the whole instance, not just the zone.
- **Types LCG cannot carry**, such as `VRCUrl`. The behaviour keeps native sync and the console shows a warning naming the variable. LCG carries `bool`, `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `char`, `string`, `Vector2`, `Vector3`, `Vector4`, `Quaternion`, `Color`, `Color32`, and arrays of these.
- **Opted-out objects.** Add **Add Component > LCG Network > LCG Network Settings** and tick **Use Native Networking**. The component is editor-only and stripped from builds. Its Inspector shows the zone and, for each UdonBehaviour, the variables and events LCG routes.

## Zones

| Field | Meaning |
|---|---|
| **Exit Mode** | What a player sees after leaving: `Freeze` keeps the last state, `RestoreDefaults` resets synced variables and object positions, `DisableChildren` deactivates the zone's children. |
| **Allow Native Sync Passthrough** | Accept continuous or unsupported native sync inside the zone instead of failing the build. |

Inside a zone, the build also:

- adds `LCGZoneOwnershipGuard` to networked objects, so players outside the zone cannot take ownership;
- replaces `VRC Object Sync` with `LCGManualObjectSync`, which syncs on demand and while the object is held. Call `LCGNetwork.RequestObjectSync(gameObject)` after moving an object from code.

`LCGRuntime` (the router) and `LCGRuntimePlayer` (each player's mailbox, a PlayerObject) are generated automatically. Do not add them yourself.

## Udon Graph and Udon Assembly

Use the normal networking nodes or instructions. Set the behaviour's sync mode to **Manual** to sync variables. A complete Udon Assembly example is in the **LCG Network Examples** sample: `UdonAssembly/LCGAsmLamp.uasm`.

## UdonSharp extras

These work with the VRChat SDK's UdonSharp:

```csharp
using UdonSharp;
using UnityEngine;
using VRC.SDK3.UdonNetworkCalling;
using VRC.SDKBase;
using VRC.Udon;

[UdonBehaviourSyncMode(BehaviourSyncMode.NoVariableSync)]
public class Lamp : UdonSharpBehaviour
{
    public LCGRuntime lcg;                                    // filled at build; leave empty
    [HideInInspector] public VRCPlayerApi __lcgPacketSender;  // sender while a handler runs

    [LCGPacket(Authority = LCGPacketAuthority.ObjectOwner, Callback = nameof(OnLightChanged))]
    private bool lightOn;

    private void Toggle()
    {
        lightOn = !lightOn;
        RequestSerialization();      // sends every [LCGPacket] field of this behaviour
    }

    public void OnLightChanged() { /* runs on receivers */ }

    [LCGPacket(Authority = LCGPacketAuthority.Any), NetworkCallable]
    public void ReceivePing(string message) { }

    public void PingOwner()
    {
        VRCPlayerApi owner = Networking.GetOwner(gameObject);
        lcg.SendToPlayer((UdonBehaviour)(Component)this, owner, nameof(ReceivePing), new object[] { "hi" });
    }
}
```

- **Authority**: `Any` accepts any zone member, `ObjectOwner` only the object's owner, `Master` only the instance master.
- **Methods with parameters** also need `[NetworkCallable]`, which supplies the parameter names. A missing attribute is a build error.
- **`__lcgPacketSender`** is optional. Declare it to read the sender inside a handler; `NetworkCalling.CallingPlayer` works too.

[LCGUdonSharp](/unity-vrc/lcgudonsharp/intro) builds on the SDK's UdonSharp, so all of this works the same there.

## Runtime ABI (explicit sends)

For sends that the hook does not cover, any coding style can call the runtime directly. Receivers expose `__lcgRuntime` (UdonBehaviour), `__lcgReceiverId` (int), `__lcgZoneId` (int) and `__lcgPacketSender` (VRCPlayerApi), and the build fills them.

To send, set these variables on `__lcgRuntime`: `__lcgSenderReceiver`, `__lcgSenderReceiverId`, `__lcgSenderZoneId` and `__lcgSenderAddress`. Then either:

- **a field**: `__lcgSenderType` and `__lcgSenderValue`, then the event `__lcgSendField`;
- **a method**: `__lcgSenderArgCount`, `__lcgSenderArgTypeN`/`__lcgSenderArgN`, and `__lcgSenderTargetMode` (a `NetworkEventTarget`, or -1 with `__lcgSenderPlayer`), then the event `__lcgSendMethod`.

The ABI is experimental and may change.

## Limits

- One frame carries at most 12 KB. Up to 16 queued packets are sent per frame, and changes to the same variable within a frame are merged.
- Mailbox delivery is limited to 100 events per second per player, as with any `[NetworkCallable]` event.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Build error: continuous sync inside a zone | Switch the behaviour to Manual sync, or tick the zone's **Allow Native Sync Passthrough**. |
| Warning: "keeps native variable sync" | A synced variable has a type LCG cannot carry. That behaviour stays native. |
| Build error asking for `[NetworkCallable]` | An `[LCGPacket]` method or receive callback with parameters needs `[NetworkCallable]` under the SDK's UdonSharp. |
| A player outside the zone cannot take an object | Expected: `LCGZoneOwnershipGuard` refuses requests from outside the zone. |
| `OnPostSerialization` reports 0 bytes | Expected: frames are batched later, so the size is unknown at that point. |

To test with several players in one editor, use [ClientSim Net](../clientsimnet/intro.md).
