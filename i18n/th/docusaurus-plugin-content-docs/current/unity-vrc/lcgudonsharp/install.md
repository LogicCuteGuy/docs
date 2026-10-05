---
sidebar_position: 2
---

# การติดตั้งและตั้งค่า

> เวอร์ชันเอกสาร: **0.3.10** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10)

> **อัปเกรดจาก 0.3.2**
>
> แพ็กเกจ `0.3.2` ถูกจัดชุดไม่ถูกต้อง ทำให้โปรเจกต์ใหม่อาจไม่มี compiler payload ให้อัปเดตเป็น `0.3.10`; installer จะซ่อมให้หลัง Unity refresh

## ข้อกำหนด

LCGUdonSharp 0.3.10 ติดตั้ง dependency แบบ embedded **SBP compatibility 1.21.26** ผ่าน VPM ก่อน Unity compile เพื่อกัน VRChat SDK `ExtensionMethods` ชนทั้งตอนติดตั้งใหม่และอัปเกรด ใช้ฐาน Unity SBP 1.21.25 โดยรักษา source/GUID และ Unity Companion License และยังอยู่หลังสร้าง `Library` ใหม่ Unity Localization 1.4.5 ยังรองรับ ดู[การติดตั้ง](./install.md) การติดตั้งเองต้องใช้ release ZIP **ทั้งสองไฟล์**

- Unity **2022.3**
- VRChat Worlds SDK **3.10.5** เท่านั้น

## แนะนำ: VCC หรือ ALCOM

เพิ่ม[รายการ VPM ของ LogicCuteGuy](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) แล้วติดตั้ง LCGUdonSharp `0.3.10`

ติดตั้งเองให้ **ปิด Unity ก่อน** ดาวน์โหลด [LCGUdonSharp 0.3.10 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10) และ [SBP compatibility 1.21.26 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/sbp-compatibility-1.21.26) แล้วแตกเนื้อหาลง `Packages/com.logiccuteguy.lcgudonsharp` และ `Packages/com.unity.scriptablebuildpipeline` ตามลำดับ ให้ `package.json` อยู่ตรงใต้โฟลเดอร์แพ็กเกจแต่ละอันก่อนเปิด Unity การใช้ `file:` reference ของ LCGUdonSharp ก็ยังต้อง embedded SBP ในโปรเจกต์ ห้ามใช้ **Source code (zip)** อัตโนมัติ และอย่าพึ่งแค่แก้ PackageCache หรือ hook หลัง compile เพราะการสร้าง cache ใหม่ทำให้ fix หายได้

## ขั้นตอนตั้งค่า

1. ติดตั้ง `0.3.10` พร้อม SBP compatibility dependency ผ่าน VCC/ALCOM หรือทำขั้นตอนสอง ZIP ด้านบนขณะปิด Unity
2. เปิด Unity และรอ compile ให้เสร็จ
3. หากจำเป็น ใช้ **Tools > LCGUdonSharp > Install or Repair**
4. Build และทดสอบ world ตามปกติ

หลังติดตั้งคอมไพเลอร์อัตโนมัติเสร็จ ให้นำเข้า **LCGUdonSharp Examples** จาก sample ของแพ็กเกจใน Unity Package Manager ไฟล์ ZIP เก็บตัวอย่างใน `Samples~/Examples` ส่วนคู่มือใน repository ใช้ชื่อ `Example/` ดูร้านค้าใหม่ใน [ข้อมูล ScriptableObject](./scriptableobjects.md)

## เมนู

| คำสั่ง | หน้าที่ |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | รัน setup ใหม่ |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | คืน UdonSharp ของ SDK และปิด setup อัตโนมัติ ให้ใช้ก่อนถอนแพ็กเกจ |
| **Assets > Create > U# Script** | สร้าง U# script พร้อม program asset |
| **Assets > Create > U# Assembly Definition** | ลงทะเบียน `.asmdef` ที่เลือกกับ UdonSharp |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | Compile program asset ทั้งหมดใหม่ |

ถ้า script compile ใน Unity แต่ UdonSharp มองไม่เห็น ให้สร้าง U# assembly definition สำหรับ `.asmdef` แล้ว refresh asset ทั้งหมด

## Localization ใน 0.3.9

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

การติดตั้งปัจจุบัน: Unity Localization **1.4.5** และ embedded `com.unity.scriptablebuildpipeline` **1.21.26** ผ่าน VPM รุ่น compatibility นี้ใช้ฐาน Unity **1.21.25** ไม่ใช่ upstream Unity SBP รุ่นใหม่ Manifest ยังประกาศ UPM 1.21.25 แต่ pin VPM compatibility dependency เป็น 1.21.26 ต้องติดตั้งก่อน Unity compile ดู[การติดตั้ง](./install.md)
