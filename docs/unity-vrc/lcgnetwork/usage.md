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

Put networked objects under an `LCGNetworkZone` to limit them to the players inside it. See [Zones](./zones.md) for exit modes, what the build adds, object sync and build errors.

## UdonSharp, Udon Graph and Udon Assembly

Use the normal networking code, nodes or instructions. Set the behaviour's sync mode to **Manual** to sync variables. See [UdonSharp extras and runtime ABI](./udonsharp-and-runtime.md) for `[LCGPacket]`, sending to one player and explicit sends.

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
