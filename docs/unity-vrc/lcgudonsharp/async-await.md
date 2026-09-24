---
sidebar_position: 4
---

# Async / Await

> Documentation version: **0.3.4**

LCGUdonSharp lowers `async`/`await` at build time to frame-pool continuations — no runtime task machinery. Supported awaits: parameterless `async void` methods, straight-line `await Task.Yield()`, constant positive `await Task.Delay(int)`, and **one VRChat SDK await per behaviour**.

## Basic usage

```csharp
public override async void Interact()
{
    Debug.Log("[Async/Await] Interact started.");

    await Task.Yield();
    Debug.Log("[Async/Await] Continued on the next frame.");

    await Task.Delay(1000);
    Debug.Log("[Async/Await] Continued after one second.");
}
```

## VRChat SDK awaits

SDK awaits keep the traditional callbacks — the legacy callback body runs first, then the generated continuation runs afterward:

```csharp
public override async void Interact()
{
    await VRCAsync.LoadImageAsync(_downloader, imageUrl, targetMaterial);
    // Runs after OnImageLoadSuccess/OnImageLoadError:
    Debug.Log("Texture: " + _lastDownloadedTexture);
}

public override void OnImageLoadSuccess(IVRCImageDownload result)
{
    _lastDownloadedTexture = result.Result;   // store the SDK result here
}
```

### Supported SDK awaits

| Await | Example |
|---|---|
| `VRCAsync.LoadStringAsync(url, out result)` | `AsyncStringDownloadExample` — the `out` overload copies the SDK result into an instance field before the continuation. |
| `VRCAsync.LoadImageAsync(...)` | `AsyncImageDownloadExample` — correlated by `IVRCImageDownload` request identity. |
| `VRCAsync.LoadVideoAsync` / `WaitForVideoEndAsync` | `AsyncVideoLoadExample`, `AsyncVideoEndExample` |
| `VRCAsync.RequestGPUReadbackAsync` | `AsyncGpuReadbackExample` |
| `VRCAsync.RequestSerializationAsync` | `AsyncSerializationExample` |
| Creator Economy lists | `AsyncAvailableProductsExample`, `AsyncPurchasesExample`, `AsyncProductOwnersExample` |

## Constraints

- Each async method is **single-flight** — a second call while the continuation is pending is ignored.
- String completion is correlated by URL — don't start another request with the same URL on the behaviour while one is pending.
- Locals, parameters, nested awaits, explicit returns, and assigning `Task<T>` results directly still produce build diagnostics.

Full details in [Example/AsyncAwait/README.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/AsyncAwait/README.md).

## See also

- [Synchronous Exception Handling](./exceptions.md) — note: `await` inside `try` is rejected
- [Examples](./examples.md) — `Example/AsyncAwait` covers every supported await
