---
sidebar_position: 2
---

# แพ็กเกจ

**URL รายการ**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | ชื่อ | เวอร์ชันล่าสุด | Unity | คำอธิบาย |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | เครื่องมือ Editor กว่า 15 รายการสำหรับจัดการ scene, object และ optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.9` | 2022.3 | คอมไพเลอร์ UdonSharp พร้อม interface, async/await, exception, collection/JSON และ packet network |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.6.1` | 2022.3 | โซน voxel ที่ขุดได้สำหรับ Unity Terrain พร้อม runtime edit แบบ sync, foliage, package example และขอบ terrain hole แบบไม่มี seam |

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

### LCGUdonSharp `0.3.9`

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./lcgudonsharp/localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

LCGUdonSharp 0.3.8 เพิ่ม [snapshot ข้อมูล ScriptableObject](./lcgudonsharp/scriptableobjects.md) แบบซ้อนและ polymorphic พร้อม type test และ checked cast, ตรวจ cycle/ความลึก และตัวอย่างอุปกรณ์แบบ local ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่หลังอัปเดต เพราะ snapshot ใช้ layout ใหม่ที่มี runtime type tag

- [Repository](https://github.com/LogicCuteGuy/LCGUdonSharp) · [Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- Dependency: `com.vrchat.worlds` `3.10.5` (ต้องตรงเวอร์ชัน)
- License: MIT
- [ภาพรวม](./lcgudonsharp/intro.md) · [การติดตั้ง](./lcgudonsharp/install.md)

LCGUdonSharp ติดตั้งคอมไพเลอร์จาก `Payload~/UdonSharp` โดยไม่แก้ไขแพ็กเกจ Worlds SDK เวอร์ชัน 0.3.6 เพิ่ม bounded object-motion batching, snapshot/disconnect recovery, ownership repair และ native/LCG load example ที่ต่อครบ ต้อง build world ใหม่เพราะ build เก่า decode motion batch envelope ใหม่ไม่ได้

### DigHoleIt

- เวอร์ชันล่าสุด: `0.6.1` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.6.1)
- Unity 2022.3 และ Built-in Render Pipeline
- Dependency สำหรับ VRChat: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [Repository](https://github.com/LogicCuteGuy/DigHoleIt) · [Release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.6.1)
- License: MIT

ติดตั้ง 0.6.1 ผ่านรายการ VPM ใน VCC, เพิ่ม `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.6.1` ผ่าน Unity Package Manager, วาง repository ที่ `Packages/com.logiccuteguy.digholeit` หรือแตก release asset แบบมีชื่อ `com.logiccuteguy.digholeit-0.6.1.zip` ห้ามใช้ source archive ที่ GitHub สร้างอัตโนมัติเป็น Unity package

0.6.1 แก้ Undo หลัง Bake/move/resize, seam ของ terrain hole, foliage shading และ edge collision mesh ที่ไม่ถูกต้อง

[ภาพรวม](./digholeit/intro.md) · [เริ่มต้นใช้งาน](./digholeit/getting-started.md)
