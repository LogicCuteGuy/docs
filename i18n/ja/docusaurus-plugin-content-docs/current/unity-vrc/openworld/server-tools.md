---
sidebar_position: 5
---

# サーバーツール

パッケージには任意の 2 つのプログラムの Rust ソースが含まれます。OpenWorld の利用にはどちらも不要です。

| プログラム | フォルダー | 実行場所 | 役割 |
|---|---|---|---|
| `openworld-host` | `Server~` | 自分のサーバー | ストリームデータの配信、デプロイの受け付け、ワールドからのメッセージ受信 |
| `openworld-link` | `Link~` | プレイヤーの Windows PC | VRChat のログのメッセージをサーバーへ転送 |

それぞれのフォルダーで `cargo build --release` を実行してビルドします。

## openworld-host

```bash
openworld-host --dir site --port 8080 --token-file token.txt
```

| 引数 | 既定値 | 意味 |
|---|---|---|
| `--dir` | `site` | 配信するフォルダー |
| `--bind` | `0.0.0.0` | 待ち受けアドレス |
| `--port` | `8080` | ポート |
| `--token-file` | なし | デプロイ用トークン。環境変数 `OPENWORLD_TOKEN` も使えます。 |
| `--keys` | `keys` | ワールドごとのメッセージ用キーのフォルダー |
| `--data` | `data` | メッセージの保存先 |

| ルート | 動作 |
|---|---|
| `GET /<world>/<file>` | `site/<world>/<file>` を返します。ワールドが 1 つなら `GET /<file>` も使えます。 |
| `PUT /_deploy/<world>` | **Package for Host** の zip を展開します |
| `POST /ipc` | `openworld-link` からのメッセージを受け取ります |

トークンがないとデプロイは無効で、トークンは 16 文字以上が必要です。データファイルを先に、マニフェストを最後に書き込むので、ファイルがそろっていないマニフェストが配信されることはありません。古いアップロード済みワールドがまだ要求する可能性があるため、ファイルは削除しません。zip の上限は 512 MB、展開後は 2 GB です。

```bash
curl -X PUT -H "Authorization: Bearer $(cat token.txt)" \
  --data-binary @Stream_xxx.zip https://cdn.example.com/_deploy/myworld
```

:::warning HTTPS と信頼済み URL
サーバーには TLS がありません。Caddy、nginx、Cloudflare Tunnel などの後ろに置いてください。独自ドメインは VRChat の信頼済み URL ではないため、プレイヤーは **Allow Untrusted URLs** を有効にする必要があります。VRChat はリダイレクトを追いません。
:::

## VRChat の外へメッセージを送る

:::note
まず VRChat Persistence を検討してください。プレイヤーごとのセーブには追加アプリが不要です。インスタンスをまたぐランキングや Web マップのように、データを VRChat の**外に出す**必要がある場合だけ使ってください。
:::

ワールドが VRChat のログに 1 行を書き、プレイヤーの PC の `openworld-link` がそれを読んでサーバーに送信します。

1. **サーバー:** 長いランダムな秘密の文字列を `keys/<world>.txt` に置き、HTTPS の後ろで `openworld-host --keys keys --data data` を実行します。
2. **ワールド:** GameObject に **OpenWorldLink** を追加し、**Server Url**（末尾は `/`）、**World Name**（キーファイル名、ドット不可）、**Key**（同じ秘密の文字列）を設定します。
3. **プレイヤー:** プレイ中に `openworld-link` を起動し、サーバーについて確認されたら `y` と答えます。

```csharp
public OpenWorldLink link;

public void _SubmitScore(int score)
{
    link._Send("score", "{\"score\":" + score + "}");
}
```

1 件は約 1 KB 未満にしてください。`type` は空白を含まない短い単語です。

### セキュリティ

キーはワールドに含まれ、ワールドは逆コンパイルできます。メッセージの署名は単純なログ改変やコピーを防ぐだけで、本気の不正は**防げません**。すべての値をサーバー側で検証してください。

### クライアントが送る内容

OpenWorld のメッセージ行と、プレイヤーの `usr_` ID を得るための VRChat のサインイン行だけを読み、ログのほかの内容は送りません。新しいサーバーごとに一度だけ同意を求め、localhost でのテスト以外は HTTPS が必須です。サーバーがオフラインの間は最大 1 MB をキューに保持して再試行します。

**Windows のみ**で動作します。Quest などのモバイルのプレイヤーは送信できません。

### サーバーが保存する内容

各行の署名と連番を確認し、`data/<world>/<日付>.jsonl`（UTC）に追記します。ファイルは自分のコードで読み取ります。

| 制限 | 値 |
|---|---|
| 1 行のサイズ | 2 KB |
| 1 リクエストの行数 | 500 |
| リクエスト本文 | 256 KB |
| IP ごとのリクエスト | 毎秒 10 件 |

再送防止の情報はメモリ上にあるため、再起動後は古い行を一度だけ受け付けます。特定のプレイヤーへデータを**返す**機能はまだありません。
