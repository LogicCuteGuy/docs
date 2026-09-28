---
sidebar_position: 4
---

# Editor brush

> ドキュメントバージョン: **0.5.0**

Bake 済み zone は 2 つの方法で編集できます。

- Terrain の **Paint Terrain > DigHoleIt: Dig Voxels / Paint Voxels**。Terrain brush list の shape を使い、その terrain 上の全 zone に作用します。
- Terrain の **DigHoleIt: Paint Trees / Paint Details**。同じ Unity brush で terrain と zone 内の穴・壁・天井へ foliage を paint します。
- Zone inspector の **Sculpt Tool**。Scene view overlay から mode、paint layer、Sphere/Soft/Flat/custom mask を選びます。

| Mode | 動作 |
|---|---|
| Dig | Surface を内側へ押し、穴や tunnel を作ります。 |
| Add | Surface を外側へ押し、土を追加します。 |
| Paint | Brush 内 voxel の layer を設定します。 |
| Smooth | Surface を滑らかにします。 |
| Reset | Bake 元の terrain と paint なしの状態へ戻します。 |

![DigHoleIt: Dig Voxels terrain tool](/img/digholeit/terrain-dig-voxels.png)

![Scene view で Dig Zone を sculpt](/img/digholeit/editor-sculpt.jpg)

**Surface Angle** filter を使うと、上向き面、斜面、壁、天井など指定角度の surface だけへ sculpt/paint できます。基準軸は **Brush Axis** で world または brush orientation に合わせます。

Paint layer は Auto、terrain の全 layer（最大 16）、Dug Soil から選択できます。Auto は paint を消し、元 surface より上では terrain layer、下では dug soil を使います。

| 入力 | 操作 |
|---|---|
| Hold / drag | Brush 適用 |
| Shift / Ctrl | Add / Smooth |
| A + 左右 drag | Size |
| S + 左右 drag | Strength |
| `[` / `]` | Size を 10% 変更。Hold で連続変更 |

1 stroke が 1 undo step です。VRChat project では mouse を離したときに変更が `DigZoneRuntime` へコピーされます。
