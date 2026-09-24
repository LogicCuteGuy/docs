# LogicCuteGuy Docs

Documentation site for LogicCuteGuy's Unity and VRChat packages, published at [docs.logiccuteguy.com](https://docs.logiccuteguy.com).

## Documented packages

| Package | Current version | Documentation |
|---|---:|---|
| [LogicCuteGuy Help Tools](https://github.com/LogicCuteGuy/UnityHelpTools) | `1.0.1` | [Overview](https://docs.logiccuteguy.com/unity-vrc/helptools/intro) |
| [LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp) | `0.3.4` | [Overview](https://docs.logiccuteguy.com/unity-vrc/lcgudonsharp/intro) |

Packages are distributed through the [LogicCuteGuy VPM listing](https://vpm.logiccuteguy.com/index.json).

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
