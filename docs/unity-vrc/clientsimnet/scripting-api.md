---
sidebar_position: 3
---

# Scripting and unity-mcp

You can drive the simulator from code in Play mode, for example from a test script or unity-mcp's `execute_code`.

## `NetSimApi`

Players are addressed by display name. Objects are addressed by name, name prefix or hierarchy path. `"Name@Player"` picks the copy owned by that player. Incorrect use throws an exception that says what is wrong.

```csharp
using ClientSimNet;
using UnityEngine;

if (!NetSimApi.IsReady) return "not ready";
NetSimApi.Preset("Perfect");                  // Perfect | LAN | Normal | Bad
NetSimApi.AddPlayer("Bob");

NetSimApi.Interact("Counter");                // you click it
NetSimApi.TakeOwnership("Bob", "Counter");    // may be denied by OnOwnershipRequest
NetSimApi.Flush();                            // let ownership settle
NetSimApi.SendState("Bob", "Counter", "{\"_count\":5}"); // keys are field names
NetSimApi.SendEvent("Bob", "Events", "All", "Ping", "[1,\"hi\"]");
NetSimApi.InteractAs("Bob", "Counter");       // Bob clicks; results arrive with latency
NetSimApi.Grab("Bob", "Pickup"); NetSimApi.Drop("Bob");
NetSimApi.View("Bob");                        // Game view shows Bob's world

NetSimApi.Flush();                            // deliver everything in flight now
return NetSimApi.ReportJson();
```

Read the `players` list in the report to find your local player's name.

### Methods

| Group | Methods |
|---|---|
| State | `IsReady`, `InFlight`, `Flush()` |
| Players | `AddPlayer(name)` (an existing name returns that player), `Puppet(name)`, `Leave(name)`, `Rejoin(name)`, `MasterLeaves()` |
| View and movement | `View(name, thirdPerson)`, `GoTo(name, position)`, `SetMode(name, mode)` with `Idle`, `FollowYou`, `Wander` or `GoTo` |
| Actions of a remote player | `TakeOwnership(player, obj)`, `Grab(player, obj)`, `Drop(player)`, `Use(player)`, `Jump(player)`, `InteractAs(player, obj)` |
| Traffic | `SendState(player, obj, json)` (returns bool), `SendEvent(player, obj, target, eventName, argsJson)` |
| Your actions | `Interact(obj)` |
| Network | `Preset(name)`, `SetNetwork(latencyMs, jitterMs, lossPercent)` |
| Lookup | `Find(spec)`, `Udon(obj)` |
| Reports | `GetReport(logEntries)`, `ReportJson(logEntries, pretty)`, `WriteReport(path, logEntries)`, `SaveStats(path)`, `StatsSummary()` |

`MasterLeaves()` is for a remote master. Untick ClientSim's **Local Player Is Master** before Play.

`WriteReport` writes `Library/ClientSimNet/report.json` by default.

### Network presets

| Preset | Latency | Jitter | Loss |
|---|---|---|---|
| Perfect | 0 ms | 0 ms | 0% |
| LAN | 10 ms | 3 ms | 0% |
| Normal | 100 ms | 30 ms | 0.5% |
| Bad | 300 ms | 120 ms | 5% |

`Flush()` ignores latency, so checks give the same result on every run. To test real timing, such as pacing, races or interpolation, keep a preset and wait a few frames instead.

## Report fields

| Field | Meaning |
|---|---|
| `ready`, `hooksInstalled` | The simulator is running. If false, nothing else is meaningful. |
| `pov` | Whose view is shown |
| `latencyMs`, `jitterMs`, `lossPercent`, `inFlight`, `outBytesPerSec`, `bandwidthLimit` | Network state. With `inFlight > 0`, results haven't settled. |
| `warnings`, `errors` | Counts in the simulator log. **Any error is a bug or a limit you hit.** |
| `players[]` | `id`, `name`, `isLocal`, `isMaster`, `mode`, `holding`, `position` |
| `objects[]` | Active synced behaviours: `path`, `behaviour`, `sync`, `owner`, `local`, `remote`, `inSync`, `bytes`, `limit`, `sentPerSec`, `lastSentAgo`, `lastReceivedAgo` (-1 = never) |
| `log[]` | Recent lines with `player`, `kind` (`out`, `in`, `lost`, `udon`, `sim`) and text |

A typical check is to call `Flush()`, read the report, then check that `errors == 0`, every object you touched is `inSync`, the `owner` is the expected one, and the log has the expected events.

## unity-mcp tool

With `com.coplaydev.unity-mcp` installed, the package registers the tool `clientsim_net`. It returns the report JSON unless `report=false`. Errors return `success=false` with the reason. Every action except `status` needs Play mode.

```text
clientsim_net action=preset name=Perfect
clientsim_net action=add_player player=Bob
clientsim_net action=take_ownership player=Bob obj=Counter
clientsim_net action=send_state player=Bob obj=Counter json={"_count":5} flush=true
```

**Actions:** `status`, `report`, `write_report`, `add_player`, `leave`, `rejoin`, `master_leaves`, `take_ownership`, `send_state`, `send_event`, `grab`, `drop`, `use`, `jump`, `interact`, `goto`, `mode`, `preset`, `network`, `flush`, `view`, `debugger`, `save_stats`.

For AI agents, the package includes `AGENTS.md` and a Claude skill in `Tools~/claude-skill/clientsim-net`.

## Python scripts

`Tools~/mcp/` has Python scripts that need only the standard library. They talk to the unity-mcp bridge on `127.0.0.1:6400` (change the port with `UNITY_MCP_PORT`), and include ready-made scenarios for the `NetSimTest.unity` sample. See the folder's README.

## Saved statistics

`SaveStats(path)` writes the debugger timeline to `Library/ClientSimNet/netstats-<time>.json`. The file can be large: 30 s with 3 players is about 400 KB. For totals, use `StatsSummary()`, or the summary that the `save_stats` action returns.
