---
sidebar_position: 9
---

# การแก้ปัญหา

> เวอร์ชันเอกสาร: **0.7.0**

## Udon program assets

วิดีโอใน [tutorial พร้อมภาพ](getting-started.md) มี `Unable to find valid U# program asset` และ `Cannot run serialization ... the U# program asset ... is null` ถึงจะเห็น sculpt ใน Editor ก็ไม่ได้แปลว่า VRChat runtime พร้อม ต้องแก้ก่อน Play/build

1. รอ import/compile ให้เสร็จ ตรวจ Worlds SDK กับ LCGUdonSharp และแก้ Console compile error แรกก่อน ดู[การติดตั้ง LCGUdonSharp](../lcgudonsharp/install.md)กับ[การแก้ปัญหา](../lcgudonsharp/troubleshooting.md)
2. หาก program file ของ **DigHoleIt** หาย ใช้ **Tools > DigHoleIt > Create Missing U# Program Assets** ปุ่มนี้สร้างเฉพาะ `.asset` ที่ขาดสำหรับ Udon script ของ package ไม่ซ่อม file เดิมที่ invalid หรือ SDK program
3. หาก error ระบุ **VRCWorld/WorldQualitySettings** ให้ตรวจ Program Source ของ SDK sample และ SDK import ปุ่มของ DigHoleIt ไม่ซ่อม program นี้
4. ตรวจว่า zone มี **DigZoneRuntime + DigSync**, save แล้วลอง ClientSim เมื่อ Console ไม่มี error หากยังมี null-reference ให้ดู stack trace วิดีโออย่างเดียวระบุสาเหตุหรือยืนยันวิธีแก้ไม่ได้

## ปัญหา Terrain และ runtime

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

## Refresh Holes และ foliage ที่ลบ

**Refresh Holes** ใน Dig Zones panel ของ terrain เติม hole cell ที่ไม่มี Dig Zone ใน **scene ที่เปิดอยู่** ครอบคลุม รวมถึง hole ที่ zone ถูกลบทิ้งโดยไม่มี record และจัดการ recorded leftover ด้วย ขั้นตอน unclaimed hole มี confirmation และ Undo ได้

อาจเติม **hole ที่วาดเอง** และ hole ของ zone ใน **scene ที่ปิดอยู่** ซึ่งใช้ terrain เดียวกันด้วย ต้องเปิด scene ที่เกี่ยวข้องและอ่าน confirmation ก่อน ไม่ใช่ refresh ที่ไม่เปลี่ยนข้อมูล ส่วน **Fix Leftover Holes** หาเฉพาะ leftover ที่มี record

Runtime Tree/Detail erase ลบทั้ง planted object และ baked foliage การ remesh ไม่คืน foliage ที่ลบ ต้อง reset ดู[Runtime operation](vrchat-runtime.md)
