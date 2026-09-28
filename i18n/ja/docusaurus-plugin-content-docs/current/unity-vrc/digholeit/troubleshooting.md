---
sidebar_position: 9
---

# トラブルシューティング

> ドキュメントバージョン: **0.6.1**

| 問題 | 解決方法 |
|---|---|
| Zone 横に gray strip / gap がある | Terrain tool の **Fix Leftover Holes**、または Paint Holes で戻して再 Bake します。 |
| Bake が “too small” / Border Voxels error | X/Z を約 7 voxel より広くするか Border Voxels を 2–3 に下げます。 |
| “Settings changed since the last bake” | **Bake** を押します。Voxel size/lattice が同じなら sculpt/paint は保持されます。 |
| Terrain edit に追従しない | **Follow terrain edits**、Bake 済み、設定が最新であることを確認します。 |
| VRChat project で standalone script が Missing | 正常です。必要なら `DIGHOLEIT_STANDALONE` define を追加します。 |
| VRChat で同期しない | **Add VRChat Runtime** を実行し、`DigZoneRuntime.sync` と専用 GameObject の `DigSync` を確認します。 |
| “grid is too large” | Zone を分割・縮小するか voxel を大きくします。最大 128 Mi samples です。 |
| Chunk object が非常に多い | 古い Bake です。再 Bake すると surface のある chunk だけ残ります。 |
| Tool が zone に当たらない | Tool の `layers` に Chunk Layer を含め、`reach` を確認します。 |
| Baked light で暗い | Baked Lighting を有効にし、**Add Light Probes** 後に lighting を再 Bake します。 |
| Voxel surface が gray | **Apply Material** を実行し、terrain layer 追加後は zone を再 Bake します。 |
| Zone 内で tree/detail を paint できない | Unity 標準 tool ではなく **DigHoleIt: Paint Trees / Paint Details** を使い、prototype が選択されていることを確認します。 |
| Zone 内の tree/grass が消える | **Trees / Details** を有効にし、zone を Bake します。Surface を掘った場所では非表示になり、Reset で戻ります。 |
| Bake 後に zone の上端が上がる | Terrain が box 上端へ達したためです。**Headroom Above Terrain** を下げると拡張量を減らせます。 |

Issue: [github.com/LogicCuteGuy/DigHoleIt/issues](https://github.com/LogicCuteGuy/DigHoleIt/issues)
