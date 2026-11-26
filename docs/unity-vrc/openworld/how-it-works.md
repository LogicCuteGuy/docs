---
sidebar_position: 3
---

# How OpenWorld works

## Space layout

The world is a grid of **chunks** on the XZ plane. A chunk is the unit of loading and of draw batching. Chunks are grouped into **regions** of 8 × 8 chunks, and a region is the unit of network download, because VRChat limits how often a world can download. The design target is about 1 km²: 32 m chunks on a 32 × 32 grid.

Your edit scene keeps the hierarchy you made. Chunk roots, Blocks and impostors are created only on the scene copy used by Play mode and builds.

## Content types

| Type | Has a GameObject | Drawn by | Typical use |
|---|---|---|---|
| **Block** | No, data only (colliders are kept) | GPU instancing | Tables, trees, walls, rocks |
| **Grid Block** | Same as Block | GPU instancing | Floors, walls, grass snapped to cells |
| **Block Entity** | Yes, streamed with its chunk | Normal renderer | Doors, switches |
| **Chunk Entity** | Yes, optionally pooled | Normal renderer, culled by ring | NPCs, pickups |
| **Terrain** (optional) | DigHoleIt zones | DigHoleIt | Diggable ground |

## What happens at runtime

OpenWorld checks which chunk you are in. When it changes, it works out the new rings and queues chunk changes, nearest first. At most **Changes Per Frame** of them run in one frame.

| Ring | Content |
|---|---|
| Near | Meshes and colliders |
| Mid | Meshes only |
| Just beyond mid | One impostor per chunk |
| Farther | One impostor per block of chunks |

An **impostor** is a card that shows a picture of the chunk, captured from many directions on a hemi-octahedron. The shader picks the frame for your viewing angle.

| Setting | Default | Meaning |
|---|---|---|
| **Impostor Frames** | 8 | Capture directions per side for chunk impostors. More turns more smoothly. |
| **Impostor Frame Size** | 32 | Pixels per frame. Texture memory grows with the square of frames × size. |
| **Impostor Block Chunks** | 4 | Chunks per side of a merged block |
| **Impostor Merge Rings** | 2 | Blocks around yours that still use chunk impostors |
| **Block Impostor Frames / Frame Size** | 8 / 64 | The same two values for merged blocks |

**Merge Rings × Block Chunks + 1** must be larger than the mid rings, or validation reports an error.

## How Blocks are drawn

Blocks use `VRCGraphics.DrawMeshInstanced` with your own instancing materials. Their placement comes from baked data, which [StreamData](../streamdata/intro.md) can also download, so you can change a layout after upload. The meshes and materials must already be in the world, because VRChat can't load new meshes at runtime.

## Grid Blocks

Each chunk has **5 layers** of **64 × 64 cells**. A cell holds at most one Block per layer. A layer is a category, and each has its own height mode.

| Default layer | Height mode |
|---|---|
| Ground | On the floor found below Base Y 500 |
| Ground Decoration | On the floor found below Base Y 500 |
| Underground | Fixed steps from Base Y −32 |
| Building | Fixed steps from Base Y 0 |
| Roof | Fixed steps from Base Y 0 |

Heights use 256 steps of **Step** metres (0.25 by default). Floor heights are found with a downward raycast **during the bake**, not at runtime. Each layer has its own **Floor Mask**. A cell with no floor hit is dropped and the bake warns. For an upstairs floor, put Base Y just under that storey's ceiling, so the ray doesn't stop on the roof.

For each Grid Prefab you can set:

- **Layer** and **Also On**: further layers it may use when the first doesn't fit. Instances are placed bottom to top, so one wall prefab can stack on two storeys.
- **Footprint**: 1 to 15 cells each way. It turns with the nearest 90° of the object's yaw. The default 1 × 1 takes only the anchor cell.

Positions snap to cell corners (chunk size ÷ 64) and yaw to 22.5° steps. Runtime decoding is spread over frames. A re-decoded chunk keeps drawing its old Blocks until the new ones are ready.

## Streamed lightmaps and textures

The world ships small fallback textures, so it works before downloads finish and when downloads fail. See [How StreamData works](../streamdata/how-it-works.md).
