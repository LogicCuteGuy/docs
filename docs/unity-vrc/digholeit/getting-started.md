---
sidebar_position: 2
---

# Getting started: illustrated tutorial

> Documentation version: **0.7.0** · [Release notes](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

Install DigHoleIt, bake a diggable area, sculpt it in Unity, and enable a Dig Pen for VRChat. Screenshots illustrate the editor workflow. Click an image to read it at full size.

The recording shows **editor authoring**, with Play mode off and unresolved Udon program-asset errors. Complete the runtime setup and checks below before testing your world.

## Requirements

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| Other | Worlds SDK 3.10.5 and **LCGUdonSharp** 0.3.4 or later | none |

## 1. Install the package

For VRChat, use **VCC or ALCOM**:

1. In VCC open **Settings > Packages > Add Repository**; in ALCOM open **Resources > Add Repository**. Enter:

   ```text
   https://vpm.logiccuteguy.com/index.json
   ```

2. Confirm that it lists **DigHoleIt - Diggable Voxel Terrain**, then add the repository.

[![ALCOM confirmation for the LogicCuteGuy VPM repository](/img/digholeit/tutorial/add-repository.webp)](/img/digholeit/tutorial/add-repository.webp)

*00:05 — ALCOM confirmation. VCC has a different layout with the same URL.*

3. Open your project's **Manage Packages**, refresh, search for **DigHoleIt**, and install **0.7.0**. The VPM package declares Worlds SDK 3.10.5 and LCGUdonSharp 0.3.4 or later as dependencies.
4. Open Unity and wait for import and compilation. Resolve Console errors before Play or a build; see [Udon program-asset errors](troubleshooting.md#udon-program-assets).

[![DigHoleIt 0.7.0 installed in ALCOM Manage Packages](/img/digholeit/tutorial/install-package.webp)](/img/digholeit/tutorial/install-package.webp)

*00:23 — Installed and Latest both show 0.7.0, with a successful installation message.*

For a **Git install**, first install [LCGUdonSharp](../lcgudonsharp/install.md) in VRChat projects. Use **Window > Package Manager > + > Add package from git URL**:

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0
```

Alternatively place the tagged repository, or the contents of the named `com.logiccuteguy.digholeit-0.7.0.zip` from the release, in `Packages/com.logiccuteguy.digholeit`. Its `package.json` must be directly inside that folder. Prefer the named package ZIP over GitHub's automatic source archive.

## 2. Choose an example or your own Terrain

Open **Packages > DigHoleIt - Diggable Voxel Terrain > Example** in the Project window:

| Scene | What it provides |
|---|---|
| `VRChat/DigHoleItVRChatDemo.unity` | Baked zone, spawn, three shovels and a pen for a first ClientSim test. |
| `VRChat/DigHoleItVRChatShowcase.unity` | The forest scene in this recording, with a baked zone and four pens. |
| `Standalone/DigHoleItStandaloneDemo.unity` | Mouse controls and a pen in a non-VRChat project. |
| `Showcase/DigHoleItShowcase.unity` | Editor-only pit/cave example; no runtime. |

Save your scene before opening an example. Git URL packages are read-only: copy the example folder into `Assets` before editing or re-baking. Also copy and reassign any Terrain or zone data assets you intend to edit that still point into the read-only package. Copying only the `.unity` scene leaves its asset references unchanged.

Examples already have a zone: select it to inspect it. For a new zone, start with your own **Unity Terrain** (not a mesh) and save the scene under `Assets`. Its material must support holes; the default Built-in terrain material does.

**Tools > DigHoleIt > Create VRChat Demo Scene** creates a fresh baked zone, spawn and three shovels under `Assets/DigHoleIt/Demo`. This menu-generated scene uses shovels; the packaged 0.7.0 examples include pens. **Create Standalone Demo Scene** normally appears only in non-VRChat projects.

## 3. Create and bake a Dig Zone

1. Select your Terrain in the Hierarchy.
2. Click **Paint Terrain** (the brush icon) in its Terrain component, then select **DigHoleIt: Dig Voxels**.

[![Paint Terrain dropdown listing the four DigHoleIt tools](/img/digholeit/tutorial/terrain-tools.webp)](/img/digholeit/tutorial/terrain-tools.webp)

*01:08 — Dig Voxels, Paint Voxels, Paint Trees and Paint Details are separate tools.*

3. Click **Create Dig Zone** in the **Dig Zones** panel. This assigns the Terrain, fits the zone vertically and bakes it automatically. Alternatively create an empty GameObject, add **DigHoleIt > Dig Zone**, assign Terrain, then press **Fit To Terrain** and **Bake**.
4. Select the zone. Move or resize it with the coloured face handles. The orange box is the zone; the green box is the editable area after **Border Voxels**. Keep the footprint inside the Terrain and use separate areas for separate zones.
5. Start with package defaults: **Voxel Size 0.5**, **Chunk Cells 16**, **Border Voxels 2**, **Depth Below Terrain 8**, **Headroom Above Terrain 4**. Fit To Terrain changes the vertical cell count. These are not a performance guarantee; see [Performance and limits](performance.md).
6. **Re-bake after dragging the zone handles** re-bakes on release. After editing Inspector dimensions, press **Bake** yourself. Wait until it finishes: the surface should remain visible and a **Data** asset and chunk objects should exist.

[![Baked Dig Zone with orange bounds, green editable bounds and face handles](/img/digholeit/tutorial/zone-bounds.webp)](/img/digholeit/tutorial/zone-bounds.webp)

*01:30 — 64 × 27 × 48 cells at 0.5 m: 32 × 13.5 × 24 m. Your fitted height will differ.*

Bake normally keeps sculpting and paint when voxel size and lattice stay compatible. Read the Inspector warning before changing them. **Reset To Terrain** discards sculpting and paint; it is not required for setup. See [Dig Zones](dig-zones.md).

## 4. Dig a pit and shape it

1. Select the Terrain and return to **DigHoleIt: Dig Voxels**.
2. Choose **Dig**, a soft round brush, a small radius such as **2 m**, and **Strength 0.5** to start. Aim inside the green area and hold or drag left mouse in the Scene view.
3. Release to finish the stroke. A pit should expose dug soil. Aim at its wall to extend a tunnel.
4. **Add** puts soil back; **Smooth** evens the surface; **Reset** brushes part of the zone toward its baked terrain. **Shift** temporarily adds; **Ctrl** temporarily smooths. **A + drag** changes size, **S + drag** changes strength, and **[ / ]** changes size. Undo reverses a stroke.

[![Dig mode producing a pit with brush settings visible](/img/digholeit/tutorial/dig-pit.webp)](/img/digholeit/tutorial/dig-pit.webp)

*01:54 — a 4.84 m editor brush in the recording. Start smaller for controlled strokes. The red status message is an unresolved Udon error, not a successful runtime test.*

You can also select the zone and click **Sculpt Tool** for its Scene-view panel. See [Editor brushes](editor-brushes.md).

## 5. Paint soil, grass, flowers and trees

### Paint the voxel surface

Choose **DigHoleIt: Paint Voxels**, select a Terrain layer or **Dug Soil**, then drag over the exposed surface. **Auto** removes explicit paint and restores automatic shading. Lower Strength blends coverage. Add Terrain layers first; bake the zone after changing the layer list.

[![Paint Voxels choices: Auto, Grass, Rock, Sand, Moss and Dug Soil](/img/digholeit/tutorial/paint-voxels.webp)](/img/digholeit/tutorial/paint-voxels.webp)

*02:49 — four named Terrain layers. Your choices come from your own Terrain.*

### Paint grass and flowers inside the pit

Choose **DigHoleIt: Paint Details**. Select a thumbnail, or add a detail through **Edit Details**. Set Brush Size, Opacity and Target Strength, then paint the floor or wall. **Surface Angle** presets **Floors**, **Walls**, **Ceilings** and **All** restrict placement. Wall/ceiling details appear when the stroke pauses or ends. **Shift** erases; **Ctrl** erases only the selected detail. If Detail Resolution is zero, set it in Terrain Settings or use **Set Detail Resolution To 512** when offered.

[![Paint Details with Flowers selected and flowers on the pit surface](/img/digholeit/tutorial/paint-details.webp)](/img/digholeit/tutorial/paint-details.webp)

*02:25 — Flowers is selected; Surface Angle is below the brush settings.*

### Paint trees on the voxel surface

Choose **DigHoleIt: Paint Trees**. Select a thumbnail or add a prefab through **Edit Trees**. Start with a small brush and low density. **Tree Direction In Zones > Upright** keeps trees upright (hanging down on ceilings); **Along Surface** grows them out of slopes and walls. **Shift** erases; **Ctrl** erases only the selected tree.

[![Paint Trees with tree thumbnails and Along Surface selected](/img/digholeit/tutorial/paint-trees.webp)](/img/digholeit/tutorial/paint-trees.webp)

*03:10 — Along Surface is selected. The recording's large brush/density can create many trees; start smaller.*

Use the **DigHoleIt** foliage tools inside zones: Unity's ordinary brushes cannot reach through a Terrain hole. Trees/details disappear when supporting ground is dug away or buried. See [Trees and details](dig-zones.md#trees-and-details).

## 6. Enable digging for VRChat players

Editor brushes do not require a runtime. Players do:

Your scene also needs a **VRC Scene Descriptor** and a spawn on solid ground. The packaged VRChat scenes already include **VRCWorld**. For your own scene without a descriptor, drag the SDK prefab `Packages/com.vrchat.worlds/Samples/UdonExampleScene/Prefabs/VRCWorld.prefab` into the scene and position its spawn safely above the terrain.

1. Select the baked zone and click **Add VRChat Runtime**. It adds **DigZoneRuntime** on the zone and **DigSync** on a child GameObject. The Inspector should say **VRChat runtime: DigZoneRuntime + DigSync**.

[![Zone Inspector showing Bake and Add VRChat Runtime before runtime setup](/img/digholeit/tutorial/zone-inspector.webp)](/img/digholeit/tutorial/zone-inspector.webp)

*01:30 — before runtime setup. Players cannot dig this zone yet; click Add VRChat Runtime to complete that step.*

2. Drag **Example/Pen/Dig Pen (VRChat).prefab** into the scene, within reach of a safe player spawn. Use its existing pickup, Rigidbody, Object Sync, settings Canvas and cursor.
3. Select its **Pen** child containing **DigTool**, then press **Refresh Zones**. Check that **Zones** contains your `DigZoneRuntime`, **Layers** includes its **Chunk Layer**, and **Reach** is sufficient. Refresh Zones replaces the list with all scene zones; assign a custom list afterwards if needed. Empty lists are also filled on scene open/save/play.
4. For Tree/Detail modes, check the runtime's **Tree Prefabs** / **Detail Prefabs**. Empty lists use Terrain prototypes or example defaults. Assign your own arrays to control the choices.
5. Re-bake or sculpt the authoring zone to update its runtime. Do not hand-edit baked runtime grid fields.
6. For baked lights, click **Add Light Probes** (or **Update Light Probes**) and bake lighting after the final zone bake/sculpt. Changed chunks switch to probes at runtime.
7. Save. With Console errors resolved, enter **Play** with ClientSim, pick up the pen, aim at the zone and hold **Use**. Its panel selects **Dig**, **Add**, **Paint**, **Tree**, **Detail** or **Smooth**, with Size/Rate and option arrows.

ClientSim checks local pickup/UI and editing. Test the built world in VRChat with two clients, then a late joiner, to verify sync and replay. The pen's **Reset Zones** requests a return to the baked state for everyone; it is master-only by default. See [VRChat runtime](vrchat-runtime.md).

## Standalone setup

The mouse tool uses Unity's legacy Input Manager. Enable that input backend (or Both); Input System-only projects must drive `EditAtScreen` themselves.

In a non-VRChat project, bake a zone and click **Add Standalone Runtime**. Use the packaged standalone demo, add `DigToolStandalone` to your camera, or add **Example/Pen/Dig Pen (Standalone).prefab** and assign its camera/zones. Left mouse uses the selected mode, right adds, middle paints. Enable **Show Settings** for the panel; **Tab** toggles it. See [Standalone runtime](standalone-runtime.md) for saves and multiplayer. Its scripts are normally disabled in VRChat projects.

## Before testing your world

- Scene and edited Terrain/zone data are writable and saved; no unresolved compile or program-asset errors remain.
- The zone has baked data/chunks and green bounds cover the digging area.
- VRChat zones show **DigZoneRuntime + DigSync**; the pen finds the zone and can hit its Chunk Layer.
- Dig/Add/Paint work in ClientSim; foliage options and settings buttons work if used.
- Two VRChat clients see matching changes; a late joiner receives the same result. Check target-device performance separately.

Instructions were checked against [DigHoleIt 0.7.0 source](https://github.com/LogicCuteGuy/DigHoleIt/tree/0433a4f83616df0900edfca1676d4f5eb6ddfc63). The recording does not demonstrate Play mode, a world build, multiplayer or target-device performance.
