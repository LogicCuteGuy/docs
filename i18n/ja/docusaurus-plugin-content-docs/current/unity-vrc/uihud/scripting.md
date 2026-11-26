---
sidebar_position: 4
---

# スクリプト

## ウィジェットからスクリプトを呼び出す

ウィジェットの **Target** と **Event Name** を設定します。ウィジェットの値を受け取る場合は、**Value Variable** も設定します。UIHUD はその変数に値を書き込んでから、イベントを送ります。

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

メソッドは public で、名前が完全に一致している必要があります。

スクリプトで設定した値は、ウィジェットのページが非表示の間も保持されます。**Audio Volume** ソースを持つスライダーはその音量から開始し、`SetValue` は音量も設定します。

## マネージャー

| メンバー | 動作 |
|---|---|
| `OpenMenu()`、`CloseMenu()`、`ToggleMenu()` | メインボタンと同じです |
| `ShowHud()`、`HideHud()`、`ToggleHud()`、`SetHudVisible(bool)` | HUD の表示 |
| `isMenuOpen`、`platform` | 現在の状態。`platform` は `Desktop`、`VR`、`Mobile` のいずれかです。 |
| `IsTyping()` | プレイヤーが UIHUD のテキスト欄に入力中です |
| `SetWristLeft()`、`SetWristRight()`、`SwapWristHand()` | 手首ボタンを付ける手 |

**Show HUD** トグルは、**Value Variable** を `hudVisibleValue`、**Event** を `_ApplyHudToggle` に設定します。トグルを `ToggleHud` に接続すると、コードが `HideHud` を呼んだ後に状態がずれます。

コールバックを使うには、マネージャーの `callbackTarget` と `onMenuOpenedEvent`、`onMenuClosedEvent`、`onPlatformChangedEvent` を設定します。

## メニュー

`Open()`、`Close()`、`Toggle()`、`ShowPage(i)`、`NextPage()`、`PrevPage()`、`SetSideLeft()`、`SetSideRight()`、`SetSideTop()`、`SetSideBottom()`、`SetSideCenter()`。

各メニューにも `callbackTarget` と `onOpenEvent`、`onCloseEvent`、`onPageChangedEvent` があります。

## ホットバー

`Select(i)`、`SelectNext()`、`SelectPrevious()`、`Deselect()`、`SelectedSlot()`、`selectedIndex`、`Show()`、`Hide()`、`ToggleVisible()`。実行時にスロットを追加したら `RefreshSlots()` を呼びます。

```csharp
manager.AddWidget("Toggle", hotbar.content, "Light");
hotbar.RefreshSlots();
```

## 実行時ウィジェット

Udon はコンポーネントを追加できないため、UIHUD は非表示のテンプレートをコピーします。マネージャーの **Add widgets at runtime > Make runtime templates** を押します。スタイルを変更した後は、もう一度押してください。

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

種類: Button、Toggle、Slider、Label、Header、Bar、Radial、Notification、Image、Space、Divider、Selector、Input、PlayerList、Info、Row、Grid、Scroll。データ系の Value、Table、Graph も、テンプレートを作り直せば使えます。不明な種類は null を返します。

実行時ウィジェットは**ローカル**で、他のプレイヤーには見えません。

## データウィジェット

### Pie と Bar List

どちらも、名前付きの数値を次のどの形式でも受け取ります。

- `{"Red": 4}` のような `DataDictionary`
- `labelKey` と `valueKey` を使う、dictionary の `DataList`
- `[name, value]` のリストの `DataList`
- 同じデータの JSON（`SetJson`）

1 項目の変更は `SetEntry(name, value)`、全削除は `Clear()` を使います。円グラフは 8 区画で、超えた項目は **Other** にまとめます。バーリストは大きい順に 6 行を表示します。

### Table

`SetList`、`SetDictionary`、`SetData`、`SetJson`、`Render()`。

| フィールド | 既定値 | 意味 |
|---|---|---|
| `columns` | `name`、`score` | 読み取るキー |
| `titles` | `Player`、`Score` | 列の見出し |
| `sortBy` | `score` | 並べ替える列 |
| `descending` | true | 並び順 |
| `showRank` | true | 順位の列を表示します |
| `maxRows` | 10 | 表示する行数 |
| `maxCellChars` | 16 | これより長い文字列は切り詰めて `...` を付けます |
| `highlight` | `{me}` | 自分の行を強調します |
| `emptyText` | `No data` | 行がないときに表示します |

### Graph

`AddSample(v)`、`SetSamples(float[])`、`Clear()`、折れ線は `SetStyle(0)`、棒は `SetStyle(1)` です。30 点を保持します。

非表示ページや閉じたメニューのウィジェットは動作しないため、監視する変数は表示中だけサンプリングされます。履歴を保つには、常にアクティブなスクリプトから `AddSample` を呼んでください。

### 単一の値

| ウィジェット | 使い方 |
|---|---|
| Stat | `SetValue(v)` で数値と増減を表示します。`higherIsBetter` で色を入れ替えます。 |
| Gauge | `min` から `max` の範囲で `SetValue(v)` |
| Value | `Coins: {0}` のような書式で変数を表示します |
| Info | `{time}` `{time12}` `{date}` `{players}` `{fps}` `{name}` `{uptime}` `{height}` を使うテンプレート |
| Bar | `SetValue(current, max)`、`SetCurrent(v)`、`Add(delta)` |
| Notification | `Show("text")` でメッセージをキューに追加します |

## ネットワーク

UIHUD は何も同期しません。状態を共有するには、自分のスクリプトで同期し、各プレイヤー側でウィジェットを更新します。サンプル `ExampleWorldCounter` と `ExamplePoll` がその方法を示します。

## サンプルスクリプト

Package Manager から **Examples** をインポートします。

| スクリプト | 内容 |
|---|---|
| `ExampleHealth` | ボタンからメソッドを呼び、HUD のバーを動かします |
| `ExampleSettings` | ウィジェットの値をスクリプトに渡します |
| `ExampleRuntimeList` | 実行時のウィジェットの追加と削除 |
| `ExampleShop` | ライブのコイン数を表示するショップパネル |
| `ExampleMenuEvents` | マネージャーのコールバック |
| `ExampleWorldCounter` | 同期するカウンター |
| `ExamplePoll` | `[NetworkCallable]` を使う同期投票 |
