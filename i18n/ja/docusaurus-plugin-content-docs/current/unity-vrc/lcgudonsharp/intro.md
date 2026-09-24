---
sidebar_position: 1
---

# LCGUdonSharp の概要

> ドキュメントバージョン: **0.3.4** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) は VRChat 向けのインターフェース対応 UdonSharp コンパイラーです。C# インターフェース、ビルド時の `async`/`await`、同期 `try`/`catch`/`finally`、C# コレクションと JSON、拡張言語機能、手動パケット通信を追加します。変更されたソースは Worlds SDK や `Assets` ではなく、すべて `Packages/com.logiccuteguy.lcgudonsharp` 内に保持されます。

:::info ステータス
インターフェース、同期例外、async lowering、拡張言語機能はワールドテストに使用できます。`[LCGPacket]` / `LCGNetworkZone` は実験的機能であり、バージョン間でプロトコルが変わる場合があります。
:::

## 主な機能

| 機能 | 内容 |
|---|---|
| C# インターフェース | メソッド、引数、戻り値、プロパティ、複数実装、インターフェース配列 |
| Async/Await | `Task.Yield()`、`Task.Delay(int)`、VRChat SDK await のビルド時変換 |
| 同期例外 | コンパイラー管理の `try`/`catch`/`finally`、throw、再 throw、null・範囲・ゼロ除算ガード |
| 拡張言語 | `ref`/`out`、閉じたジェネリック、LINQ クロージャ、`dynamic`、配列ベースの `Span<T>` |
| コレクションと JSON | `List<T>` / `Dictionary<TKey,TValue>` を VRChat データコンテナーへ変換し、`System.Text.Json` 互換 API を提供 |
| 手動パケット通信 | バージョン付きフレーム、権限確認、リプレイ保護、送信の集約、対象プレイヤーへの配信 |
| クリーンなインストール | SDK 内を変更せず、自動バックアップ・復元を行う冪等セットアップ |

## 重要な用語

- **Program asset (`UdonSharpProgramAsset`)**: 1 つの U# スクリプトと同じフォルダー・同じベース名で対応する `.asset`。
- **U# assembly definition (`UdonSharpAssemblyDefinition`)**: `.asmdef` を UdonSharp コンパイル対象として登録する別種類のアセット。
- **Assembly scanning**: `Assembly-CSharp` は常に対象です。それ以外は U# assembly definition による登録が必要です。
- **Extern**: Udon 組み込みノードへ対応する Unity/SDK メソッド。extern 内部の障害は `try`/`catch` できません。

## 動作の概要

パッケージの bootstrap installer は Worlds SDK `3.10.5` を確認し、SDK 同梱 UdonSharp を `Library/LogicCuteGuy.LCGUdonSharp/Backups` にバックアップして、パッケージのコンパイラーを有効化します。状態は `ProjectSettings/LogicCuteGuy.LCGUdonSharp.json` に保存されます。

コンパイラーは、インターフェース呼び出し、async 継続、例外制御、コレクション/JSON、拡張 C#、`[LCGPacket]` を Udon で実行可能な具体的な命令へ変換します。

## ガイド

- [インストールとセットアップ](./install.md)
- [C# インターフェース](./interfaces.md)
- [Async / Await](./async-await.md)
- [同期例外処理](./exceptions.md)
- [拡張言語機能](./extended-language.md)
- [コレクション、JSON、バイト、ビット](./collections-json.md)
- [手動パケット通信](./networking.md)
- [サンプル](./examples.md)
- [トラブルシューティング](./troubleshooting.md)

MIT © 2026 LogicCuteGuy
