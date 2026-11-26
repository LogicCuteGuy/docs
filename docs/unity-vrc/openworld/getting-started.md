---
sidebar_position: 2
---

# Getting started with OpenWorld

## 1. Create a world

1. Make an empty GameObject where the **(0, 0) corner** of the grid should be. The grid lies on the XZ plane and extends toward +X and +Z. Rotation and scale are ignored.
2. **Add Component > OpenWorld > OpenWorld Settings**. The runtime `OpenWorld` UdonSharp behaviour is added next to it and hidden from the Inspector; you edit everything on OpenWorld Settings.
3. Set **Chunk Size**, **Chunks X** and **Chunks Z**. If the world has Unity Terrains, **Fit Grid To Terrains** moves the corner and sets the chunk counts for you.
4. Add content: put objects under the OpenWorld object, or list other scene objects in **Content Roots**.

Your edit scene keeps the hierarchy you made. Chunk roots, Blocks and impostors are added only to the scene copy used by Play mode and builds.

:::warning Moving objects
Anything that moves, such as a vehicle or a boat, must not be chunked content. It is switched off with the chunk it **started** in, so it disappears when players walk away from that spot. Make it a [Chunk Entity](#chunk-entities), keep it outside the OpenWorld object and its Content Roots, or leave its layer out of **Chunk Layers**.
:::

## 2. Choose what gets chunked

| Setting | Effect |
|---|---|
| **Chunk Layers** | Only objects on these layers are sorted into chunks. Others stay always active. |
| **OpenWorld Area** component | When a scene has any, only objects whose centre is inside an area are chunked. |
| **OpenWorld Object** component | Keeps one object visible **Extra Rings** beyond the mid rings, for walls or landmarks seen from far away. |

An object belongs to the chunk that holds the centre of its renderers' bounds. Objects outside the grid are never streamed, and a warning tells you how many there are.

## 3. Set the distance rings

A ring is the distance in chunks from the player's chunk.

| Ring | What is active | Default (PC / Quest) |
|---|---|---|
| Near | Meshes and colliders | 1 / 1 |
| Mid | Meshes only, colliders off | 3 / 2 |
| Beyond | Inactive; shown as impostors | |

**Changes Per Frame** (2 / 1) limits how many chunks switch in one frame, so crossing a chunk border doesn't spike.

## 4. Use Blocks for repeated objects

Add prefabs to **Block Prefabs**. Their instances are drawn with GPU instancing from data textures and need no GameObject at runtime. Instances with colliders keep only their colliders. Terrain tree prototypes are added to the list for you.

GPU Instancing is turned on for Block materials. A custom shader must support instancing.

**Grid Prefabs** are for dense, snapped content such as floors, walls and grass. Each chunk has 5 layers of 64 × 64 cells. Each layer places objects either at a fixed height or on the floor found by a downward raycast during the bake.

## 5. Bake impostors

Save the scene, then click **Bake Impostors**. Bake again after you change content or lighting. With **Bake On Build** (on by default), every VRChat build re-runs the chunk assignment and impostor bake and saves the scene.

## 6. Validate

Click **Validate**, or open **Tools > OpenWorld > Validation**. It checks draw calls, triangles, Blocks and texture memory in the busiest active area for PC and Quest, and lists rule errors. **A VRChat build stops if there are errors.**

The budgets are starting values. They haven't been profiled on Quest hardware yet, so profile your own world.

## 7. Test

Press **Play** with ClientSim and walk across chunk borders. The Scene view colours each chunk box by ring: green is near, yellow is mid, grey is off.

## Streaming from the web (optional)

Add the **OpenWorldStream** behaviour. It is [StreamData](../streamdata/getting-started.md) plus the Block layout:

- **Stream Block Placement**: export the Block layout so you can change it after upload without re-uploading the world. Block types (meshes and materials) must stay the same.
- **Ship Block Placement**: also ship the layout in the world. Turn it off for a smaller world, but then Blocks appear only after the download, and never appear offline.

Follow the StreamData guide to export and publish.

## Block Entities

A Block Entity is an object in a chunk with one synced state from 0 to 255, such as a door or a switch. The state is stored once per region, so it survives chunk unloading and late joiners receive it.

- Use **BlockEntityToggle** for on/off objects. It shows and hides objects and can set an Animator bool. It needs a collider for Interact.
- For your own behaviour, subclass `BlockEntity`, override `OnStateChanged(int state)`, and call `_SetState(value)`. If you override `OnEnable`, call `base.OnEnable()`.

## Chunk Entities

A `ChunkEntity` is a free-moving, owner-synced object such as an NPC or pickup. It is culled by the rings instead of being unloaded with a chunk.

1. Assign **Body** to a **child** object that holds the renderers and colliders.
2. Override `OnSimulate(float deltaTime)` for logic that runs on the owner in the near rings.
3. To spawn many, make them children of one object with a **ChunkEntityPool** and a VRC Object Pool. Call `_Spawn(position, rotation)` and, on the entity, `_Despawn()`.

## Runtime editing

Turn on **Editable** to let players place, move and remove Blocks. Edits are synced and late joiners receive them. **Max Adds Per Region** (64) and **Max Grid Edits Per Region** (256) limit the synced data.

Put **ChunkEditTool** on a VRC Pickup for a ready-made tool. Scripts can call `_PickBlock`, `_PlaceBlock`, `_PlaceGridBlock`, `_MoveBlock` and `_RemoveBlock` on `OpenWorld`.

## DigHoleIt voxel terrain (optional)

Install [DigHoleIt](../digholeit/intro.md) (`com.logiccuteguy.digholeit`). OpenWorld then creates the `ChunkTerrain` U# program asset, and adds `ChunkTerrain` to the world automatically when the scene has a Dig Zone runtime. If the asset is missing, run **Tools > OpenWorld > Create Missing U# Program Assets**. Keep Terrains and Dig Zones out of chunk content.

If you **remove** DigHoleIt, delete `Packages/com.logiccuteguy.openworld/Runtime/Terrain/ChunkTerrain.asset`. Otherwise UdonSharp reports that `ChunkTerrain.cs` does not belong to a U# assembly.

## Troubleshooting

| Symptom | Check |
|---|---|
| An object disappears when you walk away | It moves but is chunked content. See the warning in step 1. |
| An object never streams | It is outside the grid, or excluded by Chunk Layers or an OpenWorld Area. |
| The build stops | Open **Tools > OpenWorld > Validation** and fix the errors. |
| Far chunks look out of date | Bake impostors again. |
| `ChunkTerrain.cs does not belong to a U# assembly` | DigHoleIt was removed. Delete `ChunkTerrain.asset` as described above. |
