---
sidebar_position: 14
---

# Terrain Swap

**Menu Path**: `Right-click Terrain > LogicCuteGuy > Terrain Swap...`

A simple but essential utility for swapping the underlying `TerrainData` of a Terrain component while keeping the component and its Collider in sync.

## Features

- **Unified Swap**: Replaces the `TerrainData` on both the `Terrain` component and the `TerrainCollider` simultaneously.
- **Context Sensitive**: Quickly open the tool by right-clicking any Terrain component in the Inspector.
- **Undo Integration**: The swap is fully recorded in the Undo system.

## How to Use

1. Select a **Target Terrain** GameObject.
2. Assign the **New Terrain Data** asset.
3. Click **Swap Terrain Data**.

> [!NOTE]
> This tool ensures that your physics collider matches your visual terrain immediately after the swap, preventing common bake/collison desync issues.
