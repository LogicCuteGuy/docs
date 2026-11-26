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

## 4. ขั้นถัดไป

- [การ bake ทำงานอย่างไร](./baking.md): แต่ละการตั้งค่าสร้าง collider แบบไหน
- [เขียนสคริปต์กับ ZoneArea](./scripting.md): ตรวจว่าผู้เล่นอยู่ข้างในหรือไม่ และเปิดประตูจาก UdonSharp
