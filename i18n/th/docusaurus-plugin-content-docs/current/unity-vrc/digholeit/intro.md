---
sidebar_position: 1
---

# เอกสาร DigHoleIt

> เวอร์ชันเอกสาร: **0.7.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

DigHoleIt เปลี่ยนพื้นที่ส่วนหนึ่งของ Unity Terrain ให้เป็น voxel terrain ที่ขุดได้ วาง **Dig Zone** เหนือ terrain แล้ว Bake จากนั้นผู้เล่นสามารถขุดหลุม อุโมงค์ ถ้ำ เติมดินกลับ และระบาย terrain layer บนผิว voxel ได้ เวอร์ชัน 0.5.0 รองรับ tree/detail ใน zone, การ paint foliage ภายในหลุม บนผนังและเพดาน และการขยายความสูงของ zone อัตโนมัติ ใน VRChat การแก้ไขจะ sync ไปยังผู้เล่นทุกคนรวมถึง late joiner

## สิ่งใหม่ใน 0.7.0

DigHoleIt 0.7.0 เพิ่ม prefab Dig Pen, ปลูก/ลบ tree และ detail ตอน runtime (รวม foliage ที่ bake ไว้), smoothing แบบ sync, VRChat showcase และ Refresh Holes / Refresh Zones การตั้งค่าเป็น local แต่ edit ใน VRChat sync และ replay ให้ late joiner

## สิ่งใหม่ใน 0.6.1

- Undo/Redo คืน chunk object และ mesh ได้ถูกต้องหลัง Bake, resize, ย้าย zone หรือสร้าง chunk จากการ sculpt
- **Hole Overlap** ยื่นผิว zone ใต้ขอบ terrain 0.1 m โดยค่าเริ่มต้น เพื่อปิด seam เมื่อระดับ detail ของ terrain เปลี่ยนตามระยะ
- Grass ใน zone ใช้ healthy/dry colour, root ที่มืดกว่า, wind tint และ wind phase ตรงกับ terrain และใช้ Diffuse Remap เฉพาะ terrain shader ที่รองรับ
- ลบ triangle ที่มีพื้นที่เป็นศูนย์ตรงขอบ hole ก่อนสร้าง collision mesh

![Terrain และโซนขุดของ DigHoleIt](/img/digholeit/hero.jpg)

| หลุมที่ขุด | อุโมงค์ผ่าน terrain |
|---|---|
| ![หลุมที่ขุดใน Unity Terrain](/img/digholeit/pit.jpg) | ![อุโมงค์ voxel ผ่าน Unity Terrain](/img/digholeit/tunnel.jpg) |

| หน้า | เนื้อหา |
|---|---|
| [Tutorial พร้อมภาพ](getting-started.md) | ภาพจริงสำหรับ install, Bake/resize zone, dig/paint, foliage และ VRChat pen setup |
| [Dig Zone](dig-zones.md) | การตั้งค่า Bake, zone height, tree/detail, ย้าย resize terrain hole ติดตาม terrain layer และ baked lighting |
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
