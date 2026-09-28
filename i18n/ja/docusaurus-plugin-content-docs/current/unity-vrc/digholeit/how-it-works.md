---
sidebar_position: 7
---

# 仕組み

> ドキュメントバージョン: **0.5.0**

## Grid と圧縮

Zone は terrain を量子化 signed-distance field として sample します。1 sample は 1 byte で、128 が surface、より小さい値が solid、より大きい値が air です。Grid と paint は run-length compression され、通常は raw size の約 2–5% になります。

VRChat runtime は chunk ごとの compressed data と offset を保持し、edit が届いた chunk だけ `(chunkCells + 2)³` sample を decode します。Reset は decoded chunk を捨てて Bake mesh を戻すだけなので即時です。

## Edit と mesh

1 edit は position、radius、operation、layer を 1 つの `long` に pack します。Dig/Add/Paint は idempotent です。`DigBrush` が sample を変更し、dirty chunk を `SurfaceNets` が mesh 化します。Chunk は隣接 sample を 1 voxel border として持つため seam が一致します。

Surface がある chunk だけ GameObject、mesh、collider を持ちます。Runtime で surface が新しくできると Chunk Template を複製します。

## Shading と lighting

Standard shader は terrain の splat/normal を最大 16 layer、DigTerrain Lite は Quest 向けに最大 8 layer shading します。Paint slot は chunk ごとに最大 4 terrain layer と dug soil です。

Baked Lighting が有効なら chunk は lightmap UV と static flag を持ちます。Runtime で remesh された chunk は light probe に切り替わり、Reset で元の lightmap index と scale/offset を復元します。

## 木と detail

`DigFoliageBaker` は terrain hole 内の木を `DigZoneData` に移し、detail instance を chunk column ごとの mesh にまとめます。各 instance は surface anchor を持ちます。Runtime が anchor 周辺の signed-distance field を調べ、surface が掘られた、または埋められた場合は木を無効化し、RGBA foliage mask 経由で detail を隠します。Reset で Bake 時の mask と object state を復元します。

## Network

Digging player は edit を local prediction し、owner が sequence number を付けて broadcast します。各 client は順序どおり適用し、早く届いた edit を buffer します。Late joiner には owner が full log を Manual sync し、time-sliced replay します。Reset は新しい epoch を開始して log を clear します。
