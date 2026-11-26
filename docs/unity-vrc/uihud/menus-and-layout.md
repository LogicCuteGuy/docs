---
sidebar_position: 3
---

# Menus, hotbar and world panels

The HUD, the mobile button, the wrist button and every menu each have their own canvas.

## Menus

A `UIHudMenu` slides in from its **side**: Left, Right, Top, Bottom or Center.

### The main button

The **M** key, the VR wrist button and the mobile **MENU** button act as one main button.

| State | What the main button does |
|---|---|
| No main menu is open | Opens every menu with **Open with main button** on, even if another menu is already open |
| A main menu is open | Closes every open menu |

It never opens or closes world panels.

### A menu with its own key

In the menu Inspector, set an **Own desktop key**, such as **Q**, or turn on **Own wrist & mobile button**. Turn **Open with main button** off for a menu that opens separately.

### Behaviour

- Menus always open level, even when your head is tilted.
- Opening a menu that is already open keeps it where it is, so a button inside it can switch pages.
- On desktop and VR a menu stays where it opened, and closes when you walk **Auto Close Distance** away (2.5 by default). On mobile it follows the camera.
- While a player types in a `UIHudInput`, menu keys and hotbar keys 1–9 are ignored. For a text input on a world panel outside the `UIHUD` object, set its **Manager** field.

## Hotbar

Create one with **GameObject > UIHUD > Hotbar**, or **Hotbar > Add hotbar** on the manager. It starts with 6 slots. Every child of its canvas is a slot, and **Add slot ▾** accepts many widget kinds, not only buttons.

The hotbar is separate from the HUD: hiding one doesn't hide the other.

| Platform | Placement | How to use it |
|---|---|---|
| VR | Below your eyes | Look down and point at a slot |
| Desktop | Below your view | Look down and click, or press **1**–**9** |
| Mobile | Bottom of the screen | Tap a slot |

In VR and on desktop it follows your position but keeps its direction while you turn.

| Setting | Default | Meaning |
|---|---|---|
| `vrAngle` | 45 | Degrees below eye level |
| `vrDistance` | 0.6 | Metres away, scaled by avatar height |
| `followTurnAfter` | 90 | Swings back in front after you turn this far. 0 = always turns with you, 180 = never. |
| `vrTurnSmoothing` | 8 | How smoothly it swings back |
| `desktopLockToBody` | on | Off pins it to the bottom of the screen |
| `mobileLockToBody` | off | On locks it to the body, as in VR |

**Show on** turns it on or off per platform. Pressing a button slot selects it, tints it with `selectedColor`, and sends the hotbar's **Event** with the slot index. -1 means none.

## World panels

**GameObject > UIHUD > World Panel (standalone)** creates a menu that stays where you put it, for a kiosk, board or shop. It needs no manager. Any menu can switch between **Player view** and **World (standalone)** in its Inspector.

| Option | Meaning |
|---|---|
| **Visible at start** | Show it when the world loads |
| **Scale (mm per px)** | 1 by default, so 1200 × 820 px is 1.2 × 0.82 m |
| **Move in front of the Scene camera** | Places the panel where you are looking |

Reopen a closed panel with a `UIHudButton` (**Menu To Toggle** or **Open Menu**), or call `Open()`.

## Containers

Row, Grid, Scroll and Pages hold any widget, including other containers, to any depth. Pages can use tabs on the top or left side, or a `< name >` selector. Scroll can be vertical or horizontal. Turn on **Absolute position** on a widget to take it out of the list layout.

## Editor tools

- **Preview window** (**Window > UIHUD Preview**): shows the HUD, a menu or a world panel as in game. Click selects a widget, and Alt+Click selects an exact part.
- **Style:** **New** creates `Assets/UIHUD Style.asset`. The asset is used only in the editor. It repaints scene objects, and nothing reads it at runtime.

## VRChat UI rules

The builder sets these up. Keep them if you build parts by hand.

| Rule | Reason |
|---|---|
| Canvases use the **Walkthrough** layer | VRChat's pointer ignores UI and UiMenu unless the VRChat menu is open |
| **Ui Shape** and its BoxCollider are on the Canvas object | Each canvas catches only its own area |
| **Focus View** is off on canvases attached to the player | It needs the player at least 0.6 m away |
| Exactly one EventSystem | Required for UI input |
| **Navigation** is None | Movement input can't change controls |
| **Raycast Target** is off on text | Labels don't block buttons |
| Event methods are public | UI calls them by name |

Desktop players aim with the crosshair, or hold **Tab** to free the cursor.

:::note
**Hide HUD From Camera** (on by default) moves the HUD to the UI layer, so VRChat camera photos skip it unless the camera's UI option is on. The hotbar has the same option. Menus can't be hidden this way, because VRChat's pointer ignores that layer.
:::

## Standalone games

Without the VRChat SDK:

- The main camera is the head, and the feet are 1.6 m below it. Add **UIHudStandalonePlayer** for a real character.
- Mouse and touch use an EventSystem with a StandaloneInputModule. Keyboard shortcuts need **Input Manager** or **Both** under **Active Input Handling**.
- Pointing with VR controllers needs your own XR UI input module.
- UIHUD uses unscaled time, so menus work while the game is paused.
- Network sync does nothing, and `Networking.IsOwner` is always true.
- The Examples sample scene works only in VRChat.
