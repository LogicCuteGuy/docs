---
sidebar_position: 1
---

# OpenWorld

> เวอร์ชันของเอกสาร: **0.0.1** · [Release](https://github.com/LogicCuteGuy/OpenWorld/releases/tag/0.0.1)

**OpenWorld** (`com.logiccuteguy.openworld`) คือเอนจินโลกแบบแบ่งกริดเป็น chunk สำหรับ VRChat โหลดและปิด chunk รอบตัวผู้เล่นแต่ละคน เพื่อให้ขนาดดาวน์โหลดของโลกเล็กและเฟรมเรตสูง โดยไม่ต้อง bake occlusion culling หรือทำ LOD ให้ทีละวัตถุ

:::info รุ่นแรกเริ่ม
0.0.1 เป็นรุ่นแรกที่เผยแพร่ ค่างบประสิทธิภาพของ Quest ยังไม่ได้วัดบนเครื่องจริง ควรสำรองโปรเจกต์และทดสอบกับโลกของคุณเอง
:::

## ความสามารถ

- **สตรีม chunk**: วงระยะใกล้และระยะกลาง และกระจายการเปิดปิด chunk ไปหลายเฟรม
- **Impostor**: chunk ที่ไกลและกลุ่มของ chunk ถูกวาดเป็น octahedral impostor ด้วยตัว bake และ shader ของแพ็กเกจเอง
- **Block**: วัตถุที่วางซ้ำ ๆ ถูกวาดด้วย GPU instancing จาก data texture ส่วน Grid Block เหมาะกับพื้น กำแพง และหญ้าที่วางแน่น
- **Block Entity และ Chunk Entity**: ประตูและสวิตช์ที่ซิงก์ และวัตถุเคลื่อนที่อิสระแบบ pool
- **แก้ไขขณะเล่น**: ผู้เล่นวาง ย้าย และลบ Block ได้ โดยซิงก์ให้ทุกคน
- **สตรีมจากเว็บ**: texture, lightmap และตำแหน่ง Block ผ่าน [StreamData](../streamdata/intro.md)
- **ตรวจสอบ**: เช็กงบของ PC และ Quest และหยุด build เมื่อมี error
- **เครื่องมือฝั่งเซิร์ฟเวอร์** (ซอร์ส Rust): `openworld-host` ใช้ให้บริการข้อมูลสตรีม และ `openworld-link` ส่งข้อความจากโลกไปยังเซิร์ฟเวอร์ของคุณ

## สิ่งที่ต้องมี

- **Unity** 2022.3, Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 ขึ้นไป (`com.vrchat.worlds`) พร้อม UdonSharp ที่มากับ SDK
- **StreamData** (`com.logiccuteguy.streamdata`) ซึ่ง VCC/ALCOM ติดตั้งให้อัตโนมัติ
- ไม่บังคับ: **DigHoleIt** 0.7.2 สำหรับพื้นดินแบบ voxel

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม VPM repository ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้กดรีเฟรชรายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. เพิ่ม **OpenWorld** (`com.logiccuteguy.openworld`) ระบบจะเพิ่ม StreamData ให้ด้วย

### ติดตั้งเอง

ดาวน์โหลด `com.logiccuteguy.openworld-0.0.1.zip` และ zip ของ StreamData จาก release แล้วแตกไฟล์แต่ละอันไปที่ `Packages/<ชื่อแพ็กเกจ>` อย่าใช้ไฟล์ **Source code** ที่ GitHub สร้างอัตโนมัติ และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

## สัญญาอนุญาต

MIT

ถัดไป: [เริ่มต้นใช้งาน](./getting-started.md)
