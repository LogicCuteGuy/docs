---
sidebar_position: 3
---

# How baking works

ZoneDraw turns your points into ordinary Unity colliders under a child object named `_ZoneColliders`. The `ZoneShape` component you draw with is editor-only: VRChat strips it from the build, and the baked colliders stay.

## When it bakes

With **Auto Bake** on, the shape rebakes after an edit. While you drag a point or the height arrow, it bakes when you release the mouse. Undo and Redo rebake too. With Auto Bake off, click **Bake Colliders**. **Remove Colliders** deletes the `_ZoneColliders` object.

Prefab assets aren't baked. Bake a prefab instance in a scene, or edit it in Prefab Mode.

The next bake overwrites the generated children, so don't edit them by hand. They use the layer of the `ZoneShape` object: change that object's layer and rebake.

## Barrier walls

Each segment between two points becomes one `BoxCollider`, named `Wall 0`, `Wall 1` and so on. With **Closed** on and at least 3 points, one more wall joins the last point to the first.

Each box runs past its end points so that corners overlap and leave no gap.

| Wall Faces | Where the thickness goes |
|---|---|
| **Front** | Right of the point order |
| **Back** | Left of the point order |
| Both | Centred on the line |

**Reverse** flips the point order, which swaps Front and Back. With one side only, the extra length can stick out slightly past inner corners. Use both sides or less thickness if that matters.

## Zone volumes

A zone needs at least 3 points. Each point is extruded up by **Height** and down by **Bottom Offset**.

| Polygon | Result |
|---|---|
| Convex | One convex `MeshCollider` |
| Concave | One convex `MeshCollider` per triangle |

A concave shape with many points therefore makes many colliders. The polygon must not cross itself, because the triangulation can't handle that. The Inspector shows the point and collider counts.

Switching to **Zone** with the mode toolbar turns **Is Trigger** on. Switching to **Barrier** turns it off.

## Floor and ceiling

**Ground Collider** and **Ceiling Collider** need a loop (a zone, or a barrier with **Closed** on) with at least 3 points. Both slabs are **Thickness** deep:

- The floor's top sits on your points.
- The ceiling's underside sits at the top of the shape.

## Visible mesh

Set **Render Material** to draw the shape, for example as a force field or a fence.

- The mesh is double-sided.
- UVs tile by world size, in units of the wall height, so a texture isn't stretched along long walls.
- A zone also gets a top face unless **Render Top** is off. Floor and ceiling slabs get faces too.
- A new renderer starts with shadows off. Your later changes to the renderer survive rebakes.

## Placing points

| Option | Behaviour |
|---|---|
| **Snap To Surface** | A point lands on the collider under the cursor. Triggers and the shape's own colliders are ignored. With no hit, it lands on a flat plane. |
| **Grid Snap** | Rounds world X and Z to this step. 0 turns it off. |
| **Drop To Ground** | Moves each point to the highest surface found by a downward ray starting 50 m above it. |
| **Flatten** | Sets every point's local Y to 0. |

Next: [Scripting with ZoneArea](./scripting.md).
