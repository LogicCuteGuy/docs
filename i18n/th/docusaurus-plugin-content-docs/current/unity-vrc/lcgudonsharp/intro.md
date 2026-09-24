---
sidebar_position: 1
---

# ภาพรวม LCGUdonSharp

> เวอร์ชันเอกสาร: **0.3.4** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) คือคอมไพเลอร์ UdonSharp สำหรับ VRChat ที่รองรับ C# interface, `async`/`await` ตอน build, `try`/`catch`/`finally` แบบ synchronous, C# collection และ JSON, ความสามารถภาษาเพิ่มเติม และระบบ packet network แบบกำหนดเอง ไฟล์ที่แก้ไขทั้งหมดอยู่ใน `Packages/com.logiccuteguy.lcgudonsharp` โดยไม่แก้ Worlds SDK หรือ `Assets`

:::info สถานะ
Interface, synchronous exception, async lowering และความสามารถภาษาเพิ่มเติมพร้อมสำหรับทดสอบใน world ส่วน `[LCGPacket]` / `LCGNetworkZone` ยังเป็นฟีเจอร์ทดลองและ protocol อาจเปลี่ยนระหว่างเวอร์ชัน
:::

## ความสามารถหลัก

| ความสามารถ | รายละเอียด |
|---|---|
| C# Interface | Method, parameter, return value, property, หลาย implementation และ interface array |
| Async/Await | แปลง `Task.Yield()`, `Task.Delay(int)` และ VRChat SDK await ตอน build |
| Synchronous Exception | `try`/`catch`/`finally`, throw, rethrow และ guard สำหรับ null, index และหารด้วยศูนย์ |
| Extended Language | `ref`/`out`, closed generic, LINQ closure, `dynamic`, `Span<T>` บน array |
| Collection และ JSON | แปลง `List<T>` / `Dictionary<TKey,TValue>` เป็น VRChat data container พร้อม API แบบ `System.Text.Json` |
| Manual Packet Network | Frame มีเวอร์ชัน, ตรวจ authority, ป้องกัน replay, รวมการส่ง และส่งถึง player ที่ระบุ |
| การติดตั้งแบบสะอาด | Setup อัตโนมัติที่ทำซ้ำได้ พร้อม backup/restore โดยไม่แก้ SDK |

## คำสำคัญ

- **Program asset (`UdonSharpProgramAsset`)**: `.asset` ที่จับคู่กับ U# script หนึ่งไฟล์ โดยอยู่โฟลเดอร์เดียวกันและใช้ชื่อฐานเดียวกัน
- **U# assembly definition (`UdonSharpAssemblyDefinition`)**: asset อีกชนิดที่ลงทะเบียน `.asmdef` ให้ UdonSharp compile
- **Assembly scanning**: `Assembly-CSharp` ถูกสแกนเสมอ assembly อื่นต้องมี U# assembly definition
- **Extern**: Unity/SDK method ที่ตรงกับ Udon node ในตัว ข้อผิดพลาดภายใน extern ไม่สามารถจับด้วย `try`/`catch`

## วิธีทำงาน

Bootstrap installer ตรวจ Worlds SDK `3.10.5`, สำรอง UdonSharp ที่มากับ SDK ไว้ใน `Library/LogicCuteGuy.LCGUdonSharp/Backups` และเปิดใช้คอมไพเลอร์ของแพ็กเกจ สถานะถูกเก็บใน `ProjectSettings/LogicCuteGuy.LCGUdonSharp.json`

คอมไพเลอร์แปลง interface call, async continuation, exception control flow, collection/JSON, C# เพิ่มเติม และ `[LCGPacket]` เป็นคำสั่งที่ Udon ใช้งานได้

## คู่มือ

- [การติดตั้งและตั้งค่า](./install.md)
- [C# Interface](./interfaces.md)
- [Async / Await](./async-await.md)
- [Synchronous Exception](./exceptions.md)
- [ความสามารถภาษาเพิ่มเติม](./extended-language.md)
- [Collection, JSON, Byte และ Bit](./collections-json.md)
- [Manual Packet Network](./networking.md)
- [ตัวอย่าง](./examples.md)
- [การแก้ปัญหา](./troubleshooting.md)

MIT © 2026 LogicCuteGuy
