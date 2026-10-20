---
sidebar_position: 2
---

# パッケージ

**リスト URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| パッケージ ID | 表示名 | 最新版 | Unity | 概要 |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | シーン管理、オブジェクト操作、最適化用の 15 以上の Editor ツール |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.11` | 2022.3 | インターフェース、async/await、例外、コレクション/JSON、パケット通信を追加する UdonSharp コンパイラー |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.7.0` | 2022.3 | 同期 runtime edit、foliage、package example、seam のない terrain hole edge に対応した掘削可能な voxel zone |
| `com.logiccuteguy.blendproperty` | Blend Property | `0.2.1` | 2022.3+ | Unity mesh modifier stack と GPU physics、VRChat/native standalone 共通 component |
| `com.logiccuteguy.wasm2hlsl` | WASM2HLSL for LCGUdonSharp | `0.1.0` | 2022.3 | `.wasm` WebAssembly カーネルを HLSL シェーダーとして GPU 上で実行し、UdonSharp から async GPU readback で読む |

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

### LCGUdonSharp `0.3.11`

0.3.11 は、インストール済みの VRChat Worlds SDK が対応バージョン `3.10.5` と異なる場合に、ブロックではなく**警告**するようになりました。ペイロード（SDK 3.10.5 でビルド）はそのままインストールされ、**Tools > LCGUdonSharp > Restore** でバックアップ済みの元の UdonSharp に戻せる旨が表示されます。また `package.json` に **LCGUdonSharp Examples** サンプルを宣言したため、Package Manager に表示されます。自動コンパイラインストール完了後にインポートしてください。

LCGUdonSharp 0.3.10 は Unity のコンパイル前に VPM で埋め込み **SBP compatibility 1.21.26** を導入し、新規・更新時の VRChat SDK `ExtensionMethods` 衝突を防ぎます。Unity SBP 1.21.25 を基にソース・GUID・Unity Companion License を保持し、`Library` 再生成後も残ります。Unity Localization 1.4.5 は引き続き対応します。[インストール](./lcgudonsharp/install.md)を参照してください。手動導入には **両方** のリリース ZIP が必要です。

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./lcgudonsharp/localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。

LCGUdonSharp 0.3.8 は入れ子・多態的な [ScriptableObject データスナップショット](./lcgudonsharp/scriptableobjects.md)、実行時の型判定とチェック付きキャスト、循環・深度の検証、ローカル装備サンプルに対応します。型タグ付きの新しいレイアウトを使用するため、更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。

- [リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp) · [リリース](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- 依存関係: `com.vrchat.worlds` `3.10.5`（対応バージョン。0.3.11 以降は異なるバージョンでも未検証の警告付きでインストール）
- ライセンス: MIT
- [概要](./lcgudonsharp/intro.md) · [インストール](./lcgudonsharp/install.md)

LCGUdonSharp は Worlds SDK を変更せず、`Payload~/UdonSharp` からコンパイラーをインストールします。0.3.6 は bounded object-motion batching、snapshot/disconnect recovery、ownership repair、配線済み native/LCG load example を追加します。古い build は新しい motion batch envelope を decode できないため world を再ビルドしてください。

### DigHoleIt

DigHoleIt 0.7.0 は Dig Pen prefab、実行時の木・detail の配置/削除（Bake 済み foliage を含む）、同期 smoothing、VRChat showcase、Refresh Holes / Refresh Zones を追加します。設定はローカルで、VRChat edit は同期され late joiner に replay されます。

- 最新版: `0.7.0` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)
- Unity 2022.3、Built-in Render Pipeline
- VRChat 依存関係: `com.vrchat.worlds` `3.10.5`、`com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [リポジトリ](https://github.com/LogicCuteGuy/DigHoleIt) · [リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)
- ライセンス: MIT

[LogicCuteGuy VPM リスト](https://vpm.logiccuteguy.com/index.json)を更新し、VCC/ALCOM で **0.7.0** を導入できます。ほかに `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0`、tag repository の埋め込み、[リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)の `com.logiccuteguy.digholeit-0.7.0.zip` の展開にも対応します。自動生成 source archive は使わないでください。VRChat の Git/ZIP 導入では先に LCGUdonSharp を[インストール](./lcgudonsharp/install.md)します。

0.6.1 は Bake/move/resize の Undo、terrain-hole seam、foliage shading、無効な edge collision mesh を修正します。

[概要](./digholeit/intro.md) · [はじめに](./digholeit/getting-started.md)

### `com.logiccuteguy.blendproperty` — Blend Property

0.2.1 はドキュメント更新です。VCC/ALCOM の手順と Git/ZIP による代替インストールを明確にします。Runtime code と example asset は 0.2.0 から変更ありません。

0.2.0 は VRChat panel の互換性を修正します。Control Panel と Cloth Panel は `NoVariableSync` を使用し、`Manual` の Synced Control Panel と同じ GameObject に置けます。Example の Bake 済み GPU deform texture の shader 参照と VRChat scene も更新します。既存の GPU/native physics は引き続き利用できます。

- **最新版**: 0.2.1 — [release](https://github.com/LogicCuteGuy/BlendProperty/releases/tag/v0.2.1)
- **Unity**: 2022.3 以降
- **License**: MIT
- **依存関係**: `com.unity.ugui` `1.0.0`。ProBuilder/Unity Splines は任意。VRChat は Worlds SDK/UdonSharp
- **Repository**: [LogicCuteGuy/BlendProperty](https://github.com/LogicCuteGuy/BlendProperty)

VCC/ALCOM の VPM リスト、`https://github.com/LogicCuteGuy/BlendProperty.git#v0.2.1`、`Packages/com.logiccuteguy.blendproperty` への埋め込み、または名前付き `com.logiccuteguy.blendproperty-0.2.1.zip` release asset を使います。

重複を避けるため project ごとに方法を一つだけ選びます。[インストール手順](./blendproperty/intro.md)を参照してください。

[概要と設定](./blendproperty/intro.md) · [Modifier](./blendproperty/modifiers.md) · [Runtime/build](./blendproperty/runtime.md)

0.1.1 は live GPU modifier、cloth/soft body、fluid、hair、particle、paint/waves、destruction、ocean、interaction を追加します。Worlds SDK なしでも共通 component が native 動作します。Array/Curve は任意の Unity Splines、Array は Split Copies/Collider Per Copy に対応します。Control の同期と GPU simulation 全状態の同期は別です。[Runtime/build](./blendproperty/runtime.md)と [Physics/material](./blendproperty/physics.md)を参照してください。

### `com.logiccuteguy.wasm2hlsl` — WASM2HLSL for LCGUdonSharp

WASM2HLSL 0.1.0 は WebAssembly モジュールを HLSL シェーダーに変換し、UdonSharp から GPU 上で実行します。`.wasm` を `Assets/` に置くと、インポーターが export ごとに shader/material/render texture を `.wasm` アセット内に生成します。`WasmGpuRunner` が引数と入力を設定してピクセルごとに 1 回 blit し、`VRCAsyncGPUReadback` で結果を読み戻します。カーネルは Rust/C/Zig/AssemblyScript/TinyGo で書き、ソースの `@size` / `@traps` タグで設定します。`f32`/`f64`/`i64`/`v128` と参照型に対応し、GPU の `f32` 丸め以外はビット一致です。

- **最新版**: 0.1.0 — [release](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0)
- **Unity**: 2022.3
- **License**: MIT
- **VPM dependency**: `com.vrchat.worlds` `3.10.5`、`com.logiccuteguy.lcgudonsharp` `>=0.3.10`
- **Repository**: [LogicCuteGuy/WASM2HLSL](https://github.com/LogicCuteGuy/WASM2HLSL)

VCC/ALCOM の VPM リスト（先に更新）、`https://github.com/LogicCuteGuy/WASM2HLSL.git#0.1.0`、`Packages/com.logiccuteguy.wasm2hlsl` への埋め込み、または名前付き `com.logiccuteguy.wasm2hlsl-0.1.0.zip` release asset を使います。重複を避けるため project ごとに方法を一つだけ選び、Git/ZIP では先に [LCGUdonSharp](./lcgudonsharp/install.md) をインストールしてください。

ドキュメント: [概要](./wasm2hlsl/intro.md) · [はじめに](./wasm2hlsl/getting-started.md)
