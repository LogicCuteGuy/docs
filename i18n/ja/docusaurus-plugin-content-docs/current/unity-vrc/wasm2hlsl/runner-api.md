---
sidebar_position: 3
---

# WasmGpuRunner API

`WasmGpuRunner` は 1 つの `.wasm` のエクスポート関数を実行します。レンダーテクスチャの 1 ピクセルが、現在の関数の 1 回の呼び出しです。名前空間は `LogicCuteGuy.Wasm2Hlsl` です。`.wasm` をシーンにドラッグすると、設定済みのランナーが作成されます。

## 設定するフィールド

| フィールド | 既定値 | 意味 |
|---|---|---|
| `callbackTarget` | なし | 結果の準備ができたときにイベントを受け取る Behaviour |
| `callbackEvent` | `OnWasmComplete` | イベント名 |
| `readback` | true | 結果を CPU にコピーします。マテリアルだけが `target` を読む場合はオフにします。 |
| `bands` | 1 | テクスチャを横の帯に分割します |
| `band` | 0 | 次の `Run()` が計算する帯（Inspector では非表示） |

`wasmMaterial` と `target` は現在の関数のもので、`SetFunction` で両方が変わります。

## メソッド

| メソッド | 動作 |
|---|---|
| `SetFunction(name)` | `Run()` が呼ぶ関数を選びます。そのエクスポートがなければ false を返してエラーを出力します。 |
| `SetFunctionIndex(i)` | 番号で選びます。範囲外は無視します。 |
| `FunctionIndex(name)` | エクスポートの番号。なければ -1 |
| `FunctionName()` | 現在の関数名 |
| `SetNamedArgInt(name, value)`、`SetNamedArgFloat(name, value)` | ソース上の名前で引数を設定します。なければエラーを出力します。 |
| `SetArgInt(index, value)`、`SetArgFloat(index, value)` | wasm の引数番号で設定します。引数 0 が `i32` ならピクセル番号です。範囲外は無視します。 |
| `ArgIndex(name)` | 引数の番号。なければ -1 |
| `SetInput(int[] words)` | `env.input(i)` が読むデータをアップロードします。以後の実行でも保持されます。 |
| `Run()` | 現在の関数を実行します。`busy` の間は無視します。 |
| `RunFunction(name)` | `SetFunction` の後に `Run()`。`busy` の間は何もしません。 |
| `GetResultFloat(i)` | `i` 番目の結果を float で取得します |
| `BitsToFloat(bits)`（static） | `int` のビット列を float として読みます |

## 結果

| フィールド | 内容 |
|---|---|
| `resultLo`、`resultHi` | 整数の結果。`resultHi` は `i64` の上位 32 ビットです。 |
| `resultFloat` | `f32` と `f64` の関数の結果。この場合 `resultLo` は設定されません。 |
| `resultIsFloat` | 現在の関数が float を返す場合は true |
| `resultFunction` | 結果を出した関数 |
| `trapped` | いずれかの呼び出しがトラップした。**Trap Check** が必要です。 |
| `busy` | リードバック待ちの実行がある |

1 つのコールバックで複数の関数を扱う場合は `resultFunction` を確認します。

```csharp
public void OnWasmComplete()
{
    if (runner.resultFunction == "tone")
        Debug.Log(runner.resultFloat[0]);
}
```

## 実行タイミング

リードバックは非同期です。`Run()` は GPU の処理を開始して戻り、コールバックは後のフレームで届きます。`busy` の間の呼び出しは**キューに入らず破棄される**ので、次の実行はコールバックから行ってください。

リードバックに失敗するとエラーを出力し、**コールバックは呼ばれません**。`busy` は false に戻ります。

`readback` がオフの場合、`busy` はすぐに解除され、コールバックはありません。

## 複数フレームに分散する

重い関数はフレームを止めることがあります。`bands` が 2 以上なら、各 `Run()` は `band` の帯だけを計算し、ほかの行は以前のピクセルを保ちます。マテリアルで表示する結果向けの機能なので、`readback` をオフにして使います。

```csharp
int next;

void Update()
{
    runner.bands = 8;
    runner.band = next;
    next = (next + 1) % 8;
    runner.Run();
}
```

## 複数の関数

1 つのランナーがすべてのエクスポートを保持し、関数ごとに引数の値を持ちます。同時に実行できるのは 1 つです。2 つの関数を同時に実行するには、ランナーを 2 つ使います。

## ネットワーク

ランナーは何も同期しません。引数やシードなどの入力を自分のスクリプトで同期し、各プレイヤーが結果を計算するようにしてください。GPU の `f32` の結果はデバイス間で下位ビットが異なる場合があるため、共有するゲーム判定を `f32` の完全一致に頼らないでください。
