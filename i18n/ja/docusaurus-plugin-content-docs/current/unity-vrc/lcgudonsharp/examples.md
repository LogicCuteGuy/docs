---
sidebar_position: 9
---

# サンプル

> ドキュメントバージョン: **0.5.0**

:::warning 0.5.0 にはサンプルが含まれません
0.5.0 のリリース ZIP と、そのタグのリポジトリにはサンプルファイルがありません。`package.json` には **LCGUdonSharp Examples** サンプルが記載されていますが、フォルダーがないためインポートできるものはありません。
:::

## 以前のサンプル

[タグ 0.3.12 の `Example/` フォルダー](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example)は参考コードとして読めます。

| フォルダー | 内容 |
|---|---|
| [`AsyncAwait`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/AsyncAwait) | `Task.Yield()`、`Task.Delay`、文字列・画像・動画の await、GPU リードバック、シリアライズ、Creator Economy |
| [`Interfaces`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/Interfaces) | 加算と乗算を実装した `INumberOperation`。入力 10 で 15 と 30 になります。 |
| [`ExtendedLanguage`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ExtendedLanguage) | `try`/`catch`/`finally`、`ref`/`out`、クローズドジェネリック、ダイヤモンド継承、LINQ クロージャー、`dynamic`、`Span<T>` |
| [`GenericRestrictions`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/GenericRestrictions) | コレクション、JSON、バイナリデータと、拒否される構文 |
| [`ScriptableObjects`](https://github.com/LogicCuteGuy/LCGUdonSharp/tree/0.3.12/Example/ScriptableObjects) | ScriptableObject のショップと装備のデータ |

これらは 0.3.x のコンパイラー向けで、**0.5.0 での動作は未確認です**。試す場合は **Assets > Create > U# Script** でスクリプトを作成し、必要なコードを貼り付けてください。

古いフォルダー全体はインポートしないでください。ネットワークのサンプルは 0.5.0 で削除された機能を使います。ネットワークは [LCG Network System](../lcgnetwork/intro)、ローカライズは [LCG Localization](../lcglocalization/intro) を参照してください。

:::tip プログラムアセットとアセンブリの登録
すべての U# `.cs` には同名の `UdonSharpProgramAsset` が必要です。**Assets > Create > U# Script** で両方を作成できます。`Assembly-CSharp` 以外のスクリプトは、**Assets > Create > U# Assembly Definition** で `.asmdef` の登録も必要です。
:::

## 関連ページ

- [インストールと設定](./install.md)
- [トラブルシューティング](./troubleshooting.md)
