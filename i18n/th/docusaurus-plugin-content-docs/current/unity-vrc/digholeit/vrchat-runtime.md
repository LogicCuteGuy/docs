---
sidebar_position: 5
---

# VRChat runtime

> เวอร์ชันเอกสาร: **0.7.0**

VRChat runtime เขียนด้วย UdonSharp และ compile ด้วย LCGUdonSharp หลัง Bake zone ให้กด **Add VRChat Runtime** เพื่อเพิ่ม `DigZoneRuntime` ที่ทำ edit/mesh และ `DigSync` บน GameObject ลูกสำหรับ network sync

Grid ถูก run-length compression แยกต่อ chunk ตอนโหลด world จะยังไม่ decode; chunk จะ decode ครั้งแรกเมื่อ edit มาถึง Chunk ที่ไม่มี surface ไม่มี GameObject และจะคัดลอก inactive **Chunk Template** เมื่อจำเป็น

## DigTool

Pickup สำหรับ dig/add/paint ในทิศที่ชี้ ตั้ง `zones`, `tip`, hit layer, `reach`, `radius`, `mode`, `paintLayer`, `addLayer` และ repeat `interval` ใช้ `_ToggleMode()` สลับ dig/add หรือ `_NextMode()` วนทั้งหก mode

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

## Dig Pen และ showcase ใน 0.7.0

`Example/Pen/Dig Pen (VRChat).prefab` มี pickup พร้อม VRC Object Sync, world-space settings panel และ brush cursor ส่วน `Dig Pen (Standalone).prefab` เป็น mouse pen กับ panel บนจอ Demo scene ที่แจกทั้งสองแบบมี pen ส่วน scene-builder menu ยังใช้ shovel/camera แบบเดิม

เลือก dig/add/paint/tree/detail/smooth พร้อม size/rate และ layer/prefab/erase ได้ Standalone คลิกซ้ายใช้ mode ที่เลือก ขวา add กลาง paint เปิด **Show Settings** เพื่อใช้ panel และกด Tab เพื่อสลับแสดง

`zones` / `layerNames` และ runtime `treePrefabs` / `detailPrefabs` ที่ว่างจะเติมจาก scene zone และ terrain prototype (หรือ example prefab) ตอน bake, เปิด/บันทึก scene และ play กำหนด array เองเพื่อเลือกชุดที่ต้องการ **Refresh Zones** ใน DigTool Inspector เติม zone/layer name ใหม่ และ zone ที่ถูกลบจะออกจากรายการตอน save/play

## Runtime operation ใน 0.7.0

Tool mode กับ packed operation code เป็นคนละค่า

| การทำงาน | Tool `mode` | `DigFormat` op | Layer bits |
|---|---:|---:|---|
| Dig | 0 | `OpDig = 0` | — |
| Add | 1 | `OpAdd = 1` | Soil paint value |
| Paint | 2 | `OpPaint = 3` | Paint value |
| Tree | 3 | `OpTree = 4` | Prefab index + 1; 0 ลบ |
| Detail | 4 | `OpDetail = 5` | Prefab index + 1; 0 ลบ |
| Smooth | 5 | `OpSmooth = 2` | Strength ทีละ 1/31 |

Tree/detail erase ลบทั้ง object ที่ปลูกและ foliage ชนิดนั้นที่ bake ไว้ภายในทรงกลม Baked foliage ที่ลบจะยังซ่อนหลัง remesh และกลับมาเมื่อ reset ส่วน dig/add ลบ planted object ใน brush ต้องใช้ prefab array ตรงกันทุก client `maxSpawned` จำกัดจำนวน object ที่ปลูก (เริ่มต้น 2048) หากเต็มจะไม่ปลูกเพิ่ม

Smoothing **ไม่เป็น idempotent** ต้อง apply ครั้งเดียวตามลำดับ log DigSync ไม่ทำ local prediction ให้ smoothing ของ non-owner จึงเห็นผลเมื่อ owner ส่งกลับ Udon อัปเดต shared sample บนขอบ chunk ให้ตรงกัน อย่าใช้กฎ replay ซ้ำของ Dig/Add/Paint กับ smoothing

UI ใช้ backing Udon Behaviour `SendCustomEvent` เรียก `SelectDig`, `SelectAdd`, `SelectPaint`, `SelectTree`, `SelectDetail`, `SelectSmooth`, `PrevOption`, `NextOption`, `ResetZones`; slider ใช้ `OnSliderChanged` Setting handler ไม่รับ network call ใช้ `smoothStrength`, `treeIndex`, `detailIndex`, `treeSpacing`, `detailSpacing`, `detailsPerEdit` ตั้งค่า pen และ `_SpawnedNear(world, meters, tree)` ตรวจ planted object ใกล้จุด
