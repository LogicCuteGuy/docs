---
sidebar_position: 2
---

# การใช้งาน LCG Network

## การจัดเส้นทางทำงานอย่างไร

ตอน build scene หรือโหลดเพื่อเข้า Play Mode ระบบจะตรวจ `UdonBehaviour` ทุกตัว ถ้า program ใช้ networking จะได้สำเนา program ที่เขียนใหม่สำหรับ build นั้น:

| คุณเขียน | เมื่อใช้ LCG |
|---|---|
| `[UdonSynced]` + `RequestSerialization()` (Manual sync) | owner ส่งตัวแปร sync แต่ละตัวใน packet ของ LCG ผู้รับได้ `OnDeserialization` หนึ่งครั้ง `OnPreSerialization` และ `OnPostSerialization` ยังทำงาน โดย `byteCount` เป็น 0 เสมอ |
| `SendCustomNetworkEvent(target, "Event", args...)` | ส่งเป็น packet ของ LCG ให้สมาชิกในโซน `All`, `Others`, `Owner` และ `Self` มีความหมายเดิม |
| `NetworkCalling.CallingPlayer` | ผู้ส่งของ packet ที่กำลังประมวลผล ซึ่งผ่านการตรวจสอบแล้ว |

โซนของ behaviour คือ `LCGNetworkZone` ใน parent ที่ใกล้ที่สุด behaviour ที่อยู่นอกทุกโซนใช้โซน 0 ซึ่งคือทั้ง instance

กฎของ networking ปกติยังใช้เหมือนเดิม:

- ตัวแปร sync รับค่าจาก owner ของ object เท่านั้น
- event ต้องอยู่บน behaviour ที่ sync mode ไม่ใช่ `None`
- event ที่ชื่อขึ้นต้นด้วย `_` ทำงานเฉพาะ local เว้นแต่เมธอดจะเป็น `[NetworkCallable]`

## สิ่งที่ยังเป็นแบบ native

- **Continuous sync:** ถ้าอยู่ในโซน build จะล้มเหลว เว้นแต่จะติ๊ก **Allow Native Sync Passthrough** ของโซน ตัวแปรเหล่านั้นจะไปถึงทั้ง instance ไม่ได้จำกัดแค่ในโซน
- **ชนิดข้อมูลที่ LCG ส่งไม่ได้** เช่น `VRCUrl`: behaviour จะใช้ sync แบบ native ต่อ และ console แสดงคำเตือนพร้อมชื่อตัวแปร LCG ส่ง `bool`, `sbyte`, `byte`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double`, `char`, `string`, `Vector2`, `Vector3`, `Vector4`, `Quaternion`, `Color`, `Color32` และ array ของชนิดเหล่านี้ได้
- **Object ที่เลือกไม่ใช้ LCG:** เพิ่ม **Add Component > LCG Network > LCG Network Settings** แล้วติ๊ก **Use Native Networking** component นี้ใช้เฉพาะใน editor และถูกตัดออกจาก build โดย Inspector ของมันแสดงโซน และแสดงตัวแปรกับ event ที่ LCG จัดเส้นทางให้ UdonBehaviour แต่ละตัว

## โซน

นำ object ที่มี network ไปไว้ใต้ `LCGNetworkZone` เพื่อจำกัดไว้กับผู้เล่นข้างใน ดู [โซน](./zones.md) สำหรับ exit mode, สิ่งที่ build เพิ่มให้, object sync และ build error

## UdonSharp, Udon Graph และ Udon Assembly

ใช้โค้ด, node หรือคำสั่ง networking ตามปกติ ถ้าต้องการ sync ตัวแปร ให้ตั้ง sync mode ของ behaviour เป็น **Manual** ดู [ส่วนเสริม UdonSharp และ runtime ABI](./udonsharp-and-runtime.md) สำหรับ `[LCGPacket]`, การส่งหาผู้เล่นคนเดียว และการส่งแบบสั่งเอง

## ขีดจำกัด

- หนึ่ง frame ของข้อมูลรองรับได้ไม่เกิน 12 KB ส่ง packet ในคิวได้ไม่เกิน 16 รายการต่อเฟรม และการเปลี่ยนตัวแปรเดียวกันภายในเฟรมเดียวจะถูกรวมกัน
- การส่งผ่าน mailbox จำกัดที่ 100 event ต่อวินาทีต่อผู้เล่น เหมือน event `[NetworkCallable]` ทั่วไป

## การแก้ปัญหา

| อาการ | สาเหตุ |
|---|---|
| Build error: มี continuous sync ในโซน | เปลี่ยน behaviour เป็น Manual sync หรือติ๊ก **Allow Native Sync Passthrough** ของโซน |
| คำเตือน "keeps native variable sync" | มีตัวแปร sync ชนิดที่ LCG ส่งไม่ได้ behaviour นั้นจะใช้แบบ native ต่อ |
| Build error ที่ขอ `[NetworkCallable]` | เมธอด `[LCGPacket]` หรือ callback ตอนรับที่มี parameter ต้องมี `[NetworkCallable]` เมื่อใช้ UdonSharp ของ SDK |
| ผู้เล่นนอกโซนยึด object ไม่ได้ | เป็นพฤติกรรมที่ตั้งใจ: `LCGZoneOwnershipGuard` ปฏิเสธคำขอจากนอกโซน |
| `OnPostSerialization` รายงาน 0 byte | เป็นพฤติกรรมที่ตั้งใจ: frame ถูกรวม batch ภายหลัง จึงยังไม่รู้ขนาดในตอนนั้น |

ถ้าต้องการทดสอบหลายผู้เล่นใน editor ตัวเดียว ให้ใช้ [ClientSim Net](../clientsimnet/intro.md)
