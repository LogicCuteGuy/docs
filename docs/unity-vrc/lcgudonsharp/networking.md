---
sidebar_position: 7
---

# Manual Packet Networking

:::caution Experimental
`[LCGPacket]` / `LCGNetworkZone` networking is experimental — its wire protocol may change between versions (currently protocol v2).
:::

`[LCGPacket]` does **not** use native Udon variable sync. It adds versioned frames, authority checks, replay protection, field coalescing, verified-sender callbacks, and targeted PlayerObject delivery.

## Packet fields

Coalesced field with callback:

```csharp
[LCGPacket(
    Authority = LCGPacketAuthority.ObjectOwner,
    Callback = nameof(OnScoreChanged))]
[SerializeField] private int score;

public void OnScoreChanged(VRCPlayerApi sender) { /* verified sender */ }

// Repeated assignments in one frame send only the latest value:
score++; score++; score++;        // → one packet with final value
ForceSendPacket(nameof(score));   // → bypass suppression, always send
```

- Assigning a packet field queues a send — repeated assignments in one frame are coalesced to the latest value; unchanged values are skipped.
- `ForceSendPacket(nameof(field))` bypasses suppression.
- Packet field writes require object ownership — call `Networking.SetOwner(Networking.LocalPlayer, gameObject)` first.

## Packet methods

Broadcast vs. targeted delivery:

```csharp
// Broadcast to everyone else (lowered to mailbox delivery because of [LCGPacket])
SendCustomNetworkEvent(NetworkEventTarget.Others,
    nameof(ReceiveAnnouncement), "Broadcast #1", transform.position);

// Targeted delivery to one player
SendLCGNetworkEvent(target, nameof(ReceiveAnnouncement),
    "Targeted #1", transform.position);

// Direct call is always local — no packet created
ReceiveAnnouncement("Local-only #1", transform.position);

[LCGPacket(Authority = LCGPacketAuthority.Any)]
public void ReceiveAnnouncement(string message, Vector3 origin) { }
```

Public `void` methods support up to eight supported arguments.

## Delivery internals

- Packet methods are delivered through a PlayerObject mailbox; `SendCustomNetworkEvent(...)` is lowered to packet delivery only when the target method has `[LCGPacket]`.
- Frames are versioned and validated with authority checks and replay protection.
- Owners provide snapshots when players are restored; departing-player state is discarded.

## Network zones

Add `LCGNetworkZone` to a trigger collider to restrict descendant packet recipients and ownership to players inside the trigger. Inside zones, `VRC_ObjectSync` is replaced with a manual relay; script transforms sync on demand via `LCGNetwork.RequestObjectSync(gameObject)` (pickups sync automatically while held).

Zone rules:

- Zone colliders in **separate hierarchies** may overlap — each scene object belongs to its nearest ancestor zone.
- Zone colliders in the **same parent/child hierarchy** may not overlap; that configuration fails the build before helpers are generated.

Zones fail closed on Continuous bodies, Udon Graph behaviours, overlapping parent/child zones, `[UdonSynced]` under a zone, and PlayerObject templates sharing a hierarchy.

## Diagnostics

LCG network logging is off by default. Enable **Edit > Project Settings > Udon Sharp > Debugging > LCG network diagnostics** before compiling to include pickup and packet-delivery output, then recompile UdonSharp programs.

## Upgrades

The packet protocol is versioned (v2). After upgrading LCGUdonSharp, recompile all UdonSharp programs and rebuild the world.

## See also

- [Examples](./examples.md) — `Example/Networking` covers packet fields, methods, and zones
- [Troubleshooting](./troubleshooting.md)
