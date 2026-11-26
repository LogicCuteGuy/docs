---
sidebar_position: 2
---

# แพ็กเกจ

**URL รายการ**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | ชื่อ | เวอร์ชันล่าสุด | Unity | คำอธิบาย |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | เครื่องมือ Editor กว่า 15 รายการสำหรับจัดการ scene, object และ optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.5.0` | 2022.3 | เพิ่ม interface, async/await, try/catch, collection/JSON และความสามารถภาษาให้ UdonSharp ของ SDK ผ่าน compiler hook |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.7.2` | 2022.3 | โซน voxel ที่ขุดได้สำหรับ Unity Terrain พร้อม runtime edit แบบ sync, foliage, package example และขอบ terrain hole แบบไม่มี seam |
| `com.logiccuteguy.blendproperty` | Blend Property | `0.2.2` | 2022.3+ | Mesh modifier stack และ GPU physics สำหรับ Unity พร้อม component ร่วม VRChat/native standalone |
| `com.logiccuteguy.wasm2hlsl` | WASM2HLSL for UdonSharp | `0.2.2` | 2022.3 | รัน kernel WebAssembly `.wasm` บน GPU เป็น HLSL shader เรียกจาก UdonSharp พร้อม async GPU readback |
| `com.logiccuteguy.uihud` | UIHUD | `0.2.0` | 2022.3 | HUD, เมนูแบบเลื่อนเข้า และ UI widget สำหรับ world ของ VRChat และเกม Unity แบบ standalone บน VR, desktop และมือถือ |
| `com.logiccuteguy.lcglocalization` | LCG Localization | `0.1.0` | 2022.3 | แปลข้อความและ asset สำหรับ UdonSharp โดย bake ตารางของ Unity Localization เป็น Udon |
| `com.logiccuteguy.clientnetsim` | ClientSim Net | `0.1.2` | 2022.3 | ตัวจำลอง network แบบหลายผู้เล่นสำหรับ VRChat ClientSim: ผู้เล่น remote แบบ puppet, latency/jitter/loss, ownership, late join และ network debugger |
| `com.logiccuteguy.lcgnetwork` | LCG Network System | `0.1.0` | 2022.3 | networking แบบจำกัดตามโซนสำหรับ world ของ VRChat: จัดเส้นทาง networking ปกติของ UdonSharp, Udon Graph และ Udon Assembly ผ่านโซน |
| `com.logiccuteguy.openworld` | OpenWorld | `0.0.1` | 2022.3 | เอนจินโลกแบบแบ่งกริดเป็น chunk สำหรับ VRChat: สตรีม chunk, impostor, Block แบบ GPU instancing และแก้ไขขณะเล่น |
| `com.logiccuteguy.streamdata` | StreamData | `0.0.1` | 2022.3 | สตรีม texture และ lightmap ของโลก VRChat จากเว็บหลังโลกโหลดเสร็จ พร้อมเผยแพร่ขึ้น GitHub Pages หรือโฮสต์ของคุณเอง |
| `com.logiccuteguy.zonedraw` | ZoneDraw | `0.1.0` | 2022.3 | คลิกเพื่อวาดกำแพงล่องหนและพื้นที่ trigger แล้ว bake เป็น collider ปกติ พร้อม API สำหรับ UdonSharp |

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

### LCGUdonSharp `0.5.0`

LCGUdonSharp **0.5.0** hook เข้ากับ UdonSharp ของ VRChat SDK แทนการแทนที่ ไม่มี installer และไม่แก้ไฟล์ของ SDK ต้องใช้ Worlds SDK `>=3.10.6 <3.11.0` ระบบ network ฝั่งคอมไพเลอร์ถูกนำออก (ดู [LCG Network System](./lcgnetwork/intro)) ไม่ต้องใช้แพ็กเกจ SBP compatibility แล้ว และ release ไม่มีตัวอย่าง การอัปเกรดจาก 0.4.x หรือเก่ากว่าต้องทำขั้นตอนเพิ่ม ดู[การติดตั้ง](./lcgudonsharp/install.md) บันทึกของรุ่นก่อนหน้าด้านล่างเป็นประวัติ

0.3.12 เตือนแทนการบล็อกเมื่อ VRChat Worlds SDK ที่ติดตั้งอยู่ไม่ตรงกับเวอร์ชันที่รองรับ `3.10.5`: payload (build จาก SDK 3.10.5) ยังติดตั้งตามเดิม พร้อมแจ้งว่า **Tools > LCGUdonSharp > Restore** ย้อนกลับไปยัง UdonSharp ต้นฉบับที่สำรองไว้ นอกจากนี้ยังประกาศตัวอย่าง **LCGUdonSharp Examples** ใน `package.json` ทำให้ Package Manager แสดงรายการ ให้นำเข้าหลังติดตั้งคอมไพเลอร์อัตโนมัติเสร็จ

LCGUdonSharp 0.3.10 ติดตั้ง dependency แบบ embedded **SBP compatibility 1.21.26** ผ่าน VPM ก่อน Unity compile เพื่อกัน VRChat SDK `ExtensionMethods` ชนทั้งตอนติดตั้งใหม่และอัปเกรด ใช้ฐาน Unity SBP 1.21.25 โดยรักษา source/GUID และ Unity Companion License และยังอยู่หลังสร้าง `Library` ใหม่ Unity Localization 1.4.5 ยังรองรับ ดู[การติดตั้ง](./lcgudonsharp/install.md) การติดตั้งเองต้องใช้ release ZIP **ทั้งสองไฟล์**

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./lcgudonsharp/localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

LCGUdonSharp 0.3.8 เพิ่ม [snapshot ข้อมูล ScriptableObject](./lcgudonsharp/scriptableobjects.md) แบบซ้อนและ polymorphic พร้อม type test และ checked cast, ตรวจ cycle/ความลึก และตัวอย่างอุปกรณ์แบบ local ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่หลังอัปเดต เพราะ snapshot ใช้ layout ใหม่ที่มี runtime type tag

- [Repository](https://github.com/LogicCuteGuy/LCGUdonSharp) · [Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- Dependency: `com.vrchat.worlds` `>=3.10.6` (คอมไพเลอร์รองรับ `>=3.10.6 <3.11.0`)
- License: MIT
- [ภาพรวม](./lcgudonsharp/intro.md) · [การติดตั้ง](./lcgudonsharp/install.md)

ส่วนเสริมคอมไพเลอร์ UdonSharp สำหรับ VRChat: C# interface, async/await ตอน build, try/catch/finally แบบ synchronous, collection/JSON และความสามารถภาษาเพิ่มเติม

### DigHoleIt

DigHoleIt 0.7.0 เพิ่ม prefab Dig Pen, ปลูก/ลบ tree และ detail ตอน runtime (รวม foliage ที่ bake ไว้), smoothing แบบ sync, VRChat showcase และ Refresh Holes / Refresh Zones การตั้งค่าเป็น local แต่ edit ใน VRChat sync และ replay ให้ late joiner

- เวอร์ชันล่าสุด: `0.7.2` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2)
- Unity 2022.3 และ Built-in Render Pipeline
- Dependency สำหรับ VRChat: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- [Repository](https://github.com/LogicCuteGuy/DigHoleIt) · [Release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2)
- License: MIT

Refresh [รายการ VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/index.json) แล้วติดตั้ง **0.7.2** ผ่าน VCC/ALCOM ได้ หรือใช้ `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.2`, embedded repository ที่ tag นี้ หรือแตก `com.logiccuteguy.digholeit-0.7.2.zip` จาก[release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2) ห้ามใช้ source archive อัตโนมัติ หากใช้ Git/ZIP ใน VRChat project ให้[ติดตั้ง LCGUdonSharp](./lcgudonsharp/install.md) ก่อน

0.6.1 แก้ Undo หลัง Bake/move/resize, seam ของ terrain hole, foliage shading และ edge collision mesh ที่ไม่ถูกต้อง

[ภาพรวม](./digholeit/intro.md) · [เริ่มต้นใช้งาน](./digholeit/getting-started.md)

### `com.logiccuteguy.blendproperty` — Blend Property

0.2.1 เป็นรุ่นอัปเดตเอกสาร เพิ่มขั้นตอนติดตั้งผ่าน VCC/ALCOM และอธิบายทางเลือก Git/ZIP ให้ชัดเจนขึ้น Runtime code และ example asset ไม่เปลี่ยนจาก 0.2.0

0.2.0 แก้ความเข้ากันได้ของ VRChat panel โดย Control Panel และ Cloth Panel ใช้ `NoVariableSync` จึงอยู่ GameObject เดียวกับ Synced Control Panel ที่เป็น `Manual` ได้ พร้อมแก้ shader reference ใน baked GPU deform texture ของ example และอัปเดต VRChat scene ฟีเจอร์ GPU/native physics เดิมยังใช้ได้

- **เวอร์ชันล่าสุด**: 0.2.1 — [release](https://github.com/LogicCuteGuy/BlendProperty/releases/tag/v0.2.2)
- **Unity**: 2022.3 ขึ้นไป
- **License**: MIT
- **Dependency**: `com.unity.ugui` `1.0.0`; ProBuilder/Unity Splines เป็นทางเลือก และ VRChat ใช้ Worlds SDK/UdonSharp
- **Repository**: [LogicCuteGuy/BlendProperty](https://github.com/LogicCuteGuy/BlendProperty)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM, ใช้ `https://github.com/LogicCuteGuy/BlendProperty.git#v0.2.2`, embedded ที่ `Packages/com.logiccuteguy.blendproperty` หรือแตก named release asset `com.logiccuteguy.blendproperty-0.2.2.zip`

เลือกวิธีติดตั้งเดียวต่อ project เพื่อไม่ให้มี package ซ้ำ ดู[ขั้นตอนติดตั้ง](./blendproperty/intro.md)

[ภาพรวมและตั้งค่า](./blendproperty/intro.md) · [Modifier](./blendproperty/modifiers.md) · [Runtime/build](./blendproperty/runtime.md)

0.1.1 เพิ่ม live GPU modifier, cloth/soft body, fluid, hair, particle, paint/waves, destruction, ocean และ interaction Component ร่วมทำงาน native ได้เมื่อไม่มี Worlds SDK ส่วน Array/Curve ใช้ Unity Splines เสริม และ Array เพิ่ม Split Copies/Collider Per Copy การ sync control ไม่ใช่การ replicate GPU simulation ทั้งหมด ดู[Runtime/build](./blendproperty/runtime.md) และ[Physics/material](./blendproperty/physics.md)

### `com.logiccuteguy.wasm2hlsl` — WASM2HLSL for UdonSharp

WASM2HLSL 0.2.0 อ่านตารางค่าคงที่ขนาดใหญ่จากเท็กซ์เจอร์: `.rodata` ที่ 1 KB ขึ้นไป (`static` / `const` table, `include_bytes!`) มาจากเท็กซ์เจอร์ `rom` ที่ตั้งเป็น `_WasmRom` แทน register ของ GPU จึงไม่นับรวมในขีดจำกัดหน่วยความจำ 64000 byte โดยไม่ต้องแก้ซอร์ส การตั้ง import **Texture Constants From (bytes)** กำหนดเกณฑ์ (ค่าเริ่ม 1024; 0 คือเก็บทุกอย่างใน register) แก้เสียงตัวอย่างที่ขาดตอน instance ยุ่ง, การ sync write-ahead ของ Chroma หลัง hitch (ฟิลด์ใหม่ `maxLead`, output ring 131072 เฟรม) และ Udon exception ของ `WasmGpuRunner` ตอนออกจาก world ดู[CHANGELOG.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/0.2.0/CHANGELOG.md)

WASM2HLSL 0.1.0 แปลงโมดูล WebAssembly เป็น HLSL shader แล้วรันบน GPU จาก UdonSharp: วาง `.wasm` ใน `Assets/` แล้ว importer จะสร้าง shader/material/render texture หนึ่งชุดต่อ export ไว้ใน `.wasm` asset `WasmGpuRunner` ตั้ง argument กับ input แล้ว blit ทีละพิกเซล อ่านผลกลับผ่าน `VRCAsyncGPUReadback` เขียน kernel ด้วย Rust/C/Zig/AssemblyScript/TinyGo พร้อมแท็ก `@size` / `@traps` จากซอร์ส รองรับ `f32`/`f64`/`i64`/`v128` และ reference types โดยผลตรงทุกบิตยกเว้นการปัด `f32` ของ GPU

- **เวอร์ชันล่าสุด**: 0.2.0 — [release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.2.2)
- **Unity**: 2022.3
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **Repository**: [LogicCuteGuy/WASM2HLSL](https://github.com/LogicCuteGuy/WASM2HLSL)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (refresh รายการก่อน), ใช้ `https://github.com/LogicCuteGuy/WASM2HLSL.git#0.2.2`, embedded ที่ `Packages/com.logiccuteguy.wasm2hlsl` หรือแตก named release asset `com.logiccuteguy.wasm2hlsl-0.2.2.zip` เลือกวิธีเดียวต่อ project และหากใช้ Git/ZIP ให้[ติดตั้ง LCGUdonSharp](./lcgudonsharp/install.md) ก่อน

เอกสาร: [ภาพรวม](./wasm2hlsl/intro.md) · [เริ่มต้นใช้งาน](./wasm2hlsl/getting-started.md)

### `com.logiccuteguy.uihud` — UIHUD

UIHUD 0.1.0 เพิ่ม HUD, เมนูแบบเลื่อนเข้า และ UI widget มากกว่า 20 แบบ สำหรับ world ของ VRChat และเกม Unity แบบ standalone ตั้งค่าครั้งเดียวใช้ได้ทั้ง VR, desktop และมือถือ ได้แก่ HUD ของผู้เล่น, เมนูแบบเลื่อนเข้า, panel ใน world, hotbar, ปุ่มบนข้อมือและมือถือ, style preset, animation ของเมนูกับ widget และการสร้าง widget ตอน runtime จาก Udon ทุกอย่างทำงานบนเครื่องตัวเอง (`NoVariableSync`)

0.1.2 ผ่อน dependency ของ Worlds SDK เป็น `3.x.x` (`>=3.10.5`) ส่วน 0.1.1 ทำให้เครื่องหมายถูกของ toggle ยืดเต็มช่อง checkbox และเพิ่มภาพหน้าจอตัวอย่างใน README

- **เวอร์ชันล่าสุด**: 0.2.0 — [release](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **Dependencies**: `com.unity.textmeshpro` `3.0.6`, `com.unity.ugui` `1.0.0`, `com.unity.modules.physics` `1.0.0`, `com.unity.modules.xr` `1.0.0`
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **Repository**: [LogicCuteGuy/UIHUD](https://github.com/LogicCuteGuy/UIHUD)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน), ใช้ `https://github.com/LogicCuteGuy/UIHUD.git#0.2.0`, วางไว้ที่ `Packages/com.logiccuteguy.uihud` หรือแตกไฟล์ `com.logiccuteguy.uihud-0.2.0.zip` จาก release และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./uihud/intro.md) · [เริ่มต้นใช้งาน](./uihud/getting-started.md) · [เมนู, hotbar และ world panel](./uihud/menus-and-layout.md) · [Scripting](./uihud/scripting.md)

### `com.logiccuteguy.lcglocalization` — LCG Localization

LCG Localization 0.1.0 เป็นรุ่นแรกที่เผยแพร่ bake Unity String Table และ Asset Table เป็น Udon รองรับการเรียก manager โดยตรง, dropdown, callback, ตัวแปร Smart และการสลับ sprite/texture/เสียง/prefab พร้อม fallback ใช้กับ UdonSharp ของ VRChat SDK ได้ ส่วน LCGUdonSharp ใช้หรือไม่ก็ได้

- **เวอร์ชันล่าสุด**: 0.1.0 — [release](https://github.com/LogicCuteGuy/LCGLocalization/releases/tag/0.1.0)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **Dependencies**: `com.unity.localization` `1.4.5`, `com.unity.scriptablebuildpipeline` `1.21.25`
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`), `com.unity.scriptablebuildpipeline` `1.x.x` (`>=1.21.26`)
- **Repository**: [LogicCuteGuy/LCGLocalization](https://github.com/LogicCuteGuy/LCGLocalization)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) หรือใช้ `https://github.com/LogicCuteGuy/LCGLocalization.git#0.1.0` และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./lcglocalization/intro.md)

### `com.logiccuteguy.clientnetsim` — ClientSim Net

ClientSim Net 0.1.2 ทำให้ world ของผู้เล่นแต่ละคนมีสำเนา PlayerObject ทั้งหมดเป็นของตัวเอง การ sync และ event ของ PlayerObject จึงทำงานบน client ของผู้เล่นคนนั้น 0.1.1 แสดงผู้เล่นคนอื่นเป็น capsule ติดชื่อในทุก world และ 0.1.0 เป็นรุ่นแรก แพ็กเกจเพิ่มผู้เล่น remote แบบ puppet ให้ ClientSim ของ VRChat โดยแต่ละคนรันสำเนา world ของตัวเอง มี latency, jitter และ loss, `RequestSerialization`/`OnDeserialization` จริง, target และ rate limit ของ network event, ownership, late join, pickup ที่มี ObjectSync, network debugger และ world ตัวอย่างสำหรับทดสอบ

- **เวอร์ชันล่าสุด**: 0.1.2 — [release](https://github.com/LogicCuteGuy/ClientSimNet/releases/tag/0.1.2)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **VPM dependencies**: `com.vrchat.worlds` `>=3.10.0`
- **Repository**: [LogicCuteGuy/ClientSimNet](https://github.com/LogicCuteGuy/ClientSimNet)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) หรือใช้ `https://github.com/LogicCuteGuy/ClientSimNet.git#0.1.2` และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./clientsimnet/intro.md) · [การใช้งาน ClientSim Net](./clientsimnet/usage.md)

### `com.logiccuteguy.lcgnetwork` — LCG Network System

LCG Network System 0.1.0 เป็นรุ่นแรก (preview) ที่แยกออกมาจาก LCGUdonSharp ตัวแปร sync และ network event ของ object ใต้ `LCGNetworkZone` จะไปถึงเฉพาะผู้เล่นในโซน `RequestSerialization`, `SendCustomNetworkEvent` และ `NetworkCalling.CallingPlayer` ตามปกติถูกเปลี่ยนเส้นทางตอน build สำหรับ UdonSharp, Udon Graph และ Udon Assembly ส่วน `[LCGPacket]` ใช้กับ UdonSharp ของ SDK ได้ ยังไม่ได้ตรวจใน VRChat build ที่มีหลาย client

- **เวอร์ชันล่าสุด**: 0.1.0 — [release](https://github.com/LogicCuteGuy/LCGNetwork/releases/tag/0.1.0)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.8.1`)
- **Repository**: [LogicCuteGuy/LCGNetwork](https://github.com/LogicCuteGuy/LCGNetwork)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) หรือใช้ `https://github.com/LogicCuteGuy/LCGNetwork.git#0.1.0` และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./lcgnetwork/intro.md) · [การใช้งาน LCG Network](./lcgnetwork/usage.md)

### `com.logiccuteguy.openworld` — OpenWorld

OpenWorld 0.0.1 เป็นรุ่นแรกที่เผยแพร่ เอนจินโลกแบบแบ่งกริดเป็น chunk สำหรับ VRChat: สตรีม chunk, impostor, Block แบบ GPU instancing และแก้ไขขณะเล่น

- **เวอร์ชันล่าสุด**: 0.0.1 — [release](https://github.com/LogicCuteGuy/OpenWorld/releases/tag/0.0.1)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`), `com.logiccuteguy.streamdata` `>=0.0.1`
- **Repository**: [LogicCuteGuy/OpenWorld](https://github.com/LogicCuteGuy/OpenWorld)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) ซึ่งจะเพิ่ม StreamData ให้ด้วย ถ้าจะติดตั้งเองดูที่[ภาพรวม](./openworld/intro.md) อย่าใช้ Git URL เพราะจะไม่เพิ่ม StreamData และแพ็กเกจแบบ Git เป็นแบบอ่านอย่างเดียว จึงสร้าง asset พื้นดินของ DigHoleIt ไม่ได้

เอกสาร: [ภาพรวม](./openworld/intro.md) · [เริ่มต้นใช้งาน](./openworld/getting-started.md)

### `com.logiccuteguy.streamdata` — StreamData

StreamData 0.0.1 เป็นรุ่นแรกที่เผยแพร่ สตรีม texture และ lightmap ของโลก VRChat จากเว็บหลังโลกโหลดเสร็จ พร้อมเผยแพร่ขึ้น GitHub Pages หรือโฮสต์ของคุณเอง

- **เวอร์ชันล่าสุด**: 0.0.1 — [release](https://github.com/LogicCuteGuy/StreamData/releases/tag/0.0.1)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **Repository**: [LogicCuteGuy/StreamData](https://github.com/LogicCuteGuy/StreamData)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) หรือใช้ `https://github.com/LogicCuteGuy/StreamData.git#0.0.1` และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./streamdata/intro.md) · [เริ่มต้นใช้งาน](./streamdata/getting-started.md)

### `com.logiccuteguy.zonedraw` — ZoneDraw

ZoneDraw 0.1.0 เป็นรุ่นแรกที่เผยแพร่ คลิกเพื่อวาดกำแพงล่องหนและพื้นที่ trigger แล้ว bake เป็น collider ปกติ พร้อม API สำหรับ UdonSharp

- **เวอร์ชันล่าสุด**: 0.1.0 — [release](https://github.com/LogicCuteGuy/ZoneDraw/releases/tag/0.1.0)
- **Unity**: 2022.3
- **สัญญาอนุญาต**: MIT
- **VPM dependencies**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **Repository**: [LogicCuteGuy/ZoneDraw](https://github.com/LogicCuteGuy/ZoneDraw)

ติดตั้งผ่านรายการ VPM ใน VCC/ALCOM (รีเฟรชรายการก่อน) หรือใช้ `https://github.com/LogicCuteGuy/ZoneDraw.git#0.1.0` และเลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์

เอกสาร: [ภาพรวม](./zonedraw/intro.md) · [เริ่มต้นใช้งาน](./zonedraw/getting-started.md)
