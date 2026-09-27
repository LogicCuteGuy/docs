---
sidebar_position: 1
---

# เอกสาร DigHoleIt

> เวอร์ชันเอกสาร: **0.4.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.4.0)

DigHoleIt เปลี่ยนพื้นที่ส่วนหนึ่งของ Unity Terrain ให้เป็น voxel terrain ที่ขุดได้ วาง **Dig Zone** เหนือ terrain แล้ว Bake จากนั้นผู้เล่นสามารถขุดหลุม อุโมงค์ ถ้ำ เติมดินกลับ และระบาย terrain layer บนผิว voxel ได้ ใน VRChat การแก้ไขจะ sync ไปยังผู้เล่นทุกคนรวมถึง late joiner

| หน้า | เนื้อหา |
|---|---|
| [เริ่มต้นใช้งาน](getting-started.md) | การติดตั้ง demo scene และสร้าง zone บน terrain ของคุณ |
| [Dig Zone](dig-zones.md) | การตั้งค่า Bake ย้าย resize terrain hole ติดตาม terrain layer และ baked lighting |
| [Editor brush](editor-brushes.md) | Sculpt และ paint zone ใน Editor |
| [VRChat runtime](vrchat-runtime.md) | `DigZoneRuntime`, `DigTool`, `DigSync` บน UdonSharp |
| [Standalone runtime](standalone-runtime.md) | Runtime C# ปกติ พร้อม save และ multiplayer hook |
| [วิธีทำงาน](how-it-works.md) | Grid, compression, edit packing, mesh, shader, lighting และ network |
| [ประสิทธิภาพและข้อจำกัด](performance.md) | ค่าที่แนะนำสำหรับ PC/Quest, memory และข้อจำกัด |
| [การแก้ปัญหา](troubleshooting.md) | ปัญหาทั่วไปและวิธีแก้ |

## การเลือก Runtime

- Project ที่มี VRChat SDK จะ compile เฉพาะ UdonSharp runtime
- Project อื่นจะ compile เฉพาะ standalone runtime
- หากต้องการ standalone runtime ใน VRChat project ให้เพิ่ม scripting define `DIGHOLEIT_STANDALONE`

Source, release และ issue: [github.com/LogicCuteGuy/DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt)
