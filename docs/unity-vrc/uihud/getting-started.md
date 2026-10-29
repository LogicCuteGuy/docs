---
sidebar_position: 2
---

# Getting started

Build a HUD plus menu, edit it in the Inspector, and call it from Udon.

## Quick start

1. Choose **GameObject > UIHUD > UIHUD System (HUD + Menu)**. This builds a `UIHudManager`, HUD canvas, and main menu with events wired. An EventSystem is added if the scene lacks one.
2. Press Play. Open the menu with **M** on desktop, the wrist button in VR (left hand by default), or the **MENU** button on mobile.
3. Import the sample via **Window > Package Manager > UIHUD > Samples > Examples > Import**, then open `Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` to see every widget, both menus, runtime widgets, animations, and a world panel.

## Edit in the Inspector

Select `UIHUD` (the manager):

- **Menus**: rename, change side, toggle **Main** (opens with M / wrist / mobile), **Edit** selects it, delete with **✕**, add with **+ Add Menu**.
- **HUD**: show / hide / rename / reorder items, add **+ Bar / + Label / + Notification**.
- **Open the menu with**: desktop key plus VR wrist and mobile buttons.

Select a menu canvas (for example `CenterMenu Canvas`):

- **Menu**: title, side (Left / Right / Top / Bottom / Center), size presets (Small / Wide bar / Big).
- **Pages**: the ○ marks the start page. Rename (also renames the tab), reorder, delete, **+ Add Page**. Select **Widgets** to preview a page.
- **Widgets on the page**: show / hide / rename / reorder / delete, plus **+ Button / Toggle / Slider / Label / Bar**. **+ Add widget** shows a styled preview of each kind; hover to preview, click to add. Containers (Row, Grid, Scroll, Pages) hold nested widgets to any depth.
- **Quick edit** (▸ on a widget row): text, font, color, alignment, height (menus) or anchor / offset / size (HUD), toggle defaults, slider ranges, sprites, actions, and callbacks. Setting a callback **Target** turns **Event Name** into a dropdown of that target's public methods. ⧉ duplicates a widget with events rewired.
- **Preview window** (`Window > UIHUD Preview`): live view of HUD, menus, and world panels. Click selects the widget (Alt+Click selects the exact part); drag moves HUD and Absolute-position widgets. Menu pages scroll instead of squashing tall content.

## Widgets

Add from **GameObject > UIHUD > Widgets** with a page or canvas selected:

| Widget | Use |
|---|---|
| `UIHudButton` | Toggle objects, open / close menus, teleport, respawn, toast, sound |
| `UIHudToggle` | On / off object lists (`isOn`, `SetIsOn`) |
| `UIHudSlider` | Value label, AudioSource volume (`value`, `SetValue`) |
| `UIHudBar` / Radial Bar | Health / progress with gradient fill (`SetValue`, `SetCurrent`, `Add`) |
| `UIHudNotification` | Queued toast messages (`Show`) |
| `UIHudSelector` | Option picker (`Selected`, `SetIndex`) |
| `UIHudInput` | Text field with VRChat keyboard (`text`, `SetText`) |
| `UIHudPlayerList` | Players in instance (`Refresh`) |
| `UIHudInfo` | Live template text (`{time} {date} {players} {fps} {name}`) |
| `UIHudPages` | Nested tabbed pages (`ShowPage`) |
| `UIHudValue` | One watched variable with format string (`SetValue`, `Refresh`) |
| `UIHudTable` | Rows / columns from DataList / DataDictionary / JSON (`SetList`, `SetDictionary`, `SetJson`, `Render`) |
| `UIHudGraph` | Line / bar history from a sampled variable (`AddSample`, `SetSamples`, `Clear`) |
| `UIHudStat` | Big number plus delta (`SetValue`) |
| `UIHudPie` / `UIHudBarList` | Named-number breakdowns (`SetJson`, `SetEntry`, `SetList`, `SetDictionary`, `Clear`) |
| `UIHudGauge` | Half-circle dial with needle (`SetValue`) |
| Row / Grid / Scroll | Layout containers; Scroll supports vertical lists and horizontal strips |

Data widgets accept `DataDictionary`, `DataList`, or JSON. Widgets on hidden pages update when shown; for continuous history, call `AddSample` from an always-on script.

Each widget can call a script: set `target` and `eventName`, and optionally `valueVariable` to receive the widget value before the event runs.

## Menus, hotbar, and world panels

- Every `UIHudMenu` sits on its own canvas and slides in from its side. `openWithMainButton` controls M / wrist / MENU handling; menus with it off open only from another button. Optional per-menu desktop key and wrist / mobile buttons are set in the menu Inspector.
- Udon: `Open`, `Close`, `Toggle`, `ShowPage(i)`, `NextPage`, `PrevPage`, `SetSideLeft` / `Right` / `Top` / `Bottom` / `Center`.
- **Hotbar** (`GameObject > UIHUD > Hotbar`): separate canvas below the viewpoint (VR default 45° down). Any widget can be a slot. Udon: `Select(i)`, `SelectNext`, `SelectPrevious`, `Deselect`, `Show`, `Hide`, `ToggleVisible`.
- **World Panel** (`GameObject > UIHUD > World Panel (standalone)`): stays in the world for kiosks and boards. No manager needed; uses the same pages, widgets, styles, and zoom / fade animations. Any menu can switch between Player view and World (standalone) in its Inspector.

## Style and animation

- Select `UIHUD` → **Style** → **New** to create `Assets/UIHUD Style.asset`. Presets: Dark / Light / Glass / Neon. Edits apply live; new menus and widgets inherit the style. The asset is editor-only and safe for upload.
- Menu Inspector → **Animation**: Slide / Pop / Fade / Drop / Instant presets, mixed Slide + Fade + Zoom, easing, separate open / close times, and page-switch fade / slide. **▶ Play** previews open → hold → close.
- Widget Inspector → **Entrance**: Fade, Fly, Zoom, Pop, Spin, Typewriter with With / After previous timing, duration, easing, and fly distance. Driven by VRCTween in game; sampled in the Preview window in the editor.

## Manager API and runtime widgets

`OpenMenu`, `CloseMenu`, `ToggleMenu`, `ShowHud`, `HideHud`, `ToggleHud`, plus `platform` and `isMenuOpen`, with optional opened / closed / platform-changed callbacks.

Udon cannot add components, so runtime widgets copy hidden templates. Build them once via Manager Inspector → **Add widgets at runtime → Make runtime templates** (rebuild after style changes):

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

Kinds: Button, Toggle, Slider, Label, Header, Bar, Radial, Notification, Image, Space, Divider, Selector, Input, PlayerList, Info, Row, Grid, Scroll. Runtime widgets are local only.

## Notes

- Everything runs locally (`NoVariableSync`); nothing is synced.
- Canvases use the Walkthrough layer with a same-object Ui Shape and collider per canvas; Focus View stays off on player-attached canvases. Desktop players aim with the crosshair or hold Tab for a free cursor.
- Standalone games work without the VRChat SDK: built-in assemblies stand in for VRChat APIs, the main camera is the head, and scripts keep using `UdonSharpBehaviour` patterns. Single player: sync is a no-op and `Networking.IsOwner` is always true.
