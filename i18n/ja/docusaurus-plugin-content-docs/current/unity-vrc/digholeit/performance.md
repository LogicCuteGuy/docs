---
sidebar_position: 8
---

# 性能と制限

> ドキュメントバージョン: **0.5.0**

## 推奨設定

| 設定 | PC | Quest |
|---|---|---|
| Voxel size | 0.5 m | 0.5–0.75 m |
| Chunk cells | 16 | 8–12 |
| Zone size | 64 × 32 × 64 cells 以下 | 約 32 × 16 × 32 m |
| Material | DigTerrain Standard | DigTerrain Lite |

Quest では 1 つの大きな zone より複数の小さな zone を推奨します。Editor ClientSim の測定では 16³ chunk の remesh は約 14–17 ms の Udon time です。Quest 実機値ではありません。

## Memory

- VRChat player は compressed grid と、edit が届いた chunk の decoded grid だけを保持します。
- Disk 上の grid/paint は RLE で通常 raw size の 2–5% です。
- Surface がある chunk だけ GameObject、mesh、collider を持ちます。
- Editor/standalone は full grid を memory に保持します。
- 1 zone は最大 128 Mi samples。16 million を超えると inspector が警告します。

## 制限

- 1 zone は 1 Terrain、axis-aligned です。
- `DigSync.capacity`（default 4096）が instance ごとの edit 数を制限します。
- Owner が relay 前に退出すると、その edit は他 client へ届かない場合があります。
- Paint edge は約 1 voxel で blend します。
- Shading は最大 16 layer（Lite は 8、mobile Standard は 4）、chunk の painted layer は最大 4 です。
- Runtime で掘られた chunk は lightmap ではなく light probe を使います。
- Terrain material は hole を support する必要があります。
- Tree は 1 本ごとに GameObject、detail は chunk column ごとに renderer（detail type ごとに draw call）を使います。Quest では density と Detail Distance を控えめにします。
