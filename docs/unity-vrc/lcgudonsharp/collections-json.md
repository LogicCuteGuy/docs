---
sidebar_position: 7
---

# Collections, JSON, Bytes & Bits

> Documentation version: **0.3.4**

LCGUdonSharp lowers exact `List<T>` and `Dictionary<TKey,TValue>` syntax to VRChat `DataList`, `DataDictionary`, and `DataToken` operations. Existing code that directly uses the SDK data types or `VRCJson` remains unchanged.

```csharp
using System.Collections.Generic;
using System.Text.Json;

List<int> values = new List<int> { 1, 2, 3 };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "alpha", 10 },
};

scores["count"] = values.Count;
string json = JsonSerializer.Serialize(scores,
    new JsonSerializerOptions { WriteIndented = true });
Dictionary<string, int> copy =
    JsonSerializer.Deserialize<Dictionary<string, int>>(json);
```

## Supported collection behavior

- Constructors and collection initializers
- Count, capacity, and typed indexers
- `foreach` and common add/insert/remove/search operations
- `TryGetValue`, dictionary keys/values, and typed `ToArray`
- Nested collection fields and arrays of collections
- Exact primitive and enum token types, with distinct null and empty values

Collection interfaces, derived collection classes, custom comparers, nullable collection annotations, Inspector-serialized collection fields, and collection LINQ are rejected.

## JSON

The compiler provides a VRCJson-backed `System.Text.Json` facade. String-key dictionaries become normal JSON objects; other JSON-safe key types use the versioned `$lcgDictionary` entry envelope. JSON rejects object references, `NaN`, and infinity. Integer targets require finite, integral, in-range JSON numbers.

`TrySerialize` and `TryDeserialize` return an error string. `Serialize` and `Deserialize` throw compiler-managed `JsonException`.

:::caution Namespace conflict
The intrinsic facade occupies `System.Text.Json`. Installing a separate real `System.Text.Json` assembly can create a namespace/type conflict.
:::

## Manual synchronization

Synchronized collections must be non-Inspector fields on a Manual-sync behaviour:

```csharp
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class SharedValues : UdonSharpBehaviour
{
    [UdonSynced, System.NonSerialized]
    private List<int> values = new List<int>();

    public void AddValue(int value)
    {
        values.Add(value);
        RequestSerialization();
    }
}
```

The compiler adds a hidden synchronized JSON payload and composes it into `OnPreSerialization` and `OnDeserialization`. An empty payload means `null`; `[]` and `{}` mean empty collections. Decode failures keep the current value, while encode failures keep the last valid payload.

Continuous sync, `FieldChangeCallback`, Inspector serialization, and statically non-JSON-safe synchronized elements are rejected.

## Binary APIs

Normal SDK-supported binary APIs remain available: `byte[]`, bitwise operators, `BitConverter`, `Buffer.BlockCopy`, UTF-8 encoding, and `DataToken.Bitcast`.

## See also

- [Extended Language](./extended-language.md)
- [Examples](./examples.md) — `ListTypesExample` demonstrates collections, JSON, synchronization, bytes, and bits
- [Synchronous Exception Handling](./exceptions.md) — JSON exceptions use the same compiler-managed mechanism
