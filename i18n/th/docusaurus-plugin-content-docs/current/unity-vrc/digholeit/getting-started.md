---
sidebar_position: 2
---

# เริ่มต้นใช้งาน

> เวอร์ชันเอกสาร: **0.7.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

## ข้อกำหนด

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| อื่น ๆ | Worlds SDK 3.10.5 และ LCGUdonSharp 0.3.4 ขึ้นไป | ไม่มี |

## การติดตั้ง

Refresh [รายการ VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/index.json) แล้วติดตั้ง **0.7.0** ผ่าน VCC/ALCOM ได้ หรือใช้ `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0`, embedded repository ที่ tag นี้ หรือแตก `com.logiccuteguy.digholeit-0.7.0.zip` จาก[release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0) ห้ามใช้ source archive อัตโนมัติ หากใช้ Git/ZIP ใน VRChat project ให้[ติดตั้ง LCGUdonSharp](../lcgudonsharp/install.md) ก่อน

หากติดตั้งจาก Git ให้ใส่ URL นี้ใน Unity Package Manager ที่ **Add package from git URL**:

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0
```

หรือวาง repository ที่ `Packages/com.logiccuteguy.digholeit` ใน VRChat project ให้ติดตั้ง LCGUdonSharp ก่อน

## Example scene

0.6.0 ขึ้นไปมี scene ตัวอย่างใน *Packages > DigHoleIt - Diggable Voxel Terrain > Example* ที่ Project window:

- **`VRChat/DigHoleItVRChatDemo`**: Dig Zone ที่ Bake แล้ว, VRCWorld spawn และ shovel 3 อันสำหรับ dig/add/paint เล่นผ่าน ClientSim แล้วถือ shovel และกด Use
- **`Standalone/DigHoleItStandaloneDemo`**: zone ที่ Bake แล้วกับ camera ที่มี `DigToolStandalone` คลิกซ้ายใช้ mode ที่เลือก (เริ่มต้น dig), ขวา add, กลาง paint ใน VRChat project script ของ standalone จะแสดง missing เพราะ runtime นี้ไม่ compile
- **`Showcase/DigHoleItShowcase`**: scene สำหรับภาพใน README มี forest terrain ขนาด 200 m, pit, cave ใต้ก้อนหิน และ tree/grass ภายใน ไม่มี runtime และ camera *Shot Pit* / *Shot Cave* ที่ปิดไว้เก็บมุมภาพ

แต่ละ example เก็บ terrain, zone data และ material ใน folder ของตัวเอง Package จาก Git URL เป็น read-only จึงต้อง copy folder ตัวอย่างไปที่ `Assets` ก่อนแก้ไขหรือ Re-bake ส่วน package ที่ติดตั้งผ่าน VCC แก้ใน `Packages` ได้

ยังสามารถสร้าง demo scene ใหม่ใน project ได้:

- **Tools > DigHoleIt > Create VRChat Demo Scene** สร้าง terrain, zone ที่ Bake แล้ว, spawn และ shovel สำหรับ dig/add/paint เล่นผ่าน ClientSim แล้วถือ shovel และกด Use
- **Tools > DigHoleIt > Create Standalone Demo Scene** สร้าง terrain, zone และ camera ที่มี `DigToolStandalone` คลิกซ้ายใช้ mode ที่เลือก (เริ่มต้น dig), ขวา add, กลาง paint

## เพิ่มใน Terrain ของคุณ

1. เพิ่ม **DigHoleIt > Dig Zone** ใน GameObject ว่างและกำหนด Terrain
2. ตั้ง **Voxel Size**, **Cells**, **Chunk Cells** แล้วกด **Fit To Terrain** และ **Bake**
3. สำหรับ VRChat กด **Add VRChat Runtime**; สำหรับ standalone กด **Add Standalone Runtime** การสร้างหรือ Bake zone อย่างเดียวจะไม่เพิ่ม runtime
4. VRChat: เพิ่ม `DigTool` ใน pickup และใส่ zone ใน `zones`; standalone: เพิ่ม `DigToolStandalone` ใน camera
5. ใช้ [Editor brush](editor-brushes.md) เพื่อ sculpt/paint ตามต้องการ
6. หากใช้ baked light ให้กด **Add Light Probes** แล้ว Bake lighting

เมื่ออัปเกรดจาก 0.4 เป็น 0.5 ให้ Re-bake แต่ละ zone หนึ่งครั้งเพื่อรับ tree/detail และข้อมูล zone height ใหม่ หาก voxel size และ lattice เหมือนเดิม sculpt/paint จะยังอยู่

## Dig Pen และ showcase ใน 0.7.0

`Example/Pen/Dig Pen (VRChat).prefab` มี pickup พร้อม VRC Object Sync, world-space settings panel และ brush cursor ส่วน `Dig Pen (Standalone).prefab` เป็น mouse pen กับ panel บนจอ Demo scene ที่แจกทั้งสองแบบมี pen ส่วน scene-builder menu ยังใช้ shovel/camera แบบเดิม

เลือก dig/add/paint/tree/detail/smooth พร้อม size/rate และ layer/prefab/erase ได้ Standalone คลิกซ้ายใช้ mode ที่เลือก ขวา add กลาง paint เปิด **Show Settings** เพื่อใช้ panel และกด Tab เพื่อสลับแสดง

`zones` / `layerNames` และ runtime `treePrefabs` / `detailPrefabs` ที่ว่างจะเติมจาก scene zone และ terrain prototype (หรือ example prefab) ตอน bake, เปิด/บันทึก scene และ play กำหนด array เองเพื่อเลือกชุดที่ต้องการ **Refresh Zones** ใน DigTool Inspector เติม zone/layer name ใหม่ และ zone ที่ถูกลบจะออกจากรายการตอน save/play

`Example/VRChat/DigHoleItVRChatShowcase.unity` มี terrain ของตัวเอง, pen สี่อัน และ zone 151 × 89 × 155 cell ที่ voxel 0.5 m เป็นคนละ scene กับ `Showcase/DigHoleItShowcase` เดิมที่ไม่มี runtime ต้อง copy sample จาก Git ไป Assets ก่อนแก้ไข
