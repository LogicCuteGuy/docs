---
sidebar_position: 1
---

# UIHUD

> เวอร์ชันเอกสาร: **0.2.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0)

**UIHUD** (`com.logiccuteguy.uihud`) เพิ่ม HUD พร้อมเมนูแบบเลื่อนเข้าและ UI widget ให้โปรเจกต์ Unity ตั้งค่าครั้งเดียวใช้ได้ทั้ง **VR, Desktop และ Mobile** ทั้งใน world ของ VRChat (UdonSharp) และเกม Unity แบบ standalone ที่ไม่ได้ติดตั้ง VRChat SDK

## สิ่งใหม่ใน 0.2.0

- ระหว่างพิมพ์ในช่องข้อความของ UIHUD ระบบจะไม่รับปุ่มเมนูและปุ่ม hotbar 1–9
- ปุ่มหลักไม่เปิดหรือปิด world panel
- เมนูใน VR เปิดในแนวระดับ แม้คุณจะเอียงหัว และการสั่งเปิดเมนูที่เปิดอยู่แล้วจะคงเมนูไว้ที่เดิม
- toggle **Show HUD** ทำให้ตรงกับโค้ดของคุณได้: ใช้ value variable `hudVisibleValue` และ event `_ApplyHudToggle`
- ตารางตัดข้อความยาวในช่องด้วย `...` (`maxCellChars` ค่าเริ่มต้น 16)
- ค่าที่สคริปต์ของคุณตั้งไว้จะยังอยู่เมื่อหน้าที่ซ่อนถูกแสดงครั้งแรก
- ตัวอย่างมี world panel เพิ่มขึ้น รวมถึงโพลแบบ sync และร้านค้า

## สิ่งใหม่ใน 0.1.2

- ผ่อนข้อกำหนด VPM dependency ของ Worlds SDK เป็น `3.x.x` (`>=3.10.5`) จึงติดตั้งบน VRChat SDK 3.10.6 ขึ้นไปได้

## สิ่งใหม่ใน 0.1.1

- เครื่องหมายถูกของ toggle ยืดเต็มช่อง checkbox
- README เพิ่มภาพหน้าจอตัวอย่าง

## ความสามารถ

- HUD ของผู้เล่น (bar, label, การแจ้งเตือน) และเมนูแบบเลื่อนเข้าจากด้านใดก็ได้
- widget มากกว่า 20 แบบ: Button, Toggle, Slider, Selector, Text Input, Player List, ค่าแบบ live, ตาราง, กราฟ (line/bar, pie, bar list, gauge, stat tile), รูปภาพ และ layout container
- panel ใน world (ตู้ kiosk, บอร์ด, ร้านค้า) ที่ตั้งอยู่ใน world ได้โดยไม่ต้องมี manager
- hotbar ใน VR, ปุ่มบนข้อมือและบนมือถือ และกำหนดการแสดงผลตามแพลตฟอร์ม
- แก้ไขผ่าน Inspector พร้อมหน้าต่าง preview แบบ live (`Window > UIHUD Preview`), style preset (Dark / Light / Glass / Neon) และ animation ตอนเมนูกับ widget ปรากฏ
- สร้าง widget ตอน runtime จาก Udon ผ่าน template ที่ซ่อนไว้ ทุกอย่างทำงานบนเครื่องตัวเอง (`NoVariableSync`) ไม่มีการ sync ผ่าน network

## ข้อกำหนด

- **Unity** 2022.3
- **TextMeshPro** 3.0.6 (ถ้ายังไม่มี TMP Essentials Unity จะถามให้ import)
- World ของ VRChat: **VRChat Worlds SDK** `3.10.5` ขึ้นไป (UdonSharp) ส่วนเกม standalone ไม่ต้องใช้แพ็กเกจเพิ่ม

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม repository VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) เข้า VCC/ALCOM หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้ refresh รายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. หา **UIHUD** (`com.logiccuteguy.uihud`) แล้วเพิ่ม **0.2.0**
4. เปิดโปรเจกต์ใน Unity และรอให้ import แพ็กเกจ

### Unity Package Manager / ติดตั้งเอง

ใน **Window > Package Manager > + > Add package from git URL** ให้ใส่:

```text
https://github.com/LogicCuteGuy/UIHUD.git#0.2.0
```

หรือจะวาง repository ที่ tag นั้นไว้ที่ `Packages/com.logiccuteguy.uihud` หรือแตกไฟล์ `com.logiccuteguy.uihud-0.2.0.zip` จาก [หน้า release](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0) ลงโฟลเดอร์นั้นโดยให้ `package.json` อยู่ที่ root ก็ได้ ห้ามใช้ **Source code (zip)** อัตโนมัติของ GitHub

เลือก**วิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์** เพื่อไม่ให้มีสำเนาซ้ำ

## เริ่มต้นใช้งาน

1. เลือก **GameObject > UIHUD > UIHUD System (HUD + Menu)** เพื่อสร้าง manager, canvas ของ HUD และเมนูหลักที่ต่อ event ไว้แล้ว
2. กด Play แล้วกด **M** (desktop), ปุ่มบนข้อมือ (VR) หรือปุ่ม **MENU** (มือถือ) เพื่อเปิดเมนู
3. เลือก manager `UIHUD` เพื่อเปลี่ยนชื่อเมนู เปลี่ยนด้าน และจัดการรายการบน HUD หรือเลือก canvas ของเมนูเพื่อแก้หน้าและ widget

ดู [เริ่มต้นใช้งาน](./getting-started.md) สำหรับการทำงานผ่าน Inspector และ widget, [เมนู, hotbar และ world panel](./menus-and-layout.md) สำหรับการจัดวาง และ [Scripting](./scripting.md) สำหรับ Udon API

## ตัวอย่าง

ให้ import จาก **Window > Package Manager > UIHUD > Samples > Examples** แล้วเปิด `Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` และกด Play ตัวอย่างครอบคลุม widget ทุกแบบ, เมนูทั้งสอง, widget ตอน runtime, animation, world panel ที่มีตัวนับและโพลแบบ sync และสคริปต์ตัวอย่างพร้อมคอมเมนต์ 7 ตัว
