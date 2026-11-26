---
sidebar_position: 1
---

# LCG Localization

> เวอร์ชันเอกสาร: **0.1.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGLocalization/releases/tag/0.1.0)

**LCG Localization** (`com.logiccuteguy.lcglocalization`) เพิ่มการแปลข้อความและ asset ให้ UdonSharp ใน world ของ VRChat โดย bake Unity String Table และ Asset Table เป็น Udon คำแปลจึงถูกรวมไปกับ world

## ความสามารถ

- bake Unity String Table และ Asset Table เป็น Udon
- เรียก manager โดยตรง, ใช้ dropdown และ callback
- Smart Strings พร้อมตัวแปร, choose และ plural
- สลับ sprite, texture, เสียง และ prefab พร้อม fallback
- รองรับขั้นตอนแบบ JSON table เดิม
- ใช้กับ UdonSharp ของ VRChat SDK ได้ ไม่จำเป็นต้องมี LCGUdonSharp

## ข้อกำหนด

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 ขึ้นไป (UdonSharp)
- Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.26 ขึ้นไป (ติดตั้งให้เป็น dependency)

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม repository VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) เข้า VCC/ALCOM หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้ refresh รายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. หา **LCG Localization** (`com.logiccuteguy.lcglocalization`) แล้วเพิ่ม **0.1.0**
4. เปิดโปรเจกต์ใน Unity และรอให้ import แพ็กเกจ

### Unity Package Manager / ติดตั้งเอง

ใน **Window > Package Manager > + > Add package from git URL** ให้ใส่:

```text
https://github.com/LogicCuteGuy/LCGLocalization.git#0.1.0
```

เลือก**วิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์** เพื่อไม่ให้มีสำเนาซ้ำ ห้ามใช้ **Source code (zip)** อัตโนมัติของ GitHub

## เริ่มต้นใช้งาน

1. import **LCG Localization Examples** จาก Package Manager แล้วอ่านวิธีตั้งค่าใน `UnityLocalization.md` ที่อยู่ใน sample
2. เลือก **Tools > LCG Localization > Create Unity Manager** เพื่อเพิ่ม manager เข้า scene แล้ว assign ลงฟิลด์ public
3. เรียก manager จากสคริปต์ UdonSharp ตามตัวอย่างด้านล่าง

```csharp
using UdonSharp;
using UnityEngine;

[UdonBehaviourSyncMode(BehaviourSyncMode.None)]
public class ShopSign : UdonSharpBehaviour
{
    public LCGLocalization localization;
    public LCGLocalizedText priceText;

    private void Start()
    {
        Debug.Log(localization.Get("hello"));
        Debug.Log(localization.GetOrDefault("maybe_missing", "Fallback text"));
    }

    // Button: switch this player's language. Returns false for an unsupported code.
    public void UseThai() { localization.SetLanguage("th"); }

    // For Smart Strings such as "{price} coins".
    public void SetPrice(int price)
    {
        localization.SetVariable("price", price.ToString()); // every text on this manager
        priceText.SetVariable("price", price.ToString());    // one text; the name must already be listed on it
    }

    // Add this behaviour to the manager's Language Changed Targets.
    public void LocalizationChanged()
    {
        Debug.Log("Now using " + localization.CurrentLanguage);
    }
}
```

## สมาชิกของ manager

| สมาชิก | หน้าที่ |
|---|---|
| `Get(key)` | คืนคำแปล หรือคืน key ถ้าไม่มี |
| `GetOrDefault(key, fallback)` | คืนคำแปล หรือคืน `fallback` ถ้าไม่มี |
| `GetWithVariables(key, fallback, names, values)` | คืนคำแปลโดยใส่ตัวแปร Smart แบบใช้ครั้งเดียว |
| `SetLanguage(code)` | เลือกภาษา และเลิกตามภาษาของ client |
| `NextLanguage()` | สลับภาษาวนไปเรื่อย ๆ |
| `FollowClientLanguage()` | กลับไปใช้ภาษาที่เลือกใน VRChat |
| `CurrentLanguage`, `GetLanguages()` | อ่านภาษาปัจจุบัน หรือภาษาทั้งหมด |
| `SetVariable(name, value)` | ตั้งตัวแปร Smart ที่ใช้ร่วมกัน แล้ว refresh ข้อความทั้งหมด |

การเลือกภาษาเป็น local ของผู้เล่นแต่ละคน ไม่ sync และไม่บันทึกข้ามการเข้า world

ถ้าสคริปต์ของคุณอยู่ใน assembly definition ของตัวเอง ให้ reference `LogicCuteGuy.LCGLocalization.Runtime` และสร้าง U# assembly definition ให้ assembly นั้น

## ขั้นตอนถัดไป

- [Unity String Table](./unity-tables.md): การตั้งค่า การสลับภาษา และ Smart Strings
- [Asset หลายภาษา](./assets.md): sprite, texture, เสียง และ GameObject
- [JSON table](./legacy-json.md): ขั้นตอนแบบเดิมสำหรับข้อความอย่างเดียว
