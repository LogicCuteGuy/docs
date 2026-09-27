---
sidebar_position: 2
---

# Packages

Packages published through the **LogicCuteGuy VPM Listing**, plus packages installed directly from GitHub.

**Listing URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| Package ID | Display Name | Latest | Unity | Description |
|---|---|---|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | 15+ editor utilities for scene management, object manipulation, and optimization |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.4` | 2022.3 | Interface-enabled UdonSharp compiler — interfaces, async/await, exceptions, collections/JSON, packet networking |

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

- **Latest version**: 0.3.4 — [all releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.10.5` (strict)
- **Repository**: [LogicCuteGuy/LCGUdonSharp](https://github.com/LogicCuteGuy/LCGUdonSharp)

Adds interfaces, compiler-managed exceptions, async lowering, C# collection/JSON lowering, extended language features, and experimental packet networking to UdonSharp. The compiler is installed from `Payload~/UdonSharp` without modifying the Worlds SDK package. See [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) for release history.

Docs: [Overview](lcgudonsharp/intro) · [Installation](lcgudonsharp/install)

## GitHub packages

### `com.logiccuteguy.digholeit` — DigHoleIt

- **Latest version**: 0.4.0 — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.4.0)
- **Unity**: 2022.3, Built-in Render Pipeline
- **VRChat dependencies**: `com.vrchat.worlds` `3.10.5`, `com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- **License**: MIT
- **Repository**: [LogicCuteGuy/DigHoleIt](https://github.com/LogicCuteGuy/DigHoleIt)

Install through Unity Package Manager with the Git URL `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.4.0`, embed the repository at `Packages/com.logiccuteguy.digholeit`, or extract the named `com.logiccuteguy.digholeit-0.4.0.zip` release asset. DigHoleIt is not currently included in the LogicCuteGuy VPM listing.

Docs: [Overview](digholeit/intro) · [Getting started](digholeit/getting-started)
