---
sidebar_position: 4
---

# Validation และตัวเลือกตอน build

เปิด **Tools > OpenWorld > Validation** หรือกด **Validate** บน OpenWorld Settings การ build ของ VRChat จะหยุดถ้ามี error ส่วน warning ไม่ทำให้หยุด

## งบประมาณ

ระบบตรวจงบบนกลุ่ม chunk ในระยะ mid ring ที่หนักที่สุด โดยถือว่ามองเห็นทั้งหมด

| งบ | PC | Quest |
|---|---|---|
| Draw call | 400 | 150 |
| สามเหลี่ยม | 1,000,000 | 150,000 |
| texture ที่ stream และค้างในหน่วยความจำ | 512 MB | 128 MB |
| mid ring สูงสุดที่แนะนำ | 3 | 2 |

การเกินงบเป็นแค่ warning Block นับเป็นหนึ่ง draw ต่อ 1023 instance ของแต่ละชนิด และบวกหน้า impostor เพิ่ม ไม่นับ Terrain, Dig Zone, entity และ avatar ตัวเลขเหล่านี้เป็นค่าเริ่มต้นที่ยังไม่ได้ profile บนเครื่อง Quest จริง

## Error

| ข้อความเกี่ยวกับ | วิธีแก้ |
|---|---|
| ตารางว่าง | ตั้ง Chunk Size, Chunks X และ Chunks Z |
| chunk root ไม่ตรงกับตาราง | กด **Assign To Chunks** |
| near ring มากกว่า mid ring | ลด near ring หรือเพิ่ม mid ring |
| Merge Rings × Block Chunks + 1 | เพิ่มให้มากกว่า mid ring |
| object อยู่ในตารางแต่ไม่อยู่ใน chunk root | กด **Assign To Chunks** |
| ตั้ง Block Prefabs แล้วแต่ยังไม่ bake หรือผัง Block เก่าแล้ว | กด **Assign To Chunks** |
| Block บางชนิดไม่มี mesh หรือ material แล้ว | กด **Assign To Chunks** |
| material ปิด GPU Instancing อยู่ | เปิดใช้ ไม่อย่างนั้น Block จะไม่ถูกวาด |
| ยังไม่ bake collider ของ chunk | กด **Assign To Chunks** |
| โลกแบบ Editable ไม่มีตัวจัดการแก้ไขครบทุก region | กด **Assign To Chunks** |

## Warning

| Warning | สิ่งที่ควรทำ |
|---|---|
| renderer กว้างเกินสอง chunk | แบ่งออก เพราะจะโผล่และหายตาม chunk เดียว |
| mid ring ของ Quest หรือ PC เกินค่าที่แนะนำ | ลดลง หรือ profile ดู |
| Quest เปลี่ยน chunk เกิน 1 ครั้งต่อเฟรม | ตั้งเป็น 1 เพื่อเลี่ยงอาการสะดุด |
| ยังไม่ bake impostor | กด **Bake Impostors** ไม่อย่างนั้น chunk ไกลจะว่างเปล่า |
| draw call มากเกินไป | รวม mesh ใช้ Block หรือลด mid ring |
| สามเหลี่ยมมากเกินไป | ใช้ mesh ที่เบากว่าหรือลด mid ring |
| หน่วยความจำ texture ที่ stream สูงเกินไป | ตั้ง **Load Distance** บน OpenWorldStream หรือใช้ภาพเล็กลง |

## ตัวเลือกตอน build

อยู่บน **OpenWorld Settings**:

| ตัวเลือก | ผล | ข้อแลกเปลี่ยน |
|---|---|---|
| **Bake On Build** | ก่อน build ของ VRChat ทุกครั้ง จะจัด chunk ใหม่ อ่านต้นไม้ terrain ใหม่ bake impostor แล้วบันทึกฉาก | build นานขึ้น |
| **Strip Detail Maps** | ตัด normal, metallic/specular, occlusion, height และ detail map ออกจาก material ในฉาก แล้ววาดแบบแบน | ดาวน์โหลดเล็กลง ภาพดูแบนลง |
| **No Static Batching** | ปิด static batching | ดาวน์โหลดเล็กลงมาก draw call เพิ่ม |
| **Unbatch Repeated Meshes** | ไม่ทำ static batching กับ mesh ที่มี renderer ใช้ร่วมกันตั้งแต่จำนวนนี้ขึ้นไป (0 = ปิด) | mesh นั้นถูกใส่ในโลกแค่ครั้งเดียว ควรเปิด GPU Instancing บน material |

ตัวเลือกที่เกี่ยวกับ material ทำงานบนสำเนา material เดิมของคุณจึงไม่เปลี่ยน

## Gizmo ของ chunk

| ตัวเลือก | แสดง |
|---|---|
| **Show Chunk Boxes** | กล่องรอบเนื้อหาของแต่ละ chunk ใน Play mode สีเขียวคือ near สีเหลืองคือ mid สีเทาคือปิด |
| **Show Chunk Details** | ชื่อ, Block, ต้นไม้ terrain และ collider ของแต่ละ chunk เฉพาะตอนเลือกโลกอยู่ |
| **Details Distance** | ระยะจากกล้อง Scene ที่จะวาดป้ายข้อความ |
| **Show Chunk Borders** | เส้นขอบรอบ chunk ที่กล้อง Scene อยู่ |
