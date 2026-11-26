---
sidebar_position: 4
---

# ZoneArea のスクリプト

**Scripting Ref** がオン（既定）の場合、ベイク時に `_ZoneColliders` へ UdonSharp の `ZoneArea` が追加されます。このオブジェクトを自分のスクリプトのフィールドにドラッグします。

## プレイヤーが中にいるか調べる

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using UnityEngine;

public class ZoneSign : UdonSharpBehaviour
{
    public ZoneArea area;
    public GameObject sign;

    private void Start() { _Check(); }

    public void _Check()
    {
        sign.SetActive(area.IsLocalPlayerInside());
        SendCustomEventDelayedSeconds(nameof(_Check), 0.2f);
    }
}
```

`Contains` はすべての点を走査します。多くの用途では毎秒数回の確認で十分です。

## メソッド

| メソッド | 動作 |
|---|---|
| `Contains(Vector3)` | ワールド座標が Zone 内かどうか。Barrier では常に false。 |
| `IsPlayerInside(VRCPlayerApi)` | プレイヤーの位置で同じ判定。無効なプレイヤーは false。 |
| `IsLocalPlayerInside()` | 自分自身で同じ判定。 |
| `SetCollidersEnabled(bool)`, `EnableColliders()`, `DisableColliders()` | すべてのコライダーを切り替えます。 |
| `SetGroundEnabled(bool)`, `EnableGround()`, `DisableGround()`, `IsGroundEnabled()` | 床のみ。 |
| `SetCeilingEnabled(bool)`, `EnableCeiling()`, `DisableCeiling()`, `IsCeilingEnabled()` | 天井のみ。 |
| `SetVisualEnabled(bool)`, `ShowVisual()`, `HideVisual()` | 表示用メッシュの表示・非表示。Render Material がない場合は何もしません。 |

引数のないメソッドは `SendCustomEvent` で呼べるので、UI ボタンから使えます。

## フィールド

ベイクが値を設定します。次のベイクで上書きされるので、読み取り専用として扱ってください。

| フィールド | 意味 |
|---|---|
| `isZone` | Zone は true、Barrier は false |
| `points` | この Transform のローカル座標の点 |
| `closed` | 形状が閉じているか |
| `height`, `bottomOffset` | 押し出しの値 |
| `colliders` | ベイクされた全コライダー |
| `groundColliders`, `ceilingColliders` | 床と天井のコライダー |
| `visual` | メッシュレンダラー、または null |

## 同期するゲート

`ZoneArea` の呼び出しはローカルのみで、同期変数もありません。全員のゲートを開くには、自分のスクリプトで状態を同期します。

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using VRC.SDKBase;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Gate : UdonSharpBehaviour
{
    public ZoneArea barrier;
    [UdonSynced] private bool open;

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        open = !open;
        RequestSerialization();
        Apply();
    }

    public override void OnDeserialization() { Apply(); }

    private void Apply()
    {
        barrier.SetCollidersEnabled(!open);
        barrier.SetVisualEnabled(!open);
    }
}
```

## 起伏のある地面の高さ

`Contains` は形状全体で 1 つの高さ範囲を使います（最も低い点 − **Bottom Offset** から、最も高い点 + **Height** まで）。コライダーは各点の高さに沿うため、急な地面ではコライダーの上下でも true になることがあります。その場合は複数の Zone に分割してください。
