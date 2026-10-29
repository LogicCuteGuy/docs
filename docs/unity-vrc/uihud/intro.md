---
sidebar_position: 1
---

# UIHUD

> Documentation version: **0.1.0** · [Release](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.1.0)

**UIHUD** (`com.logiccuteguy.uihud`) adds a HUD plus slide-in menus and UI widgets to Unity projects. One setup covers **VR, Desktop and Mobile**, in VRChat worlds (UdonSharp) and in standalone Unity games with no VRChat SDK installed.

## Features

- Player HUD (bars, labels, notifications) plus slide-in menus from any side.
- 20+ widgets: Button, Toggle, Slider, Selector, Text Input, Player List, live values, tables, charts (line/bar, pie, bar list, gauge, stat tiles), images, layout containers.
- World-space panels (kiosks, boards, shops) that stay in the world without a manager.
- VR hotbar, wrist and mobile buttons, per-platform visibility.
- Inspector-driven editing with live preview window (`Window > UIHUD Preview`), style presets (Dark / Light / Glass / Neon), menu and widget entrance animations.
- Runtime widget creation from Udon via hidden templates. Everything runs locally (`NoVariableSync`); nothing is synced over the network.

## Requirements

- **Unity** 2022.3
- **TextMeshPro** 3.0.6 (Unity prompts to import TMP Essentials if missing)
- VRChat worlds: **VRChat Worlds SDK** `3.10.5` or newer (UdonSharp). Standalone games: no extra packages.

## Installation

### VCC / ALCOM

1. [Add the LogicCuteGuy VPM repository](https://vpm.logiccuteguy.com/) to VCC/ALCOM, or add `https://vpm.logiccuteguy.com/index.json` manually. Refresh the listing if it is already added.
2. Open **Manage Project** for your Unity project.
3. Find **UIHUD** (`com.logiccuteguy.uihud`) and add **0.1.0**.
4. Open the project in Unity and let the package import.

### Unity Package Manager / manual

In **Window > Package Manager > + > Add package from git URL**, enter:

```text
https://github.com/LogicCuteGuy/UIHUD.git#0.1.0
```

Alternatively place the tagged repository at `Packages/com.logiccuteguy.uihud`, or extract the named `com.logiccuteguy.uihud-0.1.0.zip` from [the release](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.1.0) into that folder, with `package.json` at its root. Do not use GitHub's automatic **Source code (zip)** archive.

Choose **one installation method per project** to avoid duplicate copies.

## Quick start

1. Choose **GameObject > UIHUD > UIHUD System (HUD + Menu)** to build a manager, HUD canvas and main menu with events wired.
2. Press Play and press **M** (desktop), the wrist button (VR), or the **MENU** button (mobile) to open the menu.
3. Select the `UIHUD` manager to rename menus, change sides, and manage HUD items; select a menu canvas to edit pages and widgets.

See [Getting started](./getting-started.md) for the Inspector workflow, widgets, world panels, styling, and the Udon API.

## Samples

Import **Window > Package Manager > UIHUD > Samples > Examples**, then open `Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` and press Play. It covers every widget, both menus, runtime widgets, animations, a synced world panel, and 5 commented example scripts.
