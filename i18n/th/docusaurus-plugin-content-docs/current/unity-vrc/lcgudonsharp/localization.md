---
sidebar_position: 8
---

# Localization ของข้อความและ Asset

> เวอร์ชันเอกสาร: **0.3.9**

ระบบ bake Unity Localization String/Asset Tables เป็น Udon ใน scene ชั่วคราวตอน Play Mode/build โดยยังเก็บ native component สำหรับแก้ไขใน scene ต้นฉบับ World ที่ build แล้วไม่โหลด Addressables [ติดตั้ง LCGUdonSharp](./install.md) ก่อน Dependency คือ Unity Localization **1.4.5**, Scriptable Build Pipeline **1.21.25**, Unity 2022.3 และ Worlds SDK 3.10.5

## ตั้งค่า Unity Tables

1. สร้าง Locales และ String Table Collection ใน Unity Localization
2. เลือก **Tools > LCGUdonSharp > Localization > Create Unity Manager** กำหนด collection ที่ **Unity Localization Source** และตั้ง **Default Language** เป็นรหัสภาษาที่มีใน collection
3. เพิ่ม **Localize String Event** ให้ TextMeshPro/UI Text เลือก collection/key แล้วต่อ **On Update String** เข้ากับ setter **dynamic** ของ `TMP_Text.text` / `Text.text` ไม่ใช่ค่าคงที่
4. กด **Bake / Validate Now** บน source, บันทึก scene แล้วเข้า Play Mode หรือ build world ใหม่

ใช้ manager เดียวต่อ collection ต่อ scene และ manager/text ต้องอยู่ scene เดียวกัน Text ที่ inactive ก็รวมด้วย แก้ table ผ่าน **Tools > LCGUdonSharp > Localization > Unity Tables** และ build ใหม่หลังแก้คำแปลหรือ asset

## เลือกภาษาและ callback

ระบบตามภาษาของ VRChat client จนกว่าจะเลือกเอง รหัสภูมิภาคเช่น `en-US` fallback เป็น `en` ถ้า client ใช้ภาษาที่ไม่มีจะใช้ default คำแปลว่าง/ขาดจะใช้ default แล้ว fallback ไปข้อความเดิม/key การเลือกภาษาเป็น local ไม่ sync และไม่บันทึกข้ามการเข้า world

```csharp
using UdonSharp;

public class LanguageExample : UdonSharpBehaviour
{
    public LCGLocalization localization;

    public override void Interact()
    {
        localization.SetLanguage("th");
        localization.SetVariable("name", "Player");
        localization.SetVariable("count", "3");
    }
}
```

ไม่จำเป็นต้องใช้ `LCGLanguageButton` API มี `CurrentLanguage`, `Get(key)`, `GetOrDefault(key, fallback)`, `GetLanguages()`, `SetLanguageByIndex(index)`, `NextLanguage()`, `FollowClientLanguage()` และ `RefreshAll()` รหัส/index ไม่ valid จะไม่เปลี่ยนภาษา ถ้าใช้ event ไม่มี parameter ให้ตั้ง `selectedLanguage` ผ่าน `SetProgramVariable` แล้วส่ง `SelectLanguage`

กำหนด **Language Dropdown** / **Language TMP Dropdown**, ใส่ **Dropdown Languages** แล้วกด **Wire Language Dropdown** ตั้ง **Language Changed Targets** ให้ script ที่มี `LocalizationChanged()` (เปลี่ยนชื่อได้ด้วย **Language Changed Event**) อ่าน `CurrentLanguage` ใน callback แจ้งเฉพาะเมื่อภาษาเปลี่ยน ส่วนการแก้ variable จะ refresh text เท่านั้น Unity UI event ต้องต่อ backing **Udon Behaviour > SendCustomEvent** การเรียก proxy โดยตรงใช้ไม่ได้หลัง build VRChat

## Smart Strings ที่ตรวจ syntax

เปิด **Smart** ใน String Table entry

| Syntax | ผล |
|---|---|
| `{name}`, `{0}` | Placeholder scalar ตามชื่อ/เลข |
| `{count:000}`, `{score:F2}`, `{ratio:P0}` | รูปแบบตัวเลขแบบ invariant culture |
| `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` | ค่าตามตัวเลือกและ fallback สุดท้ายที่ต้องมี |
| `{count:plural:One item\|{} items}` | ภาษาอังกฤษมีสองรูป |
| `{count:plural:{} items}` | ไทย/ญี่ปุ่น/จีนมีรูปเดียว |
| `{{name}}` | Escape วงเล็บปีกกา |

Variable เป็น string ให้ส่งตัวเลขในรูปแบบ invariant ค่าเริ่มต้น **Variable Names** / **Variable Values** ต้องยาวเท่ากัน Scalar local variable ใน **Localize String Event** จะ bake ลง binding และมีลำดับสูงกว่า global อัปเดตด้วย `binding.SetVariable(name, value)` ใช้ `GetWithVariables(key, fallback, names, values)` เพื่อ format โดยไม่เปลี่ยน state Variable ที่ขาดจะคง placeholder ส่วนค่าที่แทรกเป็นข้อความ literal

ไม่รองรับ reflection selector, persistent Unity global-variable group, runtime Unity argument, date/list/conditional/custom formatter, nested named placeholder และ plural rule ของภาษาอื่น Syntax ที่ไม่รองรับทำให้ bake หยุด ระบบนี้ไม่ใช่ Unity Smart Strings เต็มรูปแบบ

## Asset หลายภาษา

เพิ่ม **Asset Table Collections** ที่ source แล้วต่อ native event เข้ากับ dynamic setter

- **Localize Sprite Event** → `Image.sprite`
- **Localize Texture Event** → `RawImage.texture`
- **Localize Audio Clip Event** → `AudioSource.clip`
- **LCGUdonSharp > Localization > Localize Prefab Event** → ไม่ต้องต่อ callback ใช้ `LCGLocalizePrefabEvent` เพื่อเลี่ยง error การลบ preview ใน Edit Mode ของ event เดิมใน Unity 1.4.5 ตอน bake จะสร้าง child variant แล้วเปิดตามภาษาแบบ local ไม่ใช่ network spawn

Named subasset resolve ตอน bake คำแปลที่ขาดจะใช้ default แล้ว asset เดิม ไม่รองรับ arbitrary callback หรือ locale override ราย text/asset ต้องมี default locale ใน asset collection จำนวน variant เพิ่มขนาด build

สำหรับ GameObject/material ที่มีใน scene ให้เพิ่ม **LCG Localized Asset** บน parent ที่ active ตลอด ตั้ง manager, รหัสภาษา และ **Variants** / **Assets** ให้ตรงกัน Material ใช้ **Target Renderer** ส่วน sprite/texture/clip ใช้ target field ของชนิดนั้น หนึ่ง binding เก็บหนึ่งชุด asset **Play Audio On Change** เป็นทางเลือก ค่าเริ่มต้นจะหยุดเสียงเดิมและเปลี่ยน clip เท่านั้น

## ตัวอย่างและ JSON เดิม

นำเข้า **LCGUdonSharp Examples** หลัง setup compiler เสร็จ ใน repo เปิด `Example/TestLCGUdonSharp.unity` จะมี **UnityLocalizationExample** ที่ `(17, 0, 0)` พร้อมปุ่ม EN/TH/JA, เรียก API โดยตรง, dropdown, variable, ภาพ, เสียง tone สั้น และ prefab variant เสียงเป็น tone ไม่ใช่เสียงพูดแปลภาษา Sample ใน release ZIP อยู่ที่ `Samples~/Examples`

มี subset ของ Noto Sans JP/Thai พร้อม OFL license ให้เพิ่ม full font/fallback สำหรับอักขระเพิ่มเติม Localization เปลี่ยนข้อความ ไม่เปลี่ยน font

JSON เดิมยังใช้ได้ที่ **Tools > LCGUdonSharp > Localization > Legacy JSON Table** สร้าง manager, บันทึก table ใต้ Assets, เลือก text/parent แล้ว **Bind Selected Text**, เพิ่มคำแปลและบันทึก table/scene Runtime อ่าน table ครั้งเดียวต่อ manager ต้องเริ่ม Play Mode ใหม่หลังแก้ไฟล์ ตัวอย่างเดิมคือ `Example/Localization/LocalizationExample.unity`

## แก้ปัญหาและตรวจสอบ

- Bake ไม่ผ่าน: ตรวจ collection/key, manager ใน scene เดียวกัน, manager เดียวต่อ collection, ความยาว variable array และ dynamic setter
- อักขระหาย: เพิ่ม multilingual TMP font/fallback
- SDK/SBP assembly ชนกัน: 0.3.9 มี compatibility hook ตัด plugin DLL ที่ auto-reference ออกจาก SBP editor assembly โดยรักษา explicit Unity reference และไม่แก้ SDK DLL
- รัน **LCGUnityLocalizationTests** / **LCGLocalizationTests** ใน Unity EditMode และ event `RunChecks` ของตัวอย่างใน Play Mode ได้ นี่คือขั้นตอนตรวจฝั่งผู้ใช้ ไม่ใช่การอ้างว่า docs build ได้รัน Unity test แล้ว

ดู [ตัวอย่าง](./examples.md) และ [คู่มือต้นทางที่ตรึงเวอร์ชัน](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/0.3.9/Example/Localization/UnityLocalization.md)

