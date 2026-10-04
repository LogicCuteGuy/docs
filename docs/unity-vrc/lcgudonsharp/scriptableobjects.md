---
sidebar_position: 6.5
---

# ScriptableObject Data

> Documentation version: **0.3.7**

Ordinary custom Unity `ScriptableObject` assets can be assigned directly to typed UdonSharp behaviour fields. No special base class, attribute or manual copying is needed. The compiler bakes serialized data into read-only Udon snapshots; it does not run the custom asset as a Unity object in Udon.

## Define and assign data

```csharp
using UnityEngine;
using UdonSharp;

// ItemData.cs (ordinary C# data class)
[CreateAssetMenu(menuName = "My World/Item")]
public class ItemData : ScriptableObject
{
    public string displayName;
    public int price;
    public string[] descriptions;
    public Texture2D icon;
}

// Shop.cs (paired with Shop.asset, its UdonSharpProgramAsset)
public class Shop : UdonSharpBehaviour
{
    public ItemData item;
    public override void Interact()
    {
        if (item == null) return;
        Debug.Log(item.displayName + ": " + item.price);
    }
}
```

Save the data class and behaviour in separate files, create an `ItemData` asset through **Assets > Create > My World > Item**, and assign it to `Shop.item` in the Inspector. The behaviour needs its usual paired program asset and assembly registration. The data class needs no program asset and may live in an ordinary C# assembly.

## Snapshot behavior

Each behaviour receives its own `object[]` snapshot with deterministic field ordering. Assigning one asset to multiple fields does not guarantee shared reference identity. Rebuild the world after editing asset data or its field schema; edits during play do not update snapshots.

Every array field read returns a fresh shallow copy, preserving null arrays. Cache it in a local variable when looping to avoid repeated allocations. Referenced Unity objects retain their normal mutable APIs. Heap-to-proxy reads preserve the original Inspector asset assignment and never save changes back to the asset. Native SDK types such as `UdonProduct` keep their existing Udon behavior.

## Supported data

- Public instance fields and private `[SerializeField]` fields, including inherited fields.
- Primitive numbers, booleans, characters, strings and enums.
- `Vector2/3/4`, `Quaternion`, `Color/Color32`, `Rect`, `Bounds`, `Matrix4x4`, `LayerMask` and `VRCUrl`.
- Udon-supported Unity object references, such as textures, audio clips and materials.
- One-dimensional arrays of supported field types, and behaviour fields containing arrays of data assets.

## Restrictions

The compiler rejects data-field writes, properties, instance/static methods and Unity object APIs on custom data assets. Runtime `new`/`ScriptableObject.CreateInstance`, unsupported casts, polymorphic references, nested data assets, arbitrary custom classes, collections, multidimensional/jagged data arrays and `[SerializeReference]` fields are unsupported. Data asset fields/arrays cannot use `[UdonSynced]`.

Copy values into ordinary gameplay fields when they must change or synchronize. Mutating a returned local array changes only that copy.

## Shop example

Import **LCGUdonSharp Examples** after compiler setup completes. The sample contains `Example/ScriptableObjects/ScriptableObjectShopExample.prefab`, `StrawberryMilk.asset` and `GreenTea.asset`. In `TestLCGUdonSharp.unity`, interact with the pink board at `(7, 0, 3)`: purchases reduce 100 coins to 65 and then 30, and the third purchase is refused. Replace `item` and `catalog` in the Inspector before building. `TestArrayCopy` checks that a modified local description array leaves the snapshot intact. Purchases are local and not synchronized.

See [Examples](./examples.md), [Installation](./install.md), and the [tagged upstream guide](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.7/Example/ScriptableObjects/README.md).
