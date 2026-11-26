---
sidebar_position: 2
---

# パッケージ

**リスト URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| パッケージ ID | 表示名 | 最新版 | Unity | 概要 |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | シーン管理、オブジェクト操作、最適化用の 15 以上の Editor ツール |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.5.0` | 2022.3 | コンパイラーフックで SDK の UdonSharp にインターフェース、async/await、try/catch、コレクション/JSON、拡張 C# を追加 |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.7.2` | 2022.3 | 同期 runtime edit、foliage、package example、seam のない terrain hole edge に対応した掘削可能な voxel zone |
| `com.logiccuteguy.blendproperty` | Blend Property | `0.2.2` | 2022.3+ | Unity mesh modifier stack と GPU physics、VRChat/native standalone 共通 component |
| `com.logiccuteguy.wasm2hlsl` | WASM2HLSL for UdonSharp | `0.2.2` | 2022.3 | `.wasm` WebAssembly カーネルを HLSL シェーダーとして GPU 上で実行し、UdonSharp から async GPU readback で読む |
| `com.logiccuteguy.uihud` | UIHUD | `0.2.0` | 2022.3 | VRChat ワールドとスタンドアロン Unity ゲーム向けの HUD、スライドインメニュー、UI ウィジェット。VR、デスクトップ、モバイルに対応 |
| `com.logiccuteguy.lcglocalization` | LCG Localization | `0.1.0` | 2022.3 | Unity Localization のテーブルを Udon にベイクする、UdonSharp 向けのテキストとアセットのローカライズ |
| `com.logiccuteguy.clientnetsim` | ClientSim Net | `0.1.2` | 2022.3 | VRChat ClientSim 向けのマルチプレイヤーネットワークシミュレーター。リモートのパペットプレイヤー、遅延/ジッター/ロス、所有権、途中参加、ネットワークデバッガー |
| `com.logiccuteguy.lcgnetwork` | LCG Network System | `0.1.0` | 2022.3 | VRChat ワールド向けのゾーン単位ネットワーク。通常の UdonSharp、Udon Graph、Udon Assembly の通信をゾーン経由にします |
| `com.logiccuteguy.openworld` | OpenWorld | `0.0.1` | 2022.3 | VRChat 向けのチャンクグリッド型ワールドエンジン。チャンクストリーミング、インポスター、GPU インスタンシングの Block、ランタイム編集 |
| `com.logiccuteguy.streamdata` | StreamData | `0.0.1` | 2022.3 | ワールドの読み込み後にテクスチャとライトマップを Web からストリーミング。GitHub Pages や自前のホストへの公開にも対応 |
| `com.logiccuteguy.zonedraw` | ZoneDraw | `0.1.0` | 2022.3 | クリックで見えないバリア壁やトリガーゾーンを描画し、通常のコライダーにベイク。UdonSharp API 付き |

## VCC にリポジトリを追加する

1. **VRChat Creator Companion** を開きます。
2. **Settings > Packages > Add Repository** を選びます。
3. `https://vpm.logiccuteguy.com/index.json` を貼り付けます。

VCC/ALCOM からのインストールを推奨します。LCGUdonSharp は GitHub Releases でも検証済みの名前付き ZIP を公開しています。GitHub が自動生成する **Source code (zip)** は Unity パッケージとして使用できません。

## パッケージ詳細

### LogicCuteGuy Help Tools `1.0.1`

- [リポジトリ](https://github.com/LogicCuteGuy/UnityHelpTools) · [リリース](https://github.com/LogicCuteGuy/UnityHelpTools/releases)
- ライセンス: MIT
- [概要](./helptools/intro.md) · [インストール](./helptools/install.md)

### LCGUdonSharp `0.5.0`

LCGUdonSharp **0.5.0** は VRChat SDK の UdonSharp を置き換えずにフックします。インストーラーはなく、SDK のファイルも変更しません。Worlds SDK `>=3.10.6 <3.11.0` が必要です。コンパイラー側のネットワーク機能は削除され（[LCG Network System](./lcgnetwork/intro) を参照）、SBP 互換パッケージは不要になり、リリースにサンプルはありません。0.4.x 以前からの更新には追加の手順が必要です。[インストール](./lcgudonsharp/install.md)を参照してください。以下の以前のバージョンの説明は履歴です。

0.3.12 は、インストール済みの VRChat Worlds SDK が対応バージョン `3.10.5` と異なる場合に、ブロックではなく**警告**するようになりました。ペイロード（SDK 3.10.5 でビルド）はそのままインストールされ、**Tools > LCGUdonSharp > Restore** でバックアップ済みの元の UdonSharp に戻せる旨が表示されます。また `package.json` に **LCGUdonSharp Examples** サンプルを宣言したため、Package Manager に表示されます。自動コンパイラインストール完了後にインポートしてください。

LCGUdonSharp 0.3.10 は Unity のコンパイル前に VPM で埋め込み **SBP compatibility 1.21.26** を導入し、新規・更新時の VRChat SDK `ExtensionMethods` 衝突を防ぎます。Unity SBP 1.21.25 を基にソース・GUID・Unity Companion License を保持し、`Library` 再生成後も残ります。Unity Localization 1.4.5 は引き続き対応します。[インストール](./lcgudonsharp/install.md)を参照してください。手動導入には **両方** のリリース ZIP が必要です。

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./lcgudonsharp/localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。

LCGUdonSharp 0.3.8 は入れ子・多態的な [ScriptableObject データスナップショット](./lcgudonsharp/scriptableobjects.md)、実行時の型判定とチェック付きキャスト、循環・深度の検証、ローカル装備サンプルに対応します。型タグ付きの新しいレイアウトを使用するため、更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。

- [リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp) · [リリース](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- 依存関係: `com.vrchat.worlds` `>=3.10.6`（コンパイラーの対応範囲は `>=3.10.6 <3.11.0`）
- ライセンス: MIT
- [概要](./lcgudonsharp/intro.md) · [インストール](./lcgudonsharp/install.md)

VRChat 向けの UdonSharp コンパイラー拡張です。C# インターフェース、ビルド時の async/await、同期的な try/catch/finally、コレクション/JSON、拡張言語機能を追加します。

### DigHoleIt

DigHoleIt 0.7.0 は Dig Pen prefab、実行時の木・detail の配置/削除（Bake 済み foliage を含む）、同期 smoothing、VRChat showcase、Refresh Holes / Refresh Zones を追加します。設定はローカルで、VRChat edit は同期され late joiner に replay されます。

- 最新版: `0.7.2` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2)
- Unity 2022.3、Built-in Render Pipeline
- VRChat 依存関係: `com.vrchat.worlds` `3.x.x`（`>=3.10.5`）
- [リポジトリ](https://github.com/LogicCuteGuy/DigHoleIt) · [リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2)
- ライセンス: MIT

[LogicCuteGuy VPM リスト](https://vpm.logiccuteguy.com/index.json)を更新し、VCC/ALCOM で **0.7.2** を導入できます。ほかに `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.2`、tag repository の埋め込み、[リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.2)の `com.logiccuteguy.digholeit-0.7.2.zip` の展開にも対応します。自動生成 source archive は使わないでください。VRChat の Git/ZIP 導入では先に LCGUdonSharp を[インストール](./lcgudonsharp/install.md)します。

0.6.1 は Bake/move/resize の Undo、terrain-hole seam、foliage shading、無効な edge collision mesh を修正します。

[概要](./digholeit/intro.md) · [はじめに](./digholeit/getting-started.md)

### `com.logiccuteguy.blendproperty` — Blend Property

0.2.1 はドキュメント更新です。VCC/ALCOM の手順と Git/ZIP による代替インストールを明確にします。Runtime code と example asset は 0.2.0 から変更ありません。

0.2.0 は VRChat panel の互換性を修正します。Control Panel と Cloth Panel は `NoVariableSync` を使用し、`Manual` の Synced Control Panel と同じ GameObject に置けます。Example の Bake 済み GPU deform texture の shader 参照と VRChat scene も更新します。既存の GPU/native physics は引き続き利用できます。

- **最新版**: 0.2.2 — [release](https://github.com/LogicCuteGuy/BlendProperty/releases/tag/v0.2.2)
- **Unity**: 2022.3 以降
- **License**: MIT
- **依存関係**: `com.unity.ugui` `1.0.0`。ProBuilder/Unity Splines は任意。VRChat は Worlds SDK/UdonSharp
- **Repository**: [LogicCuteGuy/BlendProperty](https://github.com/LogicCuteGuy/BlendProperty)

VCC/ALCOM の VPM リスト、`https://github.com/LogicCuteGuy/BlendProperty.git#v0.2.2`、`Packages/com.logiccuteguy.blendproperty` への埋め込み、または名前付き `com.logiccuteguy.blendproperty-0.2.2.zip` release asset を使います。

重複を避けるため project ごとに方法を一つだけ選びます。[インストール手順](./blendproperty/intro.md)を参照してください。

[概要と設定](./blendproperty/intro.md) · [Modifier](./blendproperty/modifiers.md) · [Runtime/build](./blendproperty/runtime.md)

0.1.1 は live GPU modifier、cloth/soft body、fluid、hair、particle、paint/waves、destruction、ocean、interaction を追加します。Worlds SDK なしでも共通 component が native 動作します。Array/Curve は任意の Unity Splines、Array は Split Copies/Collider Per Copy に対応します。Control の同期と GPU simulation 全状態の同期は別です。[Runtime/build](./blendproperty/runtime.md)と [Physics/material](./blendproperty/physics.md)を参照してください。

### `com.logiccuteguy.wasm2hlsl` — WASM2HLSL for UdonSharp

WASM2HLSL 0.2.0 は大きな定数テーブルをテクスチャから読みます。1 KB 以上の `.rodata`（`static` / `const` テーブル、`include_bytes!`）は `_WasmRom` として設定された `rom` テクスチャから供給され、64000 バイトのメモリ制限の対象外になります（ソース変更は不要）。**Texture Constants From (bytes)** インポート設定でしきい値を決めます（デフォルト 1024、0 はすべてレジスタ内）。混雑したインスタンスでのオーディオ途切れ、hitch 後の Chroma write-ahead 再同期（新 `maxLead`、131072 フレームの出力リング）、ワールド退出時の `WasmGpuRunner` の Udon 例外も修正します。[CHANGELOG.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/0.2.0/CHANGELOG.md) を参照。

WASM2HLSL 0.1.0 は WebAssembly モジュールを HLSL シェーダーに変換し、UdonSharp から GPU 上で実行します。`.wasm` を `Assets/` に置くと、インポーターが export ごとに shader/material/render texture を `.wasm` アセット内に生成します。`WasmGpuRunner` が引数と入力を設定してピクセルごとに 1 回 blit し、`VRCAsyncGPUReadback` で結果を読み戻します。カーネルは Rust/C/Zig/AssemblyScript/TinyGo で書き、ソースの `@size` / `@traps` タグで設定します。`f32`/`f64`/`i64`/`v128` と参照型に対応し、GPU の `f32` 丸め以外はビット一致です。

- **最新版**: 0.2.2 — [release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.2.2)
- **Unity**: 2022.3
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.x.x`（`>=3.10.5`）
- **Repository**: [LogicCuteGuy/WASM2HLSL](https://github.com/LogicCuteGuy/WASM2HLSL)

VCC/ALCOM の VPM リスト（先に更新）、`https://github.com/LogicCuteGuy/WASM2HLSL.git#0.2.2`、`Packages/com.logiccuteguy.wasm2hlsl` への埋め込み、または名前付き `com.logiccuteguy.wasm2hlsl-0.2.2.zip` release asset を使います。重複を避けるため project ごとに方法を一つだけ選び、Git/ZIP では先に [LCGUdonSharp](./lcgudonsharp/install.md) をインストールしてください。

ドキュメント: [概要](./wasm2hlsl/intro.md) · [はじめに](./wasm2hlsl/getting-started.md)

### `com.logiccuteguy.uihud` — UIHUD

UIHUD 0.1.0 は、VRChat ワールドとスタンドアロン Unity ゲームに HUD、スライドインメニュー、20 種類以上の UI ウィジェットを追加しました。1 つの設定で VR、デスクトップ、モバイルに対応します。プレイヤー HUD、スライドインメニュー、ワールドパネル、ホットバー、手首/モバイルボタン、スタイルプリセット、メニューとウィジェットのアニメーション、Udon からの実行時ウィジェット生成を含みます。すべてローカルで動作します（`NoVariableSync`）。

0.1.2 は Worlds SDK への依存関係を `3.x.x`（`>=3.10.5`）に緩和しました。0.1.1 はトグルのチェックマークをチェックボックス全体に広げ、README にスクリーンショット集を追加しました。

- **最新バージョン**: 0.2.0 — [リリース](https://github.com/LogicCuteGuy/UIHUD/releases/tag/0.2.0)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **依存関係**: `com.unity.textmeshpro` `3.0.6`, `com.unity.ugui` `1.0.0`, `com.unity.modules.physics` `1.0.0`, `com.unity.modules.xr` `1.0.0`
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **リポジトリ**: [LogicCuteGuy/UIHUD](https://github.com/LogicCuteGuy/UIHUD)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/UIHUD.git#0.2.0` を使うか、`Packages/com.logiccuteguy.uihud` に配置するか、リリースの `com.logiccuteguy.uihud-0.2.0.zip` を展開します。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./uihud/intro.md) · [はじめに](./uihud/getting-started.md) · [メニュー、ホットバー、ワールドパネル](./uihud/menus-and-layout.md) · [スクリプト](./uihud/scripting.md)

### `com.logiccuteguy.lcglocalization` — LCG Localization

LCG Localization 0.1.0 は最初のリリースです。Unity の String Table と Asset Table を Udon にベイクし、マネージャーの直接呼び出し、ドロップダウン、コールバック、Smart 変数、スプライト/テクスチャ/音声/プレハブのバリアントとフォールバックに対応します。VRChat SDK の UdonSharp で動作し、LCGUdonSharp は任意です。

- **最新バージョン**: 0.1.0 — [リリース](https://github.com/LogicCuteGuy/LCGLocalization/releases/tag/0.1.0)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **依存関係**: `com.unity.localization` `1.4.5`, `com.unity.scriptablebuildpipeline` `1.21.25`
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`), `com.unity.scriptablebuildpipeline` `1.x.x` (`>=1.21.26`)
- **リポジトリ**: [LogicCuteGuy/LCGLocalization](https://github.com/LogicCuteGuy/LCGLocalization)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/LCGLocalization.git#0.1.0` を使います。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./lcglocalization/intro.md)

### `com.logiccuteguy.clientnetsim` — ClientSim Net

ClientSim Net 0.1.2 は、各プレイヤーのワールドに全 PlayerObject のコピーを持たせ、PlayerObject の同期とイベントが各プレイヤー自身のクライアントで実行されるようにしました。0.1.1 は他のプレイヤーをすべてのワールドに名前付きカプセルで表示します。0.1.0 は最初のリリースです。VRChat の ClientSim に、それぞれ自分のワールドのコピーを動かすリモートのパペットプレイヤーを追加します。遅延、ジッター、ロス、実際の `RequestSerialization`/`OnDeserialization`、ネットワークイベントの送信先とレート制限、所有権、途中参加、ObjectSync 付きピックアップ、ネットワークデバッガー、テスト用サンプルワールドを含みます。

- **最新バージョン**: 0.1.2 — [リリース](https://github.com/LogicCuteGuy/ClientSimNet/releases/tag/0.1.2)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **VPM の依存関係**: `com.vrchat.worlds` `>=3.10.0`
- **リポジトリ**: [LogicCuteGuy/ClientSimNet](https://github.com/LogicCuteGuy/ClientSimNet)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/ClientSimNet.git#0.1.2` を使います。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./clientsimnet/intro.md) · [ClientSim Net の使い方](./clientsimnet/usage.md)

### `com.logiccuteguy.lcgnetwork` — LCG Network System

LCG Network System 0.1.0 は LCGUdonSharp から分離した最初のリリース（プレビュー版）です。`LCGNetworkZone` の下にあるオブジェクトの同期変数とネットワークイベントは、ゾーン内のプレイヤーにだけ届きます。UdonSharp、Udon Graph、Udon Assembly の通常の `RequestSerialization`、`SendCustomNetworkEvent`、`NetworkCalling.CallingPlayer` はビルド時に経路が切り替わります。`[LCGPacket]` は SDK の UdonSharp で使えます。複数クライアントの VRChat ビルドではまだ確認していません。

- **最新バージョン**: 0.1.0 — [リリース](https://github.com/LogicCuteGuy/LCGNetwork/releases/tag/0.1.0)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.8.1`)
- **リポジトリ**: [LogicCuteGuy/LCGNetwork](https://github.com/LogicCuteGuy/LCGNetwork)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/LCGNetwork.git#0.1.0` を使います。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./lcgnetwork/intro.md) · [LCG Network の使い方](./lcgnetwork/usage.md)

### `com.logiccuteguy.openworld` — OpenWorld

OpenWorld 0.0.1 は最初のリリースです。 VRChat 向けのチャンクグリッド型ワールドエンジン。チャンクストリーミング、インポスター、GPU インスタンシングの Block、ランタイム編集

- **最新バージョン**: 0.0.1 — [リリース](https://github.com/LogicCuteGuy/OpenWorld/releases/tag/0.0.1)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`), `com.logiccuteguy.streamdata` `>=0.0.1`
- **リポジトリ**: [LogicCuteGuy/OpenWorld](https://github.com/LogicCuteGuy/OpenWorld)

VCC/ALCOM の VPM 一覧からインストールしてください（先に一覧を更新してください）。StreamData も追加されます。手動インストールは[概要](./openworld/intro.md)を参照してください。Git URL は使わないでください。StreamData が追加されず、読み取り専用の Git パッケージでは DigHoleIt 地形のアセットを作成できません。

ドキュメント: [概要](./openworld/intro.md) · [はじめに](./openworld/getting-started.md)

### `com.logiccuteguy.streamdata` — StreamData

StreamData 0.0.1 は最初のリリースです。 ワールドの読み込み後にテクスチャとライトマップを Web からストリーミング。GitHub Pages や自前のホストへの公開にも対応

- **最新バージョン**: 0.0.1 — [リリース](https://github.com/LogicCuteGuy/StreamData/releases/tag/0.0.1)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **リポジトリ**: [LogicCuteGuy/StreamData](https://github.com/LogicCuteGuy/StreamData)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/StreamData.git#0.0.1` を使います。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./streamdata/intro.md) · [はじめに](./streamdata/getting-started.md)

### `com.logiccuteguy.zonedraw` — ZoneDraw

ZoneDraw 0.1.0 は最初のリリースです。 クリックで見えないバリア壁やトリガーゾーンを描画し、通常のコライダーにベイク。UdonSharp API 付き

- **最新バージョン**: 0.1.0 — [リリース](https://github.com/LogicCuteGuy/ZoneDraw/releases/tag/0.1.0)
- **Unity**: 2022.3
- **ライセンス**: MIT
- **VPM の依存関係**: `com.vrchat.worlds` `3.x.x` (`>=3.10.5`)
- **リポジトリ**: [LogicCuteGuy/ZoneDraw](https://github.com/LogicCuteGuy/ZoneDraw)

VCC/ALCOM の VPM 一覧からインストールするか（先に一覧を更新してください）、`https://github.com/LogicCuteGuy/ZoneDraw.git#0.1.0` を使います。インストール方法はプロジェクトごとに 1 つだけにしてください。

ドキュメント: [概要](./zonedraw/intro.md) · [はじめに](./zonedraw/getting-started.md)
