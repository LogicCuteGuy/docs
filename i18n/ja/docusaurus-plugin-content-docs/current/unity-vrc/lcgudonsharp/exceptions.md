---
sidebar_position: 5
---

# 同期例外処理

> ドキュメントバージョン: **0.3.10**

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

> **同期エミュレーション**
>
> Udon extern 内部で発生した実際の障害は捕捉できません。custom event、network call、別 behaviour、浮動小数点除算、overflow、ネイティブの cast、SDK domain failure は対象外です。
>
> 0.3.8 の独自 ScriptableObject データ型間では、互換性のない明示的キャストがコンパイラー管理の `InvalidCastException` になります。互換性のない `as` は null を返します。ネイティブ Unity/SDK のキャスト障害を捕捉できるわけではありません。[ScriptableObject データ](./scriptableobjects.md) を参照してください。
>

`try` 内の `await` は診断エラーになります。
