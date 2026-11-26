---
sidebar_position: 3
---

# Scripting และ unity-mcp

ควบคุมตัวจำลองจากโค้ดใน Play mode ได้ เช่น จาก test script หรือ `execute_code` ของ unity-mcp

## `NetSimApi`

อ้างถึงผู้เล่นด้วยชื่อที่แสดง และอ้างถึง object ด้วยชื่อ, คำขึ้นต้นของชื่อ หรือ path ใน hierarchy รูปแบบ `"Name@Player"` เลือกสำเนาที่ผู้เล่นคนนั้นเป็น owner ถ้าใช้ผิด ระบบจะ throw exception ที่บอกว่าผิดตรงไหน

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

อ่านรายการ `players` ในรายงานเพื่อหาชื่อผู้เล่นฝั่งคุณ

### เมธอด

| กลุ่ม | เมธอด |
|---|---|
| สถานะ | `IsReady`, `InFlight`, `Flush()` |
| ผู้เล่น | `AddPlayer(name)` (ถ้ามีชื่อนี้แล้วจะคืนผู้เล่นคนเดิม), `Puppet(name)`, `Leave(name)`, `Rejoin(name)`, `MasterLeaves()` |
| มุมมองและการเคลื่อนที่ | `View(name, thirdPerson)`, `GoTo(name, position)`, `SetMode(name, mode)` โดยใช้ `Idle`, `FollowYou`, `Wander` หรือ `GoTo` |
| การกระทำของผู้เล่น remote | `TakeOwnership(player, obj)`, `Grab(player, obj)`, `Drop(player)`, `Use(player)`, `Jump(player)`, `InteractAs(player, obj)` |
| Traffic | `SendState(player, obj, json)` (คืนค่า bool), `SendEvent(player, obj, target, eventName, argsJson)` |
| การกระทำของคุณ | `Interact(obj)` |
| Network | `Preset(name)`, `SetNetwork(latencyMs, jitterMs, lossPercent)` |
| ค้นหา | `Find(spec)`, `Udon(obj)` |
| รายงาน | `GetReport(logEntries)`, `ReportJson(logEntries, pretty)`, `WriteReport(path, logEntries)`, `SaveStats(path)`, `StatsSummary()` |

`MasterLeaves()` ใช้กับกรณีที่ master เป็น remote ให้ยกเลิกเครื่องหมาย **Local Player Is Master** ของ ClientSim ก่อนกด Play

`WriteReport` เขียนไฟล์ `Library/ClientSimNet/report.json` เป็นค่าเริ่มต้น

### Network preset

| Preset | Latency | Jitter | Loss |
|---|---|---|---|
| Perfect | 0 ms | 0 ms | 0% |
| LAN | 10 ms | 3 ms | 0% |
| Normal | 100 ms | 30 ms | 0.5% |
| Bad | 300 ms | 120 ms | 5% |

`Flush()` ไม่สนใจ latency การตรวจจึงได้ผลเหมือนกันทุกครั้ง ถ้าต้องการทดสอบจังหวะเวลาจริง เช่น pacing, race หรือ interpolation ให้คง preset ไว้แล้วรอสองสามเฟรมแทน

## ฟิลด์ในรายงาน

| ฟิลด์ | ความหมาย |
|---|---|
| `ready`, `hooksInstalled` | ตัวจำลองกำลังทำงาน ถ้าเป็น false ค่าอื่นไม่มีความหมาย |
| `pov` | กำลังแสดงมุมมองของใคร |
| `latencyMs`, `jitterMs`, `lossPercent`, `inFlight`, `outBytesPerSec`, `bandwidthLimit` | สถานะ network ถ้า `inFlight > 0` ผลลัพธ์ยังไม่นิ่ง |
| `warnings`, `errors` | จำนวนใน log ของตัวจำลอง **error ใด ๆ คือบั๊กหรือขีดจำกัดที่คุณชน** |
| `players[]` | `id`, `name`, `isLocal`, `isMaster`, `mode`, `holding`, `position` |
| `objects[]` | behaviour ที่ sync และ active อยู่: `path`, `behaviour`, `sync`, `owner`, `local`, `remote`, `inSync`, `bytes`, `limit`, `sentPerSec`, `lastSentAgo`, `lastReceivedAgo` (-1 = ไม่เคย) |
| `log[]` | บรรทัดล่าสุด มี `player`, `kind` (`out`, `in`, `lost`, `udon`, `sim`) และข้อความ |

การตรวจทั่วไปคือเรียก `Flush()`, อ่านรายงาน แล้วตรวจว่า `errors == 0`, object ที่คุณแตะทุกตัว `inSync`, `owner` เป็นคนที่คาดไว้ และ log มี event ที่คาดไว้

## unity-mcp tool

เมื่อติดตั้ง `com.coplaydev.unity-mcp` ไว้ แพ็กเกจจะลงทะเบียน tool ชื่อ `clientsim_net` ซึ่งคืนรายงานเป็น JSON เว้นแต่จะใส่ `report=false` ถ้าผิดพลาดจะคืน `success=false` พร้อมเหตุผล ทุก action ยกเว้น `status` ต้องอยู่ใน Play mode

```text
clientsim_net action=preset name=Perfect
clientsim_net action=add_player player=Bob
clientsim_net action=take_ownership player=Bob obj=Counter
clientsim_net action=send_state player=Bob obj=Counter json={"_count":5} flush=true
```

**Action:** `status`, `report`, `write_report`, `add_player`, `leave`, `rejoin`, `master_leaves`, `take_ownership`, `send_state`, `send_event`, `grab`, `drop`, `use`, `jump`, `interact`, `goto`, `mode`, `preset`, `network`, `flush`, `view`, `debugger`, `save_stats`

สำหรับ AI agent แพ็กเกจมี `AGENTS.md` และ Claude skill ใน `Tools~/claude-skill/clientsim-net`

## สคริปต์ Python

`Tools~/mcp/` มีสคริปต์ Python ที่ใช้แค่ standard library สคริปต์ติดต่อ bridge ของ unity-mcp ที่ `127.0.0.1:6400` (เปลี่ยน port ด้วย `UNITY_MCP_PORT`) และมีสถานการณ์สำเร็จรูปสำหรับ sample `NetSimTest.unity` ดู README ในโฟลเดอร์นั้น

## สถิติที่บันทึกไว้

`SaveStats(path)` เขียน timeline ของ debugger ลง `Library/ClientSimNet/netstats-<time>.json` ไฟล์อาจใหญ่ เช่น 30 วินาทีกับผู้เล่น 3 คนมีขนาดประมาณ 400 KB ถ้าต้องการยอดรวม ให้ใช้ `StatsSummary()` หรือสรุปที่ action `save_stats` คืนมา
