---
sidebar_position: 3
---

# Dig Zone

> เวอร์ชันเอกสาร: **0.6.0 source**

Dig Zone คือกล่อง axis-aligned เหนือ Unity Terrain หนึ่งอัน ภายในกล่อง terrain จะถูกแทนด้วย voxel grid ที่ขุด เติม และ paint ได้

## การตั้งค่าหลัก

| ค่า | ความหมาย |
|---|---|
| **Terrain** | Terrain ที่ zone ตัดเข้าไป โดย footprint ทั้งหมดต้องอยู่บน terrain |
| **Voxel Size** | ความยาวขอบ voxel หนึ่งก้อนเป็นเมตร |
| **Cells** | ขนาด grid เป็น voxel แต่ละแกนเก็บ `cells + 1` sample |
| **Chunk Cells** | จำนวน voxel ต่อขอบ chunk แนะนำ PC 16, Quest 8–12 |
| **Border Voxels** | Margin ที่ไม่แก้ไขด้านในขอบ terrain hole และพื้น zone ปกติใช้ 2–3 |
| **Max Brush Radius** | รัศมี brush สูงสุดที่รับจากผู้เล่น |
| **Baked Lighting** | สร้าง lightmap UV และตั้ง Contribute GI ให้ chunk |
| **Lightmap Scale** | ตัวคูณความละเอียด lightmap ของ chunk |
| **Trees / Details** | แสดง tree/detail ของ terrain ใน zone และให้ตามผิวที่ขุด |

ใน Scene view กล่องสีส้มคือ zone และกล่องสีเขียวคือพื้นที่ที่ขุดได้จริง

## ความสูงของ zone

เมื่อ terrain หรือการ sculpt เข้าใกล้ขอบบน Bake และ Editor brush จะขยาย zone ขึ้นเป็นขั้นตาม voxel โดยอัตโนมัติ ด้านล่างและ footprint ของ terrain hole ไม่เปลี่ยน ใช้ **Fit To Terrain** ก่อน Bake เพื่อลดพื้นที่ว่างที่ไม่จำเป็น

## Tree และ detail

ตอน Bake tree ใน terrain hole จะย้ายเข้า zone data และสร้างสำเนา prefab โดยเก็บ rotation, ความกว้าง/สูง, collider และ LOD ไว้ Re-bake แล้วยังอยู่ตำแหน่งเดิม และจะคืนสู่ terrain เมื่อ Clear หรือ Delete Zone ส่วน detail บนพื้นด้านบนมาจาก detail map เดิม ขณะที่ detail ที่ paint บนพื้นหลุม ผนัง หรือเพดานจะเก็บใน zone data และวาดเป็น mesh ที่งอกจากผิว

ใช้ **DigHoleIt: Paint Trees** / **DigHoleIt: Paint Details** ใน **Paint Terrain** เพื่อ paint ภายใน zone ที่ brush ปกติของ Unity เข้าไม่ถึง

![Foliage ที่ paint ภายในหลุม](/img/digholeit/paint-in-hole.jpg)

![Foliage ที่ paint บนพื้นและเพดานถ้ำ](/img/digholeit/paint-in-cave.jpg)

## คำสั่ง

- **Fit To Terrain** ปรับความสูงกล่องให้ครอบ terrain
- **Bake** สร้าง grid และ mesh จาก terrain พร้อมเก็บ sculpt/paint เดิม
- **Sculpt Tool** เปิด [Editor brush](editor-brushes.md)
- **Reset To Terrain** ทิ้ง sculpt/paint แล้ว Bake ใหม่
- **Clear / Delete Zone** ลบ chunk object และคืน terrain hole
- **Add Light Probes** วาง probe สำหรับ chunk ที่ mesh เปลี่ยนตอน runtime
- **Add VRChat Runtime / Add Standalone Runtime** เพิ่ม runtime ตามชนิด project

## Terrain layer และ lighting

รองรับ terrain layer สูงสุด 16; DigTerrain Lite รองรับ 8 แต่ละ chunk เก็บ painted layer ได้สูงสุด 4 พร้อม dug soil หากใช้ Baked Lighting ให้ Bake zone, เพิ่ม Light Probe Group แล้ว Bake lighting ของ scene Chunk ที่เปลี่ยนตอน runtime จะใช้ light probe และกลับไปใช้ lightmap หลัง Reset

## ย้าย resize และติดตาม terrain

Handle ที่หน้ากล่อง snap เป็นจำนวน voxel การ Bake ใหม่จะเก็บ sculpt/paint ถ้า voxel size และ lattice ไม่เปลี่ยน เมื่อเปิด **Follow terrain edits** การแก้ height, paint, tree และ detail ของ Unity Terrain จะอัปเดต zone หลังจบ stroke โดยเก็บ sculpt และ voxel paint ไว้

Zone จัดการ terrain hole ของตัวเอง และคืน hole เมื่อ Clear/ลบ zone ใช้ **Fix Leftover Holes** แก้ hole ที่ค้างจากเวอร์ชันเก่า
