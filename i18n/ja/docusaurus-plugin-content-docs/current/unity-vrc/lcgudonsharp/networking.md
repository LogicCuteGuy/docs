---
sidebar_position: 8
---

# 手動パケット通信

> ドキュメントバージョン: **0.3.4**

:::caution 実験的機能
`[LCGPacket]` / `LCGNetworkZone` の wire protocol は現在 v2 で、将来変更される場合があります。
:::

`[LCGPacket]` は標準 Udon variable sync を使わず、バージョン付き frame、権限確認、リプレイ保護、field 更新の集約、送信者確認済み callback、対象 PlayerObject への配信を提供します。

## Packet field

```csharp
[LCGPacket(
    Authority = LCGPacketAuthority.ObjectOwner,
    Callback = nameof(OnScoreChanged))]
[SerializeField] private int score;

public void OnScoreChanged(VRCPlayerApi sender) { }
```

同一 frame 内の複数代入は最後の値に集約されます。未変更値は送信されず、`ForceSendPacket(nameof(score))` で強制送信できます。書き込み前に object ownership が必要です。

## Packet method と zone

`SendCustomNetworkEvent` は対象 method に `[LCGPacket]` がある場合のみ mailbox 配信へ変換されます。`SendLCGNetworkEvent(player, ...)` で 1 人へ送信でき、直接 method を呼ぶ場合は local のみです。

`LCGNetworkZone` を trigger collider に追加すると、子オブジェクトの受信者と ownership を zone 内プレイヤーに制限できます。zone 内の `VRC_ObjectSync` は manual relay に置換されます。

Continuous sync、Udon Graph behaviour、親子で重なる zone、zone 配下の標準 `[UdonSynced]` は fail-closed で拒否されます。別 hierarchy の zone 同士は重なっても構いません。

更新後は全 UdonSharp program を再コンパイルし、ワールドを再ビルドしてください。
