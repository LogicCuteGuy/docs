---
sidebar_position: 4
---

# Test scenarios

Networked code isn't done until it passes every scenario that applies to it, in Play mode with **at least two remote players**.

## Before you start

1. Check that Unity and UdonSharp compiled without console errors.
2. Enter Play mode in your world, or in `NetSimTest.unity` from the **Test World** sample.
3. Add two remote players.
4. Use **Normal** for realistic timing, or **Perfect** when a check must give the same result every time.

"You" means the local player. "Bob" is a remote player. The method names are from [`NetSimApi`](./scripting-api.md).

## Sync and events

| # | Scenario | How | Pass when |
|---|---|---|---|
| 1 | You write a synced value | `Interact(obj)` | The log shows the send, and remote state equals local state |
| 2 | Non-owner write | Bob takes ownership, then you write without `SetOwner` | A "not the owner" warning appears. Fix: take ownership first. |
| 3 | Remote write reaches you | `TakeOwnership`, then `SendState` | `OnDeserialization` runs and the **visuals** update, not only the field |
| 4 | Late join | Untick **Local Player Is Master**, then Play | State is correct after the snapshot. Nothing relies on `Start` seeing synced values. |
| 5 | `Owner` and `Others` events | Bob owns it, you send both | Neither runs on your client. `All` does. |
| 6 | Remote event and `CallingPlayer` | `SendEvent` as Bob | The handler runs, and authorization checks behave |
| 7 | Event spam | Send more than 5 events in one frame | The code tolerates delayed delivery |
| 8 | Size limit | Fill strings and arrays to realistic maximums | No `OnPostSerialization success=false`. Continuous sync stays under 200 B. |

## Ownership and leaving

| # | Scenario | How | Pass when |
|---|---|---|---|
| 9 | Ownership race | You and Bob both take ownership and write within the latency | The final state is consistent, with nothing stuck or duplicated |
| 10 | Denied ownership | `OnOwnershipRequest` returns false. Test both directions. | The requester doesn't keep ownership, and your code doesn't assume `SetOwner` succeeds |
| 11 | Master leaves | `MasterLeaves()` with a remote master | Objects migrate, and master-only logic continues on the new master |
| 12 | Owner leaves | Bob owns it, then `Leave("Bob")` | Ownership falls back, and nothing waits for Bob |

## Pickups and bad networks

| # | Scenario | How | Pass when |
|---|---|---|---|
| 13 | Pickup theft | Bob uses `Grab` while you hold it | Theft or `DisallowTheft` behaves as designed |
| 14 | Bad network | `Preset("Bad")` | Continuous visuals tolerate loss, and manual state still converges |

## PlayerObjects

| # | Scenario | How | Pass when |
|---|---|---|---|
| 15 | A copy for each player | Add players | Each player has a `<name> [id]` copy in every world. Others change it only through `Owner` events. |
| 16 | Request to the owner | `SendEvent` an `Owner` event from Bob to your copy | Your handler checks `CallingPlayer`, then writes. A call from yourself is rejected. |
| 17 | A player with a PlayerObject leaves | `Leave("Bob")` | Bob's copy is destroyed, and totals such as a leaderboard refresh without a dead reference |

## Unsynced pickups

| # | Scenario | How | Pass when |
|---|---|---|---|
| 18 | Pickup without `VRCObjectSync` | Grab it yourself, and also use `Grab` as Bob | It moves only on the holder's client. Compare it with an ObjectSync pickup. |

## Working with PlayerObjects

Use a `VRCPlayerObject` when data belongs to one player, such as a score or settings.

- Find a player's copy with `Networking.FindComponentInPlayerObjects(player, templateComponent)`.
- Never call `SetOwner` on a PlayerObject. Its player owns it permanently.
- To change another player's data, send their copy an `Owner` event.

The `NetSimTestPlayerCard` and `NetSimTestLeaderboard` samples show this pattern.

## Reporting results

When you say that networked code works, list the scenario numbers you ran and the preset, with the relevant `[ClientSimNet]` log lines. List the others as **untested**.

The simulator isn't VRChat. Check its [known limits](./usage.md#known-limits), and test in real clients before publishing.
