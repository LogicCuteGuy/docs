---
sidebar_position: 2
---

# LCG Network の使い方

## 経路の仕組み

シーンのビルド時や Play モード用の読み込み時に、すべての `UdonBehaviour` を確認します。プログラムがネットワークを使う場合は、そのビルド用に書き換えたコピーを割り当てます。

| 書くコード | LCG の動作 |
|---|---|
| `[UdonSynced]` + `RequestSerialization()`（Manual 同期） | 所有者が各同期変数を LCG パケットで送ります。受信側には `OnDeserialization` が 1 回届きます。`OnPreSerialization` と `OnPostSerialization` も実行されます。`byteCount` は常に 0 です。 |
| `SendCustomNetworkEvent(target, "Event", args...)` | LCG パケットとしてゾーンのメンバーに送ります。`All`、`Others`、`Owner`、`Self` の意味は変わりません。 |
| `NetworkCalling.CallingPlayer` | 処理中のパケットの、検証済みの送信者です。 |

Behaviour のゾーンは、最も近い親の `LCGNetworkZone` です。どのゾーンにも入らない Behaviour は、インスタンス全体であるゾーン 0 を使います。

標準のネットワークと同じルールが適用されます。

- 同期変数は、オブジェクトの所有者からの値だけを受け付けます。
- イベントには、同期モードが `None` ではない Behaviour が必要です。
- 名前が `_` で始まるイベントは、メソッドが `[NetworkCallable]` でない限りローカルのままです。

## 標準のまま残るもの

- **Continuous 同期**: ゾーン内では、ゾーンの **Allow Native Sync Passthrough** にチェックがないとビルドが失敗します。有効にすると、その変数はゾーンではなくインスタンス全体に届きます。
- **LCG が送れない型**（`VRCUrl` など）: その Behaviour は標準の同期を使い、コンソールに変数名を示す警告が出ます。LCG が送れる型は `bool`、`sbyte`、`byte`、`short`、`ushort`、`int`、`uint`、`long`、`ulong`、`float`、`double`、`char`、`string`、`Vector2`、`Vector3`、`Vector4`、`Quaternion`、`Color`、`Color32` と、それらの配列です。
- **除外したオブジェクト**: **Add Component > LCG Network > LCG Network Settings** を追加し、**Use Native Networking** にチェックを入れます。このコンポーネントはエディター専用で、ビルドから削除されます。Inspector にはゾーンと、各 UdonBehaviour で LCG が経由させる変数とイベントが表示されます。

## ゾーン

ネットワークオブジェクトを `LCGNetworkZone` の下に置くと、中のプレイヤーに限定できます。終了モード、ビルド時に追加されるもの、オブジェクト同期、ビルドエラーは[ゾーン](./zones.md)を参照してください。

## UdonSharp、Udon Graph、Udon Assembly

通常のネットワークのコード、ノード、命令を使います。変数を同期するには、Behaviour の同期モードを **Manual** にします。`[LCGPacket]`、1 人への送信、明示的な送信は [UdonSharp の追加機能とランタイム ABI](./udonsharp-and-runtime.md) を参照してください。

## 制限

- 1 つのフレームデータは最大 12 KB です。キュー内のパケットは 1 フレームに最大 16 件送り、同じフレーム内の同じ変数への変更はまとめます。
- メールボックスの配信は、通常の `[NetworkCallable]` イベントと同じく、プレイヤーごとに毎秒 100 イベントまでです。

## トラブルシューティング

| 症状 | 原因と対処 |
|---|---|
| ビルドエラー: ゾーン内の Continuous 同期 | Behaviour を Manual 同期にするか、ゾーンの **Allow Native Sync Passthrough** にチェックを入れます。 |
| 警告 "keeps native variable sync" | LCG が送れない型の同期変数があります。その Behaviour は標準のままです。 |
| `[NetworkCallable]` を求めるビルドエラー | SDK の UdonSharp では、引数を持つ `[LCGPacket]` メソッドや受信コールバックに `[NetworkCallable]` が必要です。 |
| ゾーン外のプレイヤーがオブジェクトを取得できない | 仕様です。`LCGZoneOwnershipGuard` はゾーン外からの要求を拒否します。 |
| `OnPostSerialization` が 0 バイトを報告する | 仕様です。フレームは後でまとめるため、その時点ではサイズが分かりません。 |

1 つのエディターで複数プレイヤーをテストするには、[ClientSim Net](../clientsimnet/intro.md) を使います。
