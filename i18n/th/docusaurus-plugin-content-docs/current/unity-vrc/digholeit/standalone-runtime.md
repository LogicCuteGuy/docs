---
sidebar_position: 6
---

# Standalone runtime

> เวอร์ชันเอกสาร: **0.7.0**

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

`DigToolStandalone` ยิง ray จาก camera คลิกซ้ายใช้ mode ที่เลือก (เริ่มต้น dig), ขวา add, กลาง paint

Tree/detail ของ terrain ใน zone จะหายเมื่อผิวใต้ตำแหน่งนั้นถูกขุดออกหรือฝัง และกลับมาหลัง `ResetToBaked()` Detail renderer ใช้ live foliage mask ผ่าน MaterialPropertyBlock จึงไม่แก้ material asset

## Save และ multiplayer

Edit หนึ่งรายการคือ `long` หนึ่งค่า ให้บันทึก `EditLog` และเรียก `LoadEdits` ตอนโหลด สำหรับ multiplayer ส่ง event `LocalEditRequested` ผ่าน network แล้วเรียก `ApplyEdit` ตามลำดับเดียวกันทุก client ส่ง full `EditLog` ให้ late joiner Dig และ Add สลับลำดับกันไม่ได้

## ปลูก, smoothing และการตั้งค่า pen

- `Tree(Vector3 world, float radius, int index)` / `Detail(...)`: ปลูก prefab; index **-1** ลบ planted object และ baked foliage ชนิดนั้นในรัศมี
- `Smooth(Vector3 world, float radius, float strength)`: quantize strength เป็น 31 ขั้นและ clamp ขั้นต่ำ 1/31 การเรียกด้วย 0 ไม่ใช่ “ไม่แก้ไข”
- `SpawnedNear(Vector3 world, float meters, bool tree)`: ตรวจ planted object ใกล้จุด
- `UseAtScreen(Vector2 screen, Mode mode)`: ใช้ mode กับ input ที่เขียนเอง
- `treePrefabs`, `detailPrefabs`, `maxSpawned`: prefab array ร่วมกันและจำนวนสูงสุด (เริ่มต้น 2048)
- `treeIndex`, `detailIndex`, spacing, `detailsPerEdit`: ตั้งค่าการปลูกของ pen
- `mode`, `smoothStrength`, `cursor`, `showSettings`, `layerNames`: mode, strength, cursor และ panel

คลิกซ้ายใช้ `mode`, ขวา add, กลาง paint เปิด **Show Settings** เพื่อใช้ IMGUI panel และ Tab เพื่อสลับ ต้องบันทึก/replay ตามลำดับ `ApplyEdit` อาจคืน true เมื่อ foliage เปลี่ยนแม้ grid ไม่เปลี่ยน อย่าส่ง smoothing ที่ apply local แล้วกลับเข้า `ApplyEdit` เพราะไม่เป็น idempotent

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
