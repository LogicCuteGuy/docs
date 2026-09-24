---
sidebar_position: 5
---

# 同期例外処理

> ドキュメントバージョン: **0.3.4**

Udon に例外 opcode がなくても、コンパイラー管理の `try`/`catch`/`finally`、明示的 throw、再 throw、null・index・整数のゼロ除算ガードを使用できます。

```csharp
try
{
    LoadSlot(selectedIndex);
}
catch (ArgumentException exception)
{
    Debug.LogError(exception.Message);
}
finally
{
    isBusy = false;
}
```

保護されたコードと同じ behaviour の call graph 内で、null receiver、配列/文字列 index、整数の除算・剰余をガードします。`UdonException` は `Kind`、`Code`、`Operation`、`Message` を提供します。

:::caution 同期エミュレーション
Udon extern 内部で発生した実際の障害は捕捉できません。custom event、network call、別 behaviour、浮動小数点除算、overflow、cast、SDK domain failure は対象外です。
:::

`try` 内の `await` は診断エラーになります。
