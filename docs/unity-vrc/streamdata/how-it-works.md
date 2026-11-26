---
sidebar_position: 4
---

# How StreamData works

## What export does

**Export Stream** writes to `<scene>_StreamData/Export~`. It **clears that folder first**, so don't keep your own files there.

1. Collects the textures of your **Stream Materials**. A texture shared by several materials downloads once.
2. Saves a small fallback copy of each as a `Stream_*` asset.
3. Packs textures into atlas pages of up to 2048 × 2048, so several arrive in one download. A texture alone on a page gets its own file.
4. Names each image `page_` plus a hash of its content.
5. Exports lightmaps, if **Stream Lightmaps** is on.
6. Writes the `manifest` file and bakes the URLs into the component.

### Which textures stream

| Condition | If not met |
|---|---|
| Imported from a file, texture type **Default** | Skipped with a warning |
| **sRGB** on | Skipped with a warning |
| Longest side larger than **Fallback Size** | Skipped, because it is already small |

Normal maps and linear masks don't stream. Downloaded images are sRGB, so they would decode wrongly.

### Lightmaps

Colour lightmaps are saved as RGBM PNG files, which hold brightness up to 16. At runtime one GPU blit decodes each into a render texture, which is set on its renderers through a material property block. Your shaders don't need changes. On Android and iOS the decoded texture uses a smaller 8-bit format.

## Download order

1. The `manifest` downloads first. If it fails on both hosts, or its format is unknown, no images are requested.
2. Every **check interval** (1 second), StreamData picks the waiting texture nearest to the player. Distance is measured to the bounds of the objects that use it.
3. Images download one at a time. VRChat allows one image per 5 seconds.
4. When a download fails, the **Backup Base Url** is tried. If that fails too, the fallback stays.

A failed entry isn't retried until the world is loaded again. When an atlas page fails, every texture waiting on it fails.

## Memory

An atlas page is destroyed after each of its textures is copied into its own render texture.

With **Load Distance** above 0, only textures within that distance download. One farther than **Load Distance × Unload Factor** goes back to its fallback and its memory is freed. It downloads again when you return. The gap between the two distances stops a texture from loading and unloading at the border. With Load Distance 0, everything downloads and stays.

## Entry states

`state[i]` holds the state of each streamed entry.

| Constant | Value | Meaning |
|---|---|---|
| `StateFallback` | 0 | Showing the fallback, waiting |
| `StateLoading` | 1 | Downloading |
| `StateLoaded` | 2 | Full texture shown |
| `StateFailed` | 3 | Failed, keeps the fallback |

`manifestState` is `ManifestPending` (0), `ManifestOk` (1) or `ManifestFailed` (2).

```csharp
using LogicCuteGuy.StreamData.Udon;
using UdonSharp;

public class StreamProgress : UdonSharpBehaviour
{
    public StreamData stream;
    public TMPro.TextMeshProUGUI label;

    private void Start() { _Refresh(); }

    public void _Refresh()
    {
        if (stream.state != null)
        {
            int loaded = 0;
            for (int i = 0; i < stream.state.Length; i++)
                if (stream.state[i] == StreamData.StateLoaded) loaded++;
            label.text = loaded + " / " + stream.state.Length;
        }
        SendCustomEventDelayedSeconds(nameof(_Refresh), 1f);
    }
}
```

With a Load Distance, the loaded count can go down as you move away.

## Settings for testing

Set **Target** to measure distance from a transform instead of the local player, for example a camera.

## Extending StreamData

A subclass can stream its own data. OpenWorld's `OpenWorldStream` uses this for its Block layout.

| Override | Called |
|---|---|
| `_OnInit()` | After the texture state is reset |
| `_OnManifest(DataDictionary)` | When the manifest is read |
| `_OnStringLoaded(...)`, `_OnStringError(...)` | For string downloads other than the manifest |
| `_StepData(Vector3)` | On each check, to start string downloads |
| `_StepImage(Vector3)` | When no image is downloading. Return true after starting one. |
| `_OnImage(...)`, `_OnImageError(...)` | When your image finishes or fails |

On the editor side, implement `IStreamExtension` (with a public parameterless constructor) to add files and manifest entries to the export.
