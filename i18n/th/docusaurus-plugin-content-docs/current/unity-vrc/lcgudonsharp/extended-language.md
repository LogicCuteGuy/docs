---
sidebar_position: 6
---

# ความสามารถภาษาเพิ่มเติม

> เวอร์ชันเอกสาร: **0.3.4**

LCGUdonSharp แปลงรูปแบบ C# เพิ่มเติมเป็น loop, array และ local variable ที่ Udon ใช้งานได้ตอน build

## ref / out

ใช้กับ local, field, array element, `out var` และ recursion ได้

```csharp
Swap(ref values[0], ref values[1]);
AddUntil(ref values[0], target, out int recursiveCalls);
```

## LINQ closure

Lambda ที่ capture ค่าไว้จะถูกแปลงเป็น loop โดยไม่สร้าง delegate ตอน runtime

```csharp
int[] result = values
    .Where(value => value >= minimum)
    .Select(value => value * localScale)
    .ToArray();
```

ยังรองรับ closed generic static helper, closed generic interface diamond, `dynamic` ที่พิสูจน์ type ได้ และ local `Span<T>` บน array ส่วน open generic, generic heap object และรูปแบบ collection/interface ที่ไม่รองรับจะถูกปฏิเสธตอน build

- [Collection, JSON, Byte และ Bit](./collections-json.md)
- [ตัวอย่าง](./examples.md)
