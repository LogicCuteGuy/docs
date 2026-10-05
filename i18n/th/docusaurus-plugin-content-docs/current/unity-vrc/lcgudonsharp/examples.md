---
sidebar_position: 9
---

# ตัวอย่าง

> เวอร์ชันเอกสาร: **0.3.9**

โฟลเดอร์ `Example/` ใน [LCGUdonSharp repository](https://github.com/LogicCuteGuy/LCGUdonSharp) มี scene และ script ที่รันได้สำหรับทุกความสามารถ แต่ละ `.cs` มี `UdonSharpProgramAsset` ชื่อเดียวกัน และ `.asmdef` ของตัวอย่างมี U# assembly-definition asset แยกต่างหาก

| โฟลเดอร์ | เนื้อหา |
|---|---|
| `AsyncAwait` | Yield, Delay, string/image/video, GPU readback, serialization, Creator Economy |
| `Interfaces` | การ implement `INumberOperation` แบบ Add/Multiply |
| `Networking` | Native/LCG lamp, packet field/method, zone moving cube และ native/LCG high-bandwidth load generator แบบ opt-in |
| `GenericRestrictions` | Collection/JSON/binary และรูปแบบ generic/interface ที่ถูกปฏิเสธ |
| `ExtendedLanguage` | Exception, ref/out, generic, LINQ, dynamic และ Span |

## วิธีรัน

1. แก้ C# compile error อื่นให้หมด
2. เปิด `Example/TestLCGUdonSharp.unity` หรือเพิ่ม example component ใน scene
3. เข้า Play Mode และดู Console

## ตัวอย่างอุปกรณ์ใน 0.3.8

`ScriptableObjectEquipmentExample.prefab` อยู่ที่ `(12, 0, 3)` ใน `TestLCGUdonSharp.unity` field `item` แบบ base type ถือ `TrainingSword.asset` และ `catalog` มี `FireSpell.asset` ด้วย แต่ละรายการอ้างอิง economy asset ของตัวเอง ดาบราคา 35 coin และ damage 45 ส่วนเวทราคา 20 coin, power 80 / mana 12 กดบอร์ดเพื่อซื้อ ใช้สวิตช์ข้างๆ หรือ `SelectNext` เปลี่ยนรายการ `TestDataFeatures` ตรวจ nested read, inherited field, type test, cast ที่สำเร็จ/null/ผิดชนิด และ defensive copy ของ nested polymorphic array การซื้อเป็นแบบ local ไม่ sync

## ร้านค้า ScriptableObject ใน 0.3.7

นำเข้า **LCGUdonSharp Examples** จาก sample ของแพ็กเกจหลังติดตั้งคอมไพเลอร์อัตโนมัติเสร็จ `Example/ScriptableObjects/ScriptableObjectShopExample.prefab` อยู่ที่ `(7, 0, 3)` ใน `Example/TestLCGUdonSharp.unity` ด้วย เมื่อกดบอร์ดสีชมพูใน ClientSim เงิน 100 จะเหลือ 65 และ 30 การซื้อครั้งที่สามถูกปฏิเสธ ข้อมูลสินค้ามาจาก `StrawberryMilk.asset` และ `GreenTea.asset` เรียก `TestArrayCopy` เพื่อตรวจการคืนสำเนา array การซื้อเป็นแบบ local และไม่ sync ระหว่างผู้เล่น

อ่าน [ข้อมูล ScriptableObject](./scriptableobjects.md) ก่อนเปลี่ยน reference `item` และ `catalog` ใน Inspector

## Networking prefab ใน 0.3.6

- **`NetworkExamples.prefab`** ต่อ native synced lamp นอก zone, LCG packet lamp ใน zone และ moving cube ที่ sync ผ่าน LCG ไว้ครบ ใช้ตรวจการกลับเข้า zone, late join, owner ออก และ current-state snapshot ด้วย 2 client
- **`HighBandwidthExamples.prefab`** มี load generator 2 ชุดที่หยุดไว้โดยค่าเริ่มต้น `NativeHighBandwidthExample` ส่ง Manual `[UdonSynced] byte[]` ส่วน `LCGHighBandwidthExample` ขับ converted object-sync cube ได้สูงสุด 32 ก้อนผ่าน bounded motion queue
- Dashboard ของ LCG แสดง local sample, object ที่ local เป็น owner, pending motion, batch ที่ dispatch และขนาด batch ล่าสุด ค่าเหล่านี้เป็น diagnostics ไม่ใช่หลักฐาน remote delivery หรือ network throughput
- อ่าน[คู่มือตั้งค่าและ checklist สำหรับ 2 client ภาษาไทย](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/Networking/README.th.md)

Cross-client delivery, late join, ownership contention, bandwidth และ FPS ต้องตรวจด้วย VRChat Build & Test หลาย client ส่วน ClientSim คนเดียวตรวจได้เฉพาะ compile, wiring และ local interaction

:::tip Asset สองชนิด
U# `.cs` ทุกไฟล์ต้องมี program asset ชื่อเดียวกัน ส่วน `.asmdef` นอก `Assembly-CSharp` ต้องมี U# assembly definition สร้างได้จาก **Assets > Create > U# Script** และ **Assets > Create > U# Assembly Definition**
:::

## Localization ใน 0.3.9

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต
