---
sidebar_position: 5
---

# การจัดการ Exception แบบซิงโครนัส

> เวอร์ชันเอกสาร: **0.3.4**

ใช้งาน `try`/`catch`/`finally`, explicit throw, rethrow และ guard สำหรับ null, index และการหารจำนวนเต็มด้วยศูนย์ที่คอมไพเลอร์จัดการ แม้ Udon ไม่มี exception opcode

```csharp
try
{
    LoadSlot(selectedIndex);
}
catch (ArgumentException exception)
{
    Debug.LogError(exception.Message);
}
finally
{
    isBusy = false;
}
```

คอมไพเลอร์ guard null receiver, index ของ array/string และการหารหรือ modulo จำนวนเต็ม ภายใน protected code และ call graph ของ behaviour เดียวกัน `UdonException` มี `Kind`, `Code`, `Operation` และ `Message`

:::caution เป็นการจำลองแบบ synchronous
ข้อผิดพลาดจริงภายใน Udon extern จับไม่ได้ รวมถึง custom event, network call, behaviour อื่น, floating-point division, overflow, cast และ SDK domain failure
:::

การใช้ `await` ภายใน `try` จะถูกปฏิเสธด้วย diagnostic
