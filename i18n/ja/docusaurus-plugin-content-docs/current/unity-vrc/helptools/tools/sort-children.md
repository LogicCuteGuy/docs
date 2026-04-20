---
sidebar_position: 4
---

# Sort Parent Children (親オブジェクトの子をソート)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Sort Parent Children | 親オブジェクトの子をソート | จัดเรียงออบเจกต์ลูก <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/sort?src=hash&amp;ref_src=twsrc%5Etfw">#sort</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/eGuBBSyOEI">pic.twitter.com/eGuBBSyOEI</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046207151677542581?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `GameObject > LogicCuteGuy > Sort Parent Children`

さまざまな基準に基づいて Hierarchy 内の子 GameObject を並べ替える、精密な整理ツールです。これは、複雑なシーンの構造を維持し、子オブジェクトを見つけやすくするために不可欠です。

## 主な機能

- **ソートモード**:
    - **Name A-Z / Z-A**: アルファベット順のソート。
    - **Local Position 軸**: X、Y、または Z のローカル座標に基づいてソート（昇順または降順）。一列またはグリッド状に配置されたオブジェクトに最適です。
- **一括操作**: 指定した 1 つの親の子をソートするか、選択した複数の親を一度に処理します。
- **インデックスの安定性**: 安全でデータを保持する「Sibling Index」の再注文（`SetSiblingIndex`）を使用します。
- **Undo（元に戻す）のサポート**: すべてのソート操作は、1 ステップで完全に元に戻すことができます。

## 使い方

1. 親となる GameObject を選択するか、ツールウィンドウを開きます。
2. **Sort Mode** を選択します（例：`Name A-Z` または `Local Pos X Asc`）。
3. 指定した親に対して **Sort Children** をクリックするか、現在の選択に対して **Sort Selected Parents** をクリックします。

> [!TIP]
> **Local Pos X Asc** によるソートは、一連の UI ボタン、インベントリスロット、または繰り返しの環境プロップがあり、それらを左から右への視覚的な順序に直接対応させたい場合に非常に便利です。
