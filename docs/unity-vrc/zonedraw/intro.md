---
sidebar_position: 1
---

# ZoneDraw

> Documentation version: **0.1.0** · [Release](https://github.com/LogicCuteGuy/ZoneDraw/releases/tag/0.1.0)

**ZoneDraw** (`com.logiccuteguy.zonedraw`) lets you click points in the Scene view to draw invisible barrier walls or trigger zone volumes. It bakes them to normal Unity colliders. The drawing component is editor-only and is removed from builds.

## Features

- **Barrier** walls, with optional floor and ceiling slabs to close a room.
- **Zone** volumes of any polygon shape, including concave ones.
- Add, drag, insert and delete points, with surface snapping, grid snap and Undo.
- Colliders update automatically while you edit.
- An optional render material makes a shape visible, such as a force field or fence.
- `ZoneArea` for UdonSharp: check whether a position or player is inside, and turn walls, floor or ceiling on and off.

## Requirements

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 or newer (`com.vrchat.worlds`), with its UdonSharp

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/), or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if you already added it.
2. Open **Manage Project** for your Unity project.
3. Add **ZoneDraw** (`com.logiccuteguy.zonedraw`).

### Manual

Download `com.logiccuteguy.zonedraw-0.1.0.zip` from the release and extract it into `Packages/com.logiccuteguy.zonedraw`. Don't use GitHub's automatic **Source code** archive. Choose one installation method per project.

## License

MIT.

Next: [Getting started](./getting-started.md).
