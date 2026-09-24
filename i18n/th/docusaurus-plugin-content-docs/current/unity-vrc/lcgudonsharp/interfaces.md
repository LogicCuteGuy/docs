---
sidebar_position: 3
---

# อินเทอร์เฟซ C#

> เวอร์ชันเอกสาร: **0.3.4**

ประกาศ C# interface ปกติและ implement ใน `UdonSharpBehaviour` ได้ รองรับ parameter, return value, property, หลาย implementation และ interface array

```csharp
public interface INumberOperation
{
    int Apply(int value);
    int LastResult { get; }
}

public class AddNumberOperation : UdonSharpBehaviour, INumberOperation
{
    [SerializeField] private int amount = 5;
    private int _lastResult;
    public int LastResult => _lastResult;

    public int Apply(int value)
    {
        _lastResult = value + amount;
        return _lastResult;
    }
}
```

Unity serialize field ชนิด interface โดยตรงไม่ได้ ให้เก็บ concrete component แล้วกำหนดให้ตัวแปร local ชนิด interface ตอน runtime

ไม่รองรับ generic interface/method, interface inheritance, default/static member, event, indexer, explicit implementation และชื่อที่ชนกับ Udon event ในตัว

- [ความสามารถภาษาเพิ่มเติม](./extended-language.md)
- [ตัวอย่าง](./examples.md)
