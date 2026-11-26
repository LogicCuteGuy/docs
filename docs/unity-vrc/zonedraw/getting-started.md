---
sidebar_position: 2
---

# Getting started with ZoneDraw

## 1. Create a shape

In the Hierarchy, choose **GameObject > LogicCuteGuy > ZoneDraw**:

| Menu item | Result |
|---|---|
| **Barrier Wall** | Solid walls along your points. |
| **Trigger Zone** | A trigger volume over the polygon. |
| **Room (walls + ground + ceiling)** | A closed barrier with floor and ceiling. |

Drawing mode starts right away. Later, use **Draw / Edit Points** in the Inspector.

## 2. Draw

| Action | Control |
|---|---|
| Add a point | Click |
| Move a point | Drag it |
| Change height | Drag the up arrow |
| Insert a point | Click a cyan dot |
| Remove a point | Ctrl+Click, or select it and press Delete |
| Finish | Esc or Enter |

The Inspector also has **Reverse**, **Drop To Ground**, **Flatten**, **Clear**, **Bake Colliders** and **Remove Colliders**. Zones need at least 3 points.

## 3. Settings

| Setting | Meaning |
|---|---|
| **Height** | How far the shape extends above the points. |
| **Bottom Offset** | How far it extends below them, to cover uneven ground. |
| **Thickness** | Thickness of walls, floor and ceiling. |
| **Wall Faces** | Which side of the line the wall thickness is on: Front, Back or both. |
| **Closed** | Barrier only: connect the last point to the first. Floor and ceiling need this. |
| **Ground / Ceiling Collider** | Add floor or ceiling slabs. |
| **Is Trigger**, **Physic Material** | Applied to the baked colliders. |
| **Render Material** | Optional visible mesh. |
| **Scripting Ref** | Add a `ZoneArea` for Udon scripts. |
| **Snap To Surface**, **Grid Snap** | Control where new points land. |
| **Auto Bake** | Rebake while you edit. |

The colliders are children of a `_ZoneColliders` object and use the shape's layer. Don't edit them by hand, because the next bake replaces them. A concave polygon uses one convex collider per triangle, so keep complex shapes simple.

## 4. Use it from UdonSharp

With **Scripting Ref** on, reference the `ZoneArea` on the `_ZoneColliders` object.

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using UnityEngine;

public class ZoneSign : UdonSharpBehaviour
{
    public ZoneArea area;
    public GameObject sign;

    private void Update()
    {
        sign.SetActive(area.IsLocalPlayerInside());
    }
}
```

| Method | Does |
|---|---|
| `Contains(Vector3)` | Whether a world position is inside a zone. Always false for barriers. |
| `IsPlayerInside(VRCPlayerApi)`, `IsLocalPlayerInside()` | The same test for a player's position. |
| `EnableColliders()`, `DisableColliders()` | Turn every collider on or off, for example to open a gate. |
| `EnableGround()`, `DisableGround()`, `IsGroundEnabled()` | Control the floor only. |
| `EnableCeiling()`, `DisableCeiling()`, `IsCeilingEnabled()` | Control the ceiling only. |
| `ShowVisual()`, `HideVisual()` | Show or hide the render mesh. |

These calls are local. To share a gate's state, sync it in your own script.

`Contains` uses one height range for the whole shape, from the lowest point to the highest point plus Height. On steep ground, split the area into several zones.
