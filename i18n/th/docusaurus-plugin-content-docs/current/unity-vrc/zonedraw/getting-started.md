---
sidebar_position: 2
---

# เริ่มต้นใช้งาน ZoneDraw

## 1. สร้างรูปทรง

ใน Hierarchy เลือก **GameObject > LogicCuteGuy > ZoneDraw**

| เมนู | ผลลัพธ์ |
|---|---|
| **Barrier Wall** | กำแพงทึบตามแนวจุด |
| **Trigger Zone** | พื้นที่ trigger ตามรูปหลายเหลี่ยม |
| **Room (walls + ground + ceiling)** | barrier แบบปิดที่มีพื้นและเพดาน |

โหมดวาดจะเริ่มทันที ภายหลังใช้ปุ่ม **Draw / Edit Points** ใน Inspector

## 2. วาด

| การทำงาน | วิธีควบคุม |
|---|---|
| เพิ่มจุด | คลิก |
| ย้ายจุด | ลากจุด |
| เปลี่ยนความสูง | ลากลูกศรชี้ขึ้น |
| แทรกจุด | คลิกจุดสีฟ้า |
| ลบจุด | Ctrl+คลิก หรือเลือกจุดแล้วกด Delete |
| จบการวาด | Esc หรือ Enter |

ใน Inspector ยังมี **Reverse**, **Drop To Ground**, **Flatten**, **Clear**, **Bake Colliders** และ **Remove Colliders** โดย Zone ต้องมีอย่างน้อย 3 จุด

## 3. การตั้งค่า

| การตั้งค่า | ความหมาย |
|---|---|
| **Height** | ความสูงของรูปทรงเหนือจุด |
| **Bottom Offset** | ระยะที่ยื่นลงใต้จุด ใช้ปิดช่องบนพื้นที่ไม่เรียบ |
| **Thickness** | ความหนาของกำแพง พื้น และเพดาน |
| **Wall Faces** | ความหนาของกำแพงอยู่ด้านใดของเส้น: Front, Back หรือทั้งคู่ |
| **Closed** | เฉพาะ Barrier: เชื่อมจุดสุดท้ายกับจุดแรก พื้นและเพดานต้องเปิดตัวนี้ |
| **Ground / Ceiling Collider** | เพิ่มแผ่นพื้นหรือเพดาน |
| **Is Trigger**, **Physic Material** | ใช้กับ collider ที่ bake |
| **Render Material** | mesh ที่มองเห็นได้ (ไม่บังคับ) |
| **Scripting Ref** | เพิ่ม `ZoneArea` สำหรับสคริปต์ Udon |
| **Snap To Surface**, **Grid Snap** | ควบคุมตำแหน่งของจุดใหม่ |
| **Auto Bake** | bake ใหม่ขณะแก้ไข |

collider เป็นลูกของวัตถุ `_ZoneColliders` และใช้ layer เดียวกับรูปทรง อย่าแก้ด้วยมือ เพราะการ bake ครั้งถัดไปจะเขียนทับ รูปหลายเหลี่ยมแบบเว้าใช้ convex collider หนึ่งอันต่อสามเหลี่ยม จึงควรวาดรูปให้ไม่ซับซ้อน

## 4. ใช้จาก UdonSharp

เมื่อเปิด **Scripting Ref** ให้อ้างถึง `ZoneArea` บนวัตถุ `_ZoneColliders`

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using UnityEngine;

public class ZoneSign : UdonSharpBehaviour
{
    public ZoneArea area;
    public GameObject sign;

    private void Update()
    {
        sign.SetActive(area.IsLocalPlayerInside());
    }
}
```

| เมธอด | ทำอะไร |
|---|---|
| `Contains(Vector3)` | ตำแหน่งในโลกอยู่ใน zone หรือไม่ สำหรับ barrier จะเป็น false เสมอ |
| `IsPlayerInside(VRCPlayerApi)`, `IsLocalPlayerInside()` | การเช็กแบบเดียวกันกับตำแหน่งของผู้เล่น |
| `EnableColliders()`, `DisableColliders()` | เปิดหรือปิด collider ทั้งหมด เช่น ใช้เปิดประตูรั้ว |
| `EnableGround()`, `DisableGround()`, `IsGroundEnabled()` | ควบคุมเฉพาะพื้น |
| `EnableCeiling()`, `DisableCeiling()`, `IsCeilingEnabled()` | ควบคุมเฉพาะเพดาน |
| `ShowVisual()`, `HideVisual()` | แสดงหรือซ่อน render mesh |

คำสั่งเหล่านี้มีผลเฉพาะเครื่องตัวเอง ถ้าต้องการให้ทุกคนเห็นสถานะประตูตรงกัน ต้องซิงก์ในสคริปต์ของคุณ

`Contains` ใช้ช่วงความสูงเดียวกับทั้งรูปทรง คือจากจุดต่ำสุดถึงจุดสูงสุดบวก Height ถ้าพื้นลาดชันมาก ให้แบ่งพื้นที่เป็นหลาย zone
