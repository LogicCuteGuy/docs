---
sidebar_position: 4
---

# UdonSharp の追加機能とランタイム ABI

通常の Udon ネットワークは、このページの機能がなくても経由されます。追加機能を使うと細かく制御できます。VRChat SDK の UdonSharp と、それを拡張する [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro) で使えます。

## 例

```csharp
using UdonSharp;
using UnityEngine;
using VRC.SDK3.UdonNetworkCalling;
using VRC.SDKBase;
using VRC.Udon;

[UdonBehaviourSyncMode(BehaviourSyncMode.NoVariableSync)]
public class Lamp : UdonSharpBehaviour
{
    public LCGRuntime lcg;                                    // filled at build; leave empty
    [HideInInspector] public VRCPlayerApi __lcgPacketSender;  // sender while a handler runs

    [LCGPacket(Authority = LCGPacketAuthority.ObjectOwner, Callback = nameof(OnLightChanged))]
    private bool lightOn;

    private void Toggle()
    {
        lightOn = !lightOn;
        RequestSerialization();      // sends every [LCGPacket] field of this behaviour
    }

    public void OnLightChanged() { /* runs on receivers */ }

    [LCGPacket(Authority = LCGPacketAuthority.Any), NetworkCallable]
    public void ReceivePing(string message) { }

    public void PingOwner()
    {
        VRCPlayerApi owner = Networking.GetOwner(gameObject);
        lcg.SendToPlayer((UdonBehaviour)(Component)this, owner, nameof(ReceivePing), new object[] { "hi" });
    }
}
```

## `[LCGPacket]`

フィールドかメソッドに付けます。

| 設定 | 意味 |
|---|---|
| `Authority` | 送信できる人: ゾーンの全メンバー `Any`（既定）、`ObjectOwner` のみ、インスタンスの `Master` のみ |
| `Callback` | フィールドのみ。受信側で実行するメソッドです。 |

- 引数を持つメソッドには、引数情報を提供する `[NetworkCallable]` が必要です。`VRCPlayerApi` を受け取るコールバックにも必要です。
- 非対応のフィールド型や引数型、引数情報の欠落は**ビルドエラー**になります。
- `__lcgPacketSender` は任意です。ハンドラーで送信者を読む場合に宣言します。`NetworkCalling.CallingPlayer` も使えます。

## 1 人への送信

`SendToPlayer(behaviour, player, eventName, args)` の引数は**最大 8 個**です。イベントは、引数の数が一致する登録済みのネットワークイベントである必要があります。そうでない場合は警告がログに出ます。

## Settings Inspector

**Add Component > LCG Network > LCG Network Settings** は、オブジェクトのゾーン、**Synced via LCG** の変数、**Network events** を表示します。**Refresh** で更新します。オブジェクトを対象外にするには **Use Native Networking** にチェックを入れます。このコンポーネントはビルドから削除されます。

認識できないプログラムがあると、ビルドで `Left '<name>' on native networking` という警告が出ます。

## ランタイム ABI（明示的な送信）

自動の経路で扱えない送信には、どの書き方からもランタイムを直接呼び出せます。

:::note
この ABI は実験的で、変更される可能性があります。
:::

ビルドは受信側の次の変数を設定します。

| 変数 | 型 |
|---|---|
| `__lcgRuntime` | UdonBehaviour |
| `__lcgReceiverId` | int |
| `__lcgZoneId` | int |
| `__lcgPacketSender` | VRCPlayerApi |

送信するには、まず `__lcgRuntime` の `__lcgSenderReceiver`、`__lcgSenderReceiverId`、`__lcgSenderZoneId`、`__lcgSenderAddress` を設定します。次に、以下のどちらかを送ります。

| 送るもの | 設定する値 | その後に送るイベント |
|---|---|---|
| フィールド | `__lcgSenderType`、`__lcgSenderValue` | `__lcgSendField` |
| メソッド | `__lcgSenderArgCount`、`__lcgSenderArgTypeN`、`__lcgSenderArgN`、`__lcgSenderTargetMode`（`NetworkEventTarget`、または -1 と `__lcgSenderPlayer`） | `__lcgSendMethod` |

## Udon Graph と Udon Assembly

通常のネットワークノードや命令を使います。変数を同期するには、同期モードを **Manual** にします。**LCG Network Examples** サンプルには、完全なアセンブリプログラム `UdonAssembly/LCGAsmLamp.uasm` と、UdonSharp 版の `LCGStockLamp.cs` があります。

## フレームの制限

| 制限 | 値 |
|---|---|
| フレームデータのサイズ | 12 KB |
| 送信待ちパケット | フィールド 128 件、メソッド 128 件 |
| 1 フレームの送信数 | 16 件 |
| メールボックスの配信 | 通常の `[NetworkCallable]` イベントと同じく、プレイヤーごとに毎秒 100 イベント |

同じフレーム内の同じ変数への変更はまとめます。
