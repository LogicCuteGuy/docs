---
sidebar_position: 9
---

# サンプル

> ドキュメントバージョン: **0.3.4**

[LCGUdonSharp リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp)の `Example/` には各機能の実行可能な scene と script があります。各 `.cs` には同じ名前の `UdonSharpProgramAsset` があり、example `.asmdef` には別の U# assembly-definition asset が含まれています。

| フォルダー | 内容 |
|---|---|
| `AsyncAwait` | Yield、Delay、string/image/video、GPU readback、serialization、Creator Economy |
| `Interfaces` | `INumberOperation` の Add/Multiply 実装 |
| `Networking` | packet field/method、target delivery、zone object sync |
| `GenericRestrictions` | collection/JSON/binary と、拒否される generic/interface 形状 |
| `ExtendedLanguage` | 例外、ref/out、generic、LINQ、dynamic、Span |

## 実行方法

1. 他の C# compile error を解決します。
2. `Example/TestLCGUdonSharp.unity` を開くか、example component を scene に追加します。
3. Play Mode に入り Console を確認します。

:::tip 2 種類のアセット
各 U# `.cs` には同名の program asset が必要です。`Assembly-CSharp` 以外の `.asmdef` には U# assembly definition も必要です。それぞれ **Assets > Create > U# Script** と **Assets > Create > U# Assembly Definition** で作成できます。
:::
