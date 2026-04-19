---
sidebar_position: 12
---

# Random Spawn Children On NavMesh

**Menu Path**: `GameObject > LogicCuteGuy > Random Spawn Children On NavMesh`

Automate the placement of environment props, collectibles, or NPCs by randomly distributing child objects onto a baked NavMesh.

## Features

- **NavMesh-Aware**: Uses Unity's NavMesh system to ensure objects are placed on walkable surfaces.
- **Placement Modes**:
    - **Local Radius**: Samples positions around a specific center point.
    - **Full NavMesh**: Distributes objects across the entire triangulated NavMesh area of the scene.
- **Fine-Tuning**:
    - **Height Offset**: Hover objects above or sink them into the ground.
    - **Vertical Jitter**: Randomize vertical sampling height for tiered or sloped terrains.
    - **Max Sample Distance**: Control how far objects can scatter.
- **Agent & Area Filtering**: Select specific NavMesh Agent types and Area Masks (e.g., only spawn on "Grass" areas).

## How to Use

1. Ensure your NavMesh is **Baked**.
2. Select a **Parent Object** containing the children you want to scatter.
3. Configure the **Agent Type** and **Area Mask**.
4. Click **Random Spawn Children**.

> [!NOTE]
> If placement fails for specific objects (e.g., no valid NavMesh nearby), the tool will report the failure count in a summary dialog.
