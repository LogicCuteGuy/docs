---
sidebar_position: 4
---

# Editor brush

> เวอร์ชันเอกสาร: **0.6.0 source**

แก้ zone ที่ Bake แล้วได้สองทาง:

- Terrain > **Paint Terrain > DigHoleIt: Dig Voxels / Paint Voxels** ใช้ shape จากรายการ terrain brush และทำงานกับทุก zone บน terrain
- Terrain > **DigHoleIt: Paint Trees / Paint Details** ใช้ brush เดียวกับ Unity เพื่อ paint foliage บน terrain และภายในหลุม ผนัง หรือเพดานของ zone
- กด **Sculpt Tool** ใน zone inspector แล้วเลือก mode, paint layer และ Sphere/Soft/Flat/custom mask จาก overlay ใน Scene view

| Mode | การทำงาน |
|---|---|
| Dig | ดันผิวเข้าเพื่อสร้างหลุมหรืออุโมงค์ |
| Add | ดันผิวออกเพื่อเพิ่มดิน |
| Paint | กำหนด layer ให้ voxel ใน brush |
| Smooth | ทำผิวให้เรียบ |
| Reset | คืน voxel สู่ terrain ตอน Bake และลบ paint |

![เครื่องมือ DigHoleIt: Dig Voxels](/img/digholeit/terrain-dig-voxels.png)

![Sculpt Dig Zone ใน Scene view](/img/digholeit/editor-sculpt.jpg)

ตัวกรอง **Surface Angle** จำกัดการ sculpt/paint ให้เฉพาะผิวหงาย พื้นลาด ผนัง หรือเพดานตามช่วงมุมที่กำหนด โดยเลือกแกนอ้างอิงจาก world หรือทิศของ brush ด้วย **Brush Axis**

Paint layer เลือก Auto, terrain layer ทั้งหมดสูงสุด 16 หรือ Dug Soil Auto จะลบ paint และใช้ terrain layer เหนือผิวเดิม/dug soil ใต้ผิวเดิม

| Input | การทำงาน |
|---|---|
| Hold / drag | ใช้ brush |
| Shift / Ctrl | Add / Smooth |
| A + drag ซ้ายขวา | ขนาด |
| S + drag ซ้ายขวา | Strength |
| `[` / `]` | เปลี่ยนขนาด 10%; กดค้างเพื่อเปลี่ยนต่อเนื่อง |

หนึ่ง stroke คือหนึ่ง undo step ใน VRChat project การเปลี่ยนจะถูกคัดลอกไป `DigZoneRuntime` เมื่อปล่อย mouse
