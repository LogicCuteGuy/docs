---
sidebar_position: 1
---

# StreamData

> เวอร์ชันของเอกสาร: **0.0.1** · [Release](https://github.com/LogicCuteGuy/StreamData/releases/tag/0.0.1)

**StreamData** (`com.logiccuteguy.streamdata`) สตรีม texture และ lightmap ของโลก VRChat จากเว็บหลังโลกโหลดเสร็จ ตัวโลกมีเพียง texture สำรองขนาดเล็ก ขนาดดาวน์โหลดจึงเล็กลงและยังใช้งานได้แบบออฟไลน์

:::info รุ่นแรกเริ่ม
0.0.1 เป็นรุ่นแรกที่เผยแพร่ ควรสำรองโปรเจกต์และทดสอบกับโลกของคุณเอง
:::

## ความสามารถ

- รวม texture ขนาดเล็กเป็นหน้า atlas ขนาดไม่เกิน 2048² ดาวน์โหลดรูปครั้งเดียวได้หลาย texture
- ดาวน์โหลดจากใกล้ไปไกลทีละรูป ภายในข้อจำกัดของ VRChat ที่ 1 รูปต่อ 5 วินาที
- เมื่อตั้งระยะโหลด texture ที่อยู่ไกลจะกลับไปใช้ตัวสำรองและคืนหน่วยความจำ
- สตรีม lightmap ได้ (ไม่บังคับ) โดยไม่ต้องแก้ shader ของคุณ
- มีโฮสต์สำรองไว้ใช้เมื่อโฮสต์แรกล้มเหลว
- เผยแพร่ขึ้น GitHub Pages หรือโฮสต์ของคุณเองจาก editor ได้ ทั้งแบบกดเองหรือทุกครั้งที่ build
- มีเซิร์ฟเวอร์ทดสอบในเครื่องสำหรับตรวจการดาวน์โหลดใน editor
- ต่อขยายได้: `IStreamExtension` ให้แพ็กเกจอื่นสตรีมข้อมูลของตัวเอง โดย [OpenWorld](../openworld/intro.md) ใช้กับตำแหน่ง Block

## สิ่งที่ต้องมี

- **Unity** 2022.3, Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 ขึ้นไป (`com.vrchat.worlds`) พร้อม UdonSharp ที่มากับ SDK
- ถ้าจะเผยแพร่บน GitHub Pages: `git` และ [GitHub CLI](https://cli.github.com/) (`gh`) ที่ล็อกอินแล้ว

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม VPM repository ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้กดรีเฟรชรายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. เพิ่ม **StreamData** (`com.logiccuteguy.streamdata`)

### ติดตั้งเอง

ดาวน์โหลด `com.logiccuteguy.streamdata-0.0.1.zip` จาก release แล้วแตกไฟล์ไปที่ `Packages/com.logiccuteguy.streamdata` อย่าใช้ไฟล์ **Source code** ที่ GitHub สร้างอัตโนมัติ และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

## สัญญาอนุญาต

MIT

ถัดไป: [เริ่มต้นใช้งาน](./getting-started.md)
