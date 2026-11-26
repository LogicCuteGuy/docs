---
sidebar_position: 3
---

# Asset หลายภาษา

รูปภาพ, texture, เสียง และ GameObject เปลี่ยนตามภาษาได้

## ใช้ Unity Asset Table

เพิ่ม **Asset Table Collection** ของคุณลงใน array **Asset Table Collections** บน source จากนั้นเพิ่ม component ของ Unity แล้วต่อ event

| Component | ต่อเข้ากับ |
|---|---|
| **Localize Sprite Event** | `Image.sprite` |
| **Localize Texture Event** | `RawImage.texture` |
| **Localize Audio Clip Event** | `AudioSource.clip` |
| **LCG Localization > Localize Prefab Event** | ไม่ต้องต่อ callback |

asset ถูก resolve **ตอน bake** รวมถึง sub-asset ที่มีชื่อ ถ้าไม่มี entry จะใช้ locale default แล้วจึงใช้ asset เดิมของ component ระบบไม่รับ callback ของ asset แบบกำหนดเองและการ override locale ราย asset

:::note
ภาษาทุกชุดถูกรวมไปกับ world การมี asset ขนาดใหญ่หลายชุดจึงทำให้ขนาดดาวน์โหลดเพิ่มขึ้น
:::

### Prefab

การ bake จะสร้าง child หนึ่งตัวต่อ locale แล้วแสดงตัวที่ตรงกับภาษา object เหล่านี้เป็น local ไม่มีการ spawn ผ่าน network

ให้ใช้ **Localize Prefab Event** ของ LCG แทนของ Unity เพราะตัวนี้ลบ preview ใน Edit mode ได้อย่างปลอดภัย ส่วน event ของ Unity Localization 1.4.5 อาจแสดง error ใน editor ตอนสลับ preview

## ใช้ object ที่มีอยู่ใน scene

สำหรับ GameObject หรือ material ที่มีใน scene อยู่แล้ว ให้เพิ่ม **LCG Localized Asset** บน parent ที่ **active ตลอดเวลา**

1. กำหนด manager ที่ **Localization**
2. ใส่รหัสภาษาใน **Languages**
3. ใส่ **Variants** สำหรับ GameObject หรือ **Assets** สำหรับ sprite, texture, clip หรือ material โดยเรียงลำดับให้ตรงกับรหัสภาษา
4. ตั้ง target ให้ตรงชนิด:

| Asset | ฟิลด์ |
|---|---|
| Sprite | **Image** |
| Texture | **Raw Image** |
| Audio clip | **Audio Source** |
| Material | **Target Renderer** |

component หนึ่งตัวเก็บชุด asset หลายภาษาได้**หนึ่ง**ชุด manager จะค้นหา component เหล่านี้ตอน bake

### เสียง

ค่าเริ่มต้นคือเมื่อเปลี่ยนภาษา ระบบจะสลับ clip และหยุด clip เดิม ถ้าต้องการให้เล่น clip ใหม่ ให้เปิด **Play Audio On Change**

เสียง tone ในฉากตัวอย่างมีไว้แสดงการสลับ clip เท่านั้น ไม่ใช่เสียงพูดที่แปลแล้ว
