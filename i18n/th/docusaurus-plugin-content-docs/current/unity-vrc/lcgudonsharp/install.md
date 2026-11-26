---
sidebar_position: 2
---

# การติดตั้งและตั้งค่า

> เวอร์ชันเอกสาร: **0.5.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 hook เข้ากับ UdonSharp ของ Worlds SDK แทนการแทนที่ จึงไม่มี installer ไม่ต้องซ่อม และไม่มีการคัดลอกหรือสำรองไฟล์

## ข้อกำหนด

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.6** (`>=3.10.6 <3.11.0`) คอมไพเลอร์ build กับส่วนภายในของ UdonSharp ใน SDK รุ่นนี้

## ติดตั้งผ่าน VCC หรือ ALCOM (แนะนำ)

เพิ่ม[รายการ VPM ของ LogicCuteGuy](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) แล้วติดตั้งหรืออัปเดต **LCGUdonSharp** เป็น `0.5.0` จากนั้นเปิด Unity และรอ compile

ถ้าติดตั้งเอง ให้แตกไฟล์ [release ZIP ที่มีชื่อแพ็กเกจ](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0) ลง `Packages/com.logiccuteguy.lcgudonsharp` โดยให้ `package.json` อยู่ในโฟลเดอร์นั้นโดยตรง ห้ามใช้ **Source code (zip)** อัตโนมัติของ GitHub ไม่ต้องใช้แพ็กเกจ SBP compatibility แล้ว

## อัปเกรดจาก 0.4.x หรือเก่ากว่า {/* #upgrading-from-04x-or-earlier */}

รุ่น 0.4.x และเก่ากว่าลบ UdonSharp ที่มากับ SDK แล้วใช้สำเนาจากแพ็กเกจนี้แทน program asset ของคุณชี้ไปที่ GUID เดิมของสำเนาใน SDK จึงต้องกู้สำเนานั้นกลับมาให้ครบ:

1. ปิด Unity
2. อัปเดต LCGUdonSharp เป็น `0.5.0` ซึ่งจะลบสำเนาคอมไพเลอร์เก่า
3. ติดตั้ง `com.vrchat.worlds` ใหม่ใน VCC/ALCOM เพื่อให้ `Integrations/UdonSharp` กลับมาพร้อมไฟล์ meta เดิม
4. เปิด Unity แล้วรัน **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets**

สิ่งที่นำออกใน 0.5.0: `SendLCGNetworkEvent`, `ForceSendPacket`, `LCGNetwork.RequestObjectSync`, การตั้งค่า **LCG network diagnostics** และเมนู **Tools > LCGUdonSharp** ส่วน Localization อยู่ที่ [LCG Localization](../lcglocalization/intro)

## เมนูและการตั้งค่า

| คำสั่ง | หน้าที่ |
|---|---|
| **Edit > Project Settings > Udon Sharp > LCGUdonSharp** | ความจุ async task frame (1-256 frame ต่อ behaviour) เก็บใน `ProjectSettings/LogicCuteGuy.LCGUdonSharp.json` |
| **Assets > Create > U# Script** | สร้าง U# script พร้อม program asset |
| **Assets > Create > U# Assembly Definition** | ลงทะเบียน `.asmdef` ที่เลือกกับ UdonSharp |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | compile program asset ทั้งหมดใหม่ |

## ตรวจปัญหา

ถ้า script compile ใน Unity ได้แต่ UdonSharp มองไม่เห็น แปลว่า `.asmdef` น่าจะยังไม่ได้ลงทะเบียน ให้เลือก `.asmdef` แล้วเลือก **Assets > Create > U# Assembly Definition** จากนั้น refresh asset ทั้งหมด

## การถอนการติดตั้ง

ลบแพ็กเกจออกได้เลย UdonSharp ของ SDK ไม่เคยถูกแก้ จึง compile ได้เองหลัง reload domain ครั้งถัดไป สคริปต์ที่ใช้ syntax เฉพาะของ LCG จะขึ้น error จากคอมไพเลอร์เดิม

## ดูเพิ่ม

- [การแก้ปัญหา](./troubleshooting.md)
- [ตัวอย่าง](./examples.md)
