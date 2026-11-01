---
sidebar_position: 1
---

# WASM2HLSL

> Documentation version: **0.2.1** · [Release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.2.1)

**WASM2HLSL for UdonSharp** (`com.logiccuteguy.wasm2hlsl`) runs WebAssembly on the GPU in a VRChat world. Drop a `.wasm` file into the project and the editor translates it to HLSL; an UdonSharp `WasmGpuRunner` then executes the exported function once per pixel of a render texture and reads the results back into Udon.

Write the kernel in **Rust, C/C++, Zig, AssemblyScript or TinyGo** instead of hand-written HLSL. Udon is slow — roughly 1000× slower than C# — but a pixel shader running the same logic over thousands of pixels in parallel is not.

## What's new in 0.2.1

Supports stock UdonSharp, and the package display name is now **WASM2HLSL for UdonSharp**. LCGUdonSharp is no longer required.

## What's new in 0.2.0

Big constant tables: `.rodata` of 1 KB or more (`static` / `const` tables, `include_bytes!`) is read from a texture instead of GPU registers, so it no longer counts toward the 64000-byte memory limit — with no source changes. The importer adds a `rom` texture to the `.wasm` asset, already set as `_WasmRom` on every export's material, and the new **Texture Constants From (bytes)** import setting picks the threshold (default 1024; 0 keeps everything in registers). The asset summary shows the ROM size next to "GPU memory per call".

The Mandelbrot example now colours smoothly through a 64 KB palette in the ROM texture. Fixes: audio examples no longer drop out on busy instances (AudioSource priority 0), Chroma's write-ahead grows after a hitch (new `maxLead`, 131072-frame output ring), and `WasmGpuRunner` ignores readbacks delivered after the world is torn down — no more Udon exception when leaving or quitting a world.

Importer version 9 reimports every `.wasm` once; modules without large `.rodata` produce the same HLSL as before. See [CHANGELOG.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/0.2.0/CHANGELOG.md).

## What's new in 0.1.0

Initial release: `.wasm` → HLSL translation, the `WasmGpuRunner` U# component, argument/`@size`/`@traps` names read from source, Trap Check, GPU conformance tests against Node, and the Showcase/Chroma examples.

## Requirements

- **Unity** 2022.3
- **VRChat Worlds SDK** `3.10.5`
- **UdonSharp** — stock UdonSharp from the Worlds SDK works; [LCGUdonSharp](../lcgudonsharp/install.md) `>= 0.3.10` is optional

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) to VCC/ALCOM, or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if it is already added.
2. Open **Manage Project** for your Unity project.
3. Find **WASM2HLSL for UdonSharp** (`com.logiccuteguy.wasm2hlsl`) and add **0.2.1**.
4. Open the project in Unity and let the package import.

### Unity Package Manager / manual

In **Window > Package Manager > + > Add package from git URL**, enter:

```text
https://github.com/LogicCuteGuy/WASM2HLSL.git#0.2.1
```

Alternatively place the tagged repository at `Packages/com.logiccuteguy.wasm2hlsl`, or extract the named `com.logiccuteguy.wasm2hlsl-0.2.1.zip` from [the release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.2.1) into that folder, with `package.json` at its root. Do not use GitHub's automatic **Source code (zip)** archive.

Choose **one installation method per project** to avoid duplicate copies.

## Pipeline

```text
kernel.rs ──rustc──▶ kernel.wasm ──(import)──▶ inside the .wasm asset, per export: shader + material + render texture
WasmGpuRunner (U#): args/SetInput → VRCGraphics.Blit → VRCAsyncGPUReadback → int[] resultLo
```

1. You write an exported function in a wasm language.
2. The `.wasm` importer builds one shader, material and render texture per export — all stored inside the `.wasm` asset itself.
3. The `WasmGpuRunner` sets arguments and input data, blits the shader over the render texture (one invocation per pixel), and reads the planes back asynchronously into `resultLo` / `resultHi` / `resultFloat`.

See [Getting started](./getting-started.md) for the kernel format, the runner inspector and the Udon API.

## How it works

`AsyncGPUReadback` only reads `R32_SINT` integer textures, so the render texture stacks **planes of rows**: the low 32 bits first, then the high 32 bits (`i64` only), then the trap flag (Trap Check only). Each pixel recomputes its call and writes its plane's value. Memory is private to each pixel and resets every run; pixels cannot talk to each other — return values are the only output.

## Package layout

```text
Editor/   WasmModule.cs (parser), WasmToHlsl.cs (translator), WasmImporter.cs (.wasm importer), WasmGpuRunnerEditor.cs (drag & drop + inspector),
          SourceNames.cs (argument names, docs, @size / @traps from source), Icons/ (.wasm and runner icons)
Runtime/  WasmGpuRunner.cs (UdonSharp) + U# assembly definition
Example/  Showcase.unity (Mandelbrot, Juno-6 synth, AudioDsp, DeepZoom f64, SimdPlasma v128 in one VRChat world)
          Chroma/: live scale-filter insert for the Juno-6 and a video player
          WasmIntDisplay.shader (shows a runner's render texture without readback)
Tests~/   GPU conformance tests (Rust → wasm → HLSL → D3D11 vs Node): run.sh (MVP), types.sh (f64, v128, reference types)
          names/: source-name parser check per language
          chroma_check.js: Example/Chroma kernel self-check in Node
```

Open `Example/Showcase.unity` and press **Play**. DeepZoom / SimdPlasma: run **Tools > WASM2HLSL > Add f64 + SIMD Examples To Scene** once, then save the scene.

## Verified

`Tests~/run.sh` builds a Rust kernel (collatz loops, 64-bit hashing, `match` → `br_table`, 32/64-bit div/rem, an in-memory sort, float math, `i64`↔float casts, `input()`, a 96 KB `.rodata` table read through the ROM texture), runs it as a D3D11 compute shader on 1024 invocations and compares every result with Node's WebAssembly: all integer paths are bit-exact; the `hlsl_sin` path differs by ≤ 1 ulp of the output. The Mandelbrot sample (64 KB palette in the ROM texture) matches Node on 99.7% of pixels — the rest differ only because `hlsl_log2` is the GPU's f32 log2 — and a Unity `Graphics.Blit` of it is identical, pixel for pixel, to the D3D11 test.

`Tests~/types.sh` does the same for the other types, 4096 calls per export, all bit-for-bit with Node: scalar `f64`, every SIMD lane shape, relaxed SIMD where the result is not implementation-defined, and reference types. `f32x4` div/sqrt run at GPU float precision, like scalar `f32`. Not yet tested on Quest/Vulkan.

Docs: [Getting started](./getting-started.md) · [Repository README](https://github.com/LogicCuteGuy/WASM2HLSL#readme) · [GettingStarted.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/main/Documentation~/GettingStarted.md)
