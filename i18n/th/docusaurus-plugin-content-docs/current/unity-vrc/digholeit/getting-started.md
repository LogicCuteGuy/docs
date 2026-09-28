---
sidebar_position: 2
---

# เริ่มต้นใช้งาน

> เวอร์ชันเอกสาร: **0.5.0**

## ข้อกำหนด

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| อื่น ๆ | Worlds SDK 3.10.5 และ LCGUdonSharp 0.3.4 ขึ้นไป | ไม่มี |

## การติดตั้ง

เพิ่ม `https://vpm.logiccuteguy.com/index.json` ที่ **Settings > Packages > Add Repository** ใน VCC แล้วเพิ่ม DigHoleIt 0.5.0 เข้า project ได้

หากติดตั้งจาก Git ให้ใส่ URL นี้ใน Unity Package Manager ที่ **Add package from git URL**:

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.5.0
```

หรือวาง repository ที่ `Packages/com.logiccuteguy.digholeit` ใน VRChat project ให้ติดตั้ง LCGUdonSharp ก่อน

## Demo scene

- **Tools > DigHoleIt > Create VRChat Demo Scene** สร้าง terrain, zone ที่ Bake แล้ว, spawn และ shovel สำหรับ dig/add/paint เล่นผ่าน ClientSim แล้วถือ shovel และกด Use
- **Tools > DigHoleIt > Create Standalone Demo Scene** สร้าง terrain, zone และ camera ที่มี `DigToolStandalone` คลิกซ้าย dig, ขวา add, กลาง paint

## เพิ่มใน Terrain ของคุณ

1. เพิ่ม **DigHoleIt > Dig Zone** ใน GameObject ว่างและกำหนด Terrain
2. ตั้ง **Voxel Size**, **Cells**, **Chunk Cells** แล้วกด **Fit To Terrain** และ **Bake**
3. สำหรับ VRChat กด **Add VRChat Runtime**; สำหรับ standalone กด **Add Standalone Runtime** การสร้างหรือ Bake zone อย่างเดียวจะไม่เพิ่ม runtime
4. VRChat: เพิ่ม `DigTool` ใน pickup และใส่ zone ใน `zones`; standalone: เพิ่ม `DigToolStandalone` ใน camera
5. ใช้ [Editor brush](editor-brushes.md) เพื่อ sculpt/paint ตามต้องการ
6. หากใช้ baked light ให้กด **Add Light Probes** แล้ว Bake lighting

เมื่ออัปเกรดจาก 0.4 เป็น 0.5 ให้ Re-bake แต่ละ zone หนึ่งครั้งเพื่อรับ tree/detail และข้อมูล zone height ใหม่ หาก voxel size และ lattice เหมือนเดิม sculpt/paint จะยังอยู่
