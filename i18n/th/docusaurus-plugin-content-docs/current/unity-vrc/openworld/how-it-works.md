---
sidebar_position: 3
---

# OpenWorld ทำงานอย่างไร

## การแบ่งพื้นที่

โลกเป็นตาราง **chunk** บนระนาบ XZ โดย chunk คือหน่วยของการโหลดและการรวม draw call chunk ถูกจัดกลุ่มเป็น **region** ขนาด 8 × 8 chunk และ region คือหน่วยของการดาวน์โหลด เพราะ VRChat จำกัดความถี่ในการดาวน์โหลดของโลก เป้าหมายการออกแบบคือประมาณ 1 km² หรือ chunk ขนาด 32 m บนตาราง 32 × 32

ฉากที่ใช้แก้ไขยังมีลำดับชั้นเหมือนที่คุณจัดไว้ chunk root, Block และ impostor จะถูกสร้างเฉพาะบนสำเนาฉากที่ใช้ใน Play mode และตอน build

## ประเภทเนื้อหา

| ประเภท | มี GameObject หรือไม่ | วาดด้วย | ใช้ทำอะไร |
|---|---|---|---|
| **Block** | ไม่มี เป็นข้อมูลล้วน (เก็บ collider ไว้) | GPU instancing | โต๊ะ ต้นไม้ กำแพง ก้อนหิน |
| **Grid Block** | เหมือน Block | GPU instancing | พื้น กำแพง หญ้า ที่ snap ลงช่อง |
| **Block Entity** | มี stream ไปกับ chunk | renderer ปกติ | ประตู สวิตช์ |
| **Chunk Entity** | มี ทำเป็น pool ได้ | renderer ปกติ ซ่อนตาม ring | NPC, pickup |
| **Terrain** (ไม่บังคับ) | zone ของ DigHoleIt | DigHoleIt | พื้นที่ขุดได้ |

## สิ่งที่เกิดตอน runtime

OpenWorld ตรวจว่าคุณอยู่ chunk ไหน เมื่อเปลี่ยน chunk จะคำนวณ ring ใหม่และต่อคิวการเปลี่ยน chunk โดยเริ่มจากที่ใกล้ที่สุด แต่ละเฟรมทำไม่เกินค่า **Changes Per Frame**

| Ring | เนื้อหา |
|---|---|
| Near | Mesh และ collider |
| Mid | Mesh อย่างเดียว |
| ถัดจาก mid | impostor หนึ่งอันต่อ chunk |
| ไกลออกไป | impostor หนึ่งอันต่อกลุ่ม chunk |

**Impostor** คือแผ่นภาพของ chunk ที่ถ่ายไว้หลายทิศบนทรง hemi-octahedron shader จะเลือกเฟรมตามมุมที่คุณมอง

| การตั้งค่า | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| **Impostor Frames** | 8 | จำนวนทิศต่อด้านของ chunk impostor ยิ่งมากการหมุนยิ่งลื่น |
| **Impostor Frame Size** | 32 | พิกเซลต่อเฟรม หน่วยความจำ texture โตตามกำลังสองของ frames × size |
| **Impostor Block Chunks** | 4 | จำนวน chunk ต่อด้านของกลุ่มที่รวมกัน |
| **Impostor Merge Rings** | 2 | จำนวนกลุ่มรอบตัวที่ยังใช้ chunk impostor |
| **Block Impostor Frames / Frame Size** | 8 / 64 | สองค่าเดียวกันสำหรับกลุ่มที่รวมกัน |

**Merge Rings × Block Chunks + 1** ต้องมากกว่า mid ring ไม่อย่างนั้น validation จะแจ้ง error

## การวาด Block

Block ใช้ `VRCGraphics.DrawMeshInstanced` กับ material แบบ instancing ของคุณเอง ตำแหน่งมาจากข้อมูลที่ bake ไว้ ซึ่ง [StreamData](../streamdata/intro.md) ดาวน์โหลดได้ด้วย คุณจึงเปลี่ยนผังได้หลังอัปโหลดแล้ว แต่ mesh และ material ต้องอยู่ในโลกตั้งแต่แรก เพราะ VRChat โหลด mesh ใหม่ตอน runtime ไม่ได้

## Grid Block

แต่ละ chunk มี **5 layer** layer ละ **64 × 64 ช่อง** หนึ่งช่องใส่ได้ไม่เกินหนึ่ง Block ต่อ layer โดย layer คือหมวดหมู่ และแต่ละ layer มีโหมดความสูงของตัวเอง

| Layer เริ่มต้น | โหมดความสูง |
|---|---|
| Ground | บนพื้นที่หาเจอใต้ Base Y 500 |
| Ground Decoration | บนพื้นที่หาเจอใต้ Base Y 500 |
| Underground | ขั้นคงที่จาก Base Y −32 |
| Building | ขั้นคงที่จาก Base Y 0 |
| Roof | ขั้นคงที่จาก Base Y 0 |

ความสูงแบ่งเป็น 256 ขั้น ขั้นละ **Step** เมตร (ค่าเริ่มต้น 0.25) ความสูงของพื้นหาด้วยการยิง raycast ลง **ตอน bake** ไม่ใช่ตอน runtime แต่ละ layer มี **Floor Mask** ของตัวเอง ช่องที่ยิงไม่โดนพื้นจะถูกตัดทิ้งและ bake จะเตือน สำหรับพื้นชั้นบน ให้ตั้ง Base Y ไว้ใต้เพดานของชั้นนั้นเล็กน้อย ray จะได้ไม่ไปหยุดที่หลังคา

Grid Prefab แต่ละตัวตั้งค่าได้ดังนี้:

- **Layer** และ **Also On**: layer สำรองที่ใช้เมื่อ layer แรกวางไม่ได้ ระบบวางจากล่างขึ้นบน กำแพง prefab เดียวจึงซ้อนสองชั้นได้
- **Footprint**: กว้างและลึกด้านละ 1 ถึง 15 ช่อง หมุนตาม yaw ของ object โดยปัดเป็น 90° ค่าเริ่มต้น 1 × 1 ใช้แค่ช่องหลัก

ตำแหน่ง snap ที่มุมช่อง (ขนาด chunk ÷ 64) และ yaw เป็นขั้นละ 22.5° การ decode ตอน runtime กระจายหลายเฟรม chunk ที่ decode ใหม่จะวาด Block ชุดเก่าไปก่อนจนชุดใหม่พร้อม

## Lightmap และ texture ที่ stream

โลกมี texture สำรองขนาดเล็กติดไปด้วย จึงใช้งานได้ก่อนดาวน์โหลดเสร็จและตอนดาวน์โหลดไม่สำเร็จ ดู [StreamData ทำงานอย่างไร](../streamdata/how-it-works.md)
