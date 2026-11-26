---
sidebar_position: 2
---

# インストールと設定

> ドキュメントバージョン: **0.5.0** · [リリースノート](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 は Worlds SDK の UdonSharp を置き換えずにフックします。インストーラーや修復の操作はなく、ファイルのコピーやバックアップも行いません。

## 要件

- **Unity 2022.3**
- **VRChat Worlds SDK 3.10.6**（`>=3.10.6 <3.11.0`）。コンパイラーはこの SDK の UdonSharp の内部実装に合わせています。

## VCC または ALCOM でインストール（推奨）

[LogicCuteGuy の VPM リスト](../packages.md)（`https://vpm.logiccuteguy.com/index.json`）を追加し、**LCGUdonSharp** `0.5.0` をインストールまたは更新します。その後 Unity を開いてコンパイルを待ちます。

手動の場合は、[名前付きのリリース ZIP](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0) を `Packages/com.logiccuteguy.lcgudonsharp` に展開し、`package.json` がそのフォルダー直下にあることを確認します。GitHub が自動生成する **Source code (zip)** は使わないでください。SBP 互換パッケージは不要になりました。

## 0.4.x 以前からの更新 {/* #upgrading-from-04x-or-earlier */}

0.4.x 以前は SDK 付属の UdonSharp を削除し、このパッケージ内のコピーを使っていました。プログラムアセットは SDK 側コピーの元の GUID を参照するため、そのコピーを元の状態で復元する必要があります。

1. Unity を閉じます。
2. LCGUdonSharp を `0.5.0` に更新します。古いコンパイラーのコピーは削除されます。
3. VCC/ALCOM で `com.vrchat.worlds` を再インストールし、`Integrations/UdonSharp` を元の meta ファイル付きで復元します。
4. Unity を開き、**VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** を実行します。

0.5.0 で削除: `SendLCGNetworkEvent`、`ForceSendPacket`、`LCGNetwork.RequestObjectSync`、**LCG network diagnostics** の設定、**Tools > LCGUdonSharp** メニュー。ローカライズは [LCG Localization](../lcglocalization/intro) にあります。

## メニューと設定

| コマンド | 説明 |
|---|---|
| **Edit > Project Settings > Udon Sharp > LCGUdonSharp** | async タスクのフレーム容量（Behaviour ごとに 1〜256）。`ProjectSettings/LogicCuteGuy.LCGUdonSharp.json` に保存します。 |
| **Assets > Create > U# Script** | U# スクリプトと対のプログラムアセットを作成します。 |
| **Assets > Create > U# Assembly Definition** | 選択した `.asmdef` を UdonSharp に登録します。 |
| **VRChat SDK > Udon Sharp > Refresh All UdonSharp Assets** | すべてのプログラムアセットを再コンパイルします。 |

## 診断

Unity ではコンパイルできるのに UdonSharp が認識しない場合は、`.asmdef` が未登録の可能性があります。`.asmdef` を選択して **Assets > Create > U# Assembly Definition** を実行し、すべてのアセットを更新してください。

## アンインストール

パッケージを削除します。SDK の UdonSharp は変更していないので、次のドメイン再読み込み後はそのままコンパイルできます。LCG 専用の構文を使うスクリプトは、標準コンパイラーのエラーになります。

## 関連ページ

- [トラブルシューティング](./troubleshooting.md)
- [サンプル](./examples.md)
