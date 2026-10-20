---
sidebar_position: 2
---

# Getting started

How to write a kernel, run it from Udon, and read the results back.

## Quick start

1. **Write a kernel.** Parameter 0 (if `i32`) receives the pixel index; the others are arguments you set from Udon by name. Export as many functions as you like. The comment above each one is its inspector help, and two tags set it up: `@size W x H` (or `@size N` for N calls) is how many calls one `Run()` makes, and `@traps` turns on Trap Check.

```rust
#![no_std]
#[panic_handler] fn panic(_: &core::panic::PanicInfo) -> ! { loop {} }
#[link(wasm_import_module = "env")]
extern "C" {
    fn input(i: i32) -> i32;        // optional: reads SetInput() data
    fn hlsl_sin(x: f32) -> f32;     // optional: native GPU math
}

/// Multiplies each input word by `scale`.
/// @size 256x256
#[no_mangle]
pub extern "C" fn main(id: i32, scale: i32) -> i32 {
    unsafe { input(id) } * scale
}

/// One sine sample per call.
/// @size 48000 @traps
#[no_mangle]
pub extern "C" fn tone(id: i32, freq: f32) -> f32 {
    unsafe { hlsl_sin(id as f32 * freq * 0.000130899) }
}
```

2. **Build with a small stack** (GPU memory lives in registers, see [limits](#limits-by-design-of-gpu-shaders)):

```bash
RUSTFLAGS="-C link-arg=-zstack-size=4096 -C target-cpu=mvp -C target-feature=+bulk-memory,+sign-ext,+nontrapping-fptoint" cargo build --release --target wasm32-unknown-unknown
```

Add `,+simd128` (and `,+relaxed-simd`) to the features to use `core::arch::wasm32` SIMD.

3. **Copy the `.wasm` into `Assets/`.** Nothing else is created: the shader, material and render texture live inside the `.wasm` asset (expand it in the Project window to see them).

4. **Drag the `.wasm` into the Hierarchy or Scene view.** You get a GameObject with a ready `WasmGpuRunner` that holds every exported function. Its inspector has: the `.wasm`, Function (the one `Run()` calls), its arguments under their source names, Size and Trap Check (locked when `@size` / `@traps` set them), and **Test** (runs it on the GPU without Play Mode).

5. **Call it from your U# script:**

```csharp
public WasmGpuRunner runner;
void Start()
{
    runner.callbackTarget = this;
    runner.SetFunction("main");            // or keep the inspector's Function
    runner.SetNamedArgInt("scale", 3);     // or SetArgInt(1, 3): wasm parameter index
    runner.SetInput(myData);
    runner.Run();                          // RunFunction("tone") = SetFunction + Run
}
public void OnWasmComplete() { Debug.Log(runner.resultFunction + ": " + runner.resultLo[0] + (runner.trapped ? " (trapped)" : "")); }
```

One function runs at a time per runner (`busy`); each function keeps its own argument values.

## Names from source

Release wasm keeps function names but drops parameter names, so they are read from the source next to the `.wasm` (its folder and `src/`; point **Source Path** in the `.wasm` import settings elsewhere if needed). Source in the project reimports the `.wasm` when it changes. Recognised exports:

| Language | Export | Rename |
|---|---|---|
| Rust | `pub extern "C" fn name(a: i32)` | `#[export_name = "x"]` |
| C / C++ | any function definition `int name(int a)` | `__attribute__((export_name("x")))` |
| Zig | `export fn name(a: i32) i32` | — |
| AssemblyScript | `export function name(a: i32): i32` | — |
| TinyGo | `//export name` or `//go:wasmexport name` above `func` | — |

Without source, arguments are called `arg1`, `arg2`, … and Size / Trap Check come from the import settings.

## Output layout

| Export returns | Read with |
|---|---|
| `i32` | `resultLo[i]` |
| `f32` | `resultFloat[i]`, read back natively with no per-value Udon loop, so millions of results are fine |
| `f64` | `resultFloat[i]` (rounded to f32: Udon reads floats; compute in f64, return what you need) |
| `i64` | `resultLo[i]` (low 32 bits), `resultHi[i]` (high 32 bits) |
| `funcref` / `externref` | `resultLo[i]`: function index, -1 = null |

Arguments: `i32`/`i64`/refs are set with `SetArgInt`, `f32`/`f64` with `SetArgFloat` (an `f64` argument is a float widened exactly; pass a double as two floats, `hi = (float)d` and `lo = (float)(d - hi)`, and add them in f64 when you need all its bits — see `Example/DeepZoom`). `v128` can't be an export parameter or result (Udon has no 128-bit value); such exports are skipped with an import warning.

To skip readback entirely, show the render texture: `WASM2HLSL/Int Display` (in `Example/`) reads it as packed RGBA8 or an iteration palette.

## Trap Check

Trap Check (`@traps` in source, the runner inspector, or the `.wasm` import settings) sets `runner.trapped` when any call hits `unreachable`, divides by zero, calls a bad `call_indirect` slot, or loops more than `W_MAX_LOOP_ITER` (65536) times. That call returns 0. It is off by default because it adds one more set of rows to read back.

## Supported

Every WebAssembly value type:

| Type | On the GPU | Exact? |
|---|---|---|
| `i32` | `uint` | yes |
| `i64` | `uint2`, emulated (mul/div/rem/shift/rotate/clz/…) | yes |
| `f32` | `float` | GPU float (last-bit rounding may differ, div/sqrt within a few ulp, denormals may flush) |
| `f64` | `uint2` holding the IEEE bits, software float (SoftFloat's algorithms, round to nearest even) | yes, bit-exact incl. subnormals, div, sqrt, conversions |
| `v128` | `uint4`: all of SIMD (i8x16 … f64x2) plus relaxed SIMD (deterministic) | integer and `f64x2` lanes yes; `f32x4` lanes like `f32` |
| `funcref` / `externref` | `uint` (function index, `0xFFFFFFFF` = null) | yes |

- Full MVP instruction set, plus sign-extension, saturating truncation, `memory.copy` / `memory.fill`, multi-value blocks.
- Direct calls, `call_indirect` (dispatched with an `if` chain), mutable globals, data segments.
- Reference types: `ref.null` / `ref.is_null` / `ref.func`, typed `select`, ref locals/globals, multiple tables, `table.get` / `set` / `size` / `grow` (always fails, like `memory.grow`) / `fill` / `copy` / `init`, `elem.drop`. A table that code writes to is kept per pixel, and `call_indirect` through it dispatches on the function stored there.
- Imports: `input(i32) -> i32` (raw words from `SetInput`) and math mapped to HLSL intrinsics: `hlsl_sin`, `hlsl_cos`, `hlsl_tan`, `hlsl_asin`, `hlsl_acos`, `hlsl_atan`, `hlsl_atan2`, `hlsl_sinh`, `hlsl_cosh`, `hlsl_tanh`, `hlsl_exp`, `hlsl_exp2`, `hlsl_log`, `hlsl_log2`, `hlsl_log10`, `hlsl_pow`, `hlsl_sqrt`, `hlsl_fmod`, `hlsl_fmin`, `hlsl_fmax`, … (plain `sinf`/`powf` work too in C, but Rust's compiler_builtins links its own software libm for those names — use the `hlsl_` prefix).

## Limits (by design of GPU shaders)

| Limit | Why | Workaround |
|---|---|---|
| No recursion | HLSL has no call stack; the converter errors with the cycle. | Rewrite as a loop. |
| ≤ 64000 bytes of memory | Linear memory is a per-pixel `uint4` register array (fxc cap 4096 registers). The size is data end + stack, not the declared pages. | `-zstack-size=4096`, small statics, no heap. |
| `memory.grow` always fails | Memory is fixed. | Use `no_std` without an allocator. |
| `f64` is slow | Quest/mobile GPUs have no doubles, so every f64 op is ~100 integer instructions (div/sqrt loop 55–63 times). Shaders using f64 compile slower: ~1 min for `Example/DeepZoom`, and fxc's time grows faster than linearly, so one export using dozens of different f64 ops can take many minutes. | Use `f32` where it is precise enough. Split big f64 kernels into several exports: each export compiles only the code it reaches. |
| Math imports run in f32 | `hlsl_sin(f64)` etc. call the GPU's float intrinsic. | Write the function in f64 yourself when you need the precision. |
| No threads, exceptions, GC, tail calls, `memory.init` / `data.drop` | Not expressible in a pixel shader. | — |
| Large modules compile slowly | fxc inlines every function. A ~6 KB kernel takes ~10 s; Rust's software libm (`f32::sin` via compiler_builtins) takes many minutes. | Use `hlsl_*` imports instead of libm; keep kernels small. |

Memory is private to each pixel and resets every run; pixels cannot talk to each other. Return values are the only output.

Docs: [Overview](./intro.md)
