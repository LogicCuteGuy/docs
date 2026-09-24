---
sidebar_position: 4
---

# Async / Await

> ドキュメントバージョン: **0.3.4**

LCGUdonSharp は `async`/`await` をビルド時に frame-pool continuation へ変換します。対応範囲は引数なしの `async void`、直線的な `Task.Yield()`、正の定数を使う `Task.Delay(int)`、behaviour ごとに 1 つの VRChat SDK await です。

```csharp
public override async void Interact()
{
    await Task.Yield();
    Debug.Log("次のフレームで続行");
    await Task.Delay(1000);
    Debug.Log("1 秒後に続行");
}
```

## 対応する SDK await

- `VRCAsync.LoadStringAsync`
- `VRCAsync.LoadImageAsync`
- `VRCAsync.LoadVideoAsync` / `WaitForVideoEndAsync`
- `VRCAsync.RequestGPUReadbackAsync`
- `VRCAsync.RequestSerializationAsync`
- Creator Economy の product / purchase / owner リスト

従来の callback 本体が先に実行され、その後に生成された continuation が実行されます。

## 制約

- 各 async method は single-flight です。待機中の 2 回目の呼び出しは無視されます。
- 文字列ダウンロードは URL で照合されるため、同じ behaviour で同一 URL の要求を重ねないでください。
- ローカル変数や引数の保持、nested await、明示的 return、`Task<T>` 結果の直接代入は診断エラーになります。
- `try` 内の `await` は使用できません。

[上流の AsyncAwait サンプル](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/AsyncAwait/README.md)
