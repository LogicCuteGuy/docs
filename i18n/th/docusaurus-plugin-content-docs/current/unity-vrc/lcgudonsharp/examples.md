---
sidebar_position: 9
---

# ตัวอย่าง

> เวอร์ชันเอกสาร: **0.5.0**

:::warning 0.5.0 ไม่มีตัวอย่างมาให้
release ZIP ของ 0.5.0 และ repository ที่ tag นั้นไม่มีไฟล์ตัวอย่าง `package.json` ยังระบุ sample ชื่อ **LCGUdonSharp Examples** แต่ไม่มีโฟลเดอร์ จึงไม่มีอะไรให้ import
:::

## ตัวอย่างชุดเก่า

โฟลเดอร์ [`Example/` ที่ tag 0.3.12](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example) ยังอ่านเป็นโค้ดอ้างอิงได้

| โฟลเดอร์ | ครอบคลุม |
|---|---|
| [`AsyncAwait`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/AsyncAwait) | `Task.Yield()`, `Task.Delay`, await ของ string, image และ video, GPU readback, serialization, Creator Economy |
| [`Interfaces`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/Interfaces) | `INumberOperation` ที่มีตัว implement แบบบวกและคูณ ใส่ 10 ได้ 15 และ 30 |
| [`ExtendedLanguage`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ExtendedLanguage) | `try`/`catch`/`finally`, `ref`/`out`, closed generic, interface diamond, LINQ closure, `dynamic`, `Span<T>` |
| [`GenericRestrictions`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/GenericRestrictions) | collection, JSON และข้อมูล binary พร้อมโครงสร้างที่คอมไพเลอร์ปฏิเสธ |
| [`ScriptableObjects`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ScriptableObjects) | ข้อมูลร้านค้าและอุปกรณ์แบบ ScriptableObject |

ตัวอย่างเหล่านี้เขียนสำหรับคอมไพเลอร์ 0.3.x และ **ยังไม่ได้ตรวจกับ 0.5.0** ถ้าต้องการลอง ให้สร้างสคริปต์ด้วย **Assets > Create > U# Script** แล้ววางโค้ดส่วนที่ต้องการ

อย่า import โฟลเดอร์เก่าทั้งหมด เพราะตัวอย่าง networking ใช้สิ่งที่ 0.5.0 นำออกแล้ว เรื่อง networking ดู [LCG Network System](../lcgnetwork/intro) เรื่อง localization ดู [LCG Localization](../lcglocalization/intro)

:::tip program asset และการลงทะเบียน assembly
ไฟล์ U# `.cs` ทุกไฟล์ต้องมี `UdonSharpProgramAsset` ชื่อเดียวกัน ซึ่ง **Assets > Create > U# Script** สร้างให้ทั้งคู่ สคริปต์นอก `Assembly-CSharp` ต้องลงทะเบียน `.asmdef` ด้วย **Assets > Create > U# Assembly Definition** ด้วย
:::

## ดูเพิ่ม

- [การติดตั้งและตั้งค่า](./install.md)
- [การแก้ปัญหา](./troubleshooting.md)
