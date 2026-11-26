---
sidebar_position: 3
---

# ストリームデータの公開

**Tools > StreamData > Publish** を開いてホストを選びます。1 つの GitHub Pages リポジトリか 1 台のサーバーに、ワールドごとのフォルダーですべて置けます。**Base Url** はサイトのルート、ワールドフォルダー、`/` の順です。

## Publish ウィンドウ

| 設定 | 既定値 | 意味 |
|---|---|---|
| **Repo** | | Pages リポジトリの `owner/name`。無料の GitHub Pages には public が必要です。 |
| **Branch** | `main` | GitHub Pages が配信するブランチ |
| **Custom Domain** | 空 | Pages に独自ドメインがある場合に使います |
| **Host Url** | | `openworld-host` のアドレス |
| **Deploy Token** | | ホストのトークン。この PC にのみ保存されます。 |
| **World Folder** | シーン名（空白は `-`） | このシーンのホスト上のフォルダー |
| **Export Before Build** | オン | VRChat のビルド前に毎回エクスポート |
| **Publish On Build** | オン | VRChat のビルド前に毎回公開 |
| **Play Mode Uses Export~** | オン | Play モードはテストサーバー経由でローカルファイルを読みます |

設定は `ProjectSettings/StreamDataPublish.json` に保存されるので、チームで共有できます。デプロイトークンはこのファイルに含まれません。

**Export** はシーン内のすべての StreamData に Base Url を設定してエクスポートし、**シーンを保存します**。**Publish Now** は最後のエクスポートをアップロードします。ワールドにベイクされた URL が公開設定と違う場合は、先にエクスポートするよう求められます。

## GitHub Pages

GitHub Pages（`*.github.io`）は VRChat の信頼済み URL なので、既定の設定のプレイヤーでも使えます。

1. `git` と GitHub CLI をインストールし、`gh auth login` で一度サインインします。**Check gh Login** で状態を確認できます。
2. **Repo** を入力するか **Select** を使います。**Create Repo** は新しい **public** リポジトリを作ります。
3. **Enable Pages** を押します。
4. **World Folder** を設定します。
5. **Publish Now** を押します。Pages の反映には 1 分ほどかかる場合があります。

| リポジトリ名 | サイトのルート |
|---|---|
| `owner/owner.github.io` | `https://owner.github.io/` |
| `owner/name` | `https://owner.github.io/name/` |

:::note
**Custom Domain** は VRChat の信頼済み URL ではありません。対象は `*.github.io` だけです。
:::

StreamData はリポジトリの専用クローンを `Library/StreamDataPublish/` に持ちます。公開のたびにエクスポートをワールドフォルダーへコピーし、`files.txt` と `.nojekyll` を追加してコミット・プッシュします。変更がなければ最新である旨を表示します。各ファイルは GitHub の 100 MB 制限未満である必要があります。

## ビルド時の自動公開

:::warning 公開は誰でも閲覧でき、既定で自動です
public な Pages リポジトリのファイルは誰でも閲覧できます。ホストを設定すると、Build & Test を含むすべての VRChat ワールドのビルドで、アクティブなシーンをエクスポートして公開します。どちらかが失敗するとビルドは停止します。手動で公開するには **Export Before Build** と **Publish On Build** をオフにします。
:::

## 自分のサーバー

[`openworld-host`](../openworld/server-tools.md) は小さな Rust サーバーで、ソースは OpenWorld パッケージに含まれます。**Host Url** と **Deploy Token** を入力します。公開するとエクスポートをパッケージ化してサーバーに送ります。

独自ドメインには、プレイヤー側で **Allow Untrusted URLs** が必要です。既定設定のプレイヤーも使えるようにするには、**Base Url** を GitHub Pages、**Backup Base Url** を自分のサーバーにします。VRChat はリダイレクトを追わないので、URL はファイルを直接指す必要があります。

## その他の静的ホスト

StreamData の Inspector の **Package for Host** は、`<scene>_StreamData/Package~/` に zip を書き出します。**中身**を Base Url にアップロードしてください。プレイヤーが zip をダウンロードすることはありません。

| 追加ファイル | 役割 |
|---|---|
| `files.txt` | 各ファイルの名前、サイズ、MD5 |
| `.nojekyll` | GitHub Pages にファイルをそのまま配信させます |
| `_headers` | Cloudflare Pages と Netlify にマニフェストをキャッシュさせません |

Base Url が空か localhost の場合、未エクスポートの場合、最後のエクスポート後に Base Url を変えた場合は、パッケージ化できません。

## 公開済みワールドの更新

ファイル名は内容から決まるため、変更したテクスチャは新しいファイルになり、アップロード済みワールドが読むファイルは上書きされません。公開で古いファイルは削除されません。URL はワールドにベイクされるので、テクスチャを追加・変更したら、エクスポートと公開を行い、**ワールドも再アップロード**してください。
