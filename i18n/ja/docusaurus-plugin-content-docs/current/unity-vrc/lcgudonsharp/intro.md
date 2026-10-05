---
sidebar_position: 1
---

# LCGUdonSharp の概要

> ドキュメントバージョン: **0.3.9** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.9)

**LCGUdonSharp** (`com.logiccuteguy.lcgudonsharp`) は VRChat 向けのインターフェース対応 UdonSharp コンパイラーです。C# インターフェース、ビルド時の `async`/`await`、同期 `try`/`catch`/`finally`、C# コレクションと JSON、拡張言語機能、手動パケット通信を追加します。変更されたソースは Worlds SDK や `Assets` ではなく、すべて `Packages/com.logiccuteguy.lcgudonsharp` 内に保持されます。

:::info ステータス
インターフェース、同期例外、async lowering、拡張言語機能はワールドテストに使用できます。`[LCGPacket]` / `LCGNetworkZone` は実験的機能であり、バージョン間でプロトコルが変わる場合があります。
:::

## 0.3.9 の更新内容

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。

## 0.3.8 の更新内容

LCGUdonSharp 0.3.8 は入れ子・多態的な [ScriptableObject データスナップショット](./scriptableobjects.md)、実行時の型判定とチェック付きキャスト、循環・深度の検証、ローカル装備サンプルに対応します。型タグ付きの新しいレイアウトを使用するため、更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。

## 0.3.7 の更新内容

独自の `ScriptableObject` アセットを、読み取り専用の Udon データスナップショットとして使用できます。型付きのシリアライズ済みフィールド、継承フィールド、アセット配列に対応し、配列を読むと防御的コピーを返します。ヒープの読み戻しでも Inspector のアセット割り当てを保持し、SDK のネイティブ型は従来の動作を維持します。

対応型、制限、ローカルショップの例は [ScriptableObject データ](./scriptableobjects.md) を参照してください。サンプルはコンパイラーのセットアップ完了後にインポートし、アセットのデータやスキーマを変更したらワールドを再ビルドしてください。

## 0.3.6 の更新内容

- Object motion は recipient ごとに最新 state を保持する bounded queue、batch 配信、congestion backoff、remote interpolation、bounded prediction を使用します。
- Zone entry と `OnPlayerRestored` は scene field/object snapshot を bounded retry で復旧し、player が退出すると停止します。
- Disconnect 時の ownership recovery は有効な member ownership を保持し、ownership callback で再割り当てを修復します。退出 player は再利用・無効 ID より identity を優先して照合します。
- Domain reload で source program cache が消えても、serialized compiled program から packet receiver を再 bind できます。
- Native/LCG lamp、moving cube、任意実行の high-bandwidth example、配線済み prefab、タイ語 setup guide を追加しました。

更新後はすべての UdonSharp program を再コンパイルし、world を再ビルドしてください。古い build は 0.3.6 の motion batch envelope を decode できません。

## 主な機能

| 機能 | 内容 |
|---|---|
| C# インターフェース | メソッド、引数、戻り値、プロパティ、複数実装、インターフェース配列 |
| Async/Await | `Task.Yield()`、`Task.Delay(int)`、VRChat SDK await のビルド時変換 |
| 同期例外 | コンパイラー管理の `try`/`catch`/`finally`、throw、再 throw、null・範囲・ゼロ除算ガード |
| 拡張言語 | `ref`/`out`、閉じたジェネリック、LINQ クロージャ、`dynamic`、配列ベースの `Span<T>` |
| コレクションと JSON | `List<T>` / `Dictionary<TKey,TValue>` を VRChat データコンテナーへ変換し、`System.Text.Json` 互換 API を提供 |
| 手動パケット通信 | バージョン付きフレーム、権限確認、リプレイ保護、送信の集約、対象プレイヤーへの配信 |
| Network Zone | `LCGNetworkZone` で packet と ownership を trigger volume 内に限定します。Synced field のない Continuous behaviour と、明示的な instance-wide native sync passthrough に対応します。 |
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
