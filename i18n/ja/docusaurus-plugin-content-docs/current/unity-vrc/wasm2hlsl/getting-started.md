---
sidebar_position: 2
---

# はじめに

カーネルの書き方、Udon からの実行、結果の読み戻し方法を説明します。

## クイックスタート

1. **カーネルを書きます。** パラメーター 0（`i32` の場合）はピクセルインデックスを受け取り、それ以外は Udon から名前で設定する引数です。エクスポート関数はいくつでも作れます。各関数の上のコメントがインスペクターのヘルプになり、2 つのタグで設定します: `@size W x H`（または N 回呼び出しの `@size N`）は 1 回の `Run()` が行う呼び出し数、`@traps` は Trap Check を有効にします。

```rust
#![no_std]
#[panic_handler] fn panic(_: &core::panic::PanicInfo) -> ! { loop {} }
#[link(wasm_import_module = "env")]
extern "C" {
    fn input(i: i32) -> i32;        // 任意: SetInput() のデータを読む
    fn hlsl_sin(x: f32) -> f32;     // 任意: ネイティブ GPU 数学
}

/// 入力ワードを `scale` 倍する。
/// @size 256x256
#[no_mangle]
pub extern "C" fn main(id: i32, scale: i32) -> i32 {
    unsafe { input(id) } * scale
}

/// 呼び出しごとにサイン波を 1 サンプル。
/// @size 48000 @traps
#[no_mangle]
pub extern "C" fn tone(id: i32, freq: f32) -> f32 {
    unsafe { hlsl_sin(id as f32 * freq * 0.000130899) }
}
```

2. **小さいスタックでビルドします**（GPU メモリはレジスタにあります。下の「制限」セクションを参照）。

```bash
RUSTFLAGS="-C link-arg=-zstack-size=4096 -C target-cpu=mvp -C target-feature=+bulk-memory,+sign-ext,+nontrapping-fptoint" cargo build --release --target wasm32-unknown-unknown
```

`core::arch::wasm32` の SIMD を使うには features に `,+simd128`（および `,+relaxed-simd`）を追加します。

3. **`.wasm` を `Assets/` にコピーします。** ほかには何も生成されません。シェーダー、マテリアル、レンダーテクスチャは `.wasm` アセット内にあります（Project ウィンドウで展開すると見えます）。

4. **`.wasm` を Hierarchy または Scene view にドラッグします。** すべてのエクスポート関数を保持する準備済み `WasmGpuRunner` の GameObject ができます。インスペクターには: `.wasm`、Function（`Run()` が呼ぶもの）、ソース名のままの引数、Size と Trap Check（`@size` / `@traps` が設定するとロック）、**Test**（Play Mode なしで GPU 実行）。

5. **U# スクリプトから呼びます。**

```csharp
public WasmGpuRunner runner;
void Start()
{
    runner.callbackTarget = this;
    runner.SetFunction("main");            // またはインスペクターの Function を維持
    runner.SetNamedArgInt("scale", 3);     // または SetArgInt(1, 3): wasm パラメーターindex
    runner.SetInput(myData);
    runner.Run();                          // RunFunction("tone") = SetFunction + Run
}
public void OnWasmComplete() { Debug.Log(runner.resultFunction + ": " + runner.resultLo[0] + (runner.trapped ? " (trapped)" : "")); }
```

ランナーごとに同時実行は 1 関数だけ（`busy`）で、各関数は自分の引数値を保持します。

## ソースからの名前

リリース wasm は関数名を保持しますがパラメーター名は落とすため、`.wasm` の隣のソース（そのフォルダーと `src/`。必要なら `.wasm` のインポート設定で **Source Path** を変更）から読み取ります。プロジェクト内のソースが変わると `.wasm` は再インポートされます。認識されるエクスポート:

| 言語 | エクスポート | 名前変更 |
|---|---|---|
| Rust | `pub extern "C" fn name(a: i32)` | `#[export_name = "x"]` |
| C / C++ | 関数定義 `int name(int a)` | `__attribute__((export_name("x")))` |
| Zig | `export fn name(a: i32) i32` | — |
| AssemblyScript | `export function name(a: i32): i32` | — |
| TinyGo | `func` の上に `//export name` または `//go:wasmexport name` | — |

ソースがない場合、引数は `arg1`、`arg2` … となり、Size / Trap Check はインポート設定から来ます。

## 出力レイアウト

| 戻り値 | 読み取り |
|---|---|
| `i32` | `resultLo[i]` |
| `f32` | `resultFloat[i]`。値ごとの Udon ループなしでネイティブ読み戻しのため、数百万件でも可 |
| `f64` | `resultFloat[i]`（f32 に丸め: Udon は float を読む。f64 で計算し、必要な値を返す） |
| `i64` | `resultLo[i]`（下位 32 ビット）、`resultHi[i]`（上位 32 ビット） |
| `funcref` / `externref` | `resultLo[i]`: 関数インデックス、-1 = null |

引数: `i32`/`i64`/参照型は `SetArgInt`、`f32`/`f64` は `SetArgFloat`（`f64` 引数は正確に拡張された float。double は 2 つの float で渡す: `hi = (float)d` と `lo = (float)(d - hi)`、全ビットが必要なら f64 で加算。`Example/DeepZoom` 参照）。`v128` はエクスポートの引数にも戻り値にもできません（Udon に 128 ビット値がないため）。該当エクスポートはインポート警告付きでスキップされます。

読み戻し自体を省略するにはレンダーテクスチャを表示します: `Example/` の `WASM2HLSL/Int Display` が packed RGBA8 またはイテレーションパレットとして表示します。

## Trap Check

Trap Check（ソースの `@traps`、ランナーのインスペクター、または `.wasm` のインポート設定）は、`unreachable`、ゼロ除算、不正な `call_indirect` スロット、`W_MAX_LOOP_ITER`（65536）回を超えるループのいずれかに当たったとき `runner.trapped` を立てます。その呼び出しは 0 を返します。読み戻し行が 1 セット増えるためデフォルトはオフです。

## 対応

すべての WebAssembly 値型:

| 型 | GPU 上 | 正確？ |
|---|---|---|
| `i32` | `uint` | はい |
| `i64` | `uint2`、エミュレート（mul/div/rem/shift/rotate/clz/…） | はい |
| `f32` | `float` | GPU float（最下位ビットの丸めは異なる可能性、div/sqrt は数 ulp 以内、非正規数はフラッシュされうる） |
| `f64` | IEEE ビットを保持する `uint2`、ソフトウェア float（SoftFloat のアルゴリズム、round to nearest even） | はい。非正規数・div・sqrt・変換も含めビット一致 |
| `v128` | `uint4`: SIMD 全種（i8x16 … f64x2）+ relaxed SIMD（決定的） | 整数と `f64x2` レーンははい。`f32x4` レーンは `f32` 同様 |
| `funcref` / `externref` | `uint`（関数インデックス、`0xFFFFFFFF` = null） | はい |

- フル MVP 命令セットに加え、符号拡張、飽和切り捨て、`memory.copy` / `memory.fill`、multi-value ブロック。
- 直接呼び出し、`call_indirect`（`if` チェーンでディスパッチ）、可変グローバル、データセグメント。
- 参照型: `ref.null` / `ref.is_null` / `ref.func`、型付き `select`、ref ローカル/グローバル、複数テーブル、`table.get` / `set` / `size` / `grow`（`memory.grow` と同様常に失敗）/ `fill` / `copy` / `init`、`elem.drop`。コードが書き込むテーブルはピクセルごとに保持され、それ経由の `call_indirect` は格納された関数でディスパッチされます。
- インポート: `input(i32) -> i32`（`SetInput` の生ワード）と HLSL イントリンクスにマップされる数学関数: `hlsl_sin`、`hlsl_cos`、`hlsl_tan`、`hlsl_asin`、`hlsl_acos`、`hlsl_atan`、`hlsl_atan2`、`hlsl_sinh`、`hlsl_cosh`、`hlsl_tanh`、`hlsl_exp`、`hlsl_exp2`、`hlsl_log`、`hlsl_log2`、`hlsl_log10`、`hlsl_pow`、`hlsl_sqrt`、`hlsl_fmod`、`hlsl_fmin`、`hlsl_fmax`、…（C なら `sinf`/`powf` も可だが、Rust の compiler_builtins は同じ名前に自前のソフトウェア libm をリンクするため `hlsl_` 接頭辞を使うこと）。

## 制限（GPU シェーダーによる設計上の制約）

| 制限 | 理由 | 回避策 |
|---|---|---|
| 再帰なし | HLSL にコールスタックがない。変換器が循環をエラー報告する。 | ループに書き直す。 |
| メモリ ≤ 64000 バイト | 線形メモリはピクセルごとの `uint4` レジスタ配列（fxc の上限は 4096 レジスタ）。サイズは宣言ページ数ではなくデータ末尾 + スタック。 | `-zstack-size=4096`、小さい static、heap なし。 |
| `memory.grow` は常に失敗 | メモリは固定。 | アロケータなしの `no_std` を使う。 |
| `f64` は遅い | Quest/モバイル GPU には倍精度がないため、各 f64 演算は約 100 個の整数命令（div/sqrt は 55–63 回ループ）。f64 を使うシェーダーはコンパイルも遅い: `Example/DeepZoom` は約 1 分、しかも fxc の時間は線形以上で伸びるため、数十種類の f64 演算を使う 1 つの export は何分もかかることがある。 | 精度が足りれば `f32` を使う。大きい f64 カーネルは複数 export に分割（各 export は到達するコードだけコンパイルする）。 |
| 数学インポートは f32 で実行 | `hlsl_sin(f64)` などは GPU の float イントリンクスを呼ぶ。 | 必要ならその関数を f64 で自前実装する。 |
| スレッド、例外、GC、尾呼び出し、`memory.init` / `data.drop` なし | ピクセルシェーダーで表現できない。 | — |
| 大きいモジュールはコンパイルが遅い | fxc はすべての関数をインライン化する。約 6 KB のカーネルで約 10 秒、Rust のソフトウェア libm（compiler_builtins 経由の `f32::sin`）は何分もかかる。 | libm の代わりに `hlsl_*` インポートを使い、カーネルを小さく保つ。 |

メモリはピクセルごとに private で、実行のたびにリセットされます。ピクセル同士は通信できず、出力は戻り値だけです。

ドキュメント: [概要](./intro.md)
