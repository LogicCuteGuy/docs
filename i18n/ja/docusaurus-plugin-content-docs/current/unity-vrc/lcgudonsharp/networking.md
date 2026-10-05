---
sidebar_position: 8
---

# 手動パケット通信

> ドキュメントバージョン: **0.3.9**

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

### Snapshot と ownership recovery

- Zone entry と `OnPlayerRestored` は scene field/object の現在 snapshot を要求します。最大 5 回の追加 retry を bounded backoff で行い、退出時に停止し、関連する restore event 後に再開します。
- Player が disconnect した際、VRChat が outside player へ割り当てた ownership を有限 recovery window 内の callback で修復します。有効な member ownership は保持し、空 zone は member が入るまで VRChat fallback owner を維持します。
- 退出 player は player ID より identity を先に照合し、無効または再利用 ID の衝突で別 member を削除しません。

### Object motion transport

Object motion は gameplay RPC FIFO と別の latest-state queue を使用します。同じ object/recipient の未送信 sample は新しい値に置き換えますが、teleport と再入場の discontinuity は保持します。Recipient ごとに最大 900 byte を batch 化し、scene 全体で最大 40 event/秒、約 6 KB/秒を割り当てます。Network が clogged、または SDK outgoing queue が 8 event を超えると backoff します。

この budget は LCG motion 専用で、他の gameplay packet や native Udon traffic の上限ではありません。Recipient が増えると 1 人あたりの sample rate は低下します。Remote object は bounded velocity prediction で補間し、remote rigidbody は local ownership を得るまで kinematic のままです。

`LCGRuntime.PendingMotionCount`、`MotionBatchesSent`、`LastMotionBatchBytes` は local transport diagnostics です。Delivery ACK や throughput 保証ではありません。混雑 world の FPS/latency は複数 VRChat client で検証してください。

標準 `[UdonSynced]` field を使う third-party behaviour は既定で fail-closed です。既存 hierarchy との互換性が必要な場合は zone の **Allow Native Sync Passthrough**（`allowNativeSyncPassthrough`）を有効にできます。LCG packet、ownership、変換された `VRC_ObjectSync` は zone で制限されますが、標準 synced field は VRChat 本来の動作を保ち、zone 内だけでなく instance 全体へ送信されます。Build 時にこの範囲の違いを警告します。

Synced field を持たない Continuous Udon behaviour は自動的に許可されます。Udon Graph behaviour、passthrough を有効にしていない標準 synced field、親子で重なる zone、同じ hierarchy の PlayerObject template は引き続き fail-closed です。別 hierarchy の zone 同士は重なっても構いません。

更新後は全 UdonSharp program を再コンパイルし、ワールドを再ビルドしてください。0.3.6 より古い build は motion batch envelope を decode できません。
