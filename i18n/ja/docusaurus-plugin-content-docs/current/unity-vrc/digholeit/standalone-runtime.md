---
sidebar_position: 6
---

# Standalone runtime

> ドキュメントバージョン: **0.4.0**

Standalone runtime は通常の C# (`LogicCuteGuy.DigHoleIt.Standalone`) です。VRChat SDK がない project、または `DIGHOLEIT_STANDALONE` define を追加した VRChat project で compile されます。

Zone を Bake して **Add Standalone Runtime** を押します。

## DigZoneRuntimeStandalone

| Member | 動作 |
|---|---|
| `Dig(world, radius)` | World position を球形に掘ります。 |
| `Add(world, radius)` | 球形に土を追加します。 |
| `Paint(world, radius, layer)` | Voxel layer を paint します。 |
| `LocalEdit(...)` | General edit。`LocalEditRequested` を発火して適用します。 |
| `ApplyEdit(long)` | Network 等で受け取った packed edit を適用します。 |
| `LoadEdits(edits)` | Bake 状態へ戻し、edit list を replay します。 |
| `ResetToBaked()` | Bake 状態へ戻して log を消去します。 |
| `Raycast(...)` | Physics を使わず grid を ray march します。 |
| `EditLog` | 最後の reset 以降の全 edit。 |

`DigToolStandalone` は camera から ray を飛ばし、左 mouse で dig、右で add、middle で paint します。

## Save と multiplayer

Edit は 1 つの `long` です。Save には `EditLog` を保存し、load 時に `LoadEdits` を呼びます。Multiplayer では `LocalEditRequested` を network で送り、受信側で `ApplyEdit` を同じ順序で実行します。Late joiner には full `EditLog` を送ります。Dig と Add は順序を入れ替えられません。
