---
sidebar_position: 14
---

# Terrain Swap (テレインスワップ)

**メニューパス**: `テレインを右クリック > LogicCuteGuy > Terrain Swap...`

Terrain コンポーネントとそのコライダーの同期を維持しながら、ベースとなる `TerrainData` を入れ替えるためのシンプルですが不可欠なユーティリティです。

## 主な機能

- **統合スワップ**: `Terrain` コンポーネントと `TerrainCollider` の両方の `TerrainData` を同時に置き換えます。
- **コンテキストセンシティブ**: インスペクター内の Terrain コンポーネントを右クリックすることで、ツールを素早く開くことができます。
- **Undo（元に戻す）の統合**: スワップ操作は完全に Undo システムに記録されます。

## 使い方

1. ターゲットとなる **Target Terrain** GameObject を選択します。
2. 新しい **New Terrain Data** アセットを割り当てます。
3. **Swap Terrain Data** をクリックします。

> [!NOTE]
> このツールは、スワップ直後に物理コライダーが視覚的なテレインと一致することを保証し、一般的なベイク/衝突の同期ずれの問題を防ぎます。
