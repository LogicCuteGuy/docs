---
sidebar_position: 1
---

# ZoneDraw

> เวอร์ชันของเอกสาร: **0.1.0** · [Release](https://github.com/LogicCuteGuy/ZoneDraw/releases/tag/0.1.0)

**ZoneDraw** (`com.logiccuteguy.zonedraw`) ให้คุณคลิกจุดใน Scene view เพื่อวาดกำแพงล่องหนหรือพื้นที่ trigger แล้ว bake เป็น collider ปกติของ Unity คอมโพเนนต์ที่ใช้วาดมีเฉพาะใน editor และถูกตัดออกตอน build

## ความสามารถ

- กำแพง **Barrier** เพิ่มแผ่นพื้นและเพดานเพื่อปิดเป็นห้องได้
- พื้นที่ **Zone** เป็นรูปหลายเหลี่ยมใดก็ได้ รวมถึงรูปเว้า
- เพิ่ม ลาก แทรก และลบจุดได้ มี surface snap, grid snap และ Undo
- collider อัปเดตอัตโนมัติขณะแก้ไข
- ใส่ render material (ไม่บังคับ) เพื่อให้มองเห็นรูปทรง เช่น สนามพลังหรือรั้ว
- `ZoneArea` สำหรับ UdonSharp: เช็กว่าตำแหน่งหรือผู้เล่นอยู่ข้างในหรือไม่ และเปิดปิดกำแพง พื้น หรือเพดาน

## สิ่งที่ต้องมี

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 ขึ้นไป (`com.vrchat.worlds`) พร้อม UdonSharp ที่มากับ SDK

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม VPM repository ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้กดรีเฟรชรายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. เพิ่ม **ZoneDraw** (`com.logiccuteguy.zonedraw`)

### ติดตั้งเอง

ดาวน์โหลด `com.logiccuteguy.zonedraw-0.1.0.zip` จาก release แล้วแตกไฟล์ไปที่ `Packages/com.logiccuteguy.zonedraw` อย่าใช้ไฟล์ **Source code** ที่ GitHub สร้างอัตโนมัติ และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

## สัญญาอนุญาต

MIT

ถัดไป: [เริ่มต้นใช้งาน](./getting-started.md)
