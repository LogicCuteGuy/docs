---
sidebar_position: 2
---

# はじめに

HUD とメニューを作成し、Inspector で編集して、Udon から呼び出します。

## クイックスタート

1. **GameObject > UIHUD > UIHUD System (HUD + Menu)** を選びます。`UIHudManager`、HUD キャンバス、イベント接続済みのメインメニューが作成されます。シーンに EventSystem がなければ追加します。
2. Play を押し、デスクトップでは **M**、VR では手首ボタン（既定は左手）、モバイルでは **MENU** ボタンでメニューを開きます。
3. **Window > Package Manager > UIHUD > Samples > Examples > Import** でサンプルをインポートし、`Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` を開きます。すべてのウィジェット、両方のメニュー、実行時ウィジェット、アニメーション、ワールドパネルを確認できます。

## Inspector で編集する

`UIHUD`（マネージャー）を選択します。

- **Menus**: 名前や表示方向の変更、**Main** の切り替え（M / 手首 / モバイルで開く）、**Edit** で選択、**✕** で削除、**+ Add Menu** で追加します。
- **HUD**: 項目の表示 / 非表示 / 名前変更 / 並べ替えと、**+ Bar / + Label / + Notification** での追加ができます。
- **Open the menu with**: デスクトップのキーと、VR の手首ボタン・モバイルボタンを設定します。

メニューキャンバス（例: `CenterMenu Canvas`）を選択します。

- **Menu**: タイトル、表示方向（Left / Right / Top / Bottom / Center）、サイズプリセット（Small / Wide bar / Big）。
- **Pages**: ○ は開始ページを示します。名前変更（タブ名も変わります）、並べ替え、削除、**+ Add Page** ができます。**Widgets** を選ぶとページをプレビューします。
- **Widgets on the page**: 表示 / 非表示 / 名前変更 / 並べ替え / 削除と、**+ Button / Toggle / Slider / Label / Bar** があります。**+ Add widget** は各種類をスタイル付きでプレビューします。ホバーで確認し、クリックで追加します。コンテナー（Row、Grid、Scroll、Pages）は何段でも入れ子にできます。
- **Quick edit**（ウィジェット行の ▸）: テキスト、フォント、色、配置、高さ（メニュー）またはアンカー / オフセット / サイズ（HUD）、トグルの初期値、スライダーの範囲、スプライト、アクション、コールバックを編集します。コールバックの **Target** を設定すると、**Event Name** はその対象の public メソッドのドロップダウンになります。⧉ はイベントを配線し直してウィジェットを複製します。
- **プレビューウィンドウ**（`Window > UIHUD Preview`）: HUD、メニュー、ワールドパネルをライブ表示します。クリックでウィジェットを選択し（Alt+クリックで該当の部品を選択）、ドラッグで HUD と絶対位置のウィジェットを移動します。内容が高いメニューページは、押し縮めずにスクロールします。

## ウィジェット

ページかキャンバスを選択して、**GameObject > UIHUD > Widgets** から追加します。

| ウィジェット | 用途 |
|---|---|
| `UIHudButton` | オブジェクトの切り替え、メニューの開閉、テレポート、リスポーン、トースト、効果音 |
| `UIHudToggle` | オン / オフのオブジェクト一覧（`isOn`、`SetIsOn`） |
| `UIHudSlider` | 値ラベル、AudioSource の音量（`value`、`SetValue`） |
| `UIHudBar` / Radial Bar | グラデーション付きの体力 / 進行状況（`SetValue`、`SetCurrent`、`Add`） |
| `UIHudNotification` | キューに入るトーストメッセージ（`Show`） |
| `UIHudSelector` | 選択肢の切り替え（`Selected`、`SetIndex`） |
| `UIHudInput` | VRChat キーボードを使うテキスト欄（`text`、`SetText`） |
| `UIHudPlayerList` | インスタンス内のプレイヤー（`Refresh`） |
| `UIHudInfo` | ライブのテンプレートテキスト（`{time} {date} {players} {fps} {name}`） |
| `UIHudPages` | 入れ子にできるタブ付きページ（`ShowPage`） |
| `UIHudValue` | 書式文字列付きで 1 つの変数を監視（`SetValue`、`Refresh`） |
| `UIHudTable` | DataList / DataDictionary / JSON からの行と列（`SetList`、`SetDictionary`、`SetJson`、`Render`） |
| `UIHudGraph` | 監視する変数の折れ線 / 棒の履歴（`AddSample`、`SetSamples`、`Clear`） |
| `UIHudStat` | 大きな数値と増減（`SetValue`） |
| `UIHudPie` / `UIHudBarList` | 名前付き数値の内訳（`SetJson`、`SetEntry`、`SetList`、`SetDictionary`、`Clear`） |
| `UIHudGauge` | 針付きの半円メーター（`SetValue`） |
| Row / Grid / Scroll | レイアウトコンテナー。Scroll は縦のリストと横の帯に対応します |

データ系ウィジェットは `DataDictionary`、`DataList`、JSON を受け取ります。非表示ページのウィジェットは表示時に更新します。履歴を継続して記録するには、常に動くスクリプトから `AddSample` を呼びます。

各ウィジェットはスクリプトを呼び出せます。`target` と `eventName` を設定します。イベントの前にウィジェットの値を受け取る場合は、`valueVariable` も設定します。

## メニュー、ホットバー、ワールドパネル

- `UIHudMenu` はそれぞれ専用のキャンバスを持ち、設定した方向からスライドします。`openWithMainButton` は M / 手首 / MENU の操作対象かを決めます。無効なメニューは、別のボタンからだけ開きます。メニューごとのデスクトップキーと手首 / モバイルボタンは、メニューの Inspector で設定します。
- Udon: `Open`、`Close`、`Toggle`、`ShowPage(i)`、`NextPage`、`PrevPage`、`SetSideLeft` / `Right` / `Top` / `Bottom` / `Center`。
- **Hotbar**（`GameObject > UIHUD > Hotbar`）: 視点より下の別キャンバスです（VR の既定は下向き 45°）。どのウィジェットもスロットにできます。Udon: `Select(i)`、`SelectNext`、`SelectPrevious`、`Deselect`、`Show`、`Hide`、`ToggleVisible`。
- **World Panel**（`GameObject > UIHUD > World Panel (standalone)`）: キオスクや掲示板としてワールドに設置します。マネージャーは不要で、ページ、ウィジェット、スタイル、ズーム / フェードのアニメーションは共通です。どのメニューも Inspector で Player view と World (standalone) を切り替えられます。

## スタイルとアニメーション

- `UIHUD` → **Style** → **New** で `Assets/UIHUD Style.asset` を作成します。プリセットは Dark / Light / Glass / Neon です。編集はすぐに反映され、新しいメニューとウィジェットはスタイルを引き継ぎます。このアセットはエディター専用で、アップロードしても問題ありません。
- メニューの Inspector → **Animation**: Slide / Pop / Fade / Drop / Instant のプリセット、Slide + Fade + Zoom の組み合わせ、イージング、開閉それぞれの時間、ページ切り替えのフェード / スライドを設定します。**▶ Play** は「開く → 保持 → 閉じる」をプレビューします。
- ウィジェットの Inspector → **Entrance**: Fade、Fly、Zoom、Pop、Spin、Typewriter と、With / After previous のタイミング、時間、イージング、移動距離を設定します。ゲーム内では VRCTween で動き、エディターではプレビューウィンドウで確認します。

## マネージャー API と実行時ウィジェット

`OpenMenu`、`CloseMenu`、`ToggleMenu`、`ShowHud`、`HideHud`、`ToggleHud` と、`platform`、`isMenuOpen` があります。開いた / 閉じた / プラットフォーム変更のコールバックも任意で使えます。

Udon はコンポーネントを追加できないため、実行時ウィジェットは非表示のテンプレートをコピーします。マネージャーの Inspector → **Add widgets at runtime → Make runtime templates** で一度作成します（スタイル変更後は作り直します）。

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

種類: Button、Toggle、Slider、Label、Header、Bar、Radial、Notification、Image、Space、Divider、Selector、Input、PlayerList、Info、Row、Grid、Scroll。実行時ウィジェットはローカルのみです。

## 注意事項

- すべてローカルで動作し（`NoVariableSync`）、同期しません。
- キャンバスは Walkthrough レイヤーを使い、キャンバスごとに同じオブジェクトに Ui Shape とコライダーがあります。プレイヤーに追従するキャンバスは Focus View が無効です。デスクトップのプレイヤーは照準で操作するか、Tab を押し続けてカーソルを自由にします。
- スタンドアロンゲームは VRChat SDK なしで動作します。組み込みアセンブリが VRChat API の代わりになり、メインカメラが頭になります。スクリプトは `UdonSharpBehaviour` の書き方のまま使えます。1 人用のため同期は何もせず、`Networking.IsOwner` は常に true です。
