---
sidebar_position: 14
---

# สลับข้อมูล Terrain (Terrain Swap)

**เมนู**: `คลิกขวาที่ Terrain > LogicCuteGuy > Terrain Swap...`

ยูทิลิตี้ที่เรียบง่ายแต่จำเป็นสำหรับการสลับ `TerrainData` พื้นฐานของคอมโพเนนต์ Terrain ในขณะที่ยังคงรักษาการทำงานร่วมกันของคอมโพเนนต์และ Collider ให้ตรงกัน

## ฟีเจอร์

- **การสลับแบบรวมศูนย์**: แทนที่ `TerrainData` ทั้งในคอมโพเนนต์ `Terrain` และ `TerrainCollider` พร้อมกัน
- **รองรับ Context Menu**: เปิดเครื่องมือได้อย่างรวดเร็วโดยการคลิกขวาที่คอมโพเนนต์ Terrain ใด ๆ ในหน้าต่าง Inspector
- **การรวมเข้ากับระบบ Undo**: การสลับข้อมูลจะถูกบันทึกลงในระบบ Undo อย่างสมบูรณ์

## วิธีใช้งาน

1. เลือก GameObject **Target Terrain** (Terrain เป้าหมาย)
2. กำหนด Asset **New Terrain Data** (ข้อมูล Terrain ใหม่)
3. คลิก **Swap Terrain Data**

> [!NOTE]
> เครื่องมือนี้ช่วยให้มั่นใจได้ว่า Physics Collider ของคุณจะตรงกับลักษณะ Terrain ที่มองเห็นได้ทันทีหลังจากสลับข้อมูล เพื่อป้องกันปัญหาความไม่ตรงกันระหว่างการ Bake และการชน (Collision)
