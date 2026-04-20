---
sidebar_position: 5
---

# Rename Children Increment (子の連番リネーム)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Rename Children Increment | 子の連番リネーム | เปลี่ยนชื่อออบเจกต์ลูกพร้อมเลขลำดับ <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/rename123">pic.twitter.com/rename123</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046370648537395297?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `GameObject > LogicCuteGuy > Rename Children Increment...`

選択したオブジェクトのすべての子に番号付きのパターンを適用する、強力な一括リネームユーティリティです。リスト項目、床タイル、ライトアレイなどの繰り返される要素の命名に最適です。

## 主な機能

- **パターンベースのリネーム**: `{0}` プレースホルダーを使用して、番号を挿入する場所を定義します（例：`Object_{0}_Model`）。
- **カスタム開始インデックス**: 番号付けを任意の整数（例：0、1、100など）から開始できます。
- **非アクティブオブジェクトのサポート**: リネームプロセスに非アクティブな子を含めるかどうかを選択できます。
- **自動化されたワークフロー**: リネームが成功した後、ツールは自動的に閉じてワークフローを合理化します。

## 使い方

1. Hierarchy で **親 (Parent)** オブジェクトを選択します。
2. ツールを開き、**Pattern** を入力します（例：`Item_{0}`）。
3. **Start Index** を設定します。
4. **Rename Children** をクリックします。

> [!IMPORTANT]
> パターンには必ず `{0}` プレースホルダーを含める必要があります。含まれていない場合、ツールは警告を表示し、すべてのオブジェクトに同一の名前を付けてしまうのを避けるために操作を中止します。
