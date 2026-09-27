---
sidebar_position: 1
---

# DigHoleIt ドキュメント

> ドキュメントバージョン: **0.4.0** · [リリースノート](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.4.0)

DigHoleIt は Unity Terrain の一部を掘削可能な voxel terrain にします。Terrain 上へ **Dig Zone** を配置して Bake すると、プレイヤーは穴、トンネル、洞窟を掘り、土を追加し、terrain layer を voxel surface にペイントできます。VRChat では late joiner を含む全プレイヤーへ編集が同期されます。

| ページ | 内容 |
|---|---|
| [はじめに](getting-started.md) | インストール、demo scene、独自 terrain への zone 設定 |
| [Dig Zone](dig-zones.md) | 設定、Bake、移動、resize、terrain hole、terrain 追従、layer、baked lighting |
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
