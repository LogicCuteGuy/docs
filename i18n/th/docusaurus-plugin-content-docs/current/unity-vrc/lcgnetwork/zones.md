---
sidebar_position: 3
---

# โซน

`LCGNetworkZone` คือ trigger volume object ที่มี network ใต้โซนจะแลกเปลี่ยน packet กับผู้เล่นข้างในเท่านั้น behaviour เป็นของโซนใน **parent ที่ใกล้ที่สุด** behaviour ที่อยู่นอกทุกโซนใช้โซน 0 ซึ่งคือทั้ง instance

ผู้เล่นเข้าหรือออกจากโซนผ่าน trigger การออกจาก instance ก็ทำให้ถูกนำออกจากโซนด้วย

## การตั้งค่า

| ฟิลด์ | ความหมาย |
|---|---|
| **Exit Mode** | สิ่งที่ผู้เล่นเห็นหลังออกจากโซน |
| **Allow Native Sync Passthrough** | ยอมรับ continuous sync หรือ native sync ที่ไม่รองรับภายในโซน แทนที่จะทำให้ build ล้มเหลว |

| Exit Mode | สำหรับผู้เล่นที่ออกไป |
|---|---|
| `Freeze` | คง state ล่าสุดไว้ |
| `RestoreDefaults` | รีเซ็ตตัวแปร sync และตำแหน่ง object |
| `DisableChildren` | ปิด child ของโซน |

:::warning
ถ้าเปิด passthrough ตัวแปรแบบ native เหล่านั้นจะไปถึง**ทั้ง instance** ไม่ได้จำกัดแค่ในโซน
:::

## สิ่งที่ build เพิ่มให้

- `LCGZoneOwnershipGuard` บน object ที่มี network โดย owner คนใหม่ต้องอยู่ในโซน และคำขอต้องมาจากสมาชิกหรือ owner ปัจจุบัน
- `LCGManualObjectSync` แทน `VRC Object Sync`
- `LCGRuntime` (ตัว router) และ `LCGRuntimePlayer` (mailbox ของผู้เล่นแต่ละคน เป็น PlayerObject) ไม่ต้องเพิ่มเอง

ทั้งหมดนี้มีอยู่เฉพาะในสำเนาตอน Play mode หรือ build

## Object ที่เคลื่อนที่

`LCGManualObjectSync` sync เมื่อมีการสั่ง และระหว่างที่ object ถูกถือ ถ้าโค้ดของคุณย้าย object ให้ขอ sync:

```csharp
transform.position = spawn.position;
LCGNetwork.RequestObjectSync(gameObject);
```

component ยังมี `RequestObjectSync()`, `TeleportTo(position, rotation)` และ `RequestSnapshot()`

## Ownership และการเข้าทีหลัง

- เมื่อ owner ออกจากโซน client ของคนนั้นจะส่ง ownership ให้ผู้เล่นที่อยู่ในโซนนานที่สุด ถ้าเท่ากันจะเลือก player ID ที่ต่ำที่สุด การซ่อม ownership จะ retry สูงสุด 8 ครั้ง ห่างกันครั้งละ 0.25 วินาที
- ผู้เล่นที่ join หรือเข้าโซนจะได้รับ snapshot จาก owner โดย client ที่เข้ามาจะ retry สูงสุด 5 ครั้ง เริ่มหลัง 0.5 วินาที และเพิ่มระยะรอเป็นสองเท่าจนถึง 4 วินาที

## อ่านสถานะของโซน

| สมาชิก | ความหมาย |
|---|---|
| `ZoneId` | ID ของโซน |
| `Epoch` | หมายเลข epoch ปัจจุบันของโซน |
| `ExitMode` | exit mode ที่เลือก |
| `OccupantCount`, `GetOccupant(i)` | ผู้เล่นที่อยู่ข้างใน |
| `Contains(player)` | ผู้เล่นอยู่ข้างในหรือไม่ |
| `CanTakeOwnership(player)` | guard ยอมให้ผู้เล่นคนนั้นเป็น owner ของ object หรือไม่ |

## Build error

| สาเหตุ | วิธีแก้ |
|---|---|
| โซนไม่มี collider แบบ **trigger** | เพิ่ม Collider แล้วเปิด **Is Trigger** |
| โซนมี PlayerObject อยู่ข้างใน หรือโซนอยู่ใน PlayerObject | ย้ายออก |
| bounds ของ collider ในโซน parent และโซน child ซ้อนทับกัน | แยกออกจากกัน |
| มีตัวแปร sync ที่จัดเส้นทางไม่ได้ และ passthrough ปิดอยู่ | ใช้ Manual sync กับชนิดที่รองรับ หรือเปิด passthrough ถ้าเปิดแล้วจะเป็นแค่คำเตือน |

:::note
LCG Network 0.1.0 เป็น preview การเข้าออกโซนและการโอน ownership ยังไม่ได้ตรวจใน VRChat build จริงที่มีหลาย client ให้ทดสอบด้วยสอง client ก่อนเผยแพร่
:::
