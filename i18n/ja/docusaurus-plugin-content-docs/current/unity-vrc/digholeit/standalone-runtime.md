---
sidebar_position: 6
---

# Standalone runtime

> ドキュメントバージョン: **0.7.0**

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

`DigToolStandalone` は camera から ray を飛ばし、左 mouse は選択 mode（既定 dig）、右は add、middle は paint です。

Zone 内の terrain tree と detail は、足元の surface が掘られた、または埋められたとき非表示になり、`ResetToBaked()` で戻ります。Detail renderer は MaterialPropertyBlock の live foliage mask を使うため material asset は変更しません。

## Save と multiplayer

Edit は 1 つの `long` です。Save には `EditLog` を保存し、load 時に `LoadEdits` を呼びます。Multiplayer では `LocalEditRequested` を network で送り、受信側で `ApplyEdit` を同じ順序で実行します。Late joiner には full `EditLog` を送ります。Dig と Add は順序を入れ替えられません。

## 配置・smoothing・pen 設定

- `Tree(Vector3 world, float radius, int index)` / `Detail(...)`: prefab を配置し、index **-1** は球内の配置 object と同種の Bake foliage を除去します。
- `Smooth(Vector3 world, float radius, float strength)`: 強度を 31 段階に量子化し、最低 1/31 に clamp します。0 の呼び出しも「編集なし」ではありません。
- `SpawnedNear(Vector3 world, float meters, bool tree)`: 近くの配置 object を判定します。
- `UseAtScreen(Vector2 screen, Mode mode)`: 独自 input で mode を使用します。
- `treePrefabs`、`detailPrefabs`、`maxSpawned`: 共通 prefab 配列と配置上限（既定 2048）。
- `treeIndex`、`detailIndex`、spacing、`detailsPerEdit`: pen 配置設定。
- `mode`、`smoothStrength`、`cursor`、`showSettings`、`layerNames`: mode、強度、cursor と panel。

左 mouse は `mode`、右は add、middle は paint。**Show Settings** で IMGUI panel を有効にし、Tab で切り替えます。保存/replay は順序を保持してください。`ApplyEdit` は grid が変わらなくても foliage の変更で true を返すことがあります。Local smoothing を再び `ApplyEdit` に送らないでください。冪等ではありません。

## 0.7.0 の runtime operation

Tool mode と packed operation code は別です。

| 動作 | Tool `mode` | `DigFormat` op | Layer bits |
|---|---:|---:|---|
| Dig | 0 | `OpDig = 0` | — |
| Add | 1 | `OpAdd = 1` | Soil paint value |
| Paint | 2 | `OpPaint = 3` | Paint value |
| Tree | 3 | `OpTree = 4` | Prefab index + 1、0 は削除 |
| Detail | 4 | `OpDetail = 5` | Prefab index + 1、0 は削除 |
| Smooth | 5 | `OpSmooth = 2` | 1/31 単位の強度 |

Tree/detail の削除は球内の配置 object と同種の Bake 済み foliage を除去します。Bake foliage は remesh 後も非表示で、reset すると戻ります。Dig/add は brush 内の配置 object を除去します。Prefab 配列は全 client で一致させます。`maxSpawned` は配置数の上限（既定 2048）で、超える配置は無視されます。
