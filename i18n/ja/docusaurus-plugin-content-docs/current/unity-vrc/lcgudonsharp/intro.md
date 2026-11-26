---
sidebar_position: 1
---

# LCGUdonSharp の概要

> ドキュメントバージョン: **0.5.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

**LCGUdonSharp**（`com.logiccuteguy.lcgudonsharp`）は VRChat 向けの UdonSharp コンパイラーです。C# インターフェース、ビルド時の `async`/`await`、同期的な `try`/`catch`/`finally`、C# のコレクションと JSON、拡張言語機能を追加します。VRChat SDK の UdonSharp を置き換えずにフックするため、SDK のファイルは変更しません。

> **状態**
>
> インターフェース、同期例外、async の変換、拡張言語機能はワールドでのテストに使用できます。

## 0.5.0 の新機能

- **置き換えではなくフック。** LCG コンパイラーは `.asmref` で SDK の `UdonSharp.Editor` / `UdonSharp.Runtime` に組み込まれ、Harmony が標準のコンパイル入口を LCG 側に切り替えます。インストーラー、`Payload~`、バックアップ、**Tools > LCGUdonSharp** メニューは廃止されました。
- Worlds SDK `>=3.10.6 <3.11.0` が必要です。SDK 3.10.6 のコンパイラー修正を含みます。
- **互換性のない変更:** コンパイラー側のネットワーク機能（`SendLCGNetworkEvent`、`ForceSendPacket`、`LCGNetwork.RequestObjectSync`、ネットワーク診断の設定）を削除しました。ローカライズは 0.4.0 で [LCG Localization](../lcglocalization/intro) に移りました。
- async フレーム容量の設定は **Project Settings > Udon Sharp > LCGUdonSharp** に移りました。
- 0.4.x からの更新は[インストール](./install.md#upgrading-from-04x-or-earlier)を参照してください。

## 機能

| 機能 | 内容 |
|---|---|
| **C# インターフェース** | ソースで定義したインターフェースを `UdonSharpBehaviour` で実装できます。メソッド呼び出し、引数、戻り値、プロパティ、複数実装、インターフェース配列に対応します。 |
| **Async/Await** | `await Task.Yield()`、`await Task.Delay(int)`、Behaviour ごとに 1 種類の SDK await（文字列・画像のダウンロード、動画、GPU リードバック、シリアライズ、Creator Economy）をビルド時に変換します。 |
| **同期例外** | コンパイラー管理の `try`/`catch`/`finally`、`throw`、再スロー、null・インデックス・整数の除算と剰余の保護です。 |
| **拡張言語機能** | `ref`/`out`（`out var` と再帰を含む）、クローズドジェネリック、インターフェースのダイヤモンド継承、キャプチャする LINQ ラムダ、型が確定する `dynamic`、配列ベースの `Span<T>`。 |
| **C# コレクションと JSON** | `List<T>` と `Dictionary<TKey,TValue>` を `DataList`/`DataDictionary` に変換し、VRCJson を使う `System.Text.Json` ファサードを提供します。 |

## 仕組み

```text
Packages/com.logiccuteguy.lcgudonsharp
├─ Editor/UdonSharp.Editor.asmref   → UdonSharp.Editor (SDK)
│  ├─ Compiler/                     LCG compiler (namespace UdonSharp.LCGCompiler)
│  ├─ Serialization/                List/Dictionary + ScriptableObject data serializers
│  └─ LCGUdonSharpHook.cs           Harmony entry hook
└─ Runtime/UdonSharp.Runtime.asmref → VRCAsync, UdonException, System.Text.Json facade
```

ドメインの再読み込みのたびに、フックが標準の `UdonSharpCompilerV1.Compile`、`CompileSync`、`WaitForCompile` をパッチして LCG コンパイラーを実行します。SDK の更新でフック対象の名前が変わると `MissingMethodException` を出力し、標準の UdonSharp がコンパイルします。

## ガイド

- [インストールと設定](./install.md)
- [インターフェース](./interfaces.md)
- [Async/Await](./async-await.md)
- [同期例外処理](./exceptions.md)
- [拡張言語機能](./extended-language.md)
- [コレクション、JSON、バイトとビット](./collections-json.md)
- [サンプル](./examples.md)
- [トラブルシューティング](./troubleshooting.md)

## ライセンス

MIT © 2026 LogicCuteGuy。リリース履歴は [CHANGELOG.md](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/CHANGELOG.md) を参照してください。
