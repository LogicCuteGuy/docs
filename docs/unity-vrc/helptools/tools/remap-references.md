---
sidebar_position: 10
---

# Fix Cloned Component References

**Menu Path**: `Right-click Component > LogicCuteGuy > Open Fix Cloned Component References...`

A sophisticated tool for fixing "Broken" or "Cross-Hierarchy" references that occur after duplicating a complex system. It re-connects variables to the correct objects within the new clone.

## Features

- **Matching Logic**:
    - **Hierarchy Path**: Matches objects by their relative position in the hierarchy (e.g., `Arm/Hand` in the old group maps to `Arm/Hand` in the new group).
    - **Name & Type**: Matches by name and component type.
    - **Name Only**: Matches based on object name regardless of location.
- **Reference Analysis**: Supports remapping GameObjects, Transforms, and specific Component types.
- **Dry Run Mode**: Preview the changes without writing any data to ensure the mapping logic is correct.
- **Smart Remapping**: Handles cases where multiple components of the same type exist by matching their relative order.

## How to Use

1. Duplicate a complex object (e.g., a Character Prefab).
2. Select the **Cloned Root**.
3. Open the tool and set the **Source Root** (the original object) for path matching.
4. Click **Remap References**.

> [!IMPORTANT]
> This tool is a lifesaver for complex UI systems or characters where many internal scripts reference each other. It prevents the need to manually re-drag dozens of references.
