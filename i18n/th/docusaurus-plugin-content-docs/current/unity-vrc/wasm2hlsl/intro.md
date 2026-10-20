---
sidebar_position: 1
---

# WASM2HLSL

> เวอร์ชันเอกสาร: **0.1.0** · [Release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0)

**WASM2HLSL for LCGUdonSharp** (`com.logiccuteguy.wasm2hlsl`) รัน WebAssembly บน GPU ใน VRChat world วางไฟล์ `.wasm` ลงในโปรเจกต์แล้ว editor จะแปลงเป็น HLSL จากนั้น UdonSharp `WasmGpuRunner` จะเรียกฟังก์ชันที่ export ไว้ทีละพิกเซลของ render texture แล้วอ่านผลกลับเข้า Udon

เขียน kernel เป็น **Rust, C/C++, Zig, AssemblyScript หรือ TinyGo** แทน HLSL ด้วยมือ Udon ช้า (ราว 1000 เท่าช้ากว่า C#) แต่ pixel shader ที่รัน logic เดียวกันพร้อมกันหลายพันพิกเซลไม่ช้า

## สิ่งใหม่ใน 0.1.0

release แรก: แปลง `.wasm` → HLSL, คอมโพเนนต์ U# `WasmGpuRunner`, อ่านชื่อ argument/`@size`/`@traps` จากซอร์ส, Trap Check, ทดสอบความสอดคล้องบน GPU เทียบกับ Node และตัวอย่าง Showcase/Chroma

## ข้อกำหนด

- **Unity** 2022.3
- **VRChat Worlds SDK** `3.10.5`
- **LCGUdonSharp** `com.logiccuteguy.lcgudonsharp` `>= 0.3.10` — ดู[คู่มือติดตั้ง](../lcgudonsharp/install.md)

## การติดตั้ง

### VCC / ALCOM

1. เพิ่ม [LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) ใน VCC/ALCOM หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` ด้วยมือ หากเพิ่มแล้วให้ refresh รายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. หา **WASM2HLSL for LCGUdonSharp** (`com.logiccuteguy.wasm2hlsl`) แล้วเพิ่ม **0.1.0** VPM จะติดตั้ง dependency ของ LCGUdonSharp ให้เอง
4. เปิดโปรเจกต์ใน Unity แล้วรอให้ import เสร็จ

### Unity Package Manager / ติดตั้งเอง

ใน **Window > Package Manager > + > Add package from git URL** ใส่:

```text
https://github.com/LogicCuteGuy/WASM2HLSL.git#0.1.0
```

หรือวาง repository ที่ tag ไว้ที่ `Packages/com.logiccuteguy.wasm2hlsl` หรือแตก `com.logiccuteguy.wasm2hlsl-0.1.0.zip` ที่มีชื่อชัดเจนจาก[release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0) ลงโฟลเดอร์นั้น โดยให้ `package.json` อยู่ที่ root ห้ามใช้ **Source code (zip)** ที่ GitHub สร้างอัตโนมัติ

เลือกวิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์เพื่อหลีกเลี่ยงสำเนาซ้ำ

## ไปป์ไลน์

```text
kernel.rs ──rustc──▶ kernel.wasm ──(import)──▶ ภายใน .wasm asset ต่อหนึ่ง export: shader + material + render texture
WasmGpuRunner (U#): args/SetInput → VRCGraphics.Blit → VRCAsyncGPUReadback → int[] resultLo
```

1. เขียนฟังก์ชัน export เป็นภาษา wasm
2. `.wasm` importer จะสร้าง shader/material/render texture หนึ่งชุดต่อ export เก็บไว้ใน `.wasm` asset เอง
3. `WasmGpuRunner` ตั้ง argument กับ input แล้ว blit shader ลง render texture (หนึ่งครั้งต่อพิกเซล) อ่าน plane กลับแบบ asynchronous เข้า `resultLo` / `resultHi` / `resultFloat`

รูปแบบ kernel, inspector ของ runner และ Udon API ดูที่[เริ่มต้นใช้งาน](./getting-started.md)

## หลักการทำงาน

`AsyncGPUReadback` อ่านได้เฉพาะเท็กซ์เจอร์ `R32_SINT` แบบจำนวนเต็ม ดังนั้น render texture จึงวาง**แถวเป็นชั้น (plane)**: ส่วนล่าง 32 บิตก่อน ตามด้วยส่วนบน 32 บิต (เฉพาะ `i64`) แล้วจึงแฟล็ก trap (เฉพาะตอนเปิด Trap Check) พิกเซลแต่ละตัวคำนวณการเรียกของตัวเองใหม่แล้วเขียนค่าลง plane ของตน หน่วยความจำเป็นของส่วนตัวต่อพิกเซลและรีเซตทุกครั้งที่รัน พิกเซลคุยกันไม่ได้ ผลลัพธ์ที่ return เท่านั้นคือ output

## โครงสร้างแพ็กเกจ

```text
Editor/   WasmModule.cs (ตัวแยกวิเคราะห์), WasmToHlsl.cs (ตัวแปลง), WasmImporter.cs (ตัว import .wasm), WasmGpuRunnerEditor.cs (ลากวาง + inspector),
          SourceNames.cs (ชื่อ argument, เอกสาร, @size / @traps จากซอร์ส), Icons/ (ไอคอน .wasm และ runner)
Runtime/  WasmGpuRunner.cs (UdonSharp) + U# assembly definition
Example/  Showcase.unity (Mandelbrot, เสียงสังเคราะห์ Juno-6, AudioDsp, DeepZoom f64, SimdPlasma v128 ใน VRChat world เดียว)
          Chroma/: scale-filter insert สดสำหรับ Juno-6 และ video player
          WasmIntDisplay.shader (แสดง render texture ของ runner โดยไม่ readback)
Tests~/   ทดสอบความสอดคล้องบน GPU (Rust → wasm → HLSL → D3D11 เทียบ Node): run.sh (MVP), types.sh (f64, v128, reference types)
          names/: ตรวจตัวแยกชื่อจากซอร์สต่อภาษา
          chroma_check.js: ตรวจ kernel ของ Example/Chroma เองใน Node
```

เปิด `Example/Showcase.unity` แล้วกด **Play** สำหรับ DeepZoom / SimdPlasma: รัน **Tools > WASM2HLSL > Add f64 + SIMD Examples To Scene** หนึ่งครั้ง แล้ว save scene

## การตรวจสอบ

`Tests~/run.sh` build kernel Rust (ลูป collatz, hash 64 บิต, `match` → `br_table`, div/rem 32/64 บิต, sort ในหน่วยความจำ, คำนวณทศนิยม, cast `i64`↔float, `input()`) รันเป็น D3D11 compute shader 1024 ครั้ง แล้วเทียบทุกผลกับ WebAssembly ของ Node: ทุกเส้นทางจำนวนเต็มตรงเป๊ะทุกบิต เส้นทาง `hlsl_sin` ต่างไม่เกิน 1 ulp ของผลลัพธ์ ตัวอย่าง Mandelbrot ก็ตรงทุกบิตเช่นกัน

`Tests~/types.sh` ทำแบบเดียวกันกับ type อื่น เรียก 4096 ครั้งต่อ export ตรงทุกบิตกับ Node: `f64` สเกลาร์, รูปทรง lane ของ SIMD ทุกแบบ, relaxed SIMD ที่ผลไม่ขึ้นกับ implementation และ reference types ส่วน `f32x4` div/sqrt รันที่ความแม่นยำ float ของ GPU เหมือน `f32` สเกลาร์ ยังไม่ได้ทดสอบบน Quest/Vulkan

เอกสาร: [เริ่มต้นใช้งาน](./getting-started.md) · [README ของ repository](https://github.com/LogicCuteGuy/WASM2HLSL#readme) · [GettingStarted.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/main/Documentation~/GettingStarted.md)
