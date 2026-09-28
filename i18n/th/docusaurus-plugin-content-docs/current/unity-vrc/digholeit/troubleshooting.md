---
sidebar_position: 9
---

# การแก้ปัญหา

> เวอร์ชันเอกสาร: **0.5.0**

| ปัญหา | วิธีแก้ |
|---|---|
| มีแถบสีเทาหรือช่องว่างข้าง zone | ใช้ **Fix Leftover Holes** ใน terrain tool หรือ Paint Holes แล้ว Bake ใหม่ |
| Bake ขึ้น “too small” / Border Voxels error | ขยาย X/Z ให้กว้างประมาณ 7 voxel ขึ้นไป หรือลด Border Voxels เป็น 2–3 |
| “Settings changed since the last bake” | กด **Bake**; sculpt/paint จะอยู่ถ้า voxel size/lattice ไม่เปลี่ยน |
| Zone ไม่ตามการแก้ terrain | ตรวจ **Follow terrain edits**, zone ต้อง Bake แล้วและ setting ต้องเป็นปัจจุบัน |
| Standalone script เป็น Missing ใน VRChat | เป็นปกติ เพิ่ม define `DIGHOLEIT_STANDALONE` หากต้องใช้ |
| VRChat ไม่ sync | กด **Add VRChat Runtime** และตรวจ `DigZoneRuntime.sync` กับ `DigSync` บน GameObject แยก |
| “grid is too large” | แบ่งหรือลด zone หรือเพิ่ม voxel size ขีดจำกัดคือ 128 Mi samples |
| มี Chunk object จำนวนมาก | เป็น Bake จากเวอร์ชันเก่า ให้ Bake ใหม่เพื่อเก็บเฉพาะ chunk ที่มี surface |
| Tool ยิงไม่โดน zone | ใส่ Chunk Layer ใน `layers` และตรวจ `reach` |
| มืดเมื่อใช้ baked light | เปิด Baked Lighting, กด **Add Light Probes** แล้ว Bake lighting ใหม่ |
| ผิว voxel สีเทา | กด **Apply Material** และ Bake zone หลังเพิ่ม terrain layer |
| Paint tree/detail ใน zone ไม่ได้ | ใช้ **DigHoleIt: Paint Trees / Paint Details** แทน tool ปกติของ Unity และตรวจว่าเลือก prototype แล้ว |
| Tree/grass ใน zone หาย | เปิด **Trees / Details** และ Bake zone Foliage จะซ่อนเมื่อขุด surface ใต้ตำแหน่งนั้นและกลับมาหลัง Reset |
| ขอบบนของ zone สูงขึ้นหลัง Bake | Terrain แตะขอบบนของกล่อง ระบบจึงขยายให้อัตโนมัติ ลด **Headroom Above Terrain** หากต้องการให้ขยายน้อยลง |

Issue: [github.com/LogicCuteGuy/DigHoleIt/issues](https://github.com/LogicCuteGuy/DigHoleIt/issues)
