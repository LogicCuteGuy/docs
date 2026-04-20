---
sidebar_position: 3
---

# Fix Missing Shader On Prefab (プレハブの消失シェーダー修正)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Fix Missing Shader On Prefab | プレハブの消失シェーダー修正 | แก้ไข Shader ที่หายไปใน Prefab <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/shader?src=hash&amp;ref_src=twsrc%5Etfw">#shader</a> <a href="https://twitter.com/hashtag/missing?src=hash&amp;ref_src=twsrc%5Etfw">#missing</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/HwyWfkc73j">pic.twitter.com/HwyWfkc73j</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046164392069542231?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**メニューパス**: `プレハブアセットを右クリック > Fix Missing Shaders (Prefab → Standard)`

プレハブアセット内の「ピンク色」の壊れたマテリアルを修正するための専用クリーンアップツールです。これは通常、異なる Unity バージョンやレンダーパイプラインからアセットをインポートした際のシェーダーの欠落やエラーによって発生します。

## 主な機能

- **安全な編集**: Unity の `PrefabUtility.EditPrefabContentsScope` を使用して、シーンにインスタンス化することなくプレハブを直接修正します。
- **検出**: `null` シェーダーや、「InternalError」としてマークされたシェーダー（ピンク色のメッシュの一般的な原因）を持つマテリアルを特定します。
- **自動置換**: 壊れたシェーダーをデフォルトの Unity **Standard** シェーダーに置き換えます。
- **再帰的スキャン**: プレハブ内のすべての子 Renderer と、その中のすべてのマテリアルスロットを深くスキャンします。

## 使い方

1. **Project** ウィンドウで、「ピンク色」または壊れているプレハブを見つけます。
2. プレハブアセットを右クリックします。
3. **Fix Missing Shaders (Prefab → Standard)** を選択します。
4. どのマテリアルが修正されたかがコンソールに記録されます。

> [!NOTE]
> このツールは、Hierarchy 内の GameObject インスタンスではなく、Project ビュー内の **プレハブアセット** に対して動作するように特別に設計されています。
