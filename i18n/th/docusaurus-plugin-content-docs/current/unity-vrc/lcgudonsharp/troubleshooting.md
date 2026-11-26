---
sidebar_position: 10
---

# การแก้ปัญหา

> เวอร์ชันเอกสาร: **0.5.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

| ปัญหา | วิธีแก้ |
|---|---|
| “The associated script cannot be loaded” | ไฟล์ `.cs` ไม่มี `UdonSharpProgramAsset` ชื่อเดียวกัน ให้ใช้ **Assets > Create > U# Script** เพื่อสร้างทั้งสองไฟล์พร้อมกัน หรือคัดลอก `.asset` ไปพร้อมกับ `.cs` |
| มี `MissingMethodException` จาก `LCGUdonSharpHook` ตอนโหลด | Worlds SDK ที่ติดตั้งเปลี่ยนเมธอดของ UdonSharp ที่ถูก hook ให้ใช้ SDK ในช่วง `>=3.10.6 <3.11.0` ระหว่างนั้น UdonSharp ของเดิมจะ compile และ syntax เฉพาะของ LCG จะขึ้น error |
| program asset หา script ไม่เจอหลังอัปเกรดจาก 0.4.x | ไฟล์ meta ของ UdonSharp ใน SDK ได้ GUID ใหม่ ให้ติดตั้ง `com.vrchat.worlds` ใหม่จาก VCC แล้ว refresh asset ทั้งหมด |
| ติดตั้งจาก release ZIP ไม่ได้ | ใช้ไฟล์ `com.logiccuteguy.lcgudonsharp-0.5.0.zip` ห้ามใช้ **Source code (zip)** อัตโนมัติของ GitHub |
| ต้องการถอนการติดตั้ง | ลบแพ็กเกจ ไม่ต้องย้อนอะไรอีก |
| script compile ใน Unity ได้แต่ UdonSharp มองไม่เห็น | assembly ยังไม่ได้ลงทะเบียน `Assembly-CSharp` ถูก scan เสมอ ส่วน script ใน `.asmdef` ต้องมี `UdonSharpAssemblyDefinition` ที่ชี้ไปยัง `.asmdef` นั้น |

## รายงานปัญหาคอมไพเลอร์

แจ้งได้ที่ [repository ของโปรเจกต์](https://github.com/LogicCuteGuy/LCGUdonSharp) พร้อมเวอร์ชัน Unity, เวอร์ชัน Worlds SDK และโค้ดที่สั้นที่สุดที่ทำให้เกิดปัญหา

## ดูเพิ่ม

- [การติดตั้งและตั้งค่า](./install.md)
