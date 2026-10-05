# LogicCuteGuy Docs

Documentation site for LogicCuteGuy's Unity and VRChat packages, published at [docs.logiccuteguy.com](https://docs.logiccuteguy.com).

## Documented packages

| Package | Current version | Documentation |
|---|---:|---|
| [LogicCuteGuy Help Tools](https://github.com/LogicCuteGuy/UnityHelpTools) | `1.0.1` | [Overview](https://docs.logiccuteguy.com/unity-vrc/helptools/intro) |
| [LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp) | `0.3.10` | [Overview](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/intro) |
| [DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt) | `0.6.1` | [Overview](https://docs.logiccuteguy.com/unity-vrc/digholeit/intro) |

All three packages are available through the [LogicCuteGuy VPM listing](https://vpm.logiccuteguy.com/index.json). DigHoleIt can also be installed from its published Git tag or named GitHub Release package.

LCGUdonSharp 0.3.10 installs an embedded **SBP compatibility 1.21.26** dependency through VPM before Unity compiles, preventing the VRChat SDK `ExtensionMethods` collision on fresh installs and upgrades. It is based on Unity SBP 1.21.25, preserves upstream source/GUIDs and the Unity Companion License, and survives `Library` regeneration. Unity Localization 1.4.5 remains supported. See [installation](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/install); manual installs require **both** release ZIPs.

LCGUdonSharp 0.3.9 adds [text and asset localization](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/localization): Unity String/Asset Tables baked into Udon, local language selection and fallbacks, dropdowns/callbacks, validated Smart Strings, and sprite/texture/audio/prefab variants. It also adds EN/TH/JA samples, legacy JSON tools, Unity Localization 1.4.5 and Scriptable Build Pipeline 1.21.25 dependencies, and build/worker-thread compatibility fixes. Rebuild the world after editing tables or updating.

ScriptableObject snapshots added in 0.3.8 remain supported. Rebuild all Udon programs and rebake scene/prefab data when upgrading from older layouts; see the [ScriptableObject guide](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/scriptableobjects).

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
