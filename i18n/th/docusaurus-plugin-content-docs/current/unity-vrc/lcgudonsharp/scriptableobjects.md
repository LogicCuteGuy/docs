---
sidebar_position: 6.5
---

# ข้อมูล ScriptableObject

> เวอร์ชันเอกสาร: **0.3.9**

กำหนด asset Unity `ScriptableObject` ที่สร้างเองให้ field ของ UdonSharp behaviour ตามชนิดได้โดยตรง ไม่ต้องใช้ base class พิเศษ, attribute หรือคัดลอกข้อมูลเอง คอมไพเลอร์แปลง serialized data เป็น snapshot แบบอ่านอย่างเดียวใน Udon

## สร้างข้อมูลและกำหนด asset

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

บันทึก data class และ behaviour แยกไฟล์ สร้าง asset ผ่าน **Assets > Create > My World > Item** แล้วกำหนดให้ `Shop.item` ใน Inspector ตัว behaviour ต้องมี program asset และลงทะเบียน assembly ตามปกติ ส่วน data class ไม่ต้องมี program asset และอยู่ใน C# assembly ธรรมดาได้

## Asset ซ้อนและ polymorphic reference

รองรับ field และ array ของ custom ScriptableObject ที่ซ้อนกัน กำหนด asset แบบ derived เช่น `WeaponDefinition` และ `SpellDefinition` ให้ `ItemDefinition` หรือ `ItemDefinition[]` ได้ Runtime type tag รองรับ `is`, declaration pattern, `as` และ checked explicit cast โดยรักษาตำแหน่ง field ที่สืบทอด

Upcast รักษา snapshot เดิม `as` ที่ชนิดไม่เข้ากันคืน null ส่วน explicit cast ที่ไม่เข้ากันทำให้เกิด `InvalidCastException` แบบ compiler-managed การ cast null ยังคง null และ type test ของ null เป็น false Property และ virtual method บน data asset ยังไม่รองรับ ให้เลือกพฤติกรรมใน UdonSharp ผ่าน type test หรือ data field

reference ที่ซ้ำในกราฟเดียวกันแชร์ snapshot แต่ field ระดับบนสุดของ behaviour ถูก bake แยกกัน Layout เรียง base field ก่อนและมี runtime type tag **หลังอัปเดตเป็น 0.3.8 ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่ เพราะ snapshot เก่าใช้ field layout ต่างกัน**

```csharp
// Fields and method inside an UdonSharpBehaviour.
// Data classes are provided by the optional equipment sample.
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

## การทำงานของ snapshot

แต่ละ behaviour ได้ snapshot `object[]` ของตัวเองโดยเรียง field อย่างแน่นอน การกำหนด asset เดียวกันให้หลาย field ไม่รับประกันว่า reference จะเป็นตัวเดียวกัน ต้อง build world ใหม่เมื่อแก้ข้อมูลหรือ schema ของ asset การแก้ระหว่างเล่นไม่อัปเดต snapshot

การอ่าน array field แต่ละครั้งคืน shallow copy ใหม่ และรักษา null array ไว้ ควรอ่านเก็บในตัวแปร local ครั้งเดียวก่อนวน loop เพื่อลด allocation ซ้ำ Unity object ที่อ้างอิงยังใช้ API สำหรับเปลี่ยนแปลงได้ตามปกติ การอ่าน heap กลับรักษา asset เดิมใน Inspector และไม่เขียนข้อมูลกลับไปยัง asset ชนิด native ของ SDK เช่น `UdonProduct` ทำงานตามเดิม

## ข้อมูลที่รองรับ

- public instance field และ private field ที่มี `[SerializeField]` รวมถึง field ที่สืบทอด
- ตัวเลข primitive, bool, char, string และ enum
- `Vector2/3/4`, `Quaternion`, `Color/Color32`, `Rect`, `Bounds`, `Matrix4x4`, `LayerMask` และ `VRCUrl`
- reference ของ Unity object ที่ Udon รองรับ เช่น texture, audio clip และ material
- array หนึ่งมิติของชนิด field ที่รองรับ และ field ใน behaviour ที่เป็น array ของ data asset

## ข้อจำกัด

ไม่รองรับการเขียน data field, property, instance/static method, Unity API บน custom data asset, `new`/`ScriptableObject.CreateInstance` ตอน runtime, cast เป็น `object`/native asset type, interface, array covariance, custom class ทั่วไป, collection, array หลายมิติ/jagged และ `[SerializeReference]` ห้ามใช้ `[UdonSynced]` กับ field/array ของ data asset

ห้ามใช้ `GetValue`, `SetValue`, `Clone` และ `GetType` กับ data-asset array ให้ใช้ typed indexing และ `Length` หาก reference วนกัน (A → B → A) หรือซ้อนเกิน 128 asset ระบบจะแจ้ง bake error ที่ชัดเจน

คัดลอกค่าไปยัง field สถานะเกมปกติหากต้องแก้ไขหรือ sync การแก้ array ที่อ่านออกมาเปลี่ยนเฉพาะสำเนานั้น

## ตัวอย่างอุปกรณ์ใน 0.3.8

`ScriptableObjectEquipmentExample.prefab` อยู่ที่ `(12, 0, 3)` ใน `TestLCGUdonSharp.unity` field `item` แบบ base type ถือ `TrainingSword.asset` และ `catalog` มี `FireSpell.asset` ด้วย แต่ละรายการอ้างอิง economy asset ของตัวเอง ดาบราคา 35 coin และ damage 45 ส่วนเวทราคา 20 coin, power 80 / mana 12 กดบอร์ดเพื่อซื้อ ใช้สวิตช์ข้างๆ หรือ `SelectNext` เปลี่ยนรายการ `TestDataFeatures` ตรวจ nested read, inherited field, type test, cast ที่สำเร็จ/null/ผิดชนิด และ defensive copy ของ nested polymorphic array การซื้อเป็นแบบ local ไม่ sync

## ตัวอย่างร้านค้า

นำเข้า **LCGUdonSharp Examples** หลัง setup คอมไพเลอร์เสร็จ ภายในมี `Example/ScriptableObjects/ScriptableObjectShopExample.prefab`, `StrawberryMilk.asset` และ `GreenTea.asset` กดบอร์ดสีชมพูที่ `(7, 0, 3)` ใน `TestLCGUdonSharp.unity` แล้วเงิน 100 จะเหลือ 65 และ 30 การซื้อครั้งที่สามถูกปฏิเสธ เปลี่ยน `item` และ `catalog` ใน Inspector ก่อน build ได้ `TestArrayCopy` ตรวจว่าการแก้ array local ไม่กระทบ snapshot การซื้อเป็นแบบ local และไม่ sync ระหว่างผู้เล่น

ดู [ตัวอย่าง](./examples.md), [การติดตั้ง](./install.md) และ [คู่มือต้นทางที่ตรึงเวอร์ชัน](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.8/Example/ScriptableObjects/README.md)
