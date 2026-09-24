---
sidebar_position: 8
---

# ระบบ Packet Network แบบกำหนดเอง

> เวอร์ชันเอกสาร: **0.3.4**

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

Continuous sync, Udon Graph behaviour, zone แบบ parent/child ที่ซ้อนกัน และ `[UdonSynced]` มาตรฐานใต้ zone จะถูกปฏิเสธแบบ fail-closed แต่ zone ในคนละ hierarchy ซ้อนกันได้

หลังอัปเกรดให้ compile UdonSharp program ทั้งหมดและ build world ใหม่
