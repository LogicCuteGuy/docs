---
sidebar_position: 1
---

# WASM2HLSL

> ドキュメントバージョン: **0.1.0** · [リリース](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0)

**WASM2HLSL for LCGUdonSharp** (`com.logiccuteguy.wasm2hlsl`) は VRChat ワールド内で WebAssembly を GPU 上で実行します。`.wasm` ファイルをプロジェクトに置くと、エディターがそれを HLSL に変換します。UdonSharp の `WasmGpuRunner` がエクスポート関数をレンダーテクスチャの各ピクセルで一度ずつ実行し、結果を Udon に読み戻します。

カーネルは手書きの HLSL ではなく **Rust、C/C++、Zig、AssemblyScript、TinyGo** で書けます。Udon は遅い（C# の約 1000 分の 1 の速度）ですが、同じロジックを数千ピクセル並列で回すピクセルシェーダーはそうではありません。

## 0.1.0 の新機能

初回リリース: `.wasm` → HLSL 変換、`WasmGpuRunner` U# コンポーネント、ソースからの引数/`@size`/`@traps` 名読み取り、Trap Check、Node との GPU 整合性テスト、Showcase/Chroma サンプル。

## 要件

- **Unity** 2022.3
- **VRChat Worlds SDK** `3.10.5`
- **LCGUdonSharp** `com.logiccuteguy.lcgudonsharp` `>= 0.3.10` — [インストールガイド](../lcgudonsharp/install.md)を参照

## インストール

### VCC / ALCOM

1. [LogicCuteGuy VPM リポジトリ](https://vpm.logiccuteguy.com/)を VCC/ALCOM に追加するか、`https://vpm.logiccuteguy.com/index.json` を手動で追加します。既に追加済みならリストを更新してください。
2. Unity プロジェクトの **Manage Project** を開きます。
3. **WASM2HLSL for LCGUdonSharp** (`com.logiccuteguy.wasm2hlsl`) を見つけて **0.1.0** を追加します。LCGUdonSharp の依存関係は VPM が自動でインストールします。
4. プロジェクトを Unity で開き、パッケージのインポートを待ちます。

### Unity Package Manager / 手動

**Window > Package Manager > + > Add package from git URL** で次を入力します。

```text
https://github.com/LogicCuteGuy/WASM2HLSL.git#0.1.0
```

または tag 付きリポジトリを `Packages/com.logiccuteguy.wasm2hlsl` に置くか、[リリース](https://github.com/LogicCuteGuy/WASM2HLSL/releases/tag/0.1.0)から名前付き `com.logiccuteguy.wasm2hlsl-0.1.0.zip` をそのフォルダーに展開します（`package.json` がルートにあること）。GitHub が自動生成する **Source code (zip)** は使わないでください。

重複を避けるため project ごとに方法を一つだけ選びます。

## パイプライン

```text
kernel.rs ──rustc──▶ kernel.wasm ──(import)──▶ .wasm アセット内、export ごと: shader + material + render texture
WasmGpuRunner (U#): args/SetInput → VRCGraphics.Blit → VRCAsyncGPUReadback → int[] resultLo
```

1. wasm 言語でエクスポート関数を書きます。
2. `.wasm` インポーターが export ごとにシェーダー、マテリアル、レンダーテクスチャを生成します（すべて `.wasm` アセット内に格納）。
3. `WasmGpuRunner` が引数と入力を設定し、シェーダーをレンダーテクスチャ全体に blit（ピクセルごとに 1 回）して、各プレーンを非同期に `resultLo` / `resultHi` / `resultFloat` へ読み戻します。

カーネル形式、ランナーのインスペクター、Udon API は[はじめに](./getting-started.md)を参照してください。

## 仕組み

`AsyncGPUReadback` は `R32_SINT` の整数テクスチャしか読めないため、レンダーテクスチャは**行のプレーン**を積み重ねます: 下位 32 ビット、次に上位 32 ビット（`i64` のときのみ）、次にトラップフラグ（Trap Check 有効時のみ）。各ピクセルは自分の呼び出しを再計算してプレーンの値を書き込みます。メモリはピクセルごとに private で、実行のたびにリセットされます。ピクセル同士は通信できず、出力は戻り値だけです。

## パッケージ構成

```text
Editor/   WasmModule.cs (パーサー), WasmToHlsl.cs (変換器), WasmImporter.cs (.wasm インポーター), WasmGpuRunnerEditor.cs (ドラッグ&ドロップ + インスペクター),
          SourceNames.cs (引数名・ドキュメント・@size / @traps をソースから), Icons/ (.wasm とランナーのアイコン)
Runtime/  WasmGpuRunner.cs (UdonSharp) + U# assembly definition
Example/  Showcase.unity (Mandelbrot、Juno-6 シンセ、AudioDsp、DeepZoom f64、SimdPlasma v128 を 1 つの VRChat ワールドに)
          Chroma/: Juno-6 向けのライブ scale-filter insert とビデオプレーヤー
          WasmIntDisplay.shader (readback なしでランナーのレンダーテクスチャを表示)
Tests~/   GPU 整合性テスト (Rust → wasm → HLSL → D3D11 vs Node): run.sh (MVP), types.sh (f64, v128, 参照型)
          names/: 言語ごとのソース名パーサーチェック
          chroma_check.js: Example/Chroma カーネルの Node 自己検証
```

`Example/Showcase.unity` を開いて **Play** を押してください。DeepZoom / SimdPlasma は一度 **Tools > WASM2HLSL > Add f64 + SIMD Examples To Scene** を実行し、シーンを保存します。

## 検証

`Tests~/run.sh` は Rust カーネル（collatz ループ、64 ビットハッシュ、`match` → `br_table`、32/64 ビット div/rem、インメモリソート、浮動小数点演算、`i64`↔float キャスト、`input()`）をビルドし、D3D11 コンピュートシェーダーとして 1024 回呼び出して結果を Node の WebAssembly と比較します。すべての整数パスはビット一致、`hlsl_sin` パスは出力の ≤ 1 ulp 差です。Mandelbrot サンプルもビット単位で一致します。

`Tests~/types.sh` は他の型についても同じことをします（export ごとに 4096 回、すべて Node とビット一致）: スカラー `f64`、あらゆる SIMD レーン形状、実装依存でない relaxed SIMD、参照型。`f32x4` の div/sqrt はスカラー `f32` と同様に GPU float 精度です。Quest/Vulkan は未検証です。

ドキュメント: [はじめに](./getting-started.md) · [リポジトリ README](https://github.com/LogicCuteGuy/WASM2HLSL#readme) · [GettingStarted.md](https://github.com/LogicCuteGuy/WASM2HLSL/blob/main/Documentation~/GettingStarted.md)
