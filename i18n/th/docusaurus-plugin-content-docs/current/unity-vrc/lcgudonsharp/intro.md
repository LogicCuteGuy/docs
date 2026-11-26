---
sidebar_position: 1
---

# ภาพรวม LCGUdonSharp

> เวอร์ชันเอกสาร: **0.5.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) คือคอมไพเลอร์ UdonSharp สำหรับ VRChat ที่เพิ่ม C# interface, `async`/`await` ตอน build, `try`/`catch`/`finally` แบบ synchronous, C# collection และ JSON และความสามารถภาษาเพิ่มเติม โดย hook เข้ากับ UdonSharp ของ VRChat SDK แทนการแทนที่ ไม่มีการแก้ไฟล์ของ SDK

> **สถานะ**
>
> Interface, synchronous exception, async lowering และความสามารถภาษาเพิ่มเติมพร้อมสำหรับทดสอบใน world

## สิ่งใหม่ใน 0.5.0

- **Hook ไม่ใช่แทนที่** คอมไพเลอร์ LCG compile เข้าไปใน `UdonSharp.Editor` / `UdonSharp.Runtime` ของ SDK ผ่านไฟล์ `.asmref` แล้วใช้ Harmony เปลี่ยนจุดเริ่ม compile ของเดิมมาที่ตัวเอง installer, `Payload~`, ไฟล์สำรอง และเมนู **Tools > LCGUdonSharp** ถูกนำออก
- ต้องใช้ Worlds SDK `>=3.10.6 <3.11.0` และรวมการแก้ไขคอมไพเลอร์ของ SDK 3.10.6
- **เปลี่ยนแบบไม่เข้ากันกับของเดิม:** ระบบ network ฝั่งคอมไพเลอร์ถูกนำออก (`SendLCGNetworkEvent`, `ForceSendPacket`, `LCGNetwork.RequestObjectSync` และการตั้งค่า network diagnostics) ส่วน Localization ย้ายไปที่ [LCG Localization](../lcglocalization/intro) ตั้งแต่ 0.4.0
- การตั้งค่าความจุ async frame ย้ายไปที่ **Project Settings > Udon Sharp > LCGUdonSharp**
- อัปเกรดจาก 0.4.x: ดู[การติดตั้งและตั้งค่า](./install.md#upgrading-from-04x-or-earlier)

## ความสามารถ

| ความสามารถ | สิ่งที่ได้ |
|---|---|
| **C# Interface** | interface ที่ประกาศใน source และ implement ด้วยคลาส `UdonSharpBehaviour` รองรับการเรียกเมธอด พารามิเตอร์ ค่าคืน property การ implement หลายแบบ และ array ของ interface |
| **Async/Await** | แปลงตอน build สำหรับ `await Task.Yield()`, `await Task.Delay(int)` และ SDK await หนึ่งอย่างต่อ behaviour (ดาวน์โหลด string/image, video, GPU readback, serialization, Creator Economy) |
| **Synchronous Exception** | `try`/`catch`/`finally`, `throw`, rethrow และการป้องกัน null, index และการหาร/modulo จำนวนเต็ม ที่คอมไพเลอร์จัดการเอง |
| **ความสามารถภาษา** | `ref`/`out` (รวม `out var` และ recursion), closed generic, interface diamond, LINQ lambda ที่ capture ตัวแปร, `dynamic` ที่พิสูจน์ชนิดได้, `Span<T>` ที่อิง array |
| **C# Collection และ JSON** | `List<T>` และ `Dictionary<TKey,TValue>` ถูกแปลงเป็น `DataList`/`DataDictionary` พร้อม `System.Text.Json` facade บน VRCJson |

## ทำงานอย่างไร

```text
Packages/com.logiccuteguy.lcgudonsharp
├─ Editor/UdonSharp.Editor.asmref   → UdonSharp.Editor (SDK)
│  ├─ Compiler/                     LCG compiler (namespace UdonSharp.LCGCompiler)
│  ├─ Serialization/                List/Dictionary + ScriptableObject data serializers
│  └─ LCGUdonSharpHook.cs           Harmony entry hook
└─ Runtime/UdonSharp.Runtime.asmref → VRCAsync, UdonException, System.Text.Json facade
```

ทุกครั้งที่ reload domain ตัว hook จะ patch `UdonSharpCompilerV1.Compile`, `CompileSync` และ `WaitForCompile` ของเดิมให้เรียกคอมไพเลอร์ LCG ถ้า SDK อัปเดตแล้วเปลี่ยนชื่อเมธอดที่ถูก hook จะมี log `MissingMethodException` และ UdonSharp ของเดิมจะ compile แทน

## คู่มือ

- [การติดตั้งและตั้งค่า](./install.md)
- [Interface](./interfaces.md)
- [Async/Await](./async-await.md)
- [Synchronous Exception](./exceptions.md)
- [ความสามารถภาษา](./extended-language.md)
- [Collection, JSON, Bytes และ Bits](./collections-json.md)
- [ตัวอย่าง](./examples.md)
- [การแก้ปัญหา](./troubleshooting.md)

## License

MIT © 2026 LogicCuteGuy ดูประวัติรุ่นใน [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md)
