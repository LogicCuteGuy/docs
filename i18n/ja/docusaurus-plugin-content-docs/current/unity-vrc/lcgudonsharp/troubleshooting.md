---
sidebar_position: 10
---

# トラブルシューティング

> ドキュメントバージョン: **0.5.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

| 症状 | 対処 |
|---|---|
| “The associated script cannot be loaded” | `.cs` に同名の `UdonSharpProgramAsset` がありません。**Assets > Create > U# Script** で両方を同時に作成するか、`.asset` を `.cs` と一緒にコピーします。 |
| 読み込み時に `LCGUdonSharpHook` が `MissingMethodException` を出す | インストール済みの Worlds SDK でフック対象のメソッドが変わりました。`>=3.10.6 <3.11.0` の SDK を使ってください。それまでは標準の UdonSharp がコンパイルし、LCG 専用の構文はエラーになります。 |
| 0.4.x から更新後、プログラムアセットのスクリプトが外れた | SDK の UdonSharp の meta に新しい GUID が付いています。VCC で `com.vrchat.worlds` を再インストールし、すべてのアセットを更新します。 |
| リリース ZIP でインストールできない | `com.logiccuteguy.lcgudonsharp-0.5.0.zip` を使ってください。GitHub が自動生成する **Source code (zip)** は使えません。 |
| アンインストールしたい | パッケージを削除します。ほかに戻す操作はありません。 |
| Unity ではコンパイルできるが UdonSharp が認識しない | アセンブリが未登録です。`Assembly-CSharp` は常にスキャンされます。`.asmdef` 内のスクリプトには、その `.asmdef` を参照する `UdonSharpAssemblyDefinition` が必要です。 |

## コンパイラーの不具合を報告する

[プロジェクトのリポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp)に、Unity のバージョン、Worlds SDK のバージョン、再現する最小のコードを添えて報告してください。

## 関連ページ

- [インストールと設定](./install.md)
