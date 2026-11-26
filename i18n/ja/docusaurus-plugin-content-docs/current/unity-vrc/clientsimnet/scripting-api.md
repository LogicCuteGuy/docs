---
sidebar_position: 3
---

# スクリプトと unity-mcp

テストスクリプトや unity-mcp の `execute_code` などから、Play モードでシミュレーターをコードで操作できます。

## `NetSimApi`

プレイヤーは表示名で指定します。オブジェクトは名前、名前の接頭辞、階層パスで指定します。`"Name@Player"` はそのプレイヤーが所有するコピーを選びます。使い方が誤っている場合は、原因を示す例外をスローします。

```csharp
using ClientSimNet;
using UnityEngine;

if (!NetSimApi.IsReady) return "not ready";
NetSimApi.Preset("Perfect");                  // Perfect | LAN | Normal | Bad
NetSimApi.AddPlayer("Bob");

NetSimApi.Interact("Counter");                // you click it
NetSimApi.TakeOwnership("Bob", "Counter");    // may be denied by OnOwnershipRequest
NetSimApi.Flush();                            // let ownership settle
NetSimApi.SendState("Bob", "Counter", "{\"_count\":5}"); // keys are field names
NetSimApi.SendEvent("Bob", "Events", "All", "Ping", "[1,\"hi\"]");
NetSimApi.InteractAs("Bob", "Counter");       // Bob clicks; results arrive with latency
NetSimApi.Grab("Bob", "Pickup"); NetSimApi.Drop("Bob");
NetSimApi.View("Bob");                        // Game view shows Bob's world

NetSimApi.Flush();                            // deliver everything in flight now
return NetSimApi.ReportJson();
```

ローカルプレイヤーの名前は、レポートの `players` 一覧で確認します。

### メソッド

| 分類 | メソッド |
|---|---|
| 状態 | `IsReady`、`InFlight`、`Flush()` |
| プレイヤー | `AddPlayer(name)`（同じ名前があればそのプレイヤーを返します）、`Puppet(name)`、`Leave(name)`、`Rejoin(name)`、`MasterLeaves()` |
| 視点と移動 | `View(name, thirdPerson)`、`GoTo(name, position)`、`SetMode(name, mode)`（`Idle`、`FollowYou`、`Wander`、`GoTo`） |
| リモートプレイヤーの操作 | `TakeOwnership(player, obj)`、`Grab(player, obj)`、`Drop(player)`、`Use(player)`、`Jump(player)`、`InteractAs(player, obj)` |
| 通信 | `SendState(player, obj, json)`（bool を返します）、`SendEvent(player, obj, target, eventName, argsJson)` |
| 自分の操作 | `Interact(obj)` |
| ネットワーク | `Preset(name)`、`SetNetwork(latencyMs, jitterMs, lossPercent)` |
| 検索 | `Find(spec)`、`Udon(obj)` |
| レポート | `GetReport(logEntries)`、`ReportJson(logEntries, pretty)`、`WriteReport(path, logEntries)`、`SaveStats(path)`、`StatsSummary()` |

`MasterLeaves()` はマスターがリモートの場合に使います。Play の前に ClientSim の **Local Player Is Master** のチェックを外してください。

`WriteReport` の既定の出力先は `Library/ClientSimNet/report.json` です。

### ネットワークプリセット

| プリセット | 遅延 | ジッター | ロス |
|---|---|---|---|
| Perfect | 0 ms | 0 ms | 0% |
| LAN | 10 ms | 3 ms | 0% |
| Normal | 100 ms | 30 ms | 0.5% |
| Bad | 300 ms | 120 ms | 5% |

`Flush()` は遅延を無視するため、確認は毎回同じ結果になります。送信間隔、競合、補間などの実際のタイミングを確認する場合は、プリセットを保ったまま数フレーム待ってください。

## レポートの項目

| 項目 | 意味 |
|---|---|
| `ready`、`hooksInstalled` | シミュレーターが動作中です。false の場合、他の値には意味がありません。 |
| `pov` | 表示中の視点 |
| `latencyMs`、`jitterMs`、`lossPercent`、`inFlight`、`outBytesPerSec`、`bandwidthLimit` | ネットワークの状態。`inFlight > 0` の間は結果が確定していません。 |
| `warnings`、`errors` | シミュレーターのログ内の件数。**エラーはすべて、不具合か到達した制限です。** |
| `players[]` | `id`、`name`、`isLocal`、`isMaster`、`mode`、`holding`、`position` |
| `objects[]` | アクティブな同期 Behaviour: `path`、`behaviour`、`sync`、`owner`、`local`、`remote`、`inSync`、`bytes`、`limit`、`sentPerSec`、`lastSentAgo`、`lastReceivedAgo`（-1 = 一度もなし） |
| `log[]` | 最近の行。`player`、`kind`（`out`、`in`、`lost`、`udon`、`sim`）、本文 |

一般的な確認では、`Flush()` を呼んでレポートを読み、`errors == 0`、操作したすべてのオブジェクトが `inSync`、`owner` が想定どおり、ログに想定したイベントがあることを確かめます。

## unity-mcp ツール

`com.coplaydev.unity-mcp` がインストールされていると、パッケージはツール `clientsim_net` を登録します。`report=false` を指定しない限りレポートの JSON を返します。エラー時は理由と一緒に `success=false` を返します。`status` 以外のアクションは Play モードが必要です。

```text
clientsim_net action=preset name=Perfect
clientsim_net action=add_player player=Bob
clientsim_net action=take_ownership player=Bob obj=Counter
clientsim_net action=send_state player=Bob obj=Counter json={"_count":5} flush=true
```

**アクション:** `status`、`report`、`write_report`、`add_player`、`leave`、`rejoin`、`master_leaves`、`take_ownership`、`send_state`、`send_event`、`grab`、`drop`、`use`、`jump`、`interact`、`goto`、`mode`、`preset`、`network`、`flush`、`view`、`debugger`、`save_stats`。

AI エージェント向けに、パッケージには `AGENTS.md` と `Tools~/claude-skill/clientsim-net` の Claude スキルが含まれます。

## Python スクリプト

`Tools~/mcp/` には、標準ライブラリだけで動く Python スクリプトがあります。`127.0.0.1:6400` の unity-mcp ブリッジに接続し（ポートは `UNITY_MCP_PORT` で変更します）、サンプル `NetSimTest.unity` 向けの用意されたシナリオを含みます。フォルダー内の README を参照してください。

## 統計の保存

`SaveStats(path)` はデバッガーのタイムラインを `Library/ClientSimNet/netstats-<time>.json` に書き出します。ファイルは大きくなることがあり、3 人で 30 秒の場合は約 400 KB です。合計値が必要な場合は、`StatsSummary()` か `save_stats` アクションが返す要約を使ってください。
