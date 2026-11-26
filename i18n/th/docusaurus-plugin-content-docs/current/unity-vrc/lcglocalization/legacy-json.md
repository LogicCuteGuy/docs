---
sidebar_position: 4
---

# JSON table (ขั้นตอนแบบเดิม)

ขั้นตอนแบบง่ายสำหรับข้อความอย่างเดียว ไม่ต้องใช้ตารางของ Unity Localization ได้แรงบันดาลใจจาก [ikuko/ULocalization](https://github.com/ikuko/ULocalization)

:::note
Smart Strings และการสลับ sprite, texture, เสียง และ GameObject อธิบายไว้ใน [Unity String Table](./unity-tables.md) และ [Asset หลายภาษา](./assets.md) ถ้าต้องการสิ่งเหล่านั้นให้ใช้ขั้นตอนในสองหน้านั้น
:::

## ตั้งค่าโดยไม่ต้องเขียนโค้ด

1. เปิด **Tools > LCG Localization > Legacy JSON Table** แล้วกด **Create Localization Manager**
2. กด **Save Table** และบันทึกไฟล์ JSON ไว้ใต้ `Assets`
3. เลือก object ข้อความหรือ parent ของมัน แล้วกด **Bind Selected Text**
4. กรอกคำแปล เพิ่มรหัสภาษาใดก็ได้ เช่น `en`, `th`, `ja` หรือ `zh-hant`
5. กด **Save Table** แล้วบันทึก scene

**Bind Selected Text** รองรับ TextMeshPro และ UI Text แบบเดิม รวมถึง child ที่ inactive ข้อความปัจจุบันจะเป็นคำแปล default และระบบสร้าง key ให้ ข้อความที่เป็นของ manager ตัวอื่นจะไม่ถูกแก้ ใน Inspector ของ component มีตัวเลือก key

## รูปแบบตาราง

```json
{
  "en": { "hello": "Hello" },
  "th": { "hello": "สวัสดี" }
}
```

ตารางถูกอ่านครั้งเดียวต่อ manager ตอน runtime ถ้าแก้ไฟล์แล้วต้องเข้า Play mode ใหม่จึงจะเห็นผล

## ปุ่มเปลี่ยนภาษา

เพิ่ม **LCG Language Button** กำหนด manager และใส่รหัสภาษา ถ้าเว้นรหัสว่างไว้ ปุ่มจะสลับภาษาวนไปเรื่อย ๆ

| ชนิดปุ่ม | การตั้งค่า |
|---|---|
| Unity UI Button | กด **Wire UI Button** ใน Inspector |
| Object ใน world ที่มี collider | ทำงานผ่าน `Interact()` |

## ข้อความที่ขาด

**Default Language** ใช้เติมคำแปลที่ขาด ถ้าภาษา default ก็ไม่มี component ข้อความจะแสดง **Fallback Text** ส่วน `Get(key)` จะคืน key

สำหรับตัวเลข คุณจัดรูปแบบข้อความเองได้:

```csharp
// "Score: {0}" in the table
label.text = string.Format(localization.Get("score"), score);
```

## Font

font ของ TextMeshPro ต้องมี glyph ครบทุกภาษาที่แสดง ให้เพิ่ม font ที่เหมาะสมหรือ fallback font การแปลภาษาเปลี่ยนข้อความ แต่ไม่เปลี่ยน font

## ตัวอย่าง

เปิด `LocalizationExample.unity` จาก sample แล้วเข้า Play mode ปุ่มภาษาอังกฤษ ไทย และญี่ปุ่นต่อไว้ให้แล้ว object **LocalizationExample** มี event **RunChecks** ซึ่งจะตั้งค่า `checksPassed`
