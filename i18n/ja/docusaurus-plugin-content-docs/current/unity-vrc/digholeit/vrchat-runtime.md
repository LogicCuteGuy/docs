---
sidebar_position: 5
---

# VRChat runtime

> ドキュメントバージョン: **0.7.0**

VRChat runtime は UdonSharp で書かれ、LCGUdonSharp で compile されます。Zone を Bake した後 **Add VRChat Runtime** を押すと、edit/meshing を行う `DigZoneRuntime` と、network 同期を行う子 GameObject の `DigSync` が追加されます。

Grid は chunk ごとに run-length compression されます。World load 時は decode せず、edit が届いた chunk だけ初回に decode します。Surface がない chunk は GameObject を持たず、必要になったとき inactive **Chunk Template** を複製します。

## DigTool

Pickup が向いている場所を dig、add、paint します。`zones`、ray origin の `tip`、hit layer、`reach`、`radius`、`mode`、`paintLayer`、`addLayer`、repeat `interval` を設定します。`_ToggleMode()` は dig/add、`_NextMode()` は六つの mode を切り替えます。

## DigZoneRuntime

- `_LocalEdit` / `_LocalEditLayer`: World position で edit を要求します。
- `_ContainsWorld` / `_IsSolidAt`: Zone 内判定と solid 判定。
- `_IsReady` / `_IsBusy`: Data 準備状態と処理中判定。
- `_DecodedChunkCount`: Reset 後に decode された chunk 数。
- `_ResetToOriginal`: Local だけを Bake 状態へ即時復元します。全員の reset は `DigSync._RequestReset()` を使います。

`budgetMsDesktop` / `budgetMsMobile` は edit と meshing の frame budget（default 2.5 / 1.2 ms）です。

`foliageMask`、`detailRenderers`、`treeObjects` は bridge が設定する zone 内 foliage data です。Remesh 後に木や detail の足元が掘られた、または埋められた場合、木を無効化し detail mask を更新します。Reset で復元されます。

## DigSync

順序付き append-only edit log を保持します。Default capacity は 4096 edit（各 8 byte）で、Manual sync の約 280 KB 制限内に収めます。Late joiner は full log を受け取り、time-sliced で replay します。`_RequestReset()` は全員を Bake 状態へ戻し、新しい epoch を開始します。

`DigSync` は Manual sync を使うため専用 GameObject に置いてください。Program asset が欠けた場合は **Tools > DigHoleIt > Create Missing U# Program Assets** を実行します。

## 0.7.0 の Dig Pen と showcase

`Example/Pen/Dig Pen (VRChat).prefab` は VRC Object Sync 付き pickup、world-space 設定パネル、brush cursor を含みます。`Dig Pen (Standalone).prefab` は mouse pen と画面上のパネルです。配布 demo scene は両方とも pen を含みます。Scene-builder menu は従来の shovel/camera 構成です。

Dig/add/paint/tree/detail/smooth、size/rate、layer/prefab/erase を選択できます。Standalone の左 mouse は選択中の mode、右は add、middle は paint。**Show Settings** でパネルを有効にし、Tab で切り替えます。

空の `zones` / `layerNames`、runtime の `treePrefabs` / `detailPrefabs` は bake・scene open/save/play 時に scene zone と terrain prototype（なければ example prefab）から補完されます。独自の選択には配列を指定してください。DigTool Inspector の **Refresh Zones** は zone と layer name を再設定し、削除 zone は save/play 時に外れます。

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

Smoothing は **冪等ではありません**。Log 順で一度だけ適用してください。DigSync は非 owner の smoothing を local prediction せず、owner から戻った時に表示します。Udon は共有 chunk border の sample を一致させます。Dig/Add/Paint の重複適用特性を smoothing に当てはめないでください。

UI は backing Udon Behaviour の `SendCustomEvent` で `SelectDig`、`SelectAdd`、`SelectPaint`、`SelectTree`、`SelectDetail`、`SelectSmooth`、`PrevOption`、`NextOption`、`ResetZones` を呼び、slider は `OnSliderChanged` を使用します。設定 handler は network call を無視します。`smoothStrength`、`treeIndex`、`detailIndex`、`treeSpacing`、`detailSpacing`、`detailsPerEdit` が pen 設定です。`_SpawnedNear(world, meters, tree)` は近くの配置 object を判定します。
