---
sidebar_position: 1
---

# StreamData

> ドキュメントのバージョン: **0.0.1** · [リリース](https://github.com/LogicCuteGuy/StreamData/releases/tag/0.0.1)

**StreamData** (`com.logiccuteguy.streamdata`) は、VRChat ワールドの読み込み後にテクスチャとライトマップを Web からストリーミングします。ワールドには小さな代替テクスチャだけを含めるので、ダウンロードが小さくなり、オフラインでも動作します。

:::info 早期リリース
0.0.1 は最初の公開リリースです。プロジェクトをバックアップし、ご自身のワールドでテストしてください。
:::

## 機能

- 小さなテクスチャは最大 2048² のアトラスページにまとめられ、1 回の画像ダウンロードで複数のテクスチャを取得します。
- VRChat の「5 秒に画像 1 枚」の制限内で、近いものから 1 枚ずつダウンロードします。
- 読み込み距離を設定すると、遠いテクスチャは代替テクスチャに戻り、メモリを解放します。
- ライトマップのストリーミング（任意）。独自シェーダーの変更は不要です。
- 最初のホストが失敗したときに使うバックアップホスト。
- エディターから GitHub Pages や自前のホストへ公開できます（手動、またはビルドのたび）。
- エディターでダウンロードを確認できるローカルテストサーバー。
- 拡張可能: `IStreamExtension` で他のパッケージも独自のデータを配信できます。[OpenWorld](../openworld/intro.md) は Block の配置に使っています。

## 必要環境

- **Unity** 2022.3、Built-in Render Pipeline
- **VRChat Worlds SDK** 3.10.5 以降 (`com.vrchat.worlds`) と、付属の UdonSharp
- GitHub Pages に公開する場合: `git` と、サインイン済みの [GitHub CLI](https://cli.github.com/) (`gh`)

## インストール

### VCC / ALCOM

1. [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合は一覧を更新してください。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **StreamData** (`com.logiccuteguy.streamdata`) を追加します。

### 手動インストール

リリースから `com.logiccuteguy.streamdata-0.0.1.zip` をダウンロードし、`Packages/com.logiccuteguy.streamdata` に展開します。GitHub が自動生成する **Source code** アーカイブは使わないでください。インストール方法はプロジェクトごとに 1 つだけにしてください。

## ライセンス

MIT。

次へ: [はじめに](./getting-started.md)。
