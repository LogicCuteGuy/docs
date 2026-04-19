---
sidebar_position: 6
---

# Paste As Child To All Selected Parents

**Menu Path**: `GameObject > LogicCuteGuy > Paste As Child To All Selected Parents...`

This tool supercharges your "Copy-Paste" workflow by allowing you to take one or more "Source" objects and paste copies of them into multiple destination "Parents" simultaneously.

## Features

- **Multi-Source Support**: Set a group of objects as your source "clipboard".
- **Multi-Parent Support**: Select multiple GameObjects in the hierarchy as targets for the paste operation.
- **Paste Modes**:
    - **Preserve World**: Keeps the copies in their current global position while re-parenting.
    - **Copy Source Local**: Force-copies the local Pos/Rot/Scale from the source objects to the new copies.
    - **Reset Local**: Pastes copies and immediately resets their local transform to Zero/Identity (0,0,0 position and rotation).
- **Prefab Intelligence**: If a source is a Prefab Asset, the tool instantiates it as a **Prefab Instance**, preserving the link for future updates.

## How to Use

1. Select your target objects and click **Set Sources From Selection**.
2. Select one or more **Parent** GameObjects in the Hierarchy.
3. Choose your **Paste Mode**.
4. Click **Paste To Selected Parents**.

> [!TIP]
> Use this to quickly populate a scene with props. For example, select a "Chair" prefab as source, then select 10 "Table" objects and paste. Each table will now have a chair child correctly instantiated.
