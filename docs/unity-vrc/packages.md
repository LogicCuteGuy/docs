---
sidebar_position: 2
---

# Packages

Packages published through the **LogicCuteGuy VPM Listing**, plus packages installed directly from GitHub.

**Listing URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | Display Name | Latest | Unity | Description |
|---|---|---|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | 15+ editor utilities for scene management, object manipulation, and optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.10` | 2022.3 | Interface-enabled UdonSharp compiler — interfaces, async/await, exceptions, collections/JSON, packet networking |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.7.0` | 2022.3 | Diggable voxel zones for Unity Terrain, with synced runtime edits, foliage, packaged examples and seamless terrain-hole edges |

## Add the repository in VCC

1. Open the **VRChat Creator Companion**.
2. Go to **Settings > Packages > Add Repository**.
3. Paste `https://vpm.logiccuteguy.com/index.json` (or use the **Install via VCC** button on the site landing page).

VCC/ALCOM through this listing is the recommended installation method. LCGUdonSharp also publishes a named, validated package ZIP on GitHub Releases for local package references; GitHub's automatic **Source code (zip)** archive is not an installable package.

## Package details

### `com.logiccuteguy.helptools` — LogicCuteGuy Help Tools

- **Latest version**: 1.0.1 — [all releases](https://github.com/LogicCuteGuy/UnityHelpTools/releases)
- **License**: MIT
- **Keywords**: unity, editor, tools, vrchat
- **Repository**: [LogicCuteGuy/UnityHelpTools](https://github.com/LogicCuteGuy/UnityHelpTools)

| Version | Notes |
|---|---|
| `1.0.1` | Current release |
| `1.0.0` | Initial release |

Docs: [Overview](helptools/intro) · [Installation](helptools/install)

### `com.logiccuteguy.lcgudonsharp` — LCGUdonSharp

LCGUdonSharp 0.3.10 installs an embedded **SBP compatibility 1.21.26** dependency through VPM before Unity compiles, preventing the VRChat SDK `ExtensionMethods` collision on fresh installs and upgrades. It is based on Unity SBP 1.21.25, preserves upstream source/GUIDs and the Unity Companion License, and survives `Library` regeneration. Unity Localization 1.4.5 remains supported. See [installation](./lcgudonsharp/install.md); manual installs require **both** release ZIPs.

LCGUdonSharp 0.3.9 adds [text and asset localization](./lcgudonsharp/localization.md): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.

LCGUdonSharp 0.3.8 adds nested and polymorphic [ScriptableObject data snapshots](./lcgudonsharp/scriptableobjects.md), runtime type tests and checked casts, cycle/depth validation, and a local equipment example. Rebuild all Udon programs and rebake scene/prefab data after updating because snapshot layouts now include runtime type tags.

- **Latest version**: 0.3.10 — [release](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10)
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.10.5` (strict)
- **Repository**: [LogicCuteGuy/LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp)

Adds interfaces, compiler-managed exceptions, async lowering, C# collection/JSON lowering, extended language features, and experimental packet networking to UdonSharp. Version 0.3.6 adds bounded object-motion batching, snapshot and disconnect recovery, ownership repair, and wired native/LCG load examples. Rebuild worlds after updating because older builds cannot decode the new motion batch envelope. The compiler is installed from `Payload~/UdonSharp` without modifying the Worlds SDK package. See [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) for release history.

Docs: [Overview](lcgudonsharp/intro) · [Installation](lcgudonsharp/install)

### `com.logiccuteguy.digholeit` — DigHoleIt

DigHoleIt 0.7.0 adds Dig Pen prefabs, runtime tree/detail planting and erasing (including baked foliage), networked smoothing, a VRChat showcase, and Refresh Holes / Refresh Zones. Settings are local; VRChat edits are synchronized and replayed for late joiners.

- **Latest version**: 0.7.0 — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)
- **Unity**: 2022.3, Built-in Render Pipeline
- **VRChat dependencies**: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- **License**: MIT
- **Repository**: [LogicCuteGuy/DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt)

Install **0.7.0** through VCC/ALCOM from the [LogicCuteGuy VPM listing](https://vpm.logiccuteguy.com/index.json); refresh the listing first. Alternatively use `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0`, embed the tagged repository, or extract the named `com.logiccuteguy.digholeit-0.7.0.zip` from [the release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0). Do not use the automatic source archive. For Git/ZIP installs in VRChat projects, install LCGUdonSharp first using its [installation guide](./lcgudonsharp/install.md).

Version 0.6.1 fixes bake/move/resize undo, terrain-hole seams, foliage shading and invalid edge collision meshes.

Docs: [Overview](digholeit/intro) · [Getting started](digholeit/getting-started)
