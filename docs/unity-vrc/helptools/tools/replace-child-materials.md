---
sidebar_position: 9
---

# Replace Or Remove Child Materials

**Menu Path**: `GameObject > LogicCuteGuy > Replace Or Remove Child Materials`

A utility for mass-managing material assignments deep within a hierarchy. It allows you to target a specific material and either replace it with another or remove its slot entirely.

## Features

- **Replace Mode**: Swap all instances of `Material A` with `Material B`.
- **Remove Mode**: Completely remove the material slot if it contains `Material A`, shrinking the materials list.
- **Hierarchical Depth**: Scans every child object and every material slot in every MeshRenderer.
- **Selective Cleanup**: Set replacement to `None` to clear a specific slot while keeping the slot count the same.

## How to Use

1. Select one or more **Parent** objects.
2. Assign the **Target Material** you want to change.
3. Choose the **Action** (Replace or Remove).
4. Click **Apply To Selected**.

> [!NOTE]
> This tool correctly marks scenes as dirty and uses the Undo system, making it safe for use in large production scenes.
