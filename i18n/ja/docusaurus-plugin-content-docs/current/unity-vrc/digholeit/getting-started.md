---
sidebar_position: 2
---

# はじめに

> ドキュメントバージョン: **0.5.0**

## 要件

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| その他 | Worlds SDK 3.10.5、LCGUdonSharp 0.3.4 以上 | なし |

## インストール

VCC の **Settings > Packages > Add Repository** に `https://vpm.logiccuteguy.com/index.json` を追加し、DigHoleIt 0.5.0 を project へ追加できます。

Git からインストールする場合は Unity Package Manager の **Add package from git URL** に次を入力します。

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.5.0
```

または repository を `Packages/com.logiccuteguy.digholeit` に配置します。VRChat project では先に LCGUdonSharp をインストールしてください。

## Demo scene

- **Tools > DigHoleIt > Create VRChat Demo Scene**: terrain、Bake 済み zone、spawn、dig/add/paint の shovel を作成します。ClientSim で Play し、shovel を持って Use を押します。
- **Tools > DigHoleIt > Create Standalone Demo Scene**: terrain、zone、`DigToolStandalone` 付き camera を作成します。左 click で dig、右で add、middle で paint します。

## 独自 Terrain へ追加する

1. 空の GameObject に **DigHoleIt > Dig Zone** を追加し Terrain を割り当てます。
2. **Voxel Size**、**Cells**、**Chunk Cells** を設定し、**Fit To Terrain**、**Bake** の順に実行します。
3. VRChat では **Add VRChat Runtime**、standalone では **Add Standalone Runtime** を押します。Zone の作成や Bake だけでは runtime は追加されません。
4. VRChat では pickup に `DigTool` を追加して zone を `zones` array に登録します。Standalone では camera に `DigToolStandalone` を追加します。
5. 必要に応じて [Editor brush](editor-brushes.md) で sculpt/paint します。
6. Baked light を使う場合は **Add Light Probes** を実行して lighting を Bake します。

0.4 から 0.5 へ更新する場合は、木・detail と新しい zone height data を取り込むため各 zone を一度 Re-bake してください。Voxel size と lattice が同じなら sculpt と paint は保持されます。
