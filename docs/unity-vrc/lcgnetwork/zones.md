---
sidebar_position: 3
---

# Zones

An `LCGNetworkZone` is a trigger volume. Networked objects under it exchange packets only with the players inside. A behaviour belongs to its **nearest parent** zone. Behaviours outside every zone use zone 0, which is the whole instance.

A player joins or leaves a zone through its trigger. Leaving the instance also removes them.

## Settings

| Field | Meaning |
|---|---|
| **Exit Mode** | What a player sees after leaving |
| **Allow Native Sync Passthrough** | Accepts continuous or unsupported native sync inside the zone instead of failing the build |

| Exit Mode | For the player who left |
|---|---|
| `Freeze` | Keeps the last state |
| `RestoreDefaults` | Resets synced variables and object positions |
| `DisableChildren` | Deactivates the zone's children |

:::warning
With passthrough on, those native variables reach the **whole instance**, not only the zone.
:::

## What the build adds

- `LCGZoneOwnershipGuard` on networked objects. The new owner must be inside the zone, and the request must come from a member or the current owner.
- `LCGManualObjectSync` in place of `VRC Object Sync`.
- `LCGRuntime` (the router) and `LCGRuntimePlayer` (each player's mailbox, a PlayerObject). Don't add them yourself.

All of these exist only in the Play mode or build copy.

## Moving objects

`LCGManualObjectSync` syncs on demand and while the object is held. If your code moves an object, request a sync:

```csharp
transform.position = spawn.position;
LCGNetwork.RequestObjectSync(gameObject);
```

The component also has `RequestObjectSync()`, `TeleportTo(position, rotation)` and `RequestSnapshot()`.

## Ownership and late entry

- When an owner leaves the zone, their client passes ownership to the player who has been in the zone longest. A tie goes to the lowest player ID. Ownership repair retries up to 8 times, 0.25 s apart.
- A player who joins or enters receives a snapshot from the owners. The entering client retries up to 5 times, starting after 0.5 s and doubling the delay up to 4 s.

## Reading zone state

| Member | Meaning |
|---|---|
| `ZoneId` | The zone's ID |
| `Epoch` | The zone's current epoch number |
| `ExitMode` | The chosen exit mode |
| `OccupantCount`, `GetOccupant(i)` | Players inside |
| `Contains(player)` | Whether a player is inside |
| `CanTakeOwnership(player)` | Whether the guard allows that player to own an object |

## Build errors

| Cause | Fix |
|---|---|
| The zone has no **trigger** collider | Add a Collider with **Is Trigger** on. |
| A zone contains a PlayerObject, or is inside one | Move it out. |
| A parent zone and a child zone have overlapping collider bounds | Separate them. |
| A synced variable can't be routed, and passthrough is off | Use Manual sync with a supported type, or turn on passthrough. With passthrough on, this is only a warning. |

:::note
LCG Network 0.1.0 is a preview. Zone entry, exit and ownership transfer haven't been verified in a real multi-client VRChat build. Test with two clients before publishing.
:::
