---
sidebar_position: 4
---

# Sort Parent Children

**Menu Path**: `GameObject > LogicCuteGuy > Sort Parent Children`

A precision organization tool that reorders child GameObjects in the Hierarchy based on various criteria. This is essential for keeping complex scenes structured and making child objects easier to find.

## Features

- **Sorting Modes**:
    - **Name A-Z / Z-A**: Alphabetical sorting.
    - **Local Position Axes**: Sort based on X, Y, or Z local coordinates (Ascending or Descending). Ideal for objects placed in a line or grid.
- **Bulk Operation**: Sort children of a single designated parent or process multiple selected parents at once.
- **Index Stability**: Uses sibling index reordering (`SetSiblingIndex`) which is safe and preserves data.
- **Undo Support**: All sorting operations are fully undoable in a single step.

## How to Use

1. Select a parent GameObject or open the tool window.
2. Choose your **Sort Mode** (e.g., `Name A-Z` or `Local Pos X Asc`).
3. Click **Sort Children** for the designated parent, or **Sort Selected Parents** for your current selection.

> [!TIP]
> Sorting by **Local Pos X Asc** is extremely useful when you have a series of UI buttons, inventory slots, or repeated environment props that you want to correspond directly to their visual order from left to right.
