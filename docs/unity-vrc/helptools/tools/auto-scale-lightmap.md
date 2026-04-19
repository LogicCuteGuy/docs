---
sidebar_position: 1
---

# Auto Scale In Lightmap

**Menu Path**: `GameObject > LogicCuteGuy > Auto Scale In Lightmap`

The **Auto Scale In Lightmap** tool solves the problem of inconsistent texel density across objects in a scene. It provides two sophisticated algorithms to normalize or adjust the `Scale In Lightmap` property of MeshRenderers.

## Features

- **Match Scale First (Global Multiplier)**: Normalizes every object so they naturally use the same default lightmap space, regardless of their physical size. This ensures that a large wall and a small cube have balanced resolution before you apply your final multiplier.
- **Min/Max Ratio Mode**: Automatically maps the smallest objects to a high resolution and the largest objects to a lower resolution, based on the actual size spectrum of your scene.
- **Volume-Based Calculation**: Option to calculate "size" based on the cubic root of volume (Width × Height × Depth) for more physically accurate results on varied shapes.
- **Selective Application**: Apply to the entire scene or only to currently selected objects and their children.
- **Safety Toggles**: Reset all scales to 1.0 with a single click, or include inactive objects in the auto-scaling process.

## How to Use

1. Open the tool from the **LogicCuteGuy** menu.
2. Choose your **Scaling Mode**:
   - For uniform density, use **Global Multiplier**.
   - For hierarchical density (small items = high res), use **Min Max Ratio**.
3. Toggle **Calculate by Volume** for complex shapes.
4. Click **Apply Auto Scale**.
5. View the console for a summary of how many objects were updated.

> [!TIP]
> Use this tool before baking your final lightmaps to significantly reduce bake times and eliminate "blocky" shadows on small details while keeping large surfaces optimized.
