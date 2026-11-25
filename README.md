# LogicCuteGuy Docs

Documentation site for LogicCuteGuy's Unity and VRChat packages, published at [docs.logiccuteguy.com](https://docs.logiccuteguy.com).

## Documented packages

| Package | Current version | Documentation |
|---|---:|---|
| [LogicCuteGuy Help Tools](https://github.com/LogicCuteGuy/UnityHelpTools) | `1.0.1` | [Overview](https://docs.logiccuteguy.com/unity-vrc/helptools/intro) |
| [LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp) | `0.5.0` | [Overview](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/intro) |
| [DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt) | `0.7.2` | [Overview](https://docs.logiccuteguy.com/unity-vrc/digholeit/intro) |
| [BlendProperty](https://github.com/LogicCuteGuy/BlendProperty) | `0.2.2` | [Overview](https://docs.logiccuteguy.com/unity-vrc/blendproperty/intro) |
| [WASM2HLSL](https://github.com/LogicCuteGuy/WASM2HLSL) | `0.2.2` | [Overview](https://docs.logiccuteguy.com/unity-vrc/wasm2hlsl/intro) |
| [UIHUD](https://github.com/LogicCuteGuy/UIHUD) | `0.1.2` | [Overview](https://docs.logiccuteguy.com/unity-vrc/uihud/intro) |
| [LCG Localization](https://github.com/LogicCuteGuy/LCGLocalization) | `0.1.0` | [Overview](https://docs.logiccuteguy.com/unity-vrc/lcglocalization/intro) |
| [ClientSim Net](https://github.com/LogicCuteGuy/ClientSimNet) | `0.1.1` | [Overview](https://docs.logiccuteguy.com/unity-vrc/clientsimnet/intro) |

All eight packages are available through the [LogicCuteGuy VPM listing](https://vpm.logiccuteguy.com/index.json). DigHoleIt can also be installed from its published Git tag or named GitHub Release package.

LCGUdonSharp **0.5.0** hooks the VRChat SDK's UdonSharp instead of replacing it: no installer, no SDK files modified, Worlds SDK `>=3.10.6 <3.11.0`. Compiler-side networking and the SBP compatibility dependency are removed. Upgrading from 0.4.x: reinstall `com.vrchat.worlds` first, see [installation](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/install).

LCGUdonSharp 0.3.10 installs an embedded **SBP compatibility 1.21.26** dependency through VPM before Unity compiles, preventing the VRChat SDK `ExtensionMethods` collision on fresh installs and upgrades. It is based on Unity SBP 1.21.25, preserves upstream source/GUIDs and the Unity Companion License, and survives `Library` regeneration. Unity Localization 1.4.5 remains supported. See [installation](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/install); manual installs require **both** release ZIPs.

LCGUdonSharp 0.3.9 adds [text and asset localization](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/localization): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.

ScriptableObject snapshots added in 0.3.8 remain supported. Rebuild all Udon programs and rebake scene/prefab data when upgrading from older layouts; see the [ScriptableObject guide](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/scriptableobjects).

DigHoleIt 0.7.0 adds Dig Pen prefabs, runtime tree/detail planting and erasing (including baked foliage), networked smoothing, a VRChat showcase, and Refresh Holes / Refresh Zones. Settings are local; VRChat edits are synchronized and replayed for late joiners.

DigHoleIt **0.7.2** supports stock UdonSharp (LCGUdonSharp is now optional) and is available through VPM and GitHub. See the [installation guide](https://docs.logiccuteguy.com/unity-vrc/digholeit/getting-started) for pinned Git/ZIP installation.

BlendProperty **0.2.2** fixes the picture-tip footprint and Udon sync modes; its docs now target stock UdonSharp. See the [guide](https://docs.logiccuteguy.com/unity-vrc/blendproperty/intro).

WASM2HLSL **0.2.2** supports stock UdonSharp and relaxes the Worlds SDK dependency to `3.x.x` (`>=3.10.5`). Since 0.2.0 it reads big constant tables from a texture: `.rodata` of 1 KB or more no longer counts toward the 64000-byte memory limit, lifting the size limit for bigger modules. `.wasm` WebAssembly modules are translated to HLSL in the editor and executed once per pixel from UdonSharp via Blit + async GPU readback. 0.2.2 supports stock UdonSharp; LCGUdonSharp is optional. See the [overview](https://docs.logiccuteguy.com/unity-vrc/wasm2hlsl/intro) and [getting started](https://docs.logiccuteguy.com/unity-vrc/wasm2hlsl/getting-started) guide.

UIHUD **0.1.2** relaxes the Worlds SDK dependency to `3.x.x` (`>=3.10.5`). The package adds a HUD plus slide-in menus and UI widgets for VRChat worlds and standalone Unity games. One setup works on VR, desktop and mobile. See the [overview](https://docs.logiccuteguy.com/unity-vrc/uihud/intro) and [getting started](https://docs.logiccuteguy.com/unity-vrc/uihud/getting-started) guide.

LCG Localization **0.1.0** is the initial release of text and asset localization for UdonSharp, baking Unity Localization tables into Udon. See the [overview](https://docs.logiccuteguy.com/unity-vrc/lcglocalization/intro).

ClientSim Net **0.1.1** (initial release 0.1.0) is a multiplayer network simulator for VRChat's ClientSim: remote puppet players, latency/jitter/loss, real synced-variable delivery, ownership, late join and a network debugger. See the [overview](https://docs.logiccuteguy.com/unity-vrc/clientsimnet/intro).

## Local development

Requires Node.js 20 or newer.

```bash
npm ci
npm start
```

Create a production build with:

```bash
npm run build
```

## Repository layout

- `docs/` — English source documentation.
- `i18n/ja/` and `i18n/th/` — Japanese and Thai translations.
- `static/img/` — site icons and static images.
- `docusaurus.config.js` — site and navigation configuration.
- `sidebars.js` — documentation sidebar order.

## License

Documentation and site content © 2026 LogicCuteGuy. Individual packages retain the licenses declared in their repositories.
