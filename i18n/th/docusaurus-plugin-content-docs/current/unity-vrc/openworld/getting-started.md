---
sidebar_position: 2
---

# เริ่มต้นใช้งาน OpenWorld

## 1. สร้างโลก

1. สร้าง GameObject เปล่าตรงตำแหน่งที่ต้องการให้เป็น **มุม (0, 0)** ของกริด กริดอยู่บนระนาบ XZ และแผ่ไปทาง +X กับ +Z โดยไม่สนใจการหมุนและสเกล
2. กด **Add Component > OpenWorld > OpenWorld Settings** ระบบจะเพิ่ม UdonSharp ชื่อ `OpenWorld` ที่ใช้ตอนเล่นไว้ข้างกันและซ่อนจาก Inspector คุณตั้งค่าทุกอย่างที่ OpenWorld Settings
3. ตั้ง **Chunk Size**, **Chunks X** และ **Chunks Z** ถ้าโลกมี Unity Terrain ปุ่ม **Fit Grid To Terrains** จะย้ายมุมกริดและตั้งจำนวน chunk ให้
4. เพิ่มเนื้อหาโดยวางเป็นลูกของวัตถุ OpenWorld หรือใส่วัตถุอื่นในฉากลงใน **Content Roots**

ลำดับชั้นในฉากที่ใช้แก้ไขจะคงเดิม ส่วน chunk root, Block และ impostor จะถูกเพิ่มเฉพาะในสำเนาฉากที่ใช้ตอน Play mode และ build

:::warning วัตถุที่เคลื่อนที่
สิ่งที่เคลื่อนที่ได้ เช่น ยานพาหนะหรือเรือ ต้องไม่อยู่ในเนื้อหาที่ถูกแบ่ง chunk เพราะจะถูกปิดไปพร้อมกับ chunk ที่มัน **เริ่มต้น** อยู่ เมื่อผู้เล่นเดินห่างจากจุดนั้นวัตถุจะหายไป ให้ทำเป็น [Chunk Entity](#chunk-entity) หรือวางไว้นอกวัตถุ OpenWorld และ Content Roots หรือเอา layer ของมันออกจาก **Chunk Layers**
:::

## 2. เลือกสิ่งที่จะแบ่ง chunk

| การตั้งค่า | ผล |
|---|---|
| **Chunk Layers** | เฉพาะวัตถุใน layer เหล่านี้ที่ถูกจัดลง chunk ที่เหลือจะเปิดอยู่ตลอด |
| คอมโพเนนต์ **OpenWorld Area** | ถ้าฉากมีอย่างน้อยหนึ่งอัน จะแบ่ง chunk เฉพาะวัตถุที่จุดกึ่งกลางอยู่ในพื้นที่ |
| คอมโพเนนต์ **OpenWorld Object** | ให้วัตถุยังมองเห็นได้ไกลกว่าวงกลางอีก **Extra Rings** วง เหมาะกับกำแพงหรือจุดสังเกตที่เห็นจากไกล |

วัตถุจะอยู่ใน chunk ที่มีจุดกึ่งกลางของ bounds ของ renderer วัตถุที่อยู่นอกกริดจะไม่ถูกสตรีม และจะมีคำเตือนบอกจำนวน

## 3. ตั้งวงระยะ

วง (ring) คือระยะนับเป็นจำนวน chunk จาก chunk ที่ผู้เล่นอยู่

| วง | สิ่งที่เปิด | ค่าเริ่มต้น (PC / Quest) |
|---|---|---|
| Near | mesh และ collider | 1 / 1 |
| Mid | mesh อย่างเดียว ปิด collider | 3 / 2 |
| ไกลกว่านั้น | ปิด และแสดงเป็น impostor | |

**Changes Per Frame** (2 / 1) จำกัดจำนวน chunk ที่สลับต่อเฟรม การข้ามขอบ chunk จึงไม่ทำให้เฟรมกระตุกแรง

## 4. ใช้ Block กับวัตถุที่วางซ้ำ

เพิ่ม prefab ลงใน **Block Prefabs** instance ของมันจะถูกวาดด้วย GPU instancing จาก data texture และไม่ต้องมี GameObject ตอนเล่น instance ที่มี collider จะเหลือไว้เฉพาะ collider ส่วนต้นแบบต้นไม้ของ Terrain จะถูกเพิ่มลงรายการให้อัตโนมัติ

ระบบเปิด GPU Instancing ให้ material ของ Block ถ้าใช้ shader ของคุณเอง shader นั้นต้องรองรับ instancing

**Grid Prefabs** ใช้กับเนื้อหาที่วางชิดตามกริด เช่น พื้น กำแพง และหญ้า แต่ละ chunk มี 5 เลเยอร์ เลเยอร์ละ 64 × 64 ช่อง แต่ละเลเยอร์เลือกวางที่ความสูงคงที่ หรือวางบนพื้นที่หาได้จาก raycast ลงล่างตอน bake

## 5. Bake impostor

บันทึกฉาก แล้วกด **Bake Impostors** ต้อง bake ใหม่เมื่อเปลี่ยนเนื้อหาหรือแสง ถ้าเปิด **Bake On Build** (ค่าเริ่มต้นคือเปิด) ทุกครั้งที่ build VRChat ระบบจะจัด chunk และ bake impostor ใหม่แล้วบันทึกฉาก

## 6. ตรวจสอบ

กด **Validate** หรือเปิด **Tools > OpenWorld > Validation** ระบบจะตรวจ draw call, จำนวนสามเหลี่ยม, Block และหน่วยความจำ texture ในพื้นที่ที่หนักที่สุดทั้ง PC และ Quest พร้อมแสดง error ที่ผิดกฎ **ถ้ามี error การ build VRChat จะหยุด**

ค่างบเป็นเพียงค่าเริ่มต้น ยังไม่ได้วัดบน Quest จริง จึงควร profile โลกของคุณเอง

## 7. ทดสอบ

กด **Play** กับ ClientSim แล้วเดินข้ามขอบ chunk ใน Scene view กรอบของแต่ละ chunk จะมีสีตามวง: เขียวคือ near, เหลืองคือ mid, เทาคือปิด

## สตรีมจากเว็บ (ไม่บังคับ)

เพิ่ม behaviour **OpenWorldStream** ซึ่งคือ [StreamData](../streamdata/getting-started.md) บวกกับตำแหน่ง Block

- **Stream Block Placement**: export ตำแหน่ง Block เพื่อให้แก้ได้หลังอัปโหลดโดยไม่ต้องอัปโหลดโลกใหม่ ชนิดของ Block (mesh และ material) ต้องคงเดิม
- **Ship Block Placement**: ใส่ตำแหน่งไว้ในโลกด้วย ถ้าปิด โลกจะเล็กลง แต่ Block จะแสดงหลังดาวน์โหลดเสร็จเท่านั้น และไม่แสดงเมื่อออฟไลน์

ทำตามคู่มือ StreamData เพื่อ export และเผยแพร่

## Block Entity

Block Entity คือวัตถุใน chunk ที่มีสถานะซิงก์หนึ่งค่า ตั้งแต่ 0 ถึง 255 เช่น ประตูหรือสวิตช์ สถานะถูกเก็บเป็นราย region จึงไม่หายเมื่อ chunk ถูกปิด และคนที่เข้าทีหลังจะได้รับด้วย

- ใช้ **BlockEntityToggle** กับวัตถุเปิด/ปิด ซ่อนและแสดงวัตถุ และตั้งค่า bool ของ Animator ได้ ต้องมี collider จึงจะ Interact ได้
- ถ้าจะเขียนเอง ให้สืบทอดจาก `BlockEntity`, override `OnStateChanged(int state)` และเรียก `_SetState(value)` ถ้า override `OnEnable` ต้องเรียก `base.OnEnable()`

## Chunk Entity

`ChunkEntity` คือวัตถุเคลื่อนที่อิสระที่เจ้าของ (owner) เป็นคนซิงก์ เช่น NPC หรือ pickup วัตถุนี้ถูก cull ตามวง แทนที่จะถูกปิดไปพร้อม chunk

1. ใส่วัตถุ **ลูก** ที่มี renderer และ collider ในช่อง **Body**
2. Override `OnSimulate(float deltaTime)` สำหรับลอจิกที่รันบนเครื่อง owner ในวง near
3. ถ้าจะสร้างจำนวนมาก ให้วางเป็นลูกของวัตถุที่มี **ChunkEntityPool** และ VRC Object Pool แล้วเรียก `_Spawn(position, rotation)` และเรียก `_Despawn()` บนตัว entity

## แก้ไขขณะเล่น

เปิด **Editable** เพื่อให้ผู้เล่นวาง ย้าย และลบ Block ได้ การแก้ไขถูกซิงก์ และคนที่เข้าทีหลังจะได้รับด้วย **Max Adds Per Region** (64) และ **Max Grid Edits Per Region** (256) จำกัดข้อมูลที่ซิงก์

ใส่ **ChunkEditTool** บน VRC Pickup เพื่อใช้เครื่องมือสำเร็จรูป หรือเรียก `_PickBlock`, `_PlaceBlock`, `_PlaceGridBlock`, `_MoveBlock` และ `_RemoveBlock` บน `OpenWorld` จากสคริปต์

## พื้นดิน voxel ของ DigHoleIt (ไม่บังคับ)

ติดตั้ง [DigHoleIt](../digholeit/intro.md) (`com.logiccuteguy.digholeit`) แล้ว OpenWorld จะสร้าง U# program asset ของ `ChunkTerrain` และเพิ่ม `ChunkTerrain` ให้โลกอัตโนมัติเมื่อฉากมี runtime ของ Dig Zone ถ้าไม่มี asset ให้รัน **Tools > OpenWorld > Create Missing U# Program Assets** และอย่าให้ Terrain กับ Dig Zone อยู่ในเนื้อหาที่แบ่ง chunk

ถ้า **ถอน** DigHoleIt ให้ลบ `Packages/com.logiccuteguy.openworld/Runtime/Terrain/ChunkTerrain.asset` ไม่อย่างนั้น UdonSharp จะแจ้งว่า `ChunkTerrain.cs` ไม่ได้อยู่ใน U# assembly

## แก้ปัญหา

| อาการ | สิ่งที่ต้องตรวจ |
|---|---|
| วัตถุหายเมื่อเดินออกห่าง | วัตถุเคลื่อนที่ได้แต่ถูกแบ่ง chunk ดูคำเตือนในขั้นที่ 1 |
| วัตถุไม่ถูกสตรีม | อยู่นอกกริด หรือถูกตัดออกด้วย Chunk Layers หรือ OpenWorld Area |
| Build หยุด | เปิด **Tools > OpenWorld > Validation** แล้วแก้ error |
| chunk ไกลแสดงข้อมูลเก่า | bake impostor ใหม่ |
| `ChunkTerrain.cs does not belong to a U# assembly` | ถอน DigHoleIt ออกแล้ว ให้ลบ `ChunkTerrain.asset` ตามด้านบน |
