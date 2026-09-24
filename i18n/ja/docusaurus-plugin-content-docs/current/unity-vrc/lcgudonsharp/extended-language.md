---
sidebar_position: 6
---

# 拡張言語機能

> ドキュメントバージョン: **0.3.4**

LCGUdonSharp は拡張 C# 構文を、Udon で実行できる loop、array、local variable へビルド時に変換します。

## ref / out

local、field、array element、`out var`、再帰で使用できます。

```csharp
Swap(ref values[0], ref values[1]);
AddUntil(ref values[0], target, out int recursiveCalls);
```

## LINQ クロージャ

capture を持つ lambda は delegate ではなく loop へ変換されます。

```csharp
int[] result = values
    .Where(value => value >= minimum)
    .Select(value => value * localScale)
    .ToArray();
```

閉じた generic static helper、閉じた generic interface diamond、型を証明できる `dynamic`、配列ベースのローカル `Span<T>` にも対応します。open generic、generic heap object、対応外の collection/interface 形状はビルド時に拒否されます。

- [コレクション、JSON、バイト、ビット](./collections-json.md)
- [サンプル](./examples.md)
