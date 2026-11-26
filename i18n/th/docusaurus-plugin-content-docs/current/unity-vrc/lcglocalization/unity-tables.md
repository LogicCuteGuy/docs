---
sidebar_position: 2
---

# Unity String Table

นี่คือขั้นตอนหลัก คุณสร้างเนื้อหาด้วย **Locale**, **String Table Collection** และ **Localize String Event** ของ Unity Localization ตารางจะถูก bake ลง scene ชั่วคราวตอน Play mode หรือ build ส่วน scene ของคุณยังเก็บ component ของ Unity ไว้ และ world ที่ build แล้วไม่โหลด Addressables

## ลองตัวอย่าง

ลาก `UnityLocalizationExample.prefab` จาก sample **LCG Localization Examples** ลง scene เข้า Play mode แล้วกดปุ่มภาษาอังกฤษ ไทย และญี่ปุ่น เปิดตารางของตัวอย่างได้ที่ **Tools > LCG Localization > Unity Tables**

font ในตัวอย่างเป็น subset ของ Noto Sans ถ้าเพิ่มข้อความอื่นให้ใส่ font แบบเต็ม

## ตั้งค่า UI ของคุณเอง

1. สร้าง locale และ **String Table Collection** ใน Unity Localization
2. เลือก **Tools > LCG Localization > Create Unity Manager** กำหนด collection ที่ **Unity Localization Source** และตั้ง **Default Language** ของ manager เป็นรหัส locale ที่มีใน collection
3. เพิ่ม **Localize String Event** ให้ TextMeshPro หรือ UI Text เลือก collection และ key แล้วต่อ **On Update String** เข้ากับ setter แบบ dynamic ของ `Text.text` หรือ `TMP_Text.text`
4. กด **Bake / Validate Now** บน source เพื่อตรวจการเชื่อมต่อ
5. บันทึก scene แล้วกด Play หลังแก้ตารางให้เข้า Play mode ใหม่

- ใช้ manager หนึ่งตัวต่อ collection ในแต่ละ scene
- ข้อความและ manager ต้องอยู่ scene เดียวกัน ข้อความที่ inactive ก็ถูกรวมด้วย
- การตั้งค่าที่ไม่รองรับจะ**ทำให้ bake หยุด**

## ภาษาที่แสดง

manager ตามภาษาของ VRChat client จนกว่าผู้เล่นจะเลือกเอง การเลือกเป็น local และไม่บันทึกข้ามการเข้า world

รหัสเช่น `en-US` จะ fallback เป็น `en` ถ้า client ใช้ภาษาที่ไม่รองรับจะใช้ภาษา default ถ้าคำแปลขาดหรือว่างจะใช้ภาษา default แล้วจึงใช้ข้อความเดิมหรือ key

## การสลับภาษา

จาก Udon ให้เรียก `SetLanguage("th")`, `SetLanguageByIndex(i)`, `NextLanguage()` หรือ `FollowClientLanguage()` ถ้ารหัสหรือ index ไม่ถูกต้อง ภาษาจะไม่เปลี่ยน

จาก Unity UI event ให้ชี้ไปที่ **`SendCustomEvent` ของ Udon Behaviour** พร้อมชื่อ event การ callback ตรงไปที่ component ของสคริปต์จะหายไปหลัง build ของ VRChat สำหรับ event ที่ไม่มี parameter ให้ตั้ง `selectedLanguage` ก่อน แล้วส่ง `SelectLanguage`

### Dropdown

1. กำหนด **Language Dropdown** หรือ **Language TMP Dropdown** บน manager
2. ใส่รหัสภาษาของแต่ละตัวเลือกใน **Dropdown Languages**
3. กด **Wire Language Dropdown**

เมื่อภาษาเปลี่ยน dropdown จะอัปเดตโดยไม่ยิง event ของตัวเองซ้ำ

**LCG Language Button** เป็นทางลัดสำหรับปุ่มภาษาเดียว ใช้หรือไม่ก็ได้

### ตอบสนองเมื่อภาษาเปลี่ยน

เพิ่ม behaviour ของคุณใน **Language Changed Targets** แล้วเขียน `LocalizationChanged()` หรือเปลี่ยนชื่อที่ **Language Changed Event** และอ่าน `CurrentLanguage` ในนั้น event นี้ถูกส่งเฉพาะตอนภาษาเปลี่ยน ไม่ส่งตอนตัวแปรเปลี่ยน

## Smart Strings

ตั้ง entry ใน String Table เป็น **Smart** โดย Smart Strings ของ Unity ทำงานใน Udon ได้บางส่วน

| รูปแบบ | ตัวอย่าง |
|---|---|
| ค่าแบบมีชื่อหรือเลข | `{name}`, `{0}` |
| รูปแบบตัวเลข | `{count:000}`, `{score:F2}`, `{ratio:P0}` |
| Choose ต้องมี fallback | `{state:choose(on\|off):Enabled\|Disabled\|Unknown}` |
| พหูพจน์ภาษาอังกฤษ สองรูป | `{count:plural:One item\|{} items}` |
| พหูพจน์ภาษาไทย ญี่ปุ่น หรือจีน รูปเดียว | `{count:plural:{} items}` |
| วงเล็บปีกกาแบบตัวอักษร | `{{name}}` |

ตัวเลขถูกจัดรูปแบบด้วย invariant culture และไม่รองรับรูปแบบ `D` ตัวแปรที่ขาดจะคง placeholder ไว้ ส่วนค่าที่แทรกเข้าไปเป็นข้อความธรรมดา

**ไม่รองรับ** และจะทำให้ bake หยุด: reflection selector, persistent global variable group ของ Unity, runtime argument object, formatter แบบ date, list, conditional หรือ custom, named placeholder แบบซ้อน และกฎพหูพจน์ของภาษาอื่น

## ตัวแปร

ค่าตัวแปรเป็น string จึงต้องแปลงตัวเลขด้วยรูปแบบ invariant

| ต้องการตั้ง | ใช้ |
|---|---|
| ค่าสำหรับข้อความทั้งหมด | `manager.SetVariable(name, value)` |
| ค่าเริ่มต้น | array **Variable Names** และ **Variable Values** |
| ค่าสำหรับข้อความเดียว | `binding.SetVariable(name, value)` บน `LCGLocalizedText` ของข้อความนั้น |
| ค้นคำแปลครั้งเดียวโดยไม่เปลี่ยนอะไร | `GetWithVariables(key, fallback, names, values)` |

ตัวแปร local บน **Localize String Event** ถูก bake ลงข้อความนั้นและมีลำดับเหนือตัวแปร global ส่วน `binding.SetVariable` ใช้ได้เฉพาะชื่อที่ระบุไว้บนข้อความนั้นแล้ว

ถัดไป: [Asset หลายภาษา](./assets.md)
