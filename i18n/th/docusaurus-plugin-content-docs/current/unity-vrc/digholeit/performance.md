---
sidebar_position: 8
---

# ประสิทธิภาพและข้อจำกัด

> เวอร์ชันเอกสาร: **0.6.0 source**

## ค่าที่แนะนำ

| ค่า | PC | Quest |
|---|---|---|
| Voxel size | 0.5 m | 0.5–0.75 m |
| Chunk cells | 16 | 8–12 |
| Zone size | ไม่เกิน 64 × 32 × 64 cells | ราว 32 × 16 × 32 m |
| Material | DigTerrain Standard | DigTerrain Lite |

สำหรับ Quest ควรใช้ zone เล็กหลายอันแทน zone ใหญ่หนึ่งอัน การวัดใน Editor ClientSim พบว่า remesh chunk 16³ ใช้ Udon time ราว 14–17 ms ตัวเลขนี้ยังไม่ใช่ผลจาก Quest จริง

## Memory

- ผู้เล่น VRChat เก็บ compressed grid และ decoded grid เฉพาะ chunk ที่ได้รับ edit
- Grid/paint บน disk ใช้ RLE เหลือราว 2–5% ของ raw size
- เฉพาะ chunk ที่มี surface เท่านั้นที่มี GameObject, mesh และ collider
- Editor/standalone เก็บ full grid ใน memory
- หนึ่ง zone มีได้สูงสุด 128 Mi samples และ inspector เตือนเมื่อเกิน 16 million

## ข้อจำกัด

- หนึ่ง zone ต่อหนึ่ง Terrain และต้อง axis-aligned
- `DigSync.capacity` ค่าเริ่มต้น 4096 จำกัดจำนวน edit ต่อ instance
- ถ้า owner ออกก่อน relay edit นั้นอาจไม่ถึง client อื่น
- ขอบ paint blend ประมาณหนึ่ง voxel
- Shading สูงสุด 16 layer (Lite 8, Standard บน mobile 4) และ painted layer ต่อ chunk สูงสุด 4
- Chunk ที่ขุดตอน runtime ใช้ light probe ไม่ใช่ lightmap
- Terrain material ต้องรองรับ hole
- Tree แต่ละต้นเป็น GameObject ส่วน detail ใช้หนึ่ง renderer ต่อ chunk column (หนึ่ง draw call ต่อ detail type) บน Quest ควรลด density และ Detail Distance
