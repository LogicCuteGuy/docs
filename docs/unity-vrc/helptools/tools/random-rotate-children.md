---
sidebar_position: 13
---

# Random Rotate Children

**Menu Path**: `GameObject > LogicCuteGuy > Random Rotate Children`

Quickly break up the mechanical look of repeated environment objects by applying variation to their local rotations.

## Features

- **Rotation Modes**:
    - **Offset From Current**: Adds a random value (within ±Max) to the object's current rotation. This is great for adding "vibrancy" to existing placements.
    - **Absolute Range**: Generates a completely new random rotation between a Min and Max Vector3.
- **Target Filtering**: 
    - **Require MeshRenderer**: Only rotate objects that are visible.
    - **Recursive**: Option to process the entire child hierarchy or only direct children.
- **Scene Integration**: Automatically marks scenes as dirty for proper saving.

## How to Use

1. Select one or more **Parent** GameObjects.
2. Choose your **Rotation Mode**.
3. Set the **Min/Max** or **Max Offset** values.
4. Click **Apply To Selected**.

> [!TIP]
> For nature assets like trees or rocks, set a Y-offset of 360 to give every object a completely unique orientation while keeping them upright.
