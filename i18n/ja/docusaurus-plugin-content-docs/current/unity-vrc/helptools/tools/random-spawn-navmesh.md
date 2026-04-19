---
sidebar_position: 12
---

# Random Spawn Children On NavMesh (NavMesh 上への子のランダムスポーン)

**メニューパス**: `GameObject > LogicCuteGuy > Random Spawn Children On NavMesh`

子オブジェクトをベイク済みの NavMesh 上にランダムに配置することで、環境プロップ、収集アイテム、または NPC の配置を自動化します。

## 主な機能

- **NavMesh 対応**: Unity の NavMesh システムを使用して、オブジェクトが歩行可能な表面に配置されるようにします。
- **配置モード**:
    - **Local Radius**: 特定の中心点周辺の位置をサンプリングします。
    - **Full NavMesh**: シーン全体の三角形化された NavMesh エリアにオブジェクトを分散させます。
- **微調整**:
    - **Height Offset**: オブジェクトを地面の上に浮かせたり、沈めたりします。
    - **Vertical Jitter**: 段差のある地形や傾斜地に対応するために、垂直方向のサンプリングの高さをランダム化します。
    - **Max Sample Distance**: オブジェクトを散布できる最大距離を制御します。
- **エージェント & エリアフィルタリング**: 特定の NavMesh エージェントタイプとエリアマスク（例：「草（Grass）」エリアのみにスポーンさせるなど）を選択できます。

## 使い方

1. NavMesh が **ベイク済み** であることを確認します。
2. 散布したい子オブジェクトを含む **親 (Parent)** オブジェクトを選択します。
3. **Agent Type** と **Area Mask** を設定します。
4. **Random Spawn Children** をクリックします。

> [!NOTE]
> 特定のオブジェクトの配置に失敗した場合（例：近くに有効な NavMesh がない場合など）、ツールは概要ダイアログで失敗した数を報告します。
