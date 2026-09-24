---
sidebar_position: 7
---

# คอลเลกชัน, JSON, ไบต์ และบิต

> เวอร์ชันเอกสาร: **0.3.4**

`List<T>` และ `Dictionary<TKey,TValue>` แบบตรงชนิดจะถูกแปลงเป็นการทำงานของ VRChat `DataList`, `DataDictionary` และ `DataToken` ส่วนโค้ดที่ใช้ชนิด SDK หรือ `VRCJson` โดยตรงจะไม่ถูกเปลี่ยน

```csharp
List<int> values = new List<int> { 1, 2, 3 };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "alpha", 10 },
};
string json = JsonSerializer.Serialize(scores);
Dictionary<string, int> copy =
    JsonSerializer.Deserialize<Dictionary<string, int>>(json);
```

## สิ่งที่รองรับ

- Constructor, initializer, Count, Capacity และ typed indexer
- `foreach` และ operation เพิ่ม แทรก ลบ ค้นหาที่ใช้ทั่วไป
- `TryGetValue`, Keys/Values และ typed `ToArray`
- Field แบบ collection ซ้อนและ array ของ collection
- แยก null ออกจากค่าว่าง และรักษา token type ของ primitive/enum

ไม่รองรับ collection interface, derived collection, custom comparer, nullable annotation, Inspector serialization และ collection LINQ

## JSON และการ sync

มี `System.Text.Json` facade บน VRCJson Dictionary ที่มี string key จะเป็น JSON object ปกติ ส่วน key ชนิดอื่นที่ปลอดภัยใช้ `$lcgDictionary` envelope ไม่รองรับ object reference, `NaN` และ Infinity

Collection ที่ sync ต้องเป็น field ที่ไม่แสดงใน Inspector และอยู่ใน Manual-sync behaviour

```csharp
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class SharedValues : UdonSharpBehaviour
{
    [UdonSynced, System.NonSerialized]
    private List<int> values = new List<int>();
}
```

ไม่รองรับ Continuous sync, `FieldChangeCallback`, Inspector serialization และ element ที่แปลง JSON ไม่ได้ นอกจากนี้ยังใช้ `byte[]`, bitwise operator, `BitConverter`, `Buffer.BlockCopy`, UTF-8 และ `DataToken.Bitcast` ได้

:::caution Namespace ชนกัน
การติดตั้ง assembly `System.Text.Json` จริงแยกต่างหากอาจชนกับ intrinsic facade
:::
