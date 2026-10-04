---
sidebar_position: 2
---

# パッケージ

**リスト URL**: [`https://vpm.logiccuteguy.com/index.json`](https://vpm.logiccuteguy.com/index.json)

| パッケージ ID | 表示名 | 最新版 | Unity | 概要 |
|---|---|---:|---|---|
| `com.logiccuteguy.helptools` | LogicCuteGuy Help Tools | `1.0.1` | 2022.3.22f1 | シーン管理、オブジェクト操作、最適化用の 15 以上の Editor ツール |
| `com.logiccuteguy.lcgudonsharp` | LCGUdonSharp | `0.3.8` | 2022.3 | インターフェース、async/await、例外、コレクション/JSON、パケット通信を追加する UdonSharp コンパイラー |
| `com.logiccuteguy.digholeit` | DigHoleIt | `0.6.1` | 2022.3 | 同期 runtime edit、foliage、package example、seam のない terrain hole edge に対応した掘削可能な voxel zone |

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

### LCGUdonSharp `0.3.8`

LCGUdonSharp 0.3.8 は入れ子・多態的な [ScriptableObject データスナップショット](./lcgudonsharp/scriptableobjects.md)、実行時の型判定とチェック付きキャスト、循環・深度の検証、ローカル装備サンプルに対応します。型タグ付きの新しいレイアウトを使用するため、更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。

- [リポジトリ](https://github.com/LogicCuteGuy/LCGUdonSharp) · [リリース](https://github.com/LogicCuteGuy/LCGUdonSharp/releases)
- 依存関係: `com.vrchat.worlds` `3.10.5`（厳密）
- ライセンス: MIT
- [概要](./lcgudonsharp/intro.md) · [インストール](./lcgudonsharp/install.md)

LCGUdonSharp は Worlds SDK を変更せず、`Payload~/UdonSharp` からコンパイラーをインストールします。0.3.6 は bounded object-motion batching、snapshot/disconnect recovery、ownership repair、配線済み native/LCG load example を追加します。古い build は新しい motion batch envelope を decode できないため world を再ビルドしてください。

### DigHoleIt

- 最新版: `0.6.1` — [release](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.6.1)
- Unity 2022.3、Built-in Render Pipeline
- VRChat 依存関係: `com.vrchat.worlds` `3.10.5`、`com.logiccuteguy.lcgudonsharp` `>=0.3.4`
- [リポジトリ](https://github.com/LogicCuteGuy/DigHoleIt) · [リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.6.1)
- ライセンス: MIT

VCC の VPM リスト、Unity Package Manager の `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.6.1`、`Packages/com.logiccuteguy.digholeit` への配置、または名前付き `com.logiccuteguy.digholeit-0.6.1.zip` release asset から 0.6.1 をインストールできます。GitHub 自動生成の source archive を Unity package として使用しないでください。

0.6.1 は Bake/move/resize の Undo、terrain-hole seam、foliage shading、無効な edge collision mesh を修正します。

[概要](./digholeit/intro.md) · [はじめに](./digholeit/getting-started.md)
