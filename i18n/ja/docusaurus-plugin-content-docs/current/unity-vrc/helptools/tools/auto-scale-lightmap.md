---
sidebar_position: 1
---

# Auto Scale In Lightmap (ライトマップ自動スケーリング)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Auto Scale In Lightmap | ライトマップ自動スケーリング | การปรับขนาด Lightmap อัตโนมัติ <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://twitter.com/hashtag/lightmap?src=hash&amp;ref_src=twsrc%5Etfw">#lightmap</a> <a href="https://t.co/YxtXZwSjqx">pic.twitter.com/YxtXZwSjqx</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2045964665222807878?ref_src=twsrc%5Etfw">April 19, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `GameObject > LogicCuteGuy > Auto Scale In Lightmap`

**Auto Scale In Lightmap** ツールは、シーン内のオブジェクト間でテクセル密度が不一致になる問題を解決します。MeshRenderer の `Scale In Lightmap` プロパティを正規化または調整するための、2 つの高度なアルゴリズムを提供します。

## 主な機能

- **Match Scale First (グローバル倍率)**: すべてのオブジェクトを正規化し、物理的なサイズに関係なく、デフォルトのライトマップ空間を自然に使用するようにします。これにより、最終的な倍率を適用する前に、大きな壁と小さな立方体の解像度のバランスが保たれます。
- **Min/Max Ratio モード**: シーン内の実際のサイズスペクトルに基づいて、最小のオブジェクトを高解像度に、最大のオブジェクトを低解像度に自動的にマッピングします。
- **体積ベースの計算**: 幅 × 高さ × 奥行きの立方根に基づいて「サイズ」を計算するオプション。多様な形状に対してより物理的に正確な結果が得られます。
- **選択的な適用**: シーン全体、または現在選択されているオブジェクトとその子オブジェクトのみに適用します。
- **安全トグル**: ワンクリックですべてのスケールを 1.0 にリセットしたり、非アクティブなオブジェクトを自動スケーリングプロセスに含めたりすることができます。

## 使い方

1. **LogicCuteGuy** メニューからツールを開きます。
2. **Scaling Mode** を選択します：
   - 均一な密度にする場合は **Global Multiplier** を使用します。
   - 階層的な密度（小さいアイテム = 高解像度）にする場合は **Min Max Ratio** を使用します。
3. 複雑な形状の場合は **Calculate by Volume** を有効にします。
4. **Apply Auto Scale** をクリックします。
5. 更新されたオブジェクトの数の概要については、コンソールを確認してください。

> [!TIP]
> 最終的なライトマップをベイクする前にこのツールを使用すると、ベイク時間を大幅に短縮し、大きなサーフェスを最適化したまま、細部の「ブロック状」の影を排除できます。
