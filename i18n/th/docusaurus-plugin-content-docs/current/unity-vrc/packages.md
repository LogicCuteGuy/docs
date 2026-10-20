---
sidebar_position: 2
---

# แพ็กเกจ

**URL รายการ**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | ชื่อ | เวอร์ชันล่าสุด | Unity | คำอธิบาย |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | เครื่องมือ Editor กว่า 15 รายการสำหรับจัดการ scene, object และ optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.11` | 2022.3 | คอมไพเลอร์ UdonSharp พร้อม interface, async/await, exception, collection/JSON และ packet network |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.7.0` | 2022.3 | โซน voxel ที่ขุดได้สำหรับ Unity Terrain พร้อม runtime edit แบบ sync, foliage, package example และขอบ terrain hole แบบไม่มี seam |
| `com.logiccuteguy.blendproperty` | Blend Property | `0.2.1` | 2022.3+ | Mesh modifier stack และ GPU physics สำหรับ Unity พร้อม component ร่วม VRChat/native standalone |
| `com.logiccuteguy.wasm2hlsl` | WASM2HLSL for LCGUdonSharp | `0.1.0` | 2022.3 | รัน kernel WebAssembly `.wasm` บน GPU เป็น HLSL shader เรียกจาก UdonSharp พร้อม async GPU readback |

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

### LCGUdonSharp `0.3.11`

0.3.11 เตือนแทนการบล็อกเมื่อ VRChat Worlds SDK ที่ติดตั้งอยู่ไม่ตรงกับเวอร์ชันที่รองรับ `3.10.5`: payload (build จาก SDK 3.10.5) ยังติดตั้งตามเดิม พร้อมแจ้งว่า **Tools > LCGUdonSharp > Restore** ย้อนกลับไปยัง UdonSharp ต้นฉบับที่สำรองไว้ นอกจากนี้ยังประกาศตัวอย่าง **LCGUdonSharp Examples** ใน `package.json` ทำให้ Package Manager แสดงรายการ ให้นำเข้าหลังติดตั้งคอมไพเลอร์อัตโนมัติเสร็จ

LCGUdonSharp 0.3.10 ติดตั้ง dependency แบบ embedded **SBP compatibility 1.21.26** ผ่าน VPM ก่อน Unity compile เพื่อกัน VRChat SDK `ExtensionMethods` ชนทั้งตอนติดตั้งใหม่และอัปเกรด ใช้ฐาน Unity SBP 1.21.25 โดยรักษา source/GUID และ Unity Companion License และยังอยู่หลังสร้าง `Library` ใหม่ Unity Localization 1.4.5 ยังรองรับ ดู[การติดตั้ง](./lcgudonsharp/install.md) การติดตั้งเองต้องใช้ release ZIP **ทั้งสองไฟล์**

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./lcgudonsharp/localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

LCGUdonSharp 0.3.8 เพิ่ม [snapshot ข้อมูล ScriptableObject](./lcgudonsharp/scriptableobjects.md) แบบซ้อนและ polymorphic พร้อม type test และ checked cast, ตรวจ cycle/ความลึก และตัวอย่างอุปกรณ์แบบ local ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่หลังอัปเดต เพราะ snapshot ใช้ layout ใหม่ที่มี runtime type tag

- [Repository](https://github.com/LogicCuteGuy/LCGUdonSharp) · [Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- Dependency: `com.vrchat.worlds` `3.10.5` (เวอร์ชันที่รองรับ ตั้งแต่ 0.3.11 เวอร์ชันอื่นติดตั้งพร้อมคำเตือน SDK ที่ไม่ได้ทดสอบ)
- License: MIT
- [ภาพรวม](./lcgudonsharp/intro.md) · [การติดตั้ง](./lcgudonsharp/install.md)

LCGUdonSharp ติดตั้งคอมไพเลอร์จาก `Payload~/UdonSharp` โดยไม่แก้ไขแพ็กเกจ Worlds SDK เวอร์ชัน 0.3.6 เพิ่ม bounded object-motion batching, snapshot/disconnect recovery, ownership repair และ native/LCG load example ที่ต่อครบ ต้อง build world ใหม่เพราะ build เก่า decode motion batch envelope ใหม่ไม่ได้

### DigHoleIt

DigHoleIt 0.7.0 เพิ่ม prefab Dig Pen, ปลูก/ลบ tree และ detail ตอน runtime (รวม foliage ที่ bake ไว้), smoothing แบบ sync, VRChat showcase และ Refresh Holes / Refresh Zones การตั้งค่าเป็น local แต่ edit ใน VRChat sync และ replay ให้ late joiner

- เวอร์ชันล่าสุด: `0.7.0` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)
- Unity 2022.3 และ Built-in Render Pipeline
- Dependency สำหรับ VRChat: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [Repository](https://github.com/LogicCuteGuy/DigHoleIt) · [Release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)
- License: MIT

Refresh [รายการ VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/index.json) แล้วติดตั้ง **0.7.0** ผ่าน VCC/ALCOM ได้ หรือใช้ `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0`, embedded repository ที่ tag นี้ หรือแตก `com.logiccuteguy.digholeit-0.7.0.zip` จาก[release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0) ห้ามใช้ source archive อัตโนมัติ หากใช้ Git/ZIP ใน VRChat project ให้[ติดตั้ง LCGUdonSharp](./lcgudonsharp/install.md) ก่อน

0.6.1 แก้ Undo หลัง Bake/move/resize, seam ของ terrain hole, foliage shading และ edge collision mesh ที่ไม่ถูกต้อง

[ภาพรวม](./digholeit/intro.md) · [เริ่มต้นใช้งาน](./digholeit/getting-started.md)

### `com.logiccuteguy.blendproperty` — Blend Property

0.2.1 เป็นรุ่นอัปเดตเอกสาร เพิ่มขั้นตอนติดตั้งผ่าน VCC/ALCOM และอธิบายทางเลือก Git/ZIP ให้ชัดเจนขึ้น Runtime code และ example asset ไม่เปลี่ยนจาก 0.2.0

0.2.0 แก้ความเข้ากันได้ของ VRChat panel โดย Control Panel และ Cloth Panel ใช้ `NoVariableSync` จึงอยู่ GameObject เดียวกับ Synced Control Panel ที่เป็น `Manual` ได้ พร้อมแก้ shader reference ใน baked GPU deform texture ของ example และอัปเดต VRChat scene ฟีเจอร์ GPU/native physics เดิมยังใช้ได้

- **เวอร์ชันล่าสุด**: 0.2.1 — [release](https://github.com/LogicCuteGuy/BlendProperty/releases/tag/v0.2.1)
- **Unity**: 2022.3 ขึ้นไป
- **License**: MIT
- **Dependency**: `com.unity.ugui` `1.0.0`; ProBuilder/Unity Splines เป็นทางเลือก และ VRChat ใช้ Worlds SDK/UdonSharp
- **Repository**: [LogicCuteGuy/BlendProperty](https://github.com/LogicCuteGuy/BlendProperty)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM, ใช้ `https://github.com/LogicCuteGuy/BlendProperty.git#v0.2.1`, embedded ที่ `Packages/com.logiccuteguy.blendproperty` หรือแตก named release asset `com.logiccuteguy.blendproperty-0.2.1.zip`

เลือกวิธีติดตั้งเดียวต่อ project เพื่อไม่ให้มี package ซ้ำ ดู[ขั้นตอนติดตั้ง](./blendproperty/intro.md)

[ภาพรวมและตั้งค่า](./blendproperty/intro.md) · [Modifier](./blendproperty/modifiers.md) · [Runtime/build](./blendproperty/runtime.md)

0.1.1 เพิ่ม live GPU modifier, cloth/soft body, fluid, hair, particle, paint/waves, destruction, ocean และ interaction Component ร่วมทำงาน native ได้เมื่อไม่มี Worlds SDK ส่วน Array/Curve ใช้ Unity Splines เสริม และ Array เพิ่ม Split Copies/Collider Per Copy การ sync control ไม่ใช่การ replicate GPU simulation ทั้งหมด ดู[Runtime/build](./blendproperty/runtime.md) และ[Physics/material](./blendproperty/physics.md)

### `com.logiccuteguy.wasm2hlsl` — WASM2HLSL for LCGUdonSharp

WASM2HLSL 0.1.0 แปลงโมดูล WebAssembly เป็น HLSL shader แล้วรันบน GPU จาก UdonSharp: วาง `.wasm` ใน `Assets/` แล้ว importer จะสร้าง shader/material/render texture หนึ่งชุดต่อ export ไว้ใน `.wasm` asset `WasmGpuRunner` ตั้ง argument กับ input แล้ว blit ทีละพิกเซล อ่านผลกลับผ่าน `VRCAsyncGPUReadback` เขียน kernel ด้วย Rust/C/Zig/AssemblyScript/TinyGo พร้อมแท็ก `@size` / `@traps` จากซอร์ส รองรับ `f32`/`f64`/`i64`/`v128` และ reference types โดยผลตรงทุกบิตยกเว้นการปัด `f32` ของ GPU

- **เวอร์ชันล่าสุด**: 0.1.0 — [release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0)
- **Unity**: 2022.3
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.10`
- **Repository**: [LogicCuteGuy/WASM2HLSL](https://github.com/LogicCuteGuy/WASM2HLSL)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (refresh รายการก่อน), ใช้ `https://github.com/LogicCuteGuy/WASM2HLSL.git#0.1.0`, embedded ที่ `Packages/com.logiccuteguy.wasm2hlsl` หรือแตก named release asset `com.logiccuteguy.wasm2hlsl-0.1.0.zip` เลือกวิธีเดียวต่อ project และหากใช้ Git/ZIP ให้[ติดตั้ง LCGUdonSharp](./lcgudonsharp/install.md) ก่อน

เอกสาร: [ภาพรวม](./wasm2hlsl/intro.md) · [เริ่มต้นใช้งาน](./wasm2hlsl/getting-started.md)
