---
sidebar_position: 3
---

# Runtime とビルド

> ドキュメントバージョン: **0.2.0**

既定では Editor stack を Bake して削除します。0.1.1 は GPU modifier の自動変換と、VRChat/standalone 共通の physics component を追加します。

| Workflow | VRChat Worlds SDK project | SDK なしの standalone |
|---|---|---|
| Static editor stack | Bake mesh、component は削除 | 既定では同じ |
| Runtime GPU modifier | 生成 `BlendUdonDeformStack` | Native component。Keep at Runtime はオフ |
| 全 stack の script 制御 | Udon では非対応 | Keep at Runtime + `RebuildNow()` |
| `Udon/` の physics | UdonSharp callback | MonoBehaviour、`LateUpdate`、`AsyncGPUReadback` |
| Synced Panel / Network Event | VRChat integration | Local のみ。Multiplayer/pickup は導入しない |

Unity 2022.3+ と `com.unity.ugui` **1.0.0** が必要です。GPU 対応機器が必要で、付属 rendering shader は Built-in 向けです。URP/HDRP では Bake modifier/CPU deformation を使用できますが、simulation renderer の互換性は仮定しないでください。

## Runtime GPU modifier

1. **Wave / Simple Deform / Lattice / Hook / Warp** の **Runtime > GPU** を設定します。
2. Live modifier は stack の **一番下** に置きます。Bake modifier の後、live 部分の順序で実行します。
3. Play Mode/build で live operation を含まない base mesh と `BlendUdonDeformStack` に変換します。
4. Wave Time、Simple Deform Origin、Hook Target、Warp From/To、Lattice point を動かします。

Mesh ごとに最大 **8 live operation**、**live Lattice 一つ**、最大 **8 × 8 × 8 point**。Cage の子は正確に U × V × W 個必要です。Wave **Along Normals** と Warp **Preserve Volume** は live 非対応です。

変換前の生成 component は Inspector へ参照設定できません。Start で target GameObject から取得し、`FindOp("Wave")`、`SetFloat(op, "height", value)`、`GetFloat`、`SetBool`、`GetBool` を使います。実際の modifier 名を指定してください。不明な名前/index は何もせず、変更は次 frame に反映します。

GPU 結果を非同期 readback で mesh に戻すため元 material を維持できます。表示は simulation より 1〜2 frame 遅れる場合があります。以前の CPU-only・約 1,000 vertex を目安にした方式とは異なります。

### Wave: Editor 設定から local Play Mode へ

VRChat example の **Runtime Example/Udon Wave/Udon Wave Mesh** を選び、Wave の **Runtime: GPU** を確認します。最初の画像は Height / Speed を含む Editor 設定です。

[![Runtime が GPU の Wave modifier と Height Speed を表示した Editor 設定](/img/blendproperty/setup-wave.png)](/img/blendproperty/setup-wave.png)

[設定の原寸画像を開く](/img/blendproperty/setup-wave.png)

次は元ガイドの ClientSim Play Mode 画像です。生成された **Blend Udon Deform Stack** と変形した plane を確認できます。変換後の component を見分けるための画像で、remote 同期や実機対応の証明ではありません。

[![Local ClientSim Play Mode の Blend Udon Deform Stack と変形した青い plane](/img/blendproperty/runtime-wave.png)](/img/blendproperty/runtime-wave.png)

[Local 結果の原寸画像を開く](/img/blendproperty/runtime-wave.png)

## Standalone の全 stack 制御

一般の C# 変更には **Keep at Runtime** と source mesh の **Read/Write** を有効にします。

```csharp
var stack = GetComponent<BlendProperty.BlendModifierStack>();
stack.GetComponent<BlendProperty.ArrayModifier>().count = level + 2;
stack.RebuildNow();
```

毎回全 stack を再利用 scene-only mesh に評価し、旧結果を使う MeshCollider も更新します。重い stack を Update で呼ばないでください。Keep at Runtime は script が全 stack を制御し、**GPU deformer を同時導入しません**。VRChat は全 stack を必ず削除します。

## Runtime Array example

VRChat scene の Line/Circle Array station は `BlendUdonRuntimeArray` を使います。`count`、`circle`、`spacing`、`radius` を変更して `Generate()` を呼びます。Editor Array stack とは別の小規模 CPU generator です。**Readable な triangle submesh 一つ**、normal/UV0、最大 **32 copy**・**65,535 output vertex**、**生成 collider なし**。Panel は設定を共有し、各 client が mesh を生成します。Add Component menu の項目ではなく example 用です。

## サンプルと確認

- `Example/VRChat/BlendPropertyVRChatExample.unity`: GPU modifier、Array、cloth/soft body、fluid、hair、particle、paint/waves、destruction、ocean、control。
- `Example/Standalone/BlendPropertyStandaloneExample.unity`: 全 stack rebuild。共通 physics は native standalone でも動作しますが、scene は全 VRChat station の複製ではありません。
- [Physics/interaction](./physics.md): Bake、material 制限、input、同期。
- [画像付き runtime guide](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.2.0/Documentation~/IllustratedRuntime.md): 設定、操作、期待する結果。

VRChat build で stack が消える場合は Keep at Runtime ではなく Runtime GPU を使います。GPU 出力がない場合は Bake、Read/Write、機器/pipeline を確認してください。Docs build は Unity や二 client 同期の検証ではありません。

0.2.0 は VRChat panel の互換性を修正します。Control Panel と Cloth Panel は `NoVariableSync` を使用し、`Manual` の Synced Control Panel と同じ GameObject に置けます。Example の Bake 済み GPU deform texture の shader 参照と VRChat scene も更新します。既存の GPU/native physics は引き続き利用できます。

更新時の確認は [panel と example copy](./physics.md)を参照してください。
