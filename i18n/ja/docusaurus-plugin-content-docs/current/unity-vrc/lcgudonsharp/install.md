---
sidebar_position: 2
---

# インストールとセットアップ

> ドキュメントバージョン: **0.3.4** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4)

:::warning 0.3.2 からの更新
`0.3.2` は配布パッケージに問題があり、新規プロジェクトでコンパイラーペイロードが不足する場合があります。`0.3.4` へ更新してください。Unity の更新後、installer が修復します。
:::

## 要件

- Unity **2022.3**
- VRChat Worlds SDK **3.10.5**（他のバージョンは拒否されます）

## 推奨: VCC または ALCOM

[LogicCuteGuy VPM リスト](../packages.md)（`https://vpm.logiccuteguy.com/index.json`）を追加し、LCGUdonSharp `0.3.4` をインストールしてください。

ローカル参照では、[GitHub Releases](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.3.4) の `com.logiccuteguy.lcgudonsharp-0.3.4.zip` を展開して使用します。自動生成される **Source code (zip)** は使用しないでください。

## セットアップ手順

1. VCC/ALCOM または名前付きリリース ZIP から `0.3.4` を追加します。
2. Unity を開き、コンパイル完了を待ちます。
3. 必要なら **Tools > LCGUdonSharp > Install or Repair** を実行します。
4. 通常どおりワールドをビルド・テストします。

## メニュー

| コマンド | 用途 |
|---|---|
| **Tools > LCGUdonSharp > Install or Repair** | セットアップを再実行します。 |
| **Tools > LCGUdonSharp > Restore VRChat UdonSharp and Disable Auto Setup** | SDK 版を復元し、自動セットアップを停止します。アンインストール前に実行してください。 |
| **Assets > Create > U# Script** | U# スクリプトと program asset を同時に作成します。 |
| **Assets > Create > U# Assembly Definition** | 選択した `.asmdef` を UdonSharp に登録します。 |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | すべての program asset を再コンパイルします。 |

`.asmdef` 内のスクリプトが Unity ではコンパイルされても UdonSharp に無視される場合は、U# assembly definition を作成してから全アセットを更新してください。
