---
sidebar_position: 3
---

# Dig Zone

> ドキュメントバージョン: **0.6.1**

Dig Zone は 1 つの Unity Terrain 上に置く axis-aligned box です。内部の terrain は、掘る・埋める・paint できる voxel grid に置き換わります。

## 主な設定

| 設定 | 意味 |
|---|---|
| **Terrain** | Zone が切り込む terrain。Footprint 全体が terrain 上に必要です。 |
| **Voxel Size** | 1 voxel の辺長（m）。 |
| **Cells** | Voxel grid の大きさ。各 axis に `cells + 1` sample を持ちます。 |
| **Chunk Cells** | 1 chunk の voxel 数。PC は 16、Quest は 8–12 が目安です。 |
| **Border Voxels** | Terrain hole edge と zone floor の内側に残す未編集 margin。通常 2–3。 |
| **Max Brush Radius** | Player から受け付ける最大 brush 半径。 |
| **Baked Lighting** | Chunk に lightmap UV と Contribute GI を設定します。 |
| **Lightmap Scale** | Chunk の lightmap resolution 倍率。 |
| **Trees / Details** | Zone 内の terrain tree と detail を表示し、掘削面に追従させます。 |

Scene view の orange box が zone、green box が実際に掘れる領域です。

## Zone height

Terrain や sculpt が現在の上端に近づくと、Bake と Editor brush は zone を上方向へ voxel 単位で自動拡張します。底面と terrain hole の footprint は変わりません。不要な空間を減らすには **Fit To Terrain** を使ってから Bake します。

## 木と detail

Bake 時に terrain hole 内の tree は zone data へ移され、元の回転・幅・高さ、collider、LOD を保持した prefab copy として配置されます。Re-bake しても位置を保ち、Clear または Delete Zone で terrain へ戻ります。Terrain detail は上面では元の detail map に従い、穴の床・壁・天井に paint した detail は zone data に保存され、surface から生える mesh として描画されます。

Terrain の **Paint Terrain** から **DigHoleIt: Paint Trees** / **DigHoleIt: Paint Details** を使うと、Unity 標準 brush が届かない zone 内にも paint できます。

![穴の中にペイントした foliage](/img/digholeit/paint-in-hole.jpg)

![洞窟の床と天井にペイントした foliage](/img/digholeit/paint-in-cave.jpg)

## 操作

- **Fit To Terrain**: Terrain の高低に合わせて box height を調整します。
- **Bake**: Terrain から grid と mesh を生成し、既存 sculpt/paint を保持します。
- **Sculpt Tool**: [Editor brush](editor-brushes.md) を開きます。
- **Reset To Terrain**: Sculpt と paint を破棄して最初から Bake します。
- **Clear / Delete Zone**: Chunk object を削除し terrain hole を戻します。
- **Add Light Probes**: Runtime で mesh が変わった chunk 用の probe を配置します。
- **Add VRChat Runtime / Add Standalone Runtime**: [VRChat](vrchat-runtime.md) または [standalone](standalone-runtime.md) runtime を追加します。

## Terrain layer と lighting

Terrain layer は最大 16、DigTerrain Lite は最大 8 layer を shading します。各 chunk は painted layer を最大 4 つと dug soil を保持します。Baked Lighting を使う場合は zone を Bake し、Light Probe Group を追加してから scene lighting を Bake してください。Runtime で変更された chunk は light probe に切り替わり、Reset で lightmap に戻ります。

Chunk mesh は material の **Hole Overlap**（既定 0.1 m）だけ terrain hole edge の先まで伸びます。Terrain に影を落とすほど大きく重ねず、距離による terrain detail の変化で見える seam を閉じます。

## 移動、resize、terrain 追従

Box face の handle は voxel 単位で snap します。Re-bake は voxel size と lattice が同じなら sculpt/paint を保持します。**Follow terrain edits** が有効なら、Unity Terrain の height、paint、tree、detail の変更完了後に zone を更新し、sculpt と voxel paint は維持します。

各 zone は terrain hole を管理し、削除や Clear で復元します。古い zone が残した hole は Terrain tool の **Fix Leftover Holes** で修復できます。
