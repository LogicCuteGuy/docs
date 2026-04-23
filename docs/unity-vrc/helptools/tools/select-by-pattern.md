---
sidebar_position: 7
---

# Select Children By Pattern

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Select Children By Pattern | パターンによる子の選択 | เลือกออบเจกต์ลูกตามรูปแบบ<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/Unity?src=hash&amp;ref_src=twsrc%5Etfw">#Unity</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/Select?src=hash&amp;ref_src=twsrc%5Etfw">#Select</a> <a href="https://twitter.com/hashtag/Pattern?src=hash&amp;ref_src=twsrc%5Etfw">#Pattern</a> <a href="https://t.co/F2eUL0cbn6">pic.twitter.com/F2eUL0cbn6</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2047271175907348568?ref_src=twsrc%5Etfw">April 23, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

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
