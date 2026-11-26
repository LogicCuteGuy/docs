---
sidebar_position: 3
---

# ゾーン

`LCGNetworkZone` はトリガーの範囲です。下にあるネットワークオブジェクトは、中のプレイヤーとだけパケットをやり取りします。Behaviour は**最も近い親**のゾーンに属します。どのゾーンにも入らない Behaviour は、インスタンス全体であるゾーン 0 を使います。

プレイヤーはトリガーを通じてゾーンに出入りします。インスタンスから退出した場合も、ゾーンから削除されます。

## 設定

| フィールド | 意味 |
|---|---|
| **Exit Mode** | ゾーンを出た後にプレイヤーが見る状態 |
| **Allow Native Sync Passthrough** | ゾーン内の Continuous 同期や非対応の標準同期を、ビルドエラーにせず許可します |

| Exit Mode | 出たプレイヤーの表示 |
|---|---|
| `Freeze` | 最後の状態を保ちます |
| `RestoreDefaults` | 同期変数とオブジェクトの位置を初期化します |
| `DisableChildren` | ゾーンの子を非アクティブにします |

:::warning
passthrough を有効にすると、その標準同期の変数はゾーンではなく**インスタンス全体**に届きます。
:::

## ビルドで追加されるもの

- ネットワークオブジェクトの `LCGZoneOwnershipGuard`。新しい所有者はゾーン内にいる必要があり、要求はメンバーか現在の所有者からでなければなりません。
- `VRC Object Sync` の代わりの `LCGManualObjectSync`。
- `LCGRuntime`（ルーター）と `LCGRuntimePlayer`（各プレイヤーのメールボックスとなる PlayerObject）。自分で追加しないでください。

これらは Play モードかビルドのコピーにだけ存在します。

## オブジェクトの移動

`LCGManualObjectSync` は、要求されたときと、オブジェクトを持っている間に同期します。コードでオブジェクトを動かした場合は、同期を要求します。

```csharp
transform.position = spawn.position;
LCGNetwork.RequestObjectSync(gameObject);
```

このコンポーネントには `RequestObjectSync()`、`TeleportTo(position, rotation)`、`RequestSnapshot()` もあります。

## 所有権と途中入場

- 所有者がゾーンを出ると、そのクライアントがゾーンに最も長くいるプレイヤーに所有権を渡します。同じ場合は、最も小さいプレイヤー ID を選びます。所有権の修復は 0.25 秒間隔で最大 8 回再試行します。
- 参加またはゾーンに入ったプレイヤーは、所有者からスナップショットを受け取ります。入場側のクライアントは最大 5 回再試行します。最初は 0.5 秒後で、待ち時間は 2 倍ずつ最大 4 秒まで延びます。

## ゾーンの状態を読む

| メンバー | 意味 |
|---|---|
| `ZoneId` | ゾーンの ID |
| `Epoch` | ゾーンの現在のエポック番号 |
| `ExitMode` | 選択した終了モード |
| `OccupantCount`、`GetOccupant(i)` | 中にいるプレイヤー |
| `Contains(player)` | プレイヤーが中にいるか |
| `CanTakeOwnership(player)` | そのプレイヤーがオブジェクトを所有することをガードが許可するか |

## ビルドエラー

| 原因 | 対処 |
|---|---|
| ゾーンに**トリガー**のコライダーがない | **Is Trigger** を有効にした Collider を追加します。 |
| ゾーンが PlayerObject を含むか、PlayerObject の中にある | 外に移動します。 |
| 親ゾーンと子ゾーンのコライダー範囲が重なっている | 離してください。 |
| 経由できない同期変数があり、passthrough が無効 | 対応する型で Manual 同期を使うか、passthrough を有効にします。有効にすると警告のみになります。 |

:::note
LCG Network 0.1.0 はプレビュー版です。ゾーンの出入りと所有権の移動は、実際の複数クライアントの VRChat ビルドでは未確認です。公開前に 2 つのクライアントでテストしてください。
:::
