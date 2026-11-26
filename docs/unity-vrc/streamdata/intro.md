---
sidebar_position: 1
---

# StreamData

> Documentation version: **0.0.1** · [Release](https://github.com/LogicCuteGuy/StreamData/releases/tag/0.0.1)

**StreamData** (`com.logiccuteguy.streamdata`) streams a VRChat world's textures and lightmaps from the web after the world loads. The world ships only small fallback textures, so the download is smaller and it still works offline.

:::info Early release
0.0.1 is the first public release. Back up your project and test your own world.
:::

## Features

- Small textures are packed into atlas pages of up to 2048², so one image download brings several textures.
- Textures download nearest first, one at a time, within VRChat's limit of one image per 5 seconds.
- With a load distance, far textures return to their fallback and free memory.
- Optional lightmap streaming. Your own shaders need no change.
- A backup host, tried when the first one fails.
- Publishing to GitHub Pages or your own host from the editor, manually or on every build.
- A local test server for checking downloads in the editor.
- Extensible: `IStreamExtension` lets other packages stream their own data. [OpenWorld](../openworld/intro.md) uses it for its Block layout.

## Requirements

- **Unity** 2022.3, Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 or newer (`com.vrchat.worlds`), with its UdonSharp
- For GitHub Pages publishing: `git` and the [GitHub CLI](https://cli.github.com/) (`gh`), signed in

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/), or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if you already added it.
2. Open **Manage Project** for your Unity project.
3. Add **StreamData** (`com.logiccuteguy.streamdata`).

### Manual

Download `com.logiccuteguy.streamdata-0.0.1.zip` from the release and extract it into `Packages/com.logiccuteguy.streamdata`. Don't use GitHub's automatic **Source code** archive. Choose one installation method per project.

## License

MIT.

Next: [Getting started](./getting-started.md).
