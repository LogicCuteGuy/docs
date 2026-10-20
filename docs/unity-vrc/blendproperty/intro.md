---
sidebar_position: 1
---

# BlendProperty

> Documentation version: **0.2.1** · [Release](https://github.com/LogicCuteGuy/BlendProperty/releases/tag/v0.2.1)

**Blend Property** (`com.logiccuteguy.blendproperty`) adds Blender-style modifier components to Unity objects with a **MeshFilter**. Components run top-to-bottom, preview in the editor and save the result as a mesh asset. By default, builds contain the baked mesh, not the stack.

Requires **Unity 2022.3 or newer**. ProBuilder support is optional and activates when ProBuilder is installed. SkinnedMeshRenderer, bones and blend shapes are not supported. See [modifier reference](./modifiers.md) and [runtime/build behavior](./runtime.md).

## What's new in 0.2.1

0.2.1 is a documentation release: it adds step-by-step VCC/ALCOM installation and clarifies the Git/ZIP alternatives. Runtime code and example assets are unchanged from 0.2.0.

## What's fixed in 0.2.0

0.2.0 fixes VRChat panel compatibility: Control Panel and Cloth Panel now use `NoVariableSync`, so they can share a GameObject with the `Manual` Synced Control Panel. It also corrects the shader references in the example's baked GPU deform textures and refreshes the VRChat scene. Existing GPU/native physics features remain available.

## What's new in 0.1.1

0.1.1 adds live GPU modifiers, cloth/soft body, fluids, hair, particles, paint/waves, destruction, ocean and interaction. Shared components now run natively without the Worlds SDK. Array/Curve accept optional Unity Splines; Array adds Split Copies and Collider Per Copy. Runtime controls can be shared without replicating full GPU simulation state. See [runtime/builds](./runtime.md) and [physics/materials](./physics.md).

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) to VCC/ALCOM, or add `https://vpm.logiccuteguy.com/index.json` manually in the app's repository settings. Refresh the listing if it is already added.
2. Open **Manage Project** for your Unity project and enable the LogicCuteGuy repository if needed.
3. Find **Blend Property** (`com.logiccuteguy.blendproperty`) and add **0.2.1**.
4. Open the project in Unity and let the package import.

The [VPM listing](../packages.md) publishes the same named ZIP as GitHub Releases. The package declares `com.unity.ugui` **1.0.0**; VRChat runtime deformers require a Worlds SDK project with stock UdonSharp or LCGUdonSharp.

### Unity Package Manager / manual

In **Window > Package Manager > + > Add package from git URL**, enter:

```text
https://github.com/LogicCuteGuy/BlendProperty.git#v0.2.1
```

Alternatively place the tagged repository at `Packages/com.logiccuteguy.blendproperty`, or extract the named `com.logiccuteguy.blendproperty-0.2.1.zip` from the release into that folder, with `package.json` at its root.

Choose **one installation method per project** to avoid duplicate copies.

## Build your first stack

1. Select a primitive, an FBX mesh child or a ProBuilder object with a MeshFilter.
2. Choose **Add Component > Blend Property > Modifiers** and a modifier under **Generate**, **Deform**, **Edit** or **Normals**. The first adds a **Modifier Stack** automatically.
3. Add more modifiers. Drag headers or use the ⋮ **Move Up/Down / Move to First/Last** menu to change order.
4. Toggle a modifier's checkbox to preview without it. Disabling the stack shows the original mesh.
5. Set **Shading** on the stack: Smooth By Angle, Smooth, Flat or Keep Imported.

**Rebuild** forces an update after the source mesh changes. **Apply** in a modifier's ⋮ menu bakes it and every enabled modifier above it into the source. **Apply All** bakes the whole stack and removes modifiers. **Remove All** restores the original without applying, in one Undo step. **GameObject > Blend Property > Modifiers > Apply All in Children / Remove All in Children** operates on a whole model.

Baked results live in `Assets/BlendProperty/Baked/`; keep assets still referenced by MeshFilters. **Tools > Blend Property > Delete Unused Baked Meshes** removes unused results.

### Editor walkthrough

Select the mesh to find **Modifier Stack** in the Inspector. Here the source cube is on the left and the Bevel result is on the right; **Add Modifier**, **Apply All**, **Remove All** and **Rebuild** are on the stack.

[![Unity Editor showing the Modifier Stack Inspector and a cube before and after Bevel](/img/blendproperty/workflow-stack.png)](/img/blendproperty/workflow-stack.png)

[View full size](/img/blendproperty/workflow-stack.png). Images are reused from the [tagged upstream guide](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.2.1/Documentation~/IllustratedWorkflow.md); some Inspector version labels predate 0.2.0. Editor setup and local ClientSim results are labeled separately below.

## Examples

| Scene under `Example/` | Purpose |
|---|---|
| `BlendPropertyExample.unity` | Ten editor stacks (including two Unity Splines examples): Bevel/Subdivision, line/circle Array, Simple Deform, Wave, Boolean, Wireframe and Lattice |
| `VRChat/BlendPropertyVRChatExample.unity` | GPU modifiers, physics stations, Runtime Array and shared panels; open in a VRChat project |
| `Standalone/BlendPropertyStandaloneExample.unity` | Array count and Twist angle driven by `RebuildNow()`; open without the VRChat SDK |

The editor example arrives without baked meshes; opening it rebuilds and saves results. Copy Git-installed example folders into `Assets` before saving edits to read-only package files. Wrong-project runtime examples can show missing scripts.

## ProBuilder

Stacks stay live while the shape is edited. Vertex/edge/face selection shows the unmodified cage; **Apply** writes the result into the ProBuilderMesh so it stays editable.

## Source and license

[Repository](https://github.com/LogicCuteGuy/BlendProperty) · [Version-pinned user guide](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.2.1/Documentation~/BlendProperty.md) · [MIT license](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.2.1/LICENSE)

After the first modifier, the stack's **Add Modifier** button lists Generate / Deform / Edit / Normals. Physics setup uses **Blend Property > Physics > Physics Tab**; see [physics](./physics.md). For pictured steps use the [illustrated workflow](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.2.1/Documentation~/IllustratedWorkflow.md).
