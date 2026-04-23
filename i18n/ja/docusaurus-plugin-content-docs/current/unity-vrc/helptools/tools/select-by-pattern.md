---
sidebar_position: 7
---

# Select Children By Pattern (パターンによる子の選択)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Select Children By Pattern | パターンによる子の選択 | เลือกออบเจกต์ลูกตามรูปแบบ<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/Unity?src=hash&amp;ref_src=twsrc%5Etfw">#Unity</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/Select?src=hash&amp;ref_src=twsrc%5Etfw">#Select</a> <a href="https://twitter.com/hashtag/Pattern?src=hash&amp;ref_src=twsrc%5Etfw">#Pattern</a> <a href="https://t.co/F2eUL0cbn6">pic.twitter.com/F2eUL0cbn6</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2047271175907348568?ref_src=twsrc%5Etfw">April 23, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `GameObject > LogicCuteGuy > Select Children By Pattern`

リズム感のある文字列パターンを使用して親オブジェクトの子をフィルタリングする、強力な選択ユーティリティです。これは、複雑なレイアウト作業や、繰り返されるオブジェクトの特定のセットを一括編集する場合に非常に役立ちます。

## 主な機能

- **パターンの構文**:
    - `x` = このスロットを選択。
    - `-` = このスロットをスキップ。
- **循環的な繰り返し**: パターンは、すべての子が評価されるまで自動的に繰り返されます（例：`x-` は 1, 3, 5... と、奇数インデックスのすべての子を選択します）。
- **ライブプレビュー**: パターンを入力すると、サイクル長と選択数がリアルタイムで表示されます。
- **アクションスイート**:
    - **Find & Select**: 一致する子を即座に選択します。
    - **Delete**: 一致したすべてのオブジェクトを Undo 可能に安全に削除します。
    - **Deselect**: 現在のマルチ選択から一致したオブジェクトを削除します。

## パターンの例

- `x-`: 1 つおきに選択（奇数番目）。
- `x--`: 3 つごとに 1 つ選択。
- `xx-`: 2 つ選択して 1 つ飛ばす、の繰り返し。

## 使い方

1. **Parent Object** を割り当てます。
2. `x` と `-` を使用してパターンを入力します。
3. **Include Inactive** フィルタを切り替えます。
4. **Find & Select** をクリックします。

> [!NOTE]
> パターンマッチングは、子の **Hierarchy（階層）順序** に基づいて実行されます。
