---
sidebar_position: 2
---

# ZoneDraw をはじめる

## 1. 形状を作る

Hierarchy で **GameObject > LogicCuteGuy > ZoneDraw** を選びます。

| メニュー項目 | 結果 |
|---|---|
| **Barrier Wall** | 点に沿った固い壁。 |
| **Trigger Zone** | 多角形の範囲のトリガー体積。 |
| **Room (walls + ground + ceiling)** | 床と天井がある閉じたバリア。 |

作成するとすぐに描画モードになります。後からは Inspector の **Draw / Edit Points** を使います。

## 2. 描く

| 操作 | 方法 |
|---|---|
| 点を追加 | クリック |
| 点を移動 | ドラッグ |
| 高さを変更 | 上向きの矢印をドラッグ |
| 点を挿入 | 水色の点をクリック |
| 点を削除 | Ctrl+クリック、または選択して Delete |
| 終了 | Esc または Enter |

Inspector には **Reverse**、**Drop To Ground**、**Flatten**、**Clear**、**Bake Colliders**、**Remove Colliders** もあります。Zone には 3 点以上が必要です。

## 3. 設定

| 設定 | 意味 |
|---|---|
| **Height** | 点より上に伸びる高さ。 |
| **Bottom Offset** | 点より下に伸びる量。凹凸のある地面をカバーします。 |
| **Thickness** | 壁、床、天井の厚み。 |
| **Wall Faces** | 線のどちら側に壁の厚みを置くか: Front、Back、または両方。 |
| **Closed** | Barrier のみ: 最後の点を最初の点につなぎます。床と天井にはこれが必要です。 |
| **Ground / Ceiling Collider** | 床や天井のスラブを追加します。 |
| **Is Trigger**、**Physic Material** | ベイクしたコライダーに適用されます。 |
| **Render Material** | 表示用メッシュ（任意）。 |
| **Scripting Ref** | Udon スクリプト用の `ZoneArea` を追加します。 |
| **Snap To Surface**、**Grid Snap** | 新しい点の位置を制御します。 |
| **Auto Bake** | 編集中に再ベイクします。 |

コライダーは `_ZoneColliders` オブジェクトの子で、形状と同じレイヤーになります。次のベイクで置き換えられるため、手動で編集しないでください。凹多角形は三角形ごとに凸コライダーを 1 つ使うので、複雑な形は避けてください。

## 4. 次のステップ

- [ベイクの仕組み](./baking.md): 各設定で生成されるコライダー。
- [ZoneArea のスクリプト](./scripting.md): プレイヤーが中にいるかの判定と、UdonSharp からのゲート操作。
