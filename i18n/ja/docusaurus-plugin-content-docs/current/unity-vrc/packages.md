---
sidebar_position: 2
---

# パッケージ

**リスト URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| パッケージ ID | 表示名 | 最新版 | Unity | 概要 |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | シーン管理、オブジェクト操作、最適化用の 15 以上の Editor ツール |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.4` | 2022.3 | インターフェース、async/await、例外、コレクション/JSON、パケット通信を追加する UdonSharp コンパイラー |

## VCC にリポジトリを追加する

1. **VRChat Creator Companion** を開きます。
2. **Settings > Packages > Add Repository** を選びます。
3. `https://vpm.logiccuteguy.com/index.json` を貼り付けます。

VCC/ALCOM からのインストールを推奨します。LCGUdonSharp は GitHub Releases でも検証済みの名前付き ZIP を公開しています。GitHub が自動生成する **Source code (zip)** は Unity パッケージとして使用できません。

## パッケージ詳細

### LogicCuteGuy Help Tools `1.0.1`

- [リポジトリ](https://github.com/LogicCuteGuy/UnityHelpTools) · [リリース](https://github.com/LogicCuteGuy/UnityHelpTools/releases)
- ライセンス: MIT
- [概要](./helptools/intro.md) · [インストール](./helptools/install.md)

### LCGUdonSharp `0.3.4`

- [リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp) · [リリース](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- 依存関係: `com.vrchat.worlds` `3.10.5`（厳密）
- ライセンス: MIT
- [概要](./lcgudonsharp/intro.md) · [インストール](./lcgudonsharp/install.md)

LCGUdonSharp は Worlds SDK を変更せず、`Payload~/UdonSharp` からコンパイラーをインストールします。

## GitHub パッケージ

### DigHoleIt `0.4.0`

- Unity 2022.3、Built-in Render Pipeline
- VRChat 依存関係: `com.vrchat.worlds` `3.10.5`、`com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [リポジトリ](https://github.com/LogicCuteGuy/DigHoleIt) · [リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.4.0)
- ライセンス: MIT

Unity Package Manager で `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.4.0` を追加するか、`Packages/com.logiccuteguy.digholeit` に配置するか、名前付き `com.logiccuteguy.digholeit-0.4.0.zip` を展開します。現在は LogicCuteGuy VPM リストに含まれていません。

[概要](./digholeit/intro.md) · [はじめに](./digholeit/getting-started.md)
