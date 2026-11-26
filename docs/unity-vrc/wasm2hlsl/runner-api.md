---
sidebar_position: 3
---

# WasmGpuRunner API

`WasmGpuRunner` runs the exported functions of one `.wasm`. One pixel of its render texture is one call of the current function. The namespace is `LogicCuteGuy.Wasm2Hlsl`. Dragging a `.wasm` into the scene creates a configured runner.

## Fields you set

| Field | Default | Meaning |
|---|---|---|
| `callbackTarget` | none | Behaviour that receives the event when results are ready |
| `callbackEvent` | `OnWasmComplete` | The event name |
| `readback` | true | Copy results to the CPU. Turn it off when only a material reads `target`. |
| `bands` | 1 | Splits the texture into horizontal bands |
| `band` | 0 | The band the next `Run()` computes (hidden in the Inspector) |

`wasmMaterial` and `target` belong to the current function. `SetFunction` changes both.

## Methods

| Method | Does |
|---|---|
| `SetFunction(name)` | Selects the function `Run()` calls. Returns false and logs an error if there is no such export. |
| `SetFunctionIndex(i)` | Selects by index. An index out of range is ignored. |
| `FunctionIndex(name)` | The index of an export, or -1 |
| `FunctionName()` | The current function's name |
| `SetNamedArgInt(name, value)`, `SetNamedArgFloat(name, value)` | Sets an argument by its source name. Logs an error if there is no such argument. |
| `SetArgInt(index, value)`, `SetArgFloat(index, value)` | Sets by wasm parameter index. Parameter 0 is the pixel index when it is `i32`. An index out of range is ignored. |
| `ArgIndex(name)` | The parameter index of an argument, or -1 |
| `SetInput(int[] words)` | Uploads the data that `env.input(i)` reads. It stays set for later runs. |
| `Run()` | Runs the current function. Ignored while `busy`. |
| `RunFunction(name)` | `SetFunction` then `Run()`. Does nothing while `busy`. |
| `GetResultFloat(i)` | Result `i` as a float |
| `BitsToFloat(bits)` (static) | Reads the bits of an `int` as a float |

## Results

| Field | Content |
|---|---|
| `resultLo`, `resultHi` | Integer results. `resultHi` holds the high 32 bits of `i64`. |
| `resultFloat` | Results of `f32` and `f64` functions. `resultLo` isn't set for them. |
| `resultIsFloat` | True when the current function returns a float |
| `resultFunction` | The function that produced the results |
| `trapped` | Some call trapped. Needs **Trap Check**. |
| `busy` | A run is waiting for its readback |

When one callback serves several functions, check `resultFunction`:

```csharp
public void OnWasmComplete()
{
    if (runner.resultFunction == "tone")
        Debug.Log(runner.resultFloat[0]);
}
```

## Timing

Readback is asynchronous. `Run()` starts the GPU work and returns. The callback arrives in a later frame. Calls made while `busy` are **dropped, not queued**, so send the next run from the callback.

If the readback fails, the runner logs an error and **doesn't call back**. `busy` becomes false again.

With `readback` off, `busy` clears immediately and no callback is sent.

## Spreading work over frames

A heavy function can freeze a frame. With `bands` above 1, each `Run()` computes only band `band`, and the other rows keep their pixels. Bands are meant for results that a material displays, so use them with `readback` off.

```csharp
int next;

void Update()
{
    runner.bands = 8;
    runner.band = next;
    next = (next + 1) % 8;
    runner.Run();
}
```

## Several functions

One runner holds every export, and each function keeps its own argument values. It runs one function at a time. To run two functions at once, use two runners.

## Networking

The runner syncs nothing. Sync the inputs, such as parameters or a seed, in your own script, and let each player compute the result. GPU `f32` results can differ in the last bits between devices, so don't make shared game decisions from exact `f32` values.
