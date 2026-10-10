---
sidebar_position: 9
---

# トラブルシューティング

> ドキュメントバージョン: **0.7.0**

## Udon program assets

[画像付きチュートリアル](getting-started.md)の録画には `Unable to find valid U# program asset` と `Cannot run serialization ... the U# program asset ... is null` があります。Editor で sculpt が見えても VRChat runtime は未完成の場合があります。Play/build の前に解決してください。

1. Import/compile の完了を待ち、Worlds SDK と LCGUdonSharp の導入を確認します。最初の Console compile エラーを先に直します。[LCGUdonSharp 導入](../lcgudonsharp/install.md)と[トラブルシューティング](../lcgudonsharp/troubleshooting.md)を参照してください。
2. **DigHoleIt** の program file がない場合は **Tools > DigHoleIt > Create Missing U# Program Assets** を使います。Package の Udon script の欠けた `.asset` だけを作成します。既存の無効な file や SDK program は修復しません。
3. **VRCWorld/WorldQualitySettings** のエラーなら SDK sample の Program Source と SDK import を確認します。DigHoleIt の menu はその program を修復しません。
4. Zone の **DigZoneRuntime + DigSync** を確認して保存し、Console エラーの解決後に ClientSim を再試行します。Null-reference が残る場合は stack trace を調べます。録画だけでは原因や修復成功は断定できません。

## Terrain と runtime の問題

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

## Refresh Holes と削除 foliage

Terrain の Dig Zones panel の **Refresh Holes** は、**開いている scene** の Dig Zone が覆っていない hole cell を埋めます。削除 zone の記録なしの hole にも対応し、記録付き leftovers も処理します。未所有 hole の処理は確認付きで Undo できます。

**手動で描いた hole** や、同じ terrain を使う **閉じた scene** の zone hole も埋まる可能性があります。先に必要な scene を開き、確認内容を読んでください。無害な refresh ではありません。**Fix Leftover Holes** は記録がある leftovers だけを検出します。

Runtime Tree/Detail erase は配置 object だけでなく Bake foliage も除去します。Remesh では戻らず、reset で戻ります。[Runtime operation](vrchat-runtime.md)を参照してください。
