---
sidebar_position: 2
---

# Packages (VPM Listing)

Every package published in the **LogicCuteGuy VPM Listing** — the repository used by the VRChat Creator Companion (VCC) and Unity Package Manager.

**Listing URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | Display Name | Latest | Unity | Description |
|---|---|---|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | 15+ editor utilities for scene management, object manipulation, and optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.2.0` | 2022.3 | Interface-enabled UdonSharp compiler — C# interfaces, async/await, try/catch, packet networking |

## Add the repository in VCC

1. Open the **VRChat Creator Companion**.
2. Go to **Settings > Packages > Add Repository**.
3. Paste `https://vpm.logiccuteguy.com/index.json` (or use the **Install via VCC** button on the site landing page).

Alternatively, add the listing via `vpm.json`:

```text
https://raw.githubusercontent.com/LogicCuteGuy/LogicCuteGuy/refs/heads/main/vpm.json
```

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

- **Latest version**: 0.2.0 — [all releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.10.5` (strict)
- **Repository**: [LogicCuteGuy/LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp)

Adds source-interface support to UdonSharp and installs the compiler inside LCGUdonSharp instead of VRChat Worlds. See [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) for release history.

Docs: [Overview](lcgudonsharp/intro) · [Installation](lcgudonsharp/install)
