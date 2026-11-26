---
sidebar_position: 4
---

# Scripting

## Calling your script from a widget

Set the widget's **Target** and **Event Name**. To receive the widget's value, also set **Value Variable**. UIHUD writes the value into that variable, then sends the event.

```csharp
public class VolumePanel : UdonSharpBehaviour
{
    [HideInInspector] public float volume;   // Value Variable = volume
    public AudioSource music;

    public void OnVolumeChanged()            // Event Name = OnVolumeChanged
    {
        music.volume = volume;
    }
}
```

The method must be public, and the name must match exactly.

Values your scripts set are kept while the widget's page is hidden. A slider with an **Audio Volume** source starts at that source's volume, and its `SetValue` also sets the volume.

## Manager

| Member | Does |
|---|---|
| `OpenMenu()`, `CloseMenu()`, `ToggleMenu()` | Same as the main button |
| `ShowHud()`, `HideHud()`, `ToggleHud()`, `SetHudVisible(bool)` | HUD visibility |
| `isMenuOpen`, `platform` | Current state. `platform` is `Desktop`, `VR` or `Mobile`. |
| `IsTyping()` | The player is typing in a UIHUD text input |
| `SetWristLeft()`, `SetWristRight()`, `SwapWristHand()` | The hand that wears the wrist button |

For a **Show HUD** toggle, set **Value Variable** to `hudVisibleValue` and **Event** to `_ApplyHudToggle`. A toggle wired to `ToggleHud` gets out of step after your code calls `HideHud`.

For callbacks, set the manager's `callbackTarget` and `onMenuOpenedEvent`, `onMenuClosedEvent` or `onPlatformChangedEvent`.

## Menus

`Open()`, `Close()`, `Toggle()`, `ShowPage(i)`, `NextPage()`, `PrevPage()`, and `SetSideLeft()`, `SetSideRight()`, `SetSideTop()`, `SetSideBottom()`, `SetSideCenter()`.

Each menu also has `callbackTarget` with `onOpenEvent`, `onCloseEvent` and `onPageChangedEvent`.

## Hotbar

`Select(i)`, `SelectNext()`, `SelectPrevious()`, `Deselect()`, `SelectedSlot()`, `selectedIndex`, `Show()`, `Hide()`, `ToggleVisible()`. Call `RefreshSlots()` after adding a slot at runtime:

```csharp
manager.AddWidget("Toggle", hotbar.content, "Light");
hotbar.RefreshSlots();
```

## Runtime widgets

Udon can't add components, so UIHUD copies hidden templates. On the manager, click **Add widgets at runtime > Make runtime templates**. Click it again after changing the style.

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

Kinds: Button, Toggle, Slider, Label, Header, Bar, Radial, Notification, Image, Space, Divider, Selector, Input, PlayerList, Info, Row, Grid, Scroll. The data widgets Value, Table and Graph also work after you rebuild the templates. An unknown kind returns null.

Runtime widgets are **local**. Other players don't see them.

## Data widgets

### Pie and Bar List

Both take named numbers in any of these forms:

- a `DataDictionary`, such as `{"Red": 4}`
- a `DataList` of dictionaries, using `labelKey` and `valueKey`
- a `DataList` of `[name, value]` lists
- the same data as JSON (`SetJson`)

Use `SetEntry(name, value)` to change one entry, and `Clear()` to remove them all. A pie has 8 slices, and further entries are merged into **Other**. A bar list shows 6 rows, sorted from largest to smallest.

### Table

`SetList`, `SetDictionary`, `SetData`, `SetJson`, `Render()`.

| Field | Default | Meaning |
|---|---|---|
| `columns` | `name`, `score` | Keys to read |
| `titles` | `Player`, `Score` | Column headings |
| `sortBy` | `score` | Sort column |
| `descending` | true | Sort order |
| `showRank` | true | Show a rank column |
| `maxRows` | 10 | Rows shown |
| `maxCellChars` | 16 | Longer text is cut and ends in `...` |
| `highlight` | `{me}` | Highlights your own row |
| `emptyText` | `No data` | Shown when there are no rows |

### Graph

`AddSample(v)`, `SetSamples(float[])`, `Clear()`, `SetStyle(0)` for a line or `SetStyle(1)` for bars. It holds 30 points.

A widget on a hidden page or a closed menu doesn't run, so its watched variable is sampled only while it is visible. To keep history, call `AddSample` from a script that is always active.

### Single values

| Widget | Use |
|---|---|
| Stat | `SetValue(v)` shows the number and its change. `higherIsBetter` swaps the colours. |
| Gauge | `SetValue(v)` between `min` and `max` |
| Value | Shows a variable with a format, such as `Coins: {0}` |
| Info | A template with `{time}` `{time12}` `{date}` `{players}` `{fps}` `{name}` `{uptime}` `{height}` |
| Bar | `SetValue(current, max)`, `SetCurrent(v)`, `Add(delta)` |
| Notification | `Show("text")` queues a message |

## Networking

UIHUD syncs nothing. To share state, sync it in your own script and update the widgets on each player. The `ExampleWorldCounter` and `ExamplePoll` samples show how.

## Sample scripts

Import **Examples** from the Package Manager.

| Script | Shows |
|---|---|
| `ExampleHealth` | Buttons calling your methods and driving a HUD bar |
| `ExampleSettings` | Passing widget values to a script |
| `ExampleRuntimeList` | Adding and removing widgets at runtime |
| `ExampleShop` | A shop panel with a live coin value |
| `ExampleMenuEvents` | Manager callbacks |
| `ExampleWorldCounter` | A synced counter |
| `ExamplePoll` | A synced poll using `[NetworkCallable]` |
