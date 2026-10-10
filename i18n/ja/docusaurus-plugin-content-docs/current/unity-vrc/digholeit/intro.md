---
sidebar_position: 1
---

# DigHoleIt ドキュメント

> ドキュメントバージョン: **0.7.0** · [リリースノート](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

DigHoleIt は Unity Terrain の一部を掘削可能な voxel terrain にします。Terrain 上へ **Dig Zone** を配置して Bake すると、プレイヤーは穴、トンネル、洞窟を掘り、土を追加し、terrain layer を voxel surface にペイントできます。0.5.0 では zone 内の木と detail、穴・壁・天井への foliage paint、zone height の自動拡張に対応しました。VRChat では late joiner を含む全プレイヤーへ編集が同期されます。

## 0.7.0 の更新内容

DigHoleIt 0.7.0 は Dig Pen prefab、実行時の木・detail の配置/削除（Bake 済み foliage を含む）、同期 smoothing、VRChat showcase、Refresh Holes / Refresh Zones を追加します。設定はローカルで、VRChat edit は同期され late joiner に replay されます。

## 0.6.1 の更新内容

- Bake、resize、移動、または sculpt による chunk 作成後も、Undo/Redo が chunk object と mesh を正しく復元します。
- **Hole Overlap** が zone surface を terrain edge の下へ既定 0.1 m 延長し、距離によって terrain detail が変化しても seam を閉じます。
- Zone 内の grass が terrain の healthy/dry colour、暗い root、wind tint、wind phase と一致します。Diffuse Remap は対応する terrain shader でのみ使用します。
- Hole edge の面積ゼロ triangle を collision mesh 作成前に除去します。

![DigHoleIt の terrain と掘削 zone](/img/digholeit/hero.jpg)

| 掘削した穴 | Terrain を通る tunnel |
|---|---|
| ![Unity Terrain に掘った穴](/img/digholeit/pit.jpg) | ![Unity Terrain を通る voxel tunnel](/img/digholeit/tunnel.jpg) |

| ページ | 内容 |
|---|---|
| [画像付きチュートリアル](getting-started.md) | 実際の画像で install、Bake/resize、dig/paint、foliage、VRChat pen 設定を説明 |
| [Dig Zone](dig-zones.md) | 設定、Bake、zone height、木と detail、移動、resize、terrain hole、terrain 追従、layer、baked lighting |
| [Editor brush](editor-brushes.md) | Editor 内での sculpt と paint |
| [VRChat runtime](vrchat-runtime.md) | UdonSharp の `DigZoneRuntime`、`DigTool`、`DigSync` |
| [Standalone runtime](standalone-runtime.md) | 通常 C# runtime、save、multiplayer hook |
| [仕組み](how-it-works.md) | Grid、圧縮、edit packing、meshing、shader、lighting、network |
| [性能と制限](performance.md) | PC/Quest 推奨設定、memory、既知の制限 |
| [トラブルシューティング](troubleshooting.md) | よくある問題と解決方法 |

## Runtime の選択

- VRChat SDK がある project では UdonSharp runtime のみが compile されます。
- それ以外では standalone runtime のみが compile されます。
- VRChat project でも standalone を使う場合は scripting define `DIGHOLEIT_STANDALONE` を追加します。

Source、release、issue: [github.com/LogicCuteGuy/DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt)
