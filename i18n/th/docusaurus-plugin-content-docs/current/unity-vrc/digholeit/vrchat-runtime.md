---
sidebar_position: 5
---

# VRChat runtime

> เวอร์ชันเอกสาร: **0.5.0**

VRChat runtime เขียนด้วย UdonSharp และ compile ด้วย LCGUdonSharp หลัง Bake zone ให้กด **Add VRChat Runtime** เพื่อเพิ่ม `DigZoneRuntime` ที่ทำ edit/mesh และ `DigSync` บน GameObject ลูกสำหรับ network sync

Grid ถูก run-length compression แยกต่อ chunk ตอนโหลด world จะยังไม่ decode; chunk จะ decode ครั้งแรกเมื่อ edit มาถึง Chunk ที่ไม่มี surface ไม่มี GameObject และจะคัดลอก inactive **Chunk Template** เมื่อจำเป็น

## DigTool

Pickup สำหรับ dig/add/paint ในทิศที่ชี้ ตั้ง `zones`, `tip`, hit layer, `reach`, `radius`, `mode`, `paintLayer`, `addLayer` และ repeat `interval` ใช้ `_ToggleMode()` สลับ dig/add หรือ `_NextMode()` วน dig/add/paint

## DigZoneRuntime

- `_LocalEdit` / `_LocalEditLayer`: ขอ edit ที่ world position
- `_ContainsWorld` / `_IsSolidAt`: ตรวจจุดใน zone และ solid
- `_IsReady` / `_IsBusy`: ตรวจ data พร้อมและงานค้าง
- `_DecodedChunkCount`: จำนวน chunk ที่ decode หลัง reset
- `_ResetToOriginal`: คืน Bake state เฉพาะ local ทันที หาก reset ทุกคนใช้ `DigSync._RequestReset()`

`budgetMsDesktop` / `budgetMsMobile` คือ frame budget สำหรับ edit และ mesh ค่าเริ่มต้น 2.5 / 1.2 ms

`foliageMask`, `detailRenderers` และ `treeObjects` คือข้อมูล foliage ใน zone ที่ bridge ใส่ให้ หลัง remesh หากพื้นใต้ tree/detail ถูกขุดออกหรือฝัง ระบบจะปิด tree และอัปเดต detail mask การ Reset จะคืน foliage กลับมา

## DigSync

เก็บ ordered append-only edit log ค่า capacity เริ่มต้น 4096 edit (8 byte ต่อรายการ) และต้องอยู่ใต้ข้อจำกัด Manual sync ราว 280 KB Late joiner รับ full log แล้ว replay แบบแบ่งเฟรม `_RequestReset()` คืนทุกคนสู่ Bake state และเริ่ม epoch ใหม่

`DigSync` ต้องอยู่บน GameObject ของตัวเอง หาก program asset หาย ให้ใช้ **Tools > DigHoleIt > Create Missing U# Program Assets**
