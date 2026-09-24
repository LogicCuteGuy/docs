---
sidebar_position: 10
---

# การแก้ปัญหา

> เวอร์ชันเอกสาร: **0.3.4**

| ปัญหา | วิธีแก้ |
|---|---|
| “The associated script cannot be loaded” | เพิ่ม `UdonSharpProgramAsset` ที่ใช้ชื่อเดียวกับ `.cs` |
| Unity compile แต่ UdonSharp มองไม่เห็น | สร้าง `UdonSharpAssemblyDefinition` ที่ชี้ไปยัง `.asmdef` |
| ติดตั้งใหม่แล้วไม่มี compiler payload | อัปเดตจาก `0.3.2` ที่จัดแพ็กเกจผิดเป็น `0.3.4` แล้วใช้ **Install or Repair** |
| ติดตั้ง release ZIP ไม่ได้ | ใช้ `com.logiccuteguy.lcgudonsharp-0.3.4.zip` ที่มีชื่อชัดเจน ห้ามใช้ **Source code (zip)** |
| Installer หยุดทันที | ต้องใช้ Worlds SDK `3.10.5` ตรงเวอร์ชัน |
| มี `UdonSharp.*` assembly ซ้ำ | ใช้ **Tools > LCGUdonSharp > Install or Repair** |
| Packet field ไม่ sync หลังอัปเกรด | Compile U# program ทั้งหมดและ build world ใหม่ |
| ต้องการถอนแพ็กเกจ | ใช้ **Restore VRChat UdonSharp and Disable Auto Setup** ก่อน |

เมื่อรายงานปัญหา ให้แนบเวอร์ชัน Unity, เวอร์ชัน Worlds SDK และโค้ดสั้นที่สุดที่ทำให้เกิดปัญหา: [GitHub Issues](https://github.com/LogicCuteGuy/LCGUdonSharp/issues)
