---
sidebar_position: 6
---

# Paste As Child To All Selected Parents (全選択中の親に子として貼り付け)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Paste As Child To All Selected Parents | 全選択中の親に子として貼り付け | วางเป็นออบเจกต์ลูกให้กับ Parent ทั้งหมดที่เลือก<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/Paste?src=hash&amp;ref_src=twsrc%5Etfw">#Paste</a> <a href="https://twitter.com/hashtag/Selected?src=hash&amp;ref_src=twsrc%5Etfw">#Selected</a> <a href="https://twitter.com/hashtag/Copy?src=hash&amp;ref_src=twsrc%5Etfw">#Copy</a> <a href="https://t.co/Cz0tsYrBXT">pic.twitter.com/Cz0tsYrBXT</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046669419951300893?ref_src=twsrc%5Etfw">April 21, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `GameObject > LogicCuteGuy > Paste As Child To All Selected Parents...`

このツールは、1 つ以上の「ソース」オブジェクトを取得し、それらのコピーを複数の送信先「親」に同時に貼り付けることを可能にすることで、「コピー＆ペースト」ワークフローを大幅に強化します。

## 主な機能

- **マルチソース対応**: オブジェクトのグループをソースの「クリップボード」として設定します。
- **マルチペアレント対応**: 階層内の複数の GameObject を貼り付け操作のターゲットとして選択します。
- **貼り付けモード**:
    - **Preserve World**: 親を変更しても、コピーを現在のグローバル位置に維持します。
    - **Copy Source Local**: ソースオブジェクトのローカルの位置/回転/スケールを新しいコピーに強制的にコピーします。
    - **Reset Local**: コピーを貼り付けた直後に、ローカル変換をゼロ/恒等（位置と回転を 0,0,0）にリセットします。
- **プレハブ機能**: ソースがプレハブアセットの場合、ツールはそれを **プレハブインスタンス** としてインスタンス化し、将来の更新のためにリンクを保持します。

## 使い方

1. ターゲットとなるオブジェクトを選択し、**Set Sources From Selection** をクリックします。
2. 階層内で 1 つ以上の **親 (Parent)** GameObject を選択します。
3. **Paste Mode** を選択します。
4. **Paste To Selected Parents** をクリックします。

> [!TIP]
> シーンにプロップを素早く配置するために使用します。例えば、「椅子」のプレハブをソースとして選択し、次に 10 個の「テーブル」オブジェクトを選択して貼り付けます。これで、各テーブルに椅子の子が正しくインスタンス化されます。
