---
sidebar_position: 4
---

# Validation and build options

Open **Tools > OpenWorld > Validation**, or click **Validate** on OpenWorld Settings. A VRChat build stops if there are errors. Warnings don't stop it.

## Budgets

Budgets are checked on the busiest window of chunks within the mid rings, with all of it assumed to be in view.

| Budget | PC | Quest |
|---|---|---|
| Draw calls | 400 | 150 |
| Triangles | 1,000,000 | 150,000 |
| Resident streamed textures | 512 MB | 128 MB |
| Suggested maximum mid rings | 3 | 2 |

Going over a budget is a warning. Blocks count as one draw per 1023 instances of each type, and impostor pages are added. Terrains, Dig Zones, entities and avatars aren't counted. These are starting values that haven't been profiled on Quest hardware.

## Errors

| Message is about | Fix |
|---|---|
| Empty grid | Set Chunk Size, Chunks X and Chunks Z. |
| Chunk roots don't match the grid | Click **Assign To Chunks**. |
| Near rings exceed mid rings | Lower the near rings or raise the mid rings. |
| Merge Rings × Block Chunks + 1 | Raise it above the mid rings. |
| Object inside the grid but not in a chunk root | Click **Assign To Chunks**. |
| Block Prefabs set but nothing baked, or a stale Block layout | Click **Assign To Chunks**. |
| A Block type lost its mesh or material | Click **Assign To Chunks**. |
| Material has GPU Instancing off | Turn it on. Its Blocks don't draw without it. |
| Chunk colliders not baked | Click **Assign To Chunks**. |
| Editable world without an edit manager per region | Click **Assign To Chunks**. |

## Warnings

| Warning | What to do |
|---|---|
| A renderer is wider than two chunks | Split it. It appears and disappears with only one chunk. |
| Quest or PC mid rings above the suggested value | Lower them, or profile. |
| Quest applies more than 1 chunk change per frame | Set it to 1 to avoid hitches. |
| No impostors baked | Click **Bake Impostors**. Far chunks show nothing without them. |
| Too many draw calls | Merge meshes, use Blocks, or lower the mid rings. |
| Too many triangles | Use lighter meshes or lower the mid rings. |
| Too much streamed texture memory | Set **Load Distance** on OpenWorldStream, or ship smaller images. |

## Build options

On **OpenWorld Settings**:

| Option | Effect | Trade-off |
|---|---|---|
| **Bake On Build** | Before each VRChat build, re-assigns chunks, re-reads terrain trees, bakes impostors and saves the scene | Longer builds |
| **Strip Detail Maps** | Removes normal, metallic/specular, occlusion, height and detail maps from scene materials and renders them flat | Smaller download, flatter look |
| **No Static Batching** | Turns static batching off | Much smaller download, more draw calls |
| **Unbatch Repeated Meshes** | Leaves a mesh out of static batching when at least this many renderers share it (0 = off) | Each such mesh ships once. Enable GPU Instancing on its materials. |

The material options work on copies, so your own materials don't change.

## Chunk gizmos

| Option | Shows |
|---|---|
| **Show Chunk Boxes** | A box around each chunk's content. In Play mode: green is near, yellow is mid, grey is off. |
| **Show Chunk Details** | Name, Blocks, terrain trees and colliders per chunk, while the world is selected |
| **Details Distance** | How close to the Scene camera labels are drawn |
| **Show Chunk Borders** | Borders around the chunk the Scene camera is in |
