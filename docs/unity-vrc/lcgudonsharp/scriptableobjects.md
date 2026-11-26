---
sidebar_position: 6.5
---

# ScriptableObject Data

> Documentation version: **0.5.0**

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

## Nested assets and polymorphic references

Nested custom ScriptableObject fields and arrays are supported. Derived `WeaponDefinition` and `SpellDefinition` assets can be assigned to `ItemDefinition` or `ItemDefinition[]`. Runtime type tags support `is`, declaration patterns, `as` and checked explicit casts; inherited field positions remain stable.

Upcasts preserve the snapshot. Incompatible `as` returns null; an incompatible explicit cast raises a compiler-managed `InvalidCastException`. Null casts stay null and null type tests return false. Data-asset properties and virtual methods remain unsupported; choose gameplay behavior in UdonSharp through type tests or data fields.

Repeated references within one baked graph share a snapshot. Separate top-level behaviour fields are baked separately. Base fields come first and snapshots include a runtime type tag. **After updating to 0.3.8, rebuild all Udon programs and rebake scene/prefab data: older snapshots use a different field layout.**

```csharp
// Fields and method inside an UdonSharpBehaviour.
// Data classes come from the 0.3.12 equipment example.
public ItemDefinition item;

public override void Interact()
{
    if (item == null) return;
    Debug.Log(item.economy.price);
    if (item is WeaponDefinition weapon)
        Debug.Log(weapon.damage);
    SpellDefinition spell = item as SpellDefinition;
    if (spell != null) Debug.Log(spell.power);
}
```

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

Data-field writes, properties, instance/static methods, Unity object APIs on custom data assets, runtime `new`/`ScriptableObject.CreateInstance`, casts to `object`/native asset types, interfaces, data-array covariance, arbitrary custom classes, collections, multidimensional/jagged arrays and `[SerializeReference]` are unsupported. Data asset fields/arrays cannot use `[UdonSynced]`.

Native array methods `GetValue`, `SetValue`, `Clone` and `GetType` are rejected on data-asset arrays; use typed indexing and `Length`. Cyclic references (A → B → A) and nesting beyond 128 assets produce clear bake errors.

Copy values into ordinary gameplay fields when they must change or synchronize. Mutating a returned local array changes only that copy.

## Examples

0.5.0 ships without examples. The shop and equipment examples can be read at [tag 0.3.12](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ScriptableObjects). See [Examples](./examples.md).
