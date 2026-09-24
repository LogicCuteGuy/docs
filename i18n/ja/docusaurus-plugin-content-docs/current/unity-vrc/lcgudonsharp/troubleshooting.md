---
sidebar_position: 10
---

# トラブルシューティング

> ドキュメントバージョン: **0.3.4**

| 問題 | 解決方法 |
|---|---|
| “The associated script cannot be loaded” | `.cs` と同名の `UdonSharpProgramAsset` を追加します。 |
| Unity では compile されるが UdonSharp が無視する | `.asmdef` を指す `UdonSharpAssemblyDefinition` を作成します。 |
| 新規インストールに compiler payload がない | 問題のある `0.3.2` から `0.3.4` へ更新し、**Install or Repair** を実行します。 |
| Release ZIP をインストールできない | 名前付き `com.logiccuteguy.lcgudonsharp-0.3.4.zip` を使い、**Source code (zip)** は使わないでください。 |
| Installer が停止する | Worlds SDK は正確に `3.10.5` が必要です。 |
| `UdonSharp.*` assembly が重複する | **Tools > LCGUdonSharp > Install or Repair** を実行します。 |
| 更新後に packet field が同期しない | 全 U# program を再コンパイルし、ワールドを再ビルドします。 |
| アンインストールしたい | 先に **Restore VRChat UdonSharp and Disable Auto Setup** を実行します。 |

問題報告には Unity version、Worlds SDK version、最小の再現コードを含めてください: [GitHub Issues](https://github.com/LogicCuteGuy/LCGUdonSharp/issues)
