---
sidebar_position: 1
---

# LCG Network System

> ドキュメントバージョン: **0.1.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGNetwork/releases/tag/0.1.0)

**LCG Network System**（`com.logiccuteguy.lcgnetwork`）は、VRChat ワールドにゾーン単位のイベント駆動ネットワークを追加します。ネットワークオブジェクトを `LCGNetworkZone` の下に置くと、その同期変数とネットワークイベントはゾーン内のプレイヤーにだけ届きます。

Udon のネットワークコードは通常どおりに書きます。ビルド時と Play モードに入るときに、パッケージがコンパイル済みの Udon プログラムを書き換え、`RequestSerialization`、`SendCustomNetworkEvent`、`NetworkCalling.CallingPlayer` が LCG を経由するようにします。コンパイル済みプログラムに対して処理するため、**UdonSharp、Udon Graph、Udon Assembly** は同じように動作し、専用のコンパイラーは不要です。

## 機能

- **ゾーン**: トリガーの範囲で、パケット、所有権、オブジェクト同期を中のプレイヤーに限定します。
- **通常のコード**: 既存の `[UdonSynced]` + `RequestSerialization` と `SendCustomNetworkEvent` のコードは自動で経路が切り替わります。どのゾーンにも入らないオブジェクトは、インスタンス全体をゾーンとして扱います。
- **すべての書き方**: VRChat SDK の UdonSharp、Udon Graph、Udon Assembly と、SDK の UdonSharp を拡張する [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro)。
- **UdonSharp の追加機能**: 権限（`Any`、`ObjectOwner`、`Master`）を指定できる `[LCGPacket]` のフィールドとメソッド、受信コールバック、1 人に送る `LCGRuntime.SendToPlayer`。
- **ゾーン内のオブジェクト同期**: ゾーン内では `LCGManualObjectSync` が `VRC Object Sync` を置き換え、所有権ガードが外部からの要求を拒否します。
- **途中参加と再入場**: 参加またはゾーンに入ったプレイヤーに、所有者がスナップショットを送ります。
- **非破壊**: 生成されるコンポーネントと書き換えたプログラムは、ビルドか Play モードのコピーにだけ存在します。シーンとプログラムアセットは変更しません。

## 要件

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.8.1 以降（`com.vrchat.worlds`）

## ライセンス

MIT。

## インストール

### VCC / ALCOM

1. VCC/ALCOM に [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合はリストを更新します。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **LCG Network System**（`com.logiccuteguy.lcgnetwork`）を探して **0.1.0** を追加します。

### Unity Package Manager / 手動

**Window > Package Manager > + > Add package from git URL** に次を入力します。

```text
https://github.com/LogicCuteGuy/LCGNetwork.git#0.1.0
```

**インストール方法はプロジェクトごとに 1 つ**にしてください。GitHub が自動生成する **Source code (zip)** は使わないでください。LCGUdonSharp 0.5.0 以降はネットワーク機能を含まないため、併用できます。

## クイックスタート

1. **Is Trigger** を有効にした **Collider** を持つ GameObject を作成し、**LCGNetworkZone** コンポーネントを追加します。
2. ネットワークオブジェクトをその下に移動します。
3. Play モードに入るか、ビルドします。

```csharp
using UdonSharp;
using VRC.SDKBase;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class ZoneCounter : UdonSharpBehaviour
{
    [UdonSynced] private int count;

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        count++;
        RequestSerialization();      // sent only to players in this zone
    }

    public override void OnDeserialization() { /* update visuals */ }
}
```

Udon Graph や Udon Assembly で同じ内容を書いても、同じように動作します。

次: [LCG Network の使い方](./usage.md)。

## 現在の状態

これはプレビュー版です。[ClientSim Net](../clientsimnet/intro.md) と 2 人のシミュレートプレイヤーを使った Play モードで確認していますが、**実際の複数クライアントの VRChat ビルドではまだ確認していません**。ワールドを公開する前に、2 つのクライアントで **Build & Test** を実行してください。通信プロトコルはバージョン間で変わる可能性があります。
