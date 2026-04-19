---
sidebar_position: 5
---

# Rename Children Increment

**Menu Path**: `GameObject > LogicCuteGuy > Rename Children Increment...`

A powerful batch renaming utility that applies a numbered pattern to all children of a selected object. Perfect for naming repeated elements like list items, floor tiles, or light arrays.

## Features

- **Pattern-Based Renaming**: Use the `{0}` placeholder to define where the number should be inserted (e.g., `Object_{0}_Model`).
- **Custom Start Index**: Start your numbering from any integer (e.g., 0, 1, or 100).
- **Inactive Support**: Choose whether to include inactive children in the renaming process.
- **Automated Workflow**: The tool automatically closes after successful renaming to streamline your workflow.

## How to Use

1. Select the **Parent** object in the Hierarchy.
2. Open the tool and enter your **Pattern** (e.g., `Item_{0}`).
3. Set your **Start Index**.
4. Click **Rename Children**.

> [!IMPORTANT]
> Your pattern **must** contain the `{0}` placeholder, otherwise the tool will display a warning and prevent the operation to avoid accidentally giving identical names to all objects.
