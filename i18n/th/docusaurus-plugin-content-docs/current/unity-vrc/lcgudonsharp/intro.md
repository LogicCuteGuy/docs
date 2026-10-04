---
sidebar_position: 1
---

# ภาพรวม LCGUdonSharp

> เวอร์ชันเอกสาร: **0.3.8** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.8)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) คือคอมไพเลอร์ UdonSharp สำหรับ VRChat ที่รองรับ C# interface, `async`/`await` ตอน build, `try`/`catch`/`finally` แบบ synchronous, C# collection และ JSON, ความสามารถภาษาเพิ่มเติม และระบบ packet network แบบกำหนดเอง ไฟล์ที่แก้ไขทั้งหมดอยู่ใน `Packages/com.logiccuteguy.lcgudonsharp` โดยไม่แก้ Worlds SDK หรือ `Assets`

:::info สถานะ
Interface, synchronous exception, async lowering และความสามารถภาษาเพิ่มเติมพร้อมสำหรับทดสอบใน world ส่วน `[LCGPacket]` / `LCGNetworkZone` ยังเป็นฟีเจอร์ทดลองและ protocol อาจเปลี่ยนระหว่างเวอร์ชัน
:::

## สิ่งใหม่ใน 0.3.8

LCGUdonSharp 0.3.8 เพิ่ม [snapshot ข้อมูล ScriptableObject](./scriptableobjects.md) แบบซ้อนและ polymorphic พร้อม type test และ checked cast, ตรวจ cycle/ความลึก และตัวอย่างอุปกรณ์แบบ local ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่หลังอัปเดต เพราะ snapshot ใช้ layout ใหม่ที่มี runtime type tag

## สิ่งใหม่ใน 0.3.7

รองรับ asset `ScriptableObject` ที่สร้างเองเป็น snapshot ข้อมูลแบบอ่านอย่างเดียวใน Udon อ่าน serialized field ตามชนิดข้อมูล, field ที่สืบทอด และ array ของ asset ได้ การอ่าน array จะคืนสำเนาเพื่อป้องกันการแก้ข้อมูลต้นฉบับ การอ่าน heap กลับยังรักษา asset ที่กำหนดใน Inspector และชนิด native ของ SDK ทำงานตามเดิม

ดูชนิดข้อมูลที่รองรับ ข้อจำกัด และตัวอย่างร้านค้าแบบ local ใน [ข้อมูล ScriptableObject](./scriptableobjects.md) นำเข้าตัวอย่างเสริมหลัง setup คอมไพเลอร์เสร็จ และ build world ใหม่เมื่อแก้ข้อมูลหรือ schema ของ asset

## สิ่งใหม่ใน 0.3.6

- Object motion ใช้ bounded queue ที่เก็บ state ล่าสุดแยกตาม recipient พร้อม batch delivery, congestion backoff, remote interpolation และ bounded prediction
- ตอนเข้า zone และ `OnPlayerRestored` ระบบกู้ scene field/object snapshot ด้วย retry ที่จำกัดและหยุดเมื่อ player ออก
- การกู้ ownership หลัง disconnect จะรักษา ownership ของ member ที่ยังถูกต้องและซ่อมการโอนผ่าน ownership callback โดยจับคู่ผู้เล่นที่ออกด้วย identity ก่อน ID ที่อาจซ้ำหรือไม่ valid
- Packet receiver bind กลับจาก serialized compiled program ได้เมื่อ domain reload ล้าง source program cache
- เพิ่มตัวอย่าง native/LCG lamp, moving cube, high-bandwidth แบบ opt-in, prefab ที่ต่อครบ และคู่มือตั้งค่าภาษาไทย

หลังอัปเดตให้ compile UdonSharp program ทั้งหมดและ build world ใหม่ เพราะ build รุ่นเก่า decode motion batch envelope ของ 0.3.6 ไม่ได้

## ความสามารถหลัก

| ความสามารถ | รายละเอียด |
|---|---|
| C# Interface | Method, parameter, return value, property, หลาย implementation และ interface array |
| Async/Await | แปลง `Task.Yield()`, `Task.Delay(int)` และ VRChat SDK await ตอน build |
| Synchronous Exception | `try`/`catch`/`finally`, throw, rethrow และ guard สำหรับ null, index และหารด้วยศูนย์ |
| Extended Language | `ref`/`out`, closed generic, LINQ closure, `dynamic`, `Span<T>` บน array |
| Collection และ JSON | แปลง `List<T>` / `Dictionary<TKey,TValue>` เป็น VRChat data container พร้อม API แบบ `System.Text.Json` |
| Manual Packet Network | Frame มีเวอร์ชัน, ตรวจ authority, ป้องกัน replay, รวมการส่ง และส่งถึง player ที่ระบุ |
| Network Zone | `LCGNetworkZone` จำกัด packet และ ownership ตาม trigger volume รองรับ Continuous behaviour ที่ไม่มี synced field และมี native sync passthrough แบบ instance-wide ให้เปิดใช้อย่างชัดเจน |
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
