---
sidebar_position: 5
---

# VRChat runtime

> ドキュメントバージョン: **0.4.0**

VRChat runtime は UdonSharp で書かれ、LCGUdonSharp で compile されます。Zone を Bake した後 **Add VRChat Runtime** を押すと、edit/meshing を行う `DigZoneRuntime` と、network 同期を行う子 GameObject の `DigSync` が追加されます。

Grid は chunk ごとに run-length compression されます。World load 時は decode せず、edit が届いた chunk だけ初回に decode します。Surface がない chunk は GameObject を持たず、必要になったとき inactive **Chunk Template** を複製します。

## DigTool

Pickup が向いている場所を dig、add、paint します。`zones`、ray origin の `tip`、hit layer、`reach`、`radius`、`mode`、`paintLayer`、`addLayer`、repeat `interval` を設定します。`_ToggleMode()` は dig/add、`_NextMode()` は dig/add/paint を切り替えます。

## DigZoneRuntime

- `_LocalEdit` / `_LocalEditLayer`: World position で edit を要求します。
- `_ContainsWorld` / `_IsSolidAt`: Zone 内判定と solid 判定。
- `_IsReady` / `_IsBusy`: Data 準備状態と処理中判定。
- `_DecodedChunkCount`: Reset 後に decode された chunk 数。
- `_ResetToOriginal`: Local だけを Bake 状態へ即時復元します。全員の reset は `DigSync._RequestReset()` を使います。

`budgetMsDesktop` / `budgetMsMobile` は edit と meshing の frame budget（default 2.5 / 1.2 ms）です。

## DigSync

順序付き append-only edit log を保持します。Default capacity は 4096 edit（各 8 byte）で、Manual sync の約 280 KB 制限内に収めます。Late joiner は full log を受け取り、time-sliced で replay します。`_RequestReset()` は全員を Bake 状態へ戻し、新しい epoch を開始します。

`DigSync` は Manual sync を使うため専用 GameObject に置いてください。Program asset が欠けた場合は **Tools > DigHoleIt > Create Missing U# Program Assets** を実行します。
