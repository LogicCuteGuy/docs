---
sidebar_position: 8
---

# 手動パケット通信

> ドキュメントバージョン: **0.3.5**

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

標準 `[UdonSynced]` field を使う third-party behaviour は既定で fail-closed です。既存 hierarchy との互換性が必要な場合は zone の **Allow Native Sync Passthrough**（`allowNativeSyncPassthrough`）を有効にできます。LCG packet、ownership、変換された `VRC_ObjectSync` は zone で制限されますが、標準 synced field は VRChat 本来の動作を保ち、zone 内だけでなく instance 全体へ送信されます。Build 時にこの範囲の違いを警告します。

Synced field を持たない Continuous Udon behaviour は自動的に許可されます。Udon Graph behaviour、passthrough を有効にしていない標準 synced field、親子で重なる zone、同じ hierarchy の PlayerObject template は引き続き fail-closed です。別 hierarchy の zone 同士は重なっても構いません。

更新後は全 UdonSharp program を再コンパイルし、ワールドを再ビルドしてください。
