---
sidebar_position: 4
---

# Async / Await

> เวอร์ชันเอกสาร: **0.3.4**

LCGUdonSharp แปลง `async`/`await` เป็น frame-pool continuation ตอน build โดยรองรับ `async void` ที่ไม่มี parameter, `Task.Yield()` แบบลำดับตรง, `Task.Delay(int)` ที่ใช้ค่าคงที่บวก และ VRChat SDK await หนึ่งรายการต่อ behaviour

```csharp
public override async void Interact()
{
    await Task.Yield();
    Debug.Log("ทำต่อในเฟรมถัดไป");
    await Task.Delay(1000);
    Debug.Log("ทำต่อหลังหนึ่งวินาที");
}
```

## SDK await ที่รองรับ

- `VRCAsync.LoadStringAsync`
- `VRCAsync.LoadImageAsync`
- `VRCAsync.LoadVideoAsync` / `WaitForVideoEndAsync`
- `VRCAsync.RequestGPUReadbackAsync`
- `VRCAsync.RequestSerializationAsync`
- รายการ product / purchase / owner ของ Creator Economy

Callback แบบเดิมทำงานก่อน แล้ว continuation ที่สร้างขึ้นจึงทำงานต่อ

## ข้อจำกัด

- Async method เป็น single-flight การเรียกครั้งที่สองระหว่างรอจะถูกละเว้น
- String download จับคู่ด้วย URL อย่าเริ่ม request URL เดียวกันซ้อนใน behaviour เดียว
- การเก็บ local/parameter, nested await, explicit return และกำหนดผล `Task<T>` โดยตรงจะเกิด diagnostic
- ใช้ `await` ภายใน `try` ไม่ได้

[ตัวอย่าง AsyncAwait ต้นทาง](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/AsyncAwait/README.md)
