---
sidebar_position: 2
---

# インストールとセットアップ

> ドキュメントバージョン: **0.3.10** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10)

> **0.3.2 からの更新**
>
> `0.3.2` は配布パッケージに問題があり、新規プロジェクトでコンパイラーペイロードが不足する場合があります。`0.3.10` へ更新してください。Unity の更新後、installer が修復します。

## 要件

LCGUdonSharp 0.3.10 は Unity のコンパイル前に VPM で埋め込み **SBP compatibility 1.21.26** を導入し、新規・更新時の VRChat SDK `ExtensionMethods` 衝突を防ぎます。Unity SBP 1.21.25 を基にソース・GUID・Unity Companion License を保持し、`Library` 再生成後も残ります。Unity Localization 1.4.5 は引き続き対応します。[インストール](./install.md)を参照してください。手動導入には **両方** のリリース ZIP が必要です。

- Unity **2022.3**
- VRChat Worlds SDK **3.10.5**（他のバージョンは拒否されます）

## 推奨: VCC または ALCOM

[LogicCuteGuy VPM リスト](../packages.md)（`https://vpm.logiccuteguy.com/index.json`）を追加し、LCGUdonSharp `0.3.10` をインストールしてください。

手動導入は **先に Unity を閉じてください**。[LCGUdonSharp 0.3.10 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.10) と [SBP compatibility 1.21.26 ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/sbp-compatibility-1.21.26) の両方を取得し、それぞれ `Packages/com.logiccuteguy.lcgudonsharp` と `Packages/com.unity.scriptablebuildpipeline` に展開します。各 `package.json` がパッケージフォルダー直下にあることを確認してから Unity を開きます。LCGUdonSharp を `file:` で参照する場合も SBP の埋め込みが必要です。自動生成 **Source code (zip)** は使わないでください。PackageCache の編集やコンパイル後のフックだけに依存すると、キャッシュ再生成で修正が消えます。

## セットアップ手順

1. VCC/ALCOM で `0.3.10` と SBP 互換依存関係を導入するか、Unity を閉じて上記の二つの ZIP を展開します。
2. Unity を開き、コンパイル完了を待ちます。
3. 必要なら **Tools > LCGUdonSharp > Install or Repair** を実行します。
4. 通常どおりワールドをビルド・テストします。

自動コンパイラー設定の完了後、Unity Package Manager のパッケージサンプルから **LCGUdonSharp Examples** をインポートしてください。リリース ZIP のサンプルは `Samples~/Examples` にあり、リポジトリーのガイドでは `Example/` と表記します。新しいショップは [ScriptableObject データ](./scriptableobjects.md) を参照してください。

## メニュー

| コマンド | 用途 |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | セットアップを再実行します。 |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | SDK 版を復元し、自動セットアップを停止します。アンインストール前に実行してください。 |
| **Assets > Create > U# Script** | U# スクリプトと program asset を同時に作成します。 |
| **Assets > Create > U# Assembly Definition** | 選択した `.asmdef` を UdonSharp に登録します。 |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | すべての program asset を再コンパイルします。 |

`.asmdef` 内のスクリプトが Unity ではコンパイルされても UdonSharp に無視される場合は、U# assembly definition を作成してから全アセットを更新してください。

## 0.3.9 のローカライズ

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。

現在の導入: Unity Localization **1.4.5** と VPM による埋め込み `com.unity.scriptablebuildpipeline` **1.21.26**。Unity **1.21.25** を基にした互換配布であり、Unity の新しい公式 SBP リリースではありません。Manifest の UPM 宣言は 1.21.25 のままで、VPM 互換依存関係は 1.21.26 に固定されています。Unity のコンパイル前に導入してください。[インストール](./install.md)を参照。
