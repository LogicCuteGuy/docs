---
sidebar_position: 6.5
---

# ข้อมูล ScriptableObject

> เวอร์ชันเอกสาร: **0.3.7**

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

ไม่รองรับการเขียน data field, property, instance/static method หรือ Unity object API บน custom data asset รวมถึง `new`/`ScriptableObject.CreateInstance` ตอน runtime, cast ที่ไม่รองรับ, polymorphic reference, data asset ซ้อนกัน, custom class ทั่วไป, collection, array หลายมิติ/jagged และ `[SerializeReference]` ห้ามใช้ `[UdonSynced]` กับ field หรือ array ของ data asset

คัดลอกค่าไปยัง field สถานะเกมปกติหากต้องแก้ไขหรือ sync การแก้ array ที่อ่านออกมาเปลี่ยนเฉพาะสำเนานั้น

## ตัวอย่างร้านค้า

นำเข้า **LCGUdonSharp Examples** หลัง setup คอมไพเลอร์เสร็จ ภายในมี `Example/ScriptableObjects/ScriptableObjectShopExample.prefab`, `StrawberryMilk.asset` และ `GreenTea.asset` กดบอร์ดสีชมพูที่ `(7, 0, 3)` ใน `TestLCGUdonSharp.unity` แล้วเงิน 100 จะเหลือ 65 และ 30 การซื้อครั้งที่สามถูกปฏิเสธ เปลี่ยน `item` และ `catalog` ใน Inspector ก่อน build ได้ `TestArrayCopy` ตรวจว่าการแก้ array local ไม่กระทบ snapshot การซื้อเป็นแบบ local และไม่ sync ระหว่างผู้เล่น

ดู [ตัวอย่าง](./examples.md), [การติดตั้ง](./install.md) และ [คู่มือต้นทางที่ตรึงเวอร์ชัน](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.7/Example/ScriptableObjects/README.md)
