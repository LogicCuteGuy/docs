---
sidebar_position: 2
---

# แพ็กเกจ

**URL รายการ**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | ชื่อ | เวอร์ชันล่าสุด | Unity | คำอธิบาย |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | เครื่องมือ Editor กว่า 15 รายการสำหรับจัดการ scene, object และ optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.5` | 2022.3 | คอมไพเลอร์ UdonSharp พร้อม interface, async/await, exception, collection/JSON และ packet network |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.5.0` | 2022.3 | โซน voxel ที่ขุดได้สำหรับ Unity Terrain พร้อม runtime edit แบบ sync และ foliage |

## เพิ่ม repository ใน VCC

1. เปิด **VRChat Creator Companion**
2. ไปที่ **Settings > Packages > Add Repository**
3. วาง `https://vpm.logiccuteguy.com/index.json`

แนะนำให้ติดตั้งผ่าน VCC/ALCOM สำหรับ LCGUdonSharp ยังมีไฟล์ ZIP ที่ผ่านการตรวจสอบและมีชื่อชัดเจนใน GitHub Releases ห้ามใช้ **Source code (zip)** ที่ GitHub สร้างอัตโนมัติเป็น Unity package

## รายละเอียดแพ็กเกจ

### LogicCuteGuy Help Tools `1.0.1`

- [Repository](https://github.com/LogicCuteGuy/UnityHelpTools) · [Releases](https://github.com/LogicCuteGuy/UnityHelpTools/releases)
- License: MIT
- [ภาพรวม](./helptools/intro.md) · [การติดตั้ง](./helptools/install.md)

### LCGUdonSharp `0.3.5`

- [Repository](https://github.com/LogicCuteGuy/LCGUdonSharp) · [Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- Dependency: `com.vrchat.worlds` `3.10.5` (ต้องตรงเวอร์ชัน)
- License: MIT
- [ภาพรวม](./lcgudonsharp/intro.md) · [การติดตั้ง](./lcgudonsharp/install.md)

LCGUdonSharp ติดตั้งคอมไพเลอร์จาก `Payload~/UdonSharp` โดยไม่แก้ไขแพ็กเกจ Worlds SDK

### DigHoleIt

- เวอร์ชันล่าสุด: `0.5.0` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.5.0)
- Unity 2022.3 และ Built-in Render Pipeline
- Dependency สำหรับ VRChat: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [Repository](https://github.com/LogicCuteGuy/DigHoleIt) · [Release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.5.0)
- License: MIT

ติดตั้ง 0.5.0 ผ่านรายการ VPM ใน VCC, เพิ่ม `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.5.0` ผ่าน Unity Package Manager, วาง repository ที่ `Packages/com.logiccuteguy.digholeit` หรือแตก release asset แบบมีชื่อ `com.logiccuteguy.digholeit-0.5.0.zip` ห้ามใช้ source archive ที่ GitHub สร้างอัตโนมัติเป็น Unity package

[ภาพรวม](./digholeit/intro.md) · [เริ่มต้นใช้งาน](./digholeit/getting-started.md)
