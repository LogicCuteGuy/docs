---
sidebar_position: 1
---

# UIHUD

> ドキュメントバージョン: **0.2.0** · [リリースノート](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0)

**UIHUD**（`com.logiccuteguy.uihud`）は、Unity プロジェクトに HUD、スライドインメニュー、UI ウィジェットを追加します。1 つの設定で **VR、Desktop、Mobile** に対応し、VRChat ワールド（UdonSharp）でも、VRChat SDK を入れていないスタンドアロンの Unity ゲームでも使えます。

## 0.2.0 の新機能

- UIHUD のテキスト入力中は、メニューキーとホットバーの 1〜9 キーを無視します。
- メインボタンは、ワールドパネルを開閉しません。
- VR のメニューは、頭を傾けていても水平に開きます。開いているメニューをもう一度開くと、位置はそのままです。
- **Show HUD** トグルをコードと一致させられます。値の変数 `hudVisibleValue` とイベント `_ApplyHudToggle` を使います。
- テーブルは長いセルを `...` で切り詰めます（`maxCellChars`、既定は 16）。
- スクリプトで設定した値は、非表示のページを初めて表示しても保持されます。
- サンプルに、同期する投票やショップなどのワールドパネルを追加しました。

## 0.1.2 の新機能

- Worlds SDK への VPM 依存関係を `3.x.x`（`>=3.10.5`）に緩和しました。VRChat SDK 3.10.6 以降にもインストールできます。

## 0.1.1 の新機能

- トグルのチェックマークがチェックボックス全体に広がります。
- README にスクリーンショット集を追加しました。

## 機能

- プレイヤー HUD（バー、ラベル、通知）と、どの方向からも出せるスライドインメニュー。
- 20 種類以上のウィジェット: Button、Toggle、Slider、Selector、Text Input、Player List、ライブ値、テーブル、グラフ（折れ線/棒、円、バーリスト、ゲージ、数値タイル）、画像、レイアウトコンテナー。
- マネージャーなしでワールドに設置できるワールドパネル（キオスク、掲示板、ショップ）。
- VR ホットバー、手首ボタンとモバイルボタン、プラットフォームごとの表示設定。
- ライブプレビューウィンドウ（`Window > UIHUD Preview`）付きの Inspector 編集、スタイルプリセット（Dark / Light / Glass / Neon）、メニューとウィジェットの登場アニメーション。
- 非表示のテンプレートを使った、Udon からの実行時ウィジェット生成。すべてローカルで動作し（`NoVariableSync`）、ネットワーク同期は行いません。

## 要件

- **Unity** 2022.3
- **TextMeshPro** 3.0.6（TMP Essentials がない場合は、Unity がインポートを案内します）
- VRChat ワールド: **VRChat Worlds SDK** `3.10.5` 以降（UdonSharp）。スタンドアロンゲームは追加パッケージ不要です。

## インストール

### VCC / ALCOM

1. VCC/ALCOM に [LogicCuteGuy の VPM リポジトリを追加](https://vpm.logiccuteguy.com/)するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。追加済みの場合はリストを更新します。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **UIHUD**（`com.logiccuteguy.uihud`）を探して **0.2.0** を追加します。
4. Unity でプロジェクトを開き、パッケージのインポートを待ちます。

### Unity Package Manager / 手動

**Window > Package Manager > + > Add package from git URL** に次を入力します。

```text
https://github.com/LogicCuteGuy/UIHUD.git#0.2.0
```

タグ付きのリポジトリを `Packages/com.logiccuteguy.uihud` に置くか、[リリース](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0)の `com.logiccuteguy.uihud-0.2.0.zip` を、`package.json` がルートになるように同じフォルダーへ展開することもできます。GitHub が自動生成する **Source code (zip)** は使わないでください。

コピーの重複を避けるため、**インストール方法はプロジェクトごとに 1 つ**にしてください。

## クイックスタート

1. **GameObject > UIHUD > UIHUD System (HUD + Menu)** を選ぶと、マネージャー、HUD キャンバス、イベント接続済みのメインメニューが作成されます。
2. Play を押し、**M**（デスクトップ）、手首ボタン（VR）、**MENU** ボタン（モバイル）でメニューを開きます。
3. `UIHUD` マネージャーを選択して、メニュー名の変更、表示方向の変更、HUD の項目の管理を行います。メニューキャンバスを選択すると、ページとウィジェットを編集できます。

Inspector での作業とウィジェットは[はじめに](./getting-started.md)、レイアウトは[メニュー、ホットバー、ワールドパネル](./menus-and-layout.md)、Udon API は[スクリプト](./scripting.md)を参照してください。

## サンプル

**Window > Package Manager > UIHUD > Samples > Examples** でインポートし、`Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` を開いて Play を押します。すべてのウィジェット、両方のメニュー、実行時ウィジェット、アニメーション、同期するカウンターと投票があるワールドパネル、コメント付きのサンプルスクリプト 7 本を含みます。
