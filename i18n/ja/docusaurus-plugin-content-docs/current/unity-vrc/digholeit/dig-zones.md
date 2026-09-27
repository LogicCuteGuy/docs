---
sidebar_position: 3
---

# Dig Zone

> ドキュメントバージョン: **0.4.0**

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

Scene view の orange box が zone、green box が実際に掘れる領域です。

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

## 移動、resize、terrain 追従

Box face の handle は voxel 単位で snap します。Re-bake は voxel size と lattice が同じなら sculpt/paint を保持します。**Follow terrain edits** が有効なら、Unity Terrain の height/paint stroke 完了後に未 sculpt voxel を更新し、sculpt と voxel paint は維持します。

各 zone は terrain hole を管理し、削除や Clear で復元します。古い zone が残した hole は Terrain tool の **Fix Leftover Holes** で修復できます。
