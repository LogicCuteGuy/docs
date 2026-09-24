---
sidebar_position: 9
---

# ตัวอย่าง

> เวอร์ชันเอกสาร: **0.3.4**

โฟลเดอร์ `Example/` ใน [LCGUdonSharp repository](https://github.com/LogicCuteGuy/LCGUdonSharp) มี scene และ script ที่รันได้สำหรับทุกความสามารถ แต่ละ `.cs` มี `UdonSharpProgramAsset` ชื่อเดียวกัน และ `.asmdef` ของตัวอย่างมี U# assembly-definition asset แยกต่างหาก

| โฟลเดอร์ | เนื้อหา |
|---|---|
| `AsyncAwait` | Yield, Delay, string/image/video, GPU readback, serialization, Creator Economy |
| `Interfaces` | การ implement `INumberOperation` แบบ Add/Multiply |
| `Networking` | Packet field/method, target delivery และ zone object sync |
| `GenericRestrictions` | Collection/JSON/binary และรูปแบบ generic/interface ที่ถูกปฏิเสธ |
| `ExtendedLanguage` | Exception, ref/out, generic, LINQ, dynamic และ Span |

## วิธีรัน

1. แก้ C# compile error อื่นให้หมด
2. เปิด `Example/TestLCGUdonSharp.unity` หรือเพิ่ม example component ใน scene
3. เข้า Play Mode และดู Console

:::tip Asset สองชนิด
U# `.cs` ทุกไฟล์ต้องมี program asset ชื่อเดียวกัน ส่วน `.asmdef` นอก `Assembly-CSharp` ต้องมี U# assembly definition สร้างได้จาก **Assets > Create > U# Script** และ **Assets > Create > U# Assembly Definition**
:::
