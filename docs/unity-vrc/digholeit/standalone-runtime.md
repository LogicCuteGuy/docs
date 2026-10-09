---
sidebar_position: 6
---

# Standalone runtime

> Documentation version: **0.7.0**

The standalone runtime is plain C# (`LogicCuteGuy.DigHoleIt.Standalone`). It compiles in any project without the VRChat SDK, or in a VRChat project with the `DIGHOLEIT_STANDALONE` scripting define.

Bake the zone as usual, then click **Add Standalone Runtime** in the zone inspector (or add **Dig Zone Runtime (Standalone)** to the zone GameObject).

## DigZoneRuntimeStandalone

| Member | What it does |
|---|---|
| `Dig(Vector3 world, float radius)` | Digs a sphere at a world position. |
| `Add(Vector3 world, float radius)` | Adds a sphere of soil. |
| `Paint(Vector3 world, float radius, int layer)` | Paints voxels: 0 auto (erase paint), 1–4 terrain layers 0–3, 5 dug soil, 6–17 terrain layers 4–15 (`DigFormat.PaintValue(terrainLayer)`). |
| `LocalEdit(Vector3 world, float radius, int op, int layer = 0)` | The general form. Raises `LocalEditRequested`, then applies the edit. |
| `ApplyEdit(long edit)` | Applies a packed edit, for example one received from another player. Returns true if the grid or planted/baked foliage changed. |
| `LoadEdits(IEnumerable<long> edits)` | Restores the baked grid and replays a list of edits (loading a save, or a late joiner). |
| `ResetToBaked()` | Restores the baked grid and clears the edit log. |
| `Raycast(Ray ray, float maxDistance, out Vector3 hit)` | Marches a ray through the grid, without physics. |
| `Contains(Vector3 world)` | Whether a point lies inside the zone's box. |
| `EditLog` | Every edit applied since the last reset, in order. |
| `Grid`, `PaintGrid`, `Zone` | The live grids and the authoring zone. |
| `event LocalEditRequested(long)` | Raised when this client makes an edit, before it is applied. Send it to other clients. |
| `event EditApplied(long)` | Raised after an edit changed the grid or foliage (local or remote). |
| `maxChunksPerFrame` | Chunks remeshed per frame. 0 remeshes every dirty chunk at once. |

Radii are in metres and are capped by the zone's Max Brush Radius.

Terrain trees and details in the zone go away where the ground under them is dug away or buried, and come back on `ResetToBaked`. The detail renderers get a live foliage mask through a MaterialPropertyBlock, so the materials (assets) are never changed.

## DigToolStandalone

Mouse digging uses the current pen mode.

| Field | Meaning |
|---|---|
| `cam` | The camera to cast rays from. |
| `zones` | The zones this tool can edit. |
| `reach`, `radius`, `interval` | Ray length, brush radius and seconds between edits while a button is held. |
| `addLayer`, `paintLayer` | Layers for added soil and for painting. |

`EditAtScreen(Vector2 screen, int op)` applies one edit at a screen position, for your own input code.

## Saves

An edit is a single `long`. Save `EditLog`, and on load call `LoadEdits(savedEdits)`:

```csharp
long[] save = zoneRuntime.EditLog.ToArray();
// ... later
zoneRuntime.LoadEdits(save);
```

Dig, add and paint are idempotent, so replaying an edit twice is harmless.

## Multiplayer

1. Subscribe to `LocalEditRequested` and send the `long` over your netcode.
2. Call `ApplyEdit(edit)` for every edit received from others.
3. For late joiners, send the full `EditLog` and call `LoadEdits` on the joining client.

Apply edits in the same order on every client. Dig and Add do not commute, so different orders can give different results.

## Planting, smoothing and pen settings

- `Tree(Vector3 world, float radius, int index)` / `Detail(...)`: plant the selected prefab; index **-1** erases planted objects and baked foliage of that kind inside the radius.
- `Smooth(Vector3 world, float radius, float strength)`: smooth the surface. Strength is quantized to 31 steps, clamped to at least 1/31; a call with 0 does not mean “no edit”.
- `SpawnedNear(Vector3 world, float meters, bool tree)`: test nearby planted objects.
- `UseAtScreen(Vector2 screen, Mode mode)`: use a selected mode with custom input.
- `treePrefabs`, `detailPrefabs`, `maxSpawned`: shared prefab lists and placement cap (default 2048).
- `treeIndex`, `detailIndex`, spacing and `detailsPerEdit`: pen placement settings.
- `mode`, `smoothStrength`, `cursor`, `showSettings`, `layerNames`: selected mode, strength, cursor and panel.

The left mouse button uses `mode`, right adds, middle paints. **Show Settings** enables the IMGUI panel; Tab toggles it. Save/replay edits in order. `ApplyEdit` can report a foliage change even if the voxel grid did not change. Do not feed locally applied smoothing back through `ApplyEdit`; it is not idempotent.

## Runtime operations in 0.7.0

Tool modes and packed operation codes are different:

| Action | Tool `mode` | `DigFormat` op | Layer bits |
|---|---:|---:|---|
| Dig | 0 | `OpDig = 0` | — |
| Add | 1 | `OpAdd = 1` | Soil paint value |
| Paint | 2 | `OpPaint = 3` | Paint value |
| Tree | 3 | `OpTree = 4` | Prefab index + 1; 0 erases |
| Detail | 4 | `OpDetail = 5` | Prefab index + 1; 0 erases |
| Smooth | 5 | `OpSmooth = 2` | Strength in steps of 1/31 |

Tree/detail erase removes both planted objects and baked foliage of that kind inside the sphere. Erased baked foliage stays hidden across remeshing; reset restores it. Dig/add removes planted objects inside the brush. Prefab lists must match on every client. `maxSpawned` limits planted objects (default 2048); further planting is ignored.
