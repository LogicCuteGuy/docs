---
sidebar_position: 2
---

# เริ่มต้นใช้งาน

วิธีเขียน kernel, เรียกใช้จาก Udon และอ่านผลลัพธ์กลับ

## ขั้นตอนรวดเร็ว

1. **เขียน kernel** พารามิเตอร์ 0 (ถ้าเป็น `i32`) รับ index ของพิกเซล ส่วนที่เหลือคือ argument ที่ตั้งจาก Udon ตามชื่อ export ได้หลายฟังก์ชันตามต้องการ คอมเมนต์เหนือแต่ละฟังก์ชันคือคำอธิบายใน inspector และมีสองแท็กที่ใช้ตั้งค่า: `@size W x H` (หรือ `@size N` สำหรับ N ครั้ง) คือจำนวนการเรียกต่อหนึ่ง `Run()` และ `@traps` เปิด Trap Check

```rust
#![no_std]
#[panic_handler] fn panic(_: &core::panic::PanicInfo) -> ! { loop {} }
#[link(wasm_import_module = "env")]
extern "C" {
    fn input(i: i32) -> i32;        // ไม่บังคับ: อ่านข้อมูลจาก SetInput()
    fn hlsl_sin(x: f32) -> f32;     // ไม่บังคับ: คณิตศาสตร์ GPU จริง
}

/// คูณแต่ละ word ของ input ด้วย `scale`
/// @size 256x256
#[no_mangle]
pub extern "C" fn main(id: i32, scale: i32) -> i32 {
    unsafe { input(id) } * scale
}

/// หนึ่งตัวอย่าง sine ต่อการเรียก
/// @size 48000 @traps
#[no_mangle]
pub extern "C" fn tone(id: i32, freq: f32) -> f32 {
    unsafe { hlsl_sin(id as f32 * freq * 0.000130899) }
}
```

2. **build ด้วย stack เล็ก** (หน่วยความจำ GPU อยู่ใน register ดูหัวข้อ **ข้อจำกัด** ด้านล่าง):

```bash
RUSTFLAGS="-C link-arg=-zstack-size=4096 -C target-cpu=mvp -C target-feature=+bulk-memory,+sign-ext,+nontrapping-fptoint" cargo build --release --target wasm32-unknown-unknown
```

เพิ่ม `,+simd128` (และ `,+relaxed-simd`) ใน features เพื่อใช้ `core::arch::wasm32` SIMD

3. **คัดลอก `.wasm` ไปไว้ใน `Assets/`** ไม่มีอย่างอื่นถูกสร้าง: shader, material และ render texture อยู่ใน `.wasm` asset (ขยายใน Project window เพื่อดู)

4. **ลาก `.wasm` ไปที่ Hierarchy หรือ Scene view** คุณจะได้ GameObject ที่มี `WasmGpuRunner` พร้อมใช้ซึ่งเก็บทุกฟังก์ชันที่ export inspector มี: `.wasm`, Function (ตัวที่ `Run()` เรียก), argument ในชื่อตามซอร์ส, Size และ Trap Check (ล็อกเมื่อ `@size` / `@traps` กำหนด) และ **Test** (รันบน GPU โดยไม่ต้องเข้า Play Mode)

5. **เรียกจากสคริปต์ U#:**

```csharp
public WasmGpuRunner runner;
void Start()
{
    runner.callbackTarget = this;
    runner.SetFunction("main");            // หรือคง Function จาก inspector
    runner.SetNamedArgInt("scale", 3);     // หรือ SetArgInt(1, 3): index พารามิเตอร์ wasm
    runner.SetInput(myData);
    runner.Run();                          // RunFunction("tone") = SetFunction + Run
}
public void OnWasmComplete() { Debug.Log(runner.resultFunction + ": " + runner.resultLo[0] + (runner.trapped ? " (trapped)" : "")); }
```

แต่ละ runner รันทีละฟังก์ชัน (`busy`) และแต่ละฟังก์ชันเก็บค่า argument ของตัวเอง

## ชื่อจากซอร์ส

wasm แบบ release เก็บชื่อฟังก์ชันไว้แต่ทิ้งชื่อพารามิเตอร์ จึงอ่านจากซอร์สข้าง `.wasm` (โฟลเดอร์นั้นและ `src/`; ตั้ง **Source Path** ในการตั้ง import ของ `.wasm` ได้ถ้าต้องการ) ซอร์สในโปรเจกต์จะทำให้ `.wasm` reimport เมื่อเปลี่ยน รูปแบบ export ที่รองรับ:

| ภาษา | Export | เปลี่ยนชื่อ |
|---|---|---|
| Rust | `pub extern "C" fn name(a: i32)` | `#[export_name = "x"]` |
| C / C++ | นิยามฟังก์ชัน `int name(int a)` | `__attribute__((export_name("x")))` |
| Zig | `export fn name(a: i32) i32` | — |
| AssemblyScript | `export function name(a: i32): i32` | — |
| TinyGo | `//export name` หรือ `//go:wasmexport name` เหนือ `func` | — |

ถ้าไม่มีซอร์ส argument จะชื่อ `arg1`, `arg2`, … และ Size / Trap Check มาจากการตั้ง import

## รูปแบบผลลัพธ์

| Export คืนค่า | อ่านด้วย |
|---|---|
| `i32` | `resultLo[i]` |
| `f32` | `resultFloat[i]` อ่านกลับแบบ native ไม่ต้องวนลูป Udon ต่อค่า จึงมีผลเป็นล้านค่าได้ |
| `f64` | `resultFloat[i]` (ปัดเป็น f32: Udon อ่าน float คำนวณด้วย f64 แล้วคืนค่าที่ต้องการ) |
| `i64` | `resultLo[i]` (32 บิตล่าง), `resultHi[i]` (32 บิตบน) |
| `funcref` / `externref` | `resultLo[i]`: index ของฟังก์ชัน, -1 = null |

Argument: `i32`/`i64`/ref ตั้งด้วย `SetArgInt`, `f32`/`f64` ตั้งด้วย `SetArgFloat` (argument `f64` คือ float ที่ขยายแบบ exact; ส่ง double เป็นสอง float คือ `hi = (float)d` และ `lo = (float)(d - hi)` แล้วบวกเป็น f64 เมื่อต้องการครบตามบิต ดู `Example/DeepZoom`) `v128` เป็น parameter หรือผลลัพธ์ของ export ไม่ได้ (Udon ไม่มีค่า 128 บิต) export แบบนี้จะถูกข้ามพร้อมคำเตือนตอน import

ถ้าไม่อยาก readback เลย ให้แสดง render texture: `WASM2HLSL/Int Display` (อยู่ใน `Example/`) อ่านเป็น RGBA8 แบบ pack หรือ palette ตามจำนวนรอบ

## Trap Check

Trap Check (`@traps` ในซอร์ส, inspector ของ runner หรือการตั้ง import ของ `.wasm`) ตั้ง `runner.trapped` เมื่อการเรียกใดโดน `unreachable`, หารด้วยศูนย์, เรียกช่อง `call_indirect` ผิด หรือลูปเกิน `W_MAX_LOOP_ITER` (65536) ครั้ง การเรียกนั้นจะคืน 0 ปิดไว้เป็นค่าเริ่มต้นเพราะเพิ่มแถวที่ต้อง readback อีกชุด

## รองรับ

ทุกชนิดค่าของ WebAssembly:

| ชนิด | บน GPU | ตรงเป๊ะ? |
|---|---|---|
| `i32` | `uint` | ใช่ |
| `i64` | `uint2` จำลอง (mul/div/rem/shift/rotate/clz/…) | ใช่ |
| `f32` | `float` | float ของ GPU (การปัดบิตสุดท้ายอาจต่าง, div/sqrt คลาดไม่กี่ ulp, denormal อาจถูก flush) |
| `f64` | `uint2` เก็บบิต IEEE, float ซอฟต์แวร์ (อัลกอริทึมของ SoftFloat, round to nearest even) | ใช่ ตรงทุกบิต รวม denormal, div, sqrt, การแปลง |
| `v128` | `uint4`: SIMD ครบ (i8x16 … f64x2) รวม relaxed SIMD (กำหนดได้แน่นอน) |  lane จำนวนเต็มและ `f64x2` ใช่; lane `f32x4` เหมือน `f32` |
| `funcref` / `externref` | `uint` (index ฟังก์ชัน, `0xFFFFFFFF` = null) | ใช่ |

- ชุดคำสั่ง MVP ครบ รวม sign-extension, การตัดแบบ saturating, `memory.copy` / `memory.fill` และบล็อก multi-value
- การเรียกตรง, `call_indirect` (dispatch ด้วย chain ของ `if`), global ที่เปลี่ยนค่าได้ และ data segment
- Reference types: `ref.null` / `ref.is_null` / `ref.func`, `select` แบบมีชนิด, ref local/global, หลายตาราง, `table.get` / `set` / `size` / `grow` (ล้มเหลวเสมอ เหมือน `memory.grow`) / `fill` / `copy` / `init`, `elem.drop` ตารางที่โค้ดเขียนจะเก็บแยกต่อพิกเซล และ `call_indirect` ผ่านมันจะ dispatch ตามฟังก์ชันที่เก็บไว้
- Import: `input(i32) -> i32` (word ดิบจาก `SetInput`) และคณิตศาสตร์ที่ map ไป HLSL intrinsic: `hlsl_sin`, `hlsl_cos`, `hlsl_tan`, `hlsl_asin`, `hlsl_acos`, `hlsl_atan`, `hlsl_atan2`, `hlsl_sinh`, `hlsl_cosh`, `hlsl_tanh`, `hlsl_exp`, `hlsl_exp2`, `hlsl_log`, `hlsl_log2`, `hlsl_log10`, `hlsl_pow`, `hlsl_sqrt`, `hlsl_fmod`, `hlsl_fmin`, `hlsl_fmax`, … (`sinf`/`powf` ใช้ได้ใน C ด้วย แต่ compiler_builtins ของ Rust link libm ซอฟต์แวร์ของตัวเองกับชื่อเหล่านั้น ให้ใช้นำหน้า `hlsl_`)

## ข้อจำกัด (ข้อจำกัด by design ของ GPU shader)

| ข้อจำกัด | เหตุผล | วิธีแก้ |
|---|---|---|
| ไม่มี recursion | HLSL ไม่มี call stack ตัวแปลงจะ error พร้อมบอกวงจร | เขียนเป็นลูปใหม่ |
| หน่วยความจำ ≤ 64000 bytes | Linear memory คืออาร์เรย์ register `uint4` ต่อพิกเซล (fxc จำกัด 4096 register) ขนาดคือจุดสิ้นสุดข้อมูล + stack ไม่ใช่จำนวน page ที่ประกาศ | `-zstack-size=4096`, static เล็กๆ, ไม่มี heap |
| `memory.grow` เสมอ fail | หน่วยความจำคงที่ | ใช้ `no_std` โดยไม่มี allocator |
| `f64` ช้า | GPU มือถือ/Quest ไม่มี double จึงทุก operation ของ f64 เป็นคำสั่งจำนวนเต็มราว 100 ตัว (div/sqrt ลูป 55–63 ครั้ง) shader ที่ใช้ f64 compile ช้าด้วย: `Example/DeepZoom` ราว 1 นาที และเวลาของ fxc เพิ่มแบบเหนือเชิงเส้น export เดียวที่ใช้ f64 หลายสิบแบบจึงอาจกินหลายนาที | ใช้ `f32` ถ้าความแม่นยำพอ แบ่ง kernel f64 ใหญ่เป็นหลาย export: แต่ละ export compile เฉพาะโค้ดที่ไปถึง |
| Math import รันเป็น f32 | `hlsl_sin(f64)` ฯลฯ เรียก float intrinsic ของ GPU | เขียนฟังก์ชันนั้นเป็น f64 เองเมื่อต้องการความแม่นยำ |
| ไม่มี thread, exception, GC, tail call, `memory.init` / `data.drop` | แสดงผลใน pixel shader ไม่ได้ | — |
| โมดูลใหญ่ compile ช้า | fxc inline ทุกฟังก์ชัน kernel ~6 KB ใช้ ~10 วินาที ส่วน libm ซอฟต์แวร์ของ Rust (`f32::sin` ผ่าน compiler_builtins) ใช้หลายนาที | ใช้ `hlsl_*` แทน libm และ keep kernel เล็กๆ |

หน่วยความจำเป็นของส่วนตัวต่อพิกเซลและรีเซตทุกครั้งที่รัน พิกเซลคุยกันไม่ได้ ผลลัพธ์ที่ return เท่านั้นคือ output

เอกสาร: [ภาพรวม](./intro.md)
