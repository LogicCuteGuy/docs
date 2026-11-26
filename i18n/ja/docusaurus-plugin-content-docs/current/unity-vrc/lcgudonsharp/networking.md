---
sidebar_position: 8
---

# ネットワーク

> ドキュメントバージョン: **0.5.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 にはネットワークのコードがありません。`[LCGPacket]`、`LCGNetworkZone`、`SendLCGNetworkEvent`、`ForceSendPacket`、`LCGNetwork.RequestObjectSync` はコンパイラーに含まれなくなりました。状態の同期やイベントには、VRChat 標準の `[UdonSynced]` 変数と `[NetworkCallable]` メソッドを使ってください。このコンパイラーで利用できます。

パケット通信は別パッケージの [LCG Network System](../lcgnetwork/intro)（プレビュー版）に移りました。SDK の UdonSharp、Udon Graph、Udon Assembly、LCGUdonSharp で動作します。
