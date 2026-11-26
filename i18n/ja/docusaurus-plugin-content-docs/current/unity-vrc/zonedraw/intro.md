---
sidebar_position: 1
---

# ZoneDraw

> ドキュメントのバージョン: **0.1.0** · [リリース](https://github.com/LogicCuteGuy/ZoneDraw/releases/tag/0.1.0)

**ZoneDraw** (`com.logiccuteguy.zonedraw`) は、Scene ビューで点をクリックして、見えないバリア壁やトリガーゾーンを描けるツールです。結果は通常の Unity コライダーにベイクされます。描画用コンポーネントはエディター専用で、ビルドから除外されます。

## 機能

- **Barrier**（壁）。床と天井のスラブを追加して部屋を閉じることもできます。
- 凹形状を含む任意の多角形の **Zone**（体積）。
- 点の追加・ドラッグ・挿入・削除。表面スナップ、グリッドスナップ、Undo に対応します。
- 編集中にコライダーが自動で更新されます。
- 任意のレンダーマテリアルで、フォースフィールドやフェンスのように可視化できます。
- UdonSharp 用の `ZoneArea`: 位置やプレイヤーが内側にあるかを判定し、壁・床・天井をオン/オフできます。

## 必要環境

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.10.5 以降 (`com.vrchat.worlds`) と、付属の UdonSharp

## インストール

### VCC / ALCOM

1. [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合は一覧を更新してください。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **ZoneDraw** (`com.logiccuteguy.zonedraw`) を追加します。

### 手動インストール

リリースから `com.logiccuteguy.zonedraw-0.1.0.zip` をダウンロードし、`Packages/com.logiccuteguy.zonedraw` に展開します。GitHub が自動生成する **Source code** アーカイブは使わないでください。インストール方法はプロジェクトごとに 1 つだけにしてください。

## ライセンス

MIT。

次へ: [はじめに](./getting-started.md)。
