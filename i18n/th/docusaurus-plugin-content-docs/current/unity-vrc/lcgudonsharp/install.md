---
sidebar_position: 2
---

# การติดตั้งและตั้งค่า

> เวอร์ชันเอกสาร: **0.3.4** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4)

:::warning อัปเกรดจาก 0.3.2
แพ็กเกจ `0.3.2` ถูกจัดชุดไม่ถูกต้อง ทำให้โปรเจกต์ใหม่อาจไม่มี compiler payload ให้อัปเดตเป็น `0.3.4`; installer จะซ่อมให้หลัง Unity refresh
:::

## ข้อกำหนด

- Unity **2022.3**
- VRChat Worlds SDK **3.10.5** เท่านั้น

## แนะนำ: VCC หรือ ALCOM

เพิ่ม[รายการ VPM ของ LogicCuteGuy](../packages.md) (`https://vpm.logiccuteguy.com/index.json`) แล้วติดตั้ง LCGUdonSharp `0.3.4`

หากใช้ local package ให้ดาวน์โหลดและแตก `com.logiccuteguy.lcgudonsharp-0.3.4.zip` จาก [GitHub Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4) ห้ามใช้ **Source code (zip)** ที่ GitHub สร้างอัตโนมัติ

## ขั้นตอนตั้งค่า

1. ติดตั้ง `0.3.4` ผ่าน VCC/ALCOM หรือไฟล์ ZIP ที่มีชื่อชัดเจน
2. เปิด Unity และรอ compile ให้เสร็จ
3. หากจำเป็น ใช้ **Tools > LCGUdonSharp > Install or Repair**
4. Build และทดสอบ world ตามปกติ

## เมนู

| คำสั่ง | หน้าที่ |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | รัน setup ใหม่ |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | คืน UdonSharp ของ SDK และปิด setup อัตโนมัติ ให้ใช้ก่อนถอนแพ็กเกจ |
| **Assets > Create > U# Script** | สร้าง U# script พร้อม program asset |
| **Assets > Create > U# Assembly Definition** | ลงทะเบียน `.asmdef` ที่เลือกกับ UdonSharp |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | Compile program asset ทั้งหมดใหม่ |

ถ้า script compile ใน Unity แต่ UdonSharp มองไม่เห็น ให้สร้าง U# assembly definition สำหรับ `.asmdef` แล้ว refresh asset ทั้งหมด
