---
sidebar_position: 4
---

# Scripting with ZoneArea

With **Scripting Ref** on (the default), the bake adds a `ZoneArea` UdonSharp behaviour to the `_ZoneColliders` object. Drag that object into a field on your script.

## Check whether a player is inside

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

`Contains` loops over every point, so a few checks per second are enough for most uses.

## Methods

| Method | Does |
|---|---|
| `Contains(Vector3)` | Whether a world position is inside a zone. Always false for barriers. |
| `IsPlayerInside(VRCPlayerApi)` | The same test for a player's position. False for an invalid player. |
| `IsLocalPlayerInside()` | The same test for you. |
| `SetCollidersEnabled(bool)`, `EnableColliders()`, `DisableColliders()` | Turn every collider on or off. |
| `SetGroundEnabled(bool)`, `EnableGround()`, `DisableGround()`, `IsGroundEnabled()` | The floor only. |
| `SetCeilingEnabled(bool)`, `EnableCeiling()`, `DisableCeiling()`, `IsCeilingEnabled()` | The ceiling only. |
| `SetVisualEnabled(bool)`, `ShowVisual()`, `HideVisual()` | Show or hide the render mesh. Does nothing without a Render Material. |

The methods without parameters work with `SendCustomEvent`, so a UI button can call them.

## Fields

The bake fills these. Treat them as read-only, because the next bake overwrites them.

| Field | Meaning |
|---|---|
| `isZone` | True for a zone, false for a barrier |
| `points` | Points in the local space of this transform |
| `closed` | Whether the shape is a loop |
| `height`, `bottomOffset` | The extrusion values |
| `colliders` | Every baked collider |
| `groundColliders`, `ceilingColliders` | The floor and ceiling subsets |
| `visual` | The mesh renderer, or null |

## A synced gate

`ZoneArea` calls are local and it has no synced variables. To open a gate for everyone, sync the state in your own script:

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

## Height on uneven ground

`Contains` uses one height range for the whole shape: from the lowest point minus **Bottom Offset** to the highest point plus **Height**. The colliders follow each point's own height, so on steep ground `Contains` can be true above or below the colliders. Split such an area into several zones.
