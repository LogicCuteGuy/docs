---
sidebar_position: 7
---

# Select Children By Pattern

**Menu Path**: `GameObject > LogicCuteGuy > Select Children By Pattern`

A powerful selection utility that uses a rhythmic string pattern to filter children of a parent object. This is invaluable for complex layout tasks or mass-editing specific sets of repeating objects.

## Features

- **Pattern Syntax**:
    - `x` = Select this slot.
    - `-` = Skip this slot.
- **Cyclic Repetition**: The pattern automatically repeats until all children have been evaluated (e.g., `x-` will select every odd-indexed child: 1, 3, 5...).
- **Live Preview**: See the cycle length and selection count in real-time as you type your pattern.
- **Action Suite**:
    - **Find & Select**: Immediately selects the matching children.
    - **Delete**: Safely removes all matched objects via Undo.
    - **Deselect**: Removes matched objects from your current multi-selection.

## Patterns Examples

- `x-x-x`: Selects every 2nd child.
- `x--x--`: Selects every 3rd child.
- `xx-xx-`: Selects blocks of two, skipping every third.

## How to Use

1. Assign a **Parent Object**.
2. Type your pattern using `x` and `-`.
3. Toggle **Include Inactive** filter.
4. Click **Find & Select**.

> [!NOTE]
> Pattern matching is performed based on the **Hierarchy order** of the children.
