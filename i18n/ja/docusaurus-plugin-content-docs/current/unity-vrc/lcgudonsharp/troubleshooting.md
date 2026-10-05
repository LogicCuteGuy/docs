---
sidebar_position: 10
---

# トラブルシューティング

> ドキュメントバージョン: **0.3.9**

| 問題 | 解決方法 |
|---|---|
| “The associated script cannot be loaded” | `.cs` と同名の `UdonSharpProgramAsset` を追加します。 |
| Unity では compile されるが UdonSharp が無視する | `.asmdef` を指す `UdonSharpAssemblyDefinition` を作成します。 |
| 新規インストールに compiler payload がない | 問題のある `0.3.2` から `0.3.9` へ更新し、**Install or Repair** を実行します。 |
| Release ZIP をインストールできない | 名前付き `com.logiccuteguy.lcgudonsharp-0.3.9.zip` を使い、**Source code (zip)** は使わないでください。 |
| Installer が停止する | Worlds SDK は正確に `3.10.5` が必要です。 |
| `UdonSharp.*` assembly が重複する | **Tools > LCGUdonSharp > Install or Repair** を実行します。 |
| 更新後に packet field が同期しない | 全 U# program を再コンパイルし、ワールドを再ビルドします。 |
| `LCGNetworkZone` 周辺で build が失敗する | 標準 `[UdonSynced]` field は **Allow Native Sync Passthrough** を有効にしない限り拒否されます。Synced field のない Continuous behaviour は安全です。Udon Graph、重なる親子 zone、同じ hierarchy の PlayerObject template も拒否されます。 |
| アンインストールしたい | 先に **Restore VRChat UdonSharp and Disable Auto Setup** を実行します。 |

問題報告には Unity version、Worlds SDK version、最小の再現コードを含めてください: [GitHub Issues](https://github.com/LogicCuteGuy/LCGUdonSharp/issues)

## 0.3.9 のローカライズ

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。
