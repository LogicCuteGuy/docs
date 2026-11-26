---
sidebar_position: 1
---

# OpenWorld

> Documentation version: **0.0.1** · [Release](https://github.com/LogicCuteGuy/OpenWorld/releases/tag/0.0.1)

**OpenWorld** (`com.logiccuteguy.openworld`) is a chunk-grid world engine for VRChat. It loads and unloads chunks around each player, to keep the world download small and the frame rate high without baked occlusion culling or per-object LOD.

:::info Early release
0.0.1 is the first public release. Quest performance budgets haven't been profiled on a device yet. Back up your project and test your own world.
:::

## Features

- **Chunk streaming**: near and mid distance rings with time-sliced chunk changes.
- **Impostors**: far chunks and chunk groups are drawn as octahedral impostors, with its own bake and shader.
- **Blocks**: repeated objects are drawn with GPU instancing from data textures. Grid Blocks cover dense floors, walls and grass.
- **Block Entities and Chunk Entities**: synced doors and switches, and free-moving pooled objects.
- **Runtime editing**: players place, move and remove Blocks, synced to everyone.
- **Web streaming**: textures, lightmaps and Block placement through [StreamData](../streamdata/intro.md).
- **Validation**: PC and Quest budget checks that stop a build on errors.
- **Server tools** (Rust source): `openworld-host` serves stream data, and `openworld-link` forwards messages from the world to your server.

## Requirements

- **Unity** 2022.3, Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 or newer (`com.vrchat.worlds`), with its UdonSharp
- **StreamData** (`com.logiccuteguy.streamdata`), installed automatically by VCC/ALCOM
- Optional: **DigHoleIt** 0.7.2 for voxel terrain

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/), or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if you already added it.
2. Open **Manage Project** for your Unity project.
3. Add **OpenWorld** (`com.logiccuteguy.openworld`). StreamData is added with it.

### Manual

Download `com.logiccuteguy.openworld-0.0.1.zip` and the StreamData zip from their releases, and extract each into `Packages/<package name>`. Don't use GitHub's automatic **Source code** archive. Choose one installation method per project.

## License

MIT.

Next: [Getting started](./getting-started.md).
