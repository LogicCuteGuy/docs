---
sidebar_position: 6
---

# Standalone runtime

> เวอร์ชันเอกสาร: **0.6.0 source**

Standalone runtime เป็น C# ปกติ (`LogicCuteGuy.DigHoleIt.Standalone`) Compile ใน project ที่ไม่มี VRChat SDK หรือ VRChat project ที่เพิ่ม define `DIGHOLEIT_STANDALONE`

Bake zone แล้วกด **Add Standalone Runtime**

## DigZoneRuntimeStandalone

| Member | การทำงาน |
|---|---|
| `Dig(world, radius)` | ขุดทรงกลมที่ world position |
| `Add(world, radius)` | เพิ่มดินทรงกลม |
| `Paint(world, radius, layer)` | Paint layer ของ voxel |
| `LocalEdit(...)` | Edit แบบทั่วไป ส่ง event `LocalEditRequested` แล้วจึง apply |
| `ApplyEdit(long)` | Apply packed edit เช่นข้อมูลจากผู้เล่นอื่น |
| `LoadEdits(edits)` | คืน Bake state แล้ว replay edit list |
| `ResetToBaked()` | คืน Bake state และล้าง log |
| `Raycast(...)` | Ray march ใน grid โดยไม่ใช้ physics |
| `EditLog` | Edit ทั้งหมดหลัง reset ล่าสุด |

`DigToolStandalone` ยิง ray จาก camera คลิกซ้าย dig, ขวา add, กลาง paint

Tree/detail ของ terrain ใน zone จะหายเมื่อผิวใต้ตำแหน่งนั้นถูกขุดออกหรือฝัง และกลับมาหลัง `ResetToBaked()` Detail renderer ใช้ live foliage mask ผ่าน MaterialPropertyBlock จึงไม่แก้ material asset

## Save และ multiplayer

Edit หนึ่งรายการคือ `long` หนึ่งค่า ให้บันทึก `EditLog` และเรียก `LoadEdits` ตอนโหลด สำหรับ multiplayer ส่ง event `LocalEditRequested` ผ่าน network แล้วเรียก `ApplyEdit` ตามลำดับเดียวกันทุก client ส่ง full `EditLog` ให้ late joiner Dig และ Add สลับลำดับกันไม่ได้
