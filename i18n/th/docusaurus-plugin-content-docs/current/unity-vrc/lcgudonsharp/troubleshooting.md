---
sidebar_position: 10
---

# การแก้ปัญหา

> เวอร์ชันเอกสาร: **0.3.11**

| ปัญหา | วิธีแก้ |
|---|---|
| “The associated script cannot be loaded” | เพิ่ม `UdonSharpProgramAsset` ที่ใช้ชื่อเดียวกับ `.cs` |
| Unity compile แต่ UdonSharp มองไม่เห็น | สร้าง `UdonSharpAssemblyDefinition` ที่ชี้ไปยัง `.asmdef` |
| ติดตั้งใหม่แล้วไม่มี compiler payload | อัปเดตจาก `0.3.2` ที่จัดแพ็กเกจผิดเป็น `0.3.11` แล้วใช้ **Install or Repair** |
| ติดตั้ง release ZIP ไม่ได้ | ใช้ `com.logiccuteguy.lcgudonsharp-0.3.11.zip` ที่มีชื่อชัดเจน ห้ามใช้ **Source code (zip)** |
| เวอร์ชัน Worlds SDK ไม่ตรง 3.10.5 | ตั้งแต่ `0.3.11` installer เตือนแทนการบล็อก payload (build จาก SDK 3.10.5) ยังติดตั้งตามเดิม และใช้ **Tools > LCGUdonSharp > Restore** ย้อนกลับไปยัง UdonSharp ต้นฉบับที่สำรองไว้ |
| มี `UdonSharp.*` assembly ซ้ำ | ใช้ **Tools > LCGUdonSharp > Install or Repair** |
| Packet field ไม่ sync หลังอัปเกรด | Compile U# program ทั้งหมดและ build world ใหม่ |
| Build ล้มเหลวรอบ `LCGNetworkZone` | Field `[UdonSynced]` แบบ native จะถูกปฏิเสธหากไม่เปิด **Allow Native Sync Passthrough** ส่วน Continuous behaviour ที่ไม่มี synced field ใช้ได้อย่างปลอดภัย Udon Graph, zone parent/child ที่ซ้อนกัน และ PlayerObject template ใน hierarchy เดียวกันจะถูกปฏิเสธ |
| ต้องการถอนแพ็กเกจ | ใช้ **Restore VRChat UdonSharp and Disable Auto Setup** ก่อน |

เมื่อรายงานปัญหา ให้แนบเวอร์ชัน Unity, เวอร์ชัน Worlds SDK และโค้ดสั้นที่สุดที่ทำให้เกิดปัญหา: [GitHub Issues](https://github.com/LogicCuteGuy/LCGUdonSharp/issues)

## Localization ใน 0.3.9

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

## SDK/SBP compile ชนใน 0.3.10

LCGUdonSharp 0.3.10 ติดตั้ง dependency แบบ embedded **SBP compatibility 1.21.26** ผ่าน VPM ก่อน Unity compile เพื่อกัน VRChat SDK `ExtensionMethods` ชนทั้งตอนติดตั้งใหม่และอัปเกรด ใช้ฐาน Unity SBP 1.21.25 โดยรักษา source/GUID และ Unity Companion License และยังอยู่หลังสร้าง `Library` ใหม่ Unity Localization 1.4.5 ยังรองรับ ดู[การติดตั้ง](./install.md) การติดตั้งเองต้องใช้ release ZIP **ทั้งสองไฟล์**

ติดตั้งเองให้ **ปิด Unity ก่อน** ดาวน์โหลด [LCGUdonSharp 0.3.10 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10) และ [SBP compatibility 1.21.26 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/sbp-compatibility-1.21.26) แล้วแตกเนื้อหาลง `Packages/com.logiccuteguy.lcgudonsharp` และ `Packages/com.unity.scriptablebuildpipeline` ตามลำดับ ให้ `package.json` อยู่ตรงใต้โฟลเดอร์แพ็กเกจแต่ละอันก่อนเปิด Unity การใช้ `file:` reference ของ LCGUdonSharp ก็ยังต้อง embedded SBP ในโปรเจกต์ ห้ามใช้ **Source code (zip)** อัตโนมัติ และอย่าพึ่งแค่แก้ PackageCache หรือ hook หลัง compile เพราะการสร้าง cache ใหม่ทำให้ fix หายได้

## คำเตือน SDK ที่ไม่ได้ทดสอบใน 0.3.11

ตั้งแต่ `0.3.11` installer เตือนแทนการบล็อกเมื่อ VRChat Worlds SDK ที่ติดตั้งอยู่ไม่ตรงกับเวอร์ชันที่รองรับ `3.10.5` payload (build จาก SDK 3.10.5) ยังติดตั้งตามเดิม พร้อมแจ้งใน Console ว่า **Tools > LCGUdonSharp > Restore** ย้อนกลับไปยัง UdonSharp ต้นฉบับที่สำรองไว้ และในรุ่นเดียวกันตัวอย่าง **LCGUdonSharp Examples** ถูกประกาศใน `package.json` จึงแสดงใน Package Manager ให้นำเข้าหลังติดตั้งคอมไพเลอร์อัตโนมัติเสร็จ

ติดตั้งเองให้ **ปิด Unity ก่อน** ดาวน์โหลด [LCGUdonSharp 0.3.11 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.11) และ [SBP compatibility 1.21.26 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/sbp-compatibility-1.21.26) แล้วแตกเนื้อหาลง `Packages/com.logiccuteguy.lcgudonsharp` และ `Packages/com.unity.scriptablebuildpipeline` ตามลำดับ ให้ `package.json` อยู่ตรงใต้โฟลเดอร์แพ็กเกจแต่ละอันก่อนเปิด Unity การใช้ `file:` reference ของ LCGUdonSharp ก็ยังต้อง embedded SBP ในโปรเจกต์
