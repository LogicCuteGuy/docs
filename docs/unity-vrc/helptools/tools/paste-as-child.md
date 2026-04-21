---
sidebar_position: 6
---

# Paste As Child To All Selected Parents

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Paste As Child To All Selected Parents | 全選択中の親に子として貼り付け | วางเป็นออบเจกต์ลูกให้กับ Parent ทั้งหมดที่เลือก<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/Paste?src=hash&amp;ref_src=twsrc%5Etfw">#Paste</a> <a href="https://twitter.com/hashtag/Selected?src=hash&amp;ref_src=twsrc%5Etfw">#Selected</a> <a href="https://twitter.com/hashtag/Copy?src=hash&amp;ref_src=twsrc%5Etfw">#Copy</a> <a href="https://t.co/Cz0tsYrBXT">pic.twitter.com/Cz0tsYrBXT</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046669419951300893?ref_src=twsrc%5Etfw">April 21, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

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
