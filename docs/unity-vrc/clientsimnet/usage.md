---
sidebar_position: 2
---

# Using ClientSim Net

Networked code is not done until it passes the scenarios below in Play mode with **at least two remote players**.

## Mental model

- One Unity editor, **one world copy per player**. Each remote puppet gets a hidden scene `NetSim World <name> [id]`, loaded when they join. Their copy changes **only** through the network (synced variables, network events, ObjectSync, ownership). Anything not synced stays different, as in VRChat.
- Everything crossing the wire goes encode, bytes, delayed queue, decode.
- `RequestSerialization` from a non-owner is dropped with a warning.
- Events: `All` runs locally and sends; `Others` never runs locally; `Owner` runs locally only if you own the object; `Self` is local only.
- Late join: untick ClientSim's **Local Player Is Master** before Play. The remote master then sends every synced behaviour's state shortly after the network settles.

## Scripting API (`NetSimApi`)

Call from Play mode, for example from a test script or unity-mcp `execute_code`. Players are addressed by display name, objects by name, name prefix or hierarchy path (`"Name@Player"` picks the copy owned by that player).

```csharp
using ClientSimNet;
using UnityEngine;

if (!NetSimApi.IsReady) return "not ready";
NetSimApi.Preset("Perfect");                  // Perfect | LAN | Normal | Bad
NetSimApi.AddPlayer("Bob");

NetSimApi.Interact("Counter");                // you click it
NetSimApi.TakeOwnership("Bob", "Counter");    // may be denied by OnOwnershipRequest
NetSimApi.SendState("Bob", "Counter", "{\"_count\":5}");
NetSimApi.SendEvent("Bob", "Events", "All", "Ping", "[1,\"hi\"]");
NetSimApi.InteractAs("Bob", "Counter");       // Bob clicks; results arrive with latency
NetSimApi.Grab("Bob", "Pickup"); NetSimApi.Drop("Bob");
NetSimApi.Leave("Bob"); NetSimApi.MasterLeaves();
NetSimApi.View("Bob");                        // Game view shows Bob's world

NetSimApi.Flush();                            // deliver everything in flight now
return NetSimApi.ReportJson();
```

`Flush()` ignores latency, so checks give the same result on every run. To test real timing (pacing, races, interpolation), keep a preset and wait a few frames instead.

### Report fields

| Field | Meaning |
|---|---|
| `ready`, `hooksInstalled` | Simulator running; if false, nothing else is meaningful |
| `latencyMs`, `jitterMs`, `lossPercent`, `inFlight`, `outBytesPerSec` | Network state; `inFlight > 0` means results have not settled |
| `warnings`, `errors` | Counts in the simulator log; **any error is a bug or a hit limit** |
| `players[]` | `id, name, isLocal, isMaster, mode, holding, position` |
| `objects[]` | Every active synced behaviour: `path, owner, local, remote, inSync, bytes, limit, sentPerSec` |
| `log[]` | Recent console lines with `player`, `kind` (`out`, `in`, `lost`, `udon`, `sim`) and text |

A typical check: `Flush()`, read the report, then assert `errors == 0`, every object you touched is `inSync`, the `owner` is who you expect, and the log has the events you expect.

## unity-mcp tool

With `com.coplaydev.unity-mcp` installed, the package registers the tool `clientsim_net` with the same actions (`preset`, `add_player`, `take_ownership`, `send_state`, `send_event`, `interact`, `view`, `debugger`, `save_stats`, `report`, `leave`, `master_leaves`, `network`, `flush`, and more). It returns the report JSON unless `report=false`.

```text
clientsim_net action=preset name=Perfect
clientsim_net action=add_player player=Bob
clientsim_net action=send_state player=Bob obj=Counter json={"_count":5} flush=true
```

For AI agents, the package ships `AGENTS.md` and a Claude skill (`Tools~/claude-skill/clientsim-net`) with the complete workflow.

## Net Debugger

[![The Net Debugger timeline and message list](/img/clientsimnet/debugger.png)](/img/clientsimnet/debugger.png)

The **Net Debugger** shows a 30 s timeline of bytes on the wire per 0.1 s, stacked by kind (Sync, Event, Owner, Pose). Click or drag to select a sample; the tabs below list its messages (sender, receiver, size, latency, payload), per-player totals and per-object state. Red marks a limit hit, a lost message or an object out of sync; **CLOGGED** means your outbound traffic is over ~11 KB/s. **Save** writes `Library/ClientSimNet/netstats-<time>.json`, which **Load…** reopens later, even outside Play mode.

## Scenario checklist

| # | Scenario | Pass when |
|---|---|---|
| 1 | You write a synced value | Log shows the send; remote state equals local state |
| 2 | Non-owner write | Warning "not the owner"; fix by taking ownership first |
| 3 | Remote write reaches you | `OnDeserialization` runs and **visuals update**, not only the field |
| 4 | Late join | State is correct after the snapshot; code does not rely on `Start` seeing synced values |
| 5 | `Owner` / `Others` events | Neither runs locally unless you own it; `All` does |
| 6 | Remote event + `CallingPlayer` | Handler runs; authorization checks behave |
| 7 | Event spam (>5 in one frame) | Code tolerates delayed delivery |
| 8 | Size limit | No `OnPostSerialization success=false`; continuous stays under 200 B |
| 9 | Ownership race | Final state is consistent |
| 10 | Denied ownership | Requester does not keep ownership; code does not assume `SetOwner` sticks |
| 11 | Master leaves | Objects migrate; master-only logic resumes on the new master |
| 12 | Owner leaves | Ownership falls back; nothing waits for the departed player |
| 13 | Pickup theft | Theft or `DisallowTheft` behaves as designed |
| 14 | Preset **Bad** (300 ms, 5% loss) | Continuous visuals tolerate loss; manual state converges |
| 15 | PlayerObjects | Each player has an `<name> [id]` copy, present in every player's world; others request changes through `Owner` events, never write |
| 16 | Unsynced pickup | Moves only on the holder's client; compare with an ObjectSync pickup |

When you claim networked code works, say which scenarios you ran and at which preset. List untested scenarios as untested.

## Known limits

- Sync sizes are an estimate per type, not real wire bytes.
- Player APIs other than `TeleportTo` (Immobilize, SetWalkSpeed, …) on a puppet do nothing.
- Remote Udon `Physics.Raycast` queries your scene; the puppet's body is not in its own world.
- `VRCInstantiate` spawns land in your scene. (PlayerObjects get their own copy in every world since 0.1.2.)
- No `VRCObjectPool` spawning by puppets: take ownership of the pool object instead.
- SDK internals are reached by reflection. After an SDK update, run **Test Runner > EditMode > ClientSimNet.Tests** first.
