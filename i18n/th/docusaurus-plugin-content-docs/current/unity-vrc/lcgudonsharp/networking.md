---
sidebar_position: 8
---

# ระบบ Packet Network แบบกำหนดเอง

> เวอร์ชันเอกสาร: **0.3.10**

:::caution ฟีเจอร์ทดลอง
Wire protocol ของ `[LCGPacket]` / `LCGNetworkZone` ปัจจุบันคือ v2 และอาจเปลี่ยนในอนาคต
:::

`[LCGPacket]` ไม่ใช้ variable sync มาตรฐานของ Udon แต่มี frame แบบระบุเวอร์ชัน, ตรวจ authority, ป้องกัน replay, รวมการแก้ field, callback ที่ยืนยันผู้ส่ง และส่งถึง PlayerObject ที่กำหนด

## Packet field

```csharp
[LCGPacket(
    Authority = LCGPacketAuthority.ObjectOwner,
    Callback = nameof(OnScoreChanged))]
[SerializeField] private int score;

public void OnScoreChanged(VRCPlayerApi sender) { }
```

การกำหนดค่าหลายครั้งในเฟรมเดียวจะส่งเฉพาะค่าสุดท้าย ค่าที่ไม่เปลี่ยนจะไม่ถูกส่ง ใช้ `ForceSendPacket(nameof(score))` เพื่อบังคับส่ง และต้องมี object ownership ก่อนเขียนค่า

## Packet method และ zone

`SendCustomNetworkEvent` จะถูกแปลงเป็น mailbox delivery เฉพาะเมื่อ method เป้าหมายมี `[LCGPacket]` ใช้ `SendLCGNetworkEvent(player, ...)` เพื่อส่งให้คนเดียว ส่วนการเรียก method โดยตรงทำงานเฉพาะ local

เพิ่ม `LCGNetworkZone` ใน trigger collider เพื่อจำกัดผู้รับและ ownership ของ object ลูกไว้เฉพาะ player ใน zone โดย `VRC_ObjectSync` ภายใน zone จะถูกแทนด้วย manual relay

### การกู้ snapshot และ ownership

- ตอนเข้า zone และ `OnPlayerRestored` ระบบขอ scene field/object snapshot ปัจจุบัน โดย retry เพิ่มได้สูงสุด 5 ครั้งด้วย bounded backoff หยุดเมื่อออก และเริ่มใหม่หลัง restore event ที่เกี่ยวข้อง
- เมื่อ player disconnect, ownership callback จะซ่อมกรณี VRChat โอน ownership ให้คนนอก zone ภายใน recovery window ที่จำกัด Ownership ของ member ที่ยัง valid จะไม่ถูกเปลี่ยน และ zone ว่างจะคง fallback owner ของ VRChat จนมี member เข้า
- ระบบจับคู่ player ที่ออกด้วย identity ก่อน player ID เพื่อไม่ลบ member ผิดคนเมื่อ ID invalid หรือถูกนำมาใช้ซ้ำ

### Transport สำหรับ object motion

Object motion ใช้ latest-state queue แยกจาก gameplay RPC FIFO Sample ที่ยังไม่ส่งของ object/recipient เดียวกันจะถูกแทนด้วยค่าล่าสุด แต่ยังรักษา discontinuity ของ teleport และการกลับเข้า zone ระบบ batch สูงสุด 900 bytes ต่อ recipient และมี budget ทั้ง scene สูงสุด 40 event/วินาที ประมาณ 6 KB/วินาที พร้อม backoff เมื่อ network clogged หรือ outgoing queue ของ SDK เกิน 8 event

Budget นี้ใช้เฉพาะ LCG motion ไม่จำกัด gameplay packet หรือ native Udon traffic อื่น เมื่อ recipient เพิ่ม sample rate ที่ส่งถึงแต่ละคนจะลดลง Remote object interpolate ด้วย bounded velocity prediction และ remote rigidbody คงเป็น kinematic จน local player ได้ ownership

`LCGRuntime.PendingMotionCount`, `MotionBatchesSent` และ `LastMotionBatchBytes` เป็น local transport diagnostics ไม่ใช่ delivery ACK หรือการรับประกัน throughput ให้ตรวจ FPS/latency ของ world ที่มีคนมากด้วย VRChat หลาย client

Behaviour จาก third party ที่ใช้ field `[UdonSynced]` แบบ native จะถูกปฏิเสธแบบ fail-closed ตามค่าเริ่มต้น หากต้องรองรับ hierarchy เดิม ให้เปิด **Allow Native Sync Passthrough** (`allowNativeSyncPassthrough`) ที่ zone ระบบยังจำกัด LCG packet, ownership และ `VRC_ObjectSync` ที่แปลงแล้วตาม zone แต่ field แบบ native จะคง semantics ของ VRChat และ broadcast ทั้ง instance ไม่ได้จำกัดเฉพาะ zone โดย build จะแสดงคำเตือนเรื่องขอบเขตนี้

Continuous Udon behaviour ที่ **ไม่มี synced field** ใช้ใน zone ได้อัตโนมัติ ส่วน Udon Graph behaviour, native synced field ที่ไม่เปิด passthrough, zone แบบ parent/child ที่ซ้อนกัน และ PlayerObject template ใน hierarchy เดียวกันยังคง fail-closed แต่ zone ในคนละ hierarchy ซ้อนกันได้

หลังอัปเกรดให้ compile UdonSharp program ทั้งหมดและ build world ใหม่ Build ที่เก่ากว่า 0.3.6 decode motion batch envelope ไม่ได้
