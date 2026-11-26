---
sidebar_position: 1
---

# OpenWorld

> ドキュメントのバージョン: **0.0.1** · [リリース](https://github.com/LogicCuteGuy/OpenWorld/releases/tag/0.0.1)

**OpenWorld** (`com.logiccuteguy.openworld`) は VRChat 向けのチャンクグリッド型ワールドエンジンです。各プレイヤーの周囲のチャンクを読み込み・解放し、焼き込みオクルージョンカリングやオブジェクトごとの LOD を使わずに、ワールドのダウンロードサイズを小さく、フレームレートを高く保つことを目指します。

:::info 早期リリース
0.0.1 は最初の公開リリースです。Quest 向けの負荷予算は実機で未計測です。プロジェクトをバックアップし、ご自身のワールドでテストしてください。
:::

## 機能

- **チャンクストリーミング**: 近距離・中距離のリングと、数フレームに分散するチャンク切り替え。
- **インポスター**: 遠くのチャンクやチャンクのまとまりを八面体インポスターで描画します（独自のベイクとシェーダー）。
- **Block**: 繰り返し配置するオブジェクトを、データテクスチャを使った GPU インスタンシングで描画します。Grid Block は密な床・壁・草に向いています。
- **Block Entity と Chunk Entity**: 同期するドアやスイッチ、自由に動くプール管理のオブジェクト。
- **ランタイム編集**: プレイヤーが Block を配置・移動・削除でき、全員に同期されます。
- **Web ストリーミング**: [StreamData](../streamdata/intro.md) 経由でテクスチャ、ライトマップ、Block の配置を配信します。
- **検証**: PC と Quest の予算チェック。エラーがあるとビルドが停止します。
- **サーバーツール**（Rust ソース）: `openworld-host` はストリームデータを配信し、`openworld-link` はワールドのメッセージをあなたのサーバーへ転送します。

## 必要環境

- **Unity** 2022.3、Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 以降 (`com.vrchat.worlds`) と、付属の UdonSharp
- **StreamData** (`com.logiccuteguy.streamdata`)。VCC/ALCOM では自動でインストールされます
- 任意: ボクセル地形用の **DigHoleIt** 0.7.2

## インストール

### VCC / ALCOM

1. [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合は一覧を更新してください。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **OpenWorld** (`com.logiccuteguy.openworld`) を追加します。StreamData も一緒に追加されます。

### 手動インストール

各リリースから `com.logiccuteguy.openworld-0.0.1.zip` と StreamData の zip をダウンロードし、それぞれ `Packages/<パッケージ名>` に展開します。GitHub が自動生成する **Source code** アーカイブは使わないでください。インストール方法はプロジェクトごとに 1 つだけにしてください。

## ライセンス

MIT。

次へ: [はじめに](./getting-started.md)。
