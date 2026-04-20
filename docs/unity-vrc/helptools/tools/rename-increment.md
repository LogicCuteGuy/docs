---
sidebar_position: 5
---

# Rename Children Increment
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Rename Children Increment | 子の連番リネーム | เปลี่ยนชื่อออบเจกต์ลูกพร้อมเลขลำดับ <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/rename123">pic.twitter.com/rename123</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046370648537395297?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

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
