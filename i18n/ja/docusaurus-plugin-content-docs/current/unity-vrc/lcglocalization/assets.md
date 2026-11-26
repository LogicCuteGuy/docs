---
sidebar_position: 3
---

# アセットのローカライズ

画像、テクスチャ、音声、GameObject を言語に合わせて切り替えられます。

## Unity Asset Table を使う

Source の **Asset Table Collections** 配列に **Asset Table Collection** を追加します。次に Unity のコンポーネントを追加し、イベントを接続します。

| コンポーネント | 接続先 |
|---|---|
| **Localize Sprite Event** | `Image.sprite` |
| **Localize Texture Event** | `RawImage.texture` |
| **Localize Audio Clip Event** | `AudioSource.clip` |
| **LCG Localization > Localize Prefab Event** | コールバックは不要です |

アセットは名前付きのサブアセットを含めて、**ベイク時**に解決されます。項目がない場合は既定の locale、その次にコンポーネントの元のアセットを使います。任意のアセットコールバックと、アセットごとの locale 上書きは拒否されます。

:::note
すべての言語のバリアントがワールドに含まれます。大きなバリアントが多いと、ダウンロードサイズが増えます。
:::

### プレハブ

ベイクは locale ごとに子オブジェクトを 1 つ作成し、該当するものを表示します。オブジェクトはローカルで、ネットワーク上には何も生成しません。

Unity のものではなく、LCG の **Localize Prefab Event** を使ってください。Edit モードでプレビューを安全に削除します。Unity Localization 1.4.5 のイベントは、プレビューを切り替えるとエディターエラーを出すことがあります。

## シーン内の既存オブジェクトを使う

シーンにある GameObject やマテリアルには、**常にアクティブな**親に **LCG Localized Asset** を追加します。

1. **Localization** にマネージャーを割り当てます。
2. **Languages** に言語コードを入力します。
3. GameObject は **Variants** に、スプライト、テクスチャ、クリップ、マテリアルは **Assets** に、言語コードと同じ順で登録します。
4. 対応する対象を設定します。

| アセット | フィールド |
|---|---|
| スプライト | **Image** |
| テクスチャ | **Raw Image** |
| 音声クリップ | **Audio Source** |
| マテリアル | **Target Renderer** |

1 つのコンポーネントが保持するローカライズ済みアセットは **1** セットです。マネージャーはベイク時にこれらのコンポーネントを検出します。

### 音声

既定では、言語を変えるとクリップを差し替えて、前のクリップを停止します。新しいクリップを再生するには **Play Audio On Change** を有効にします。

サンプルシーンの音は、クリップの切り替えを示すだけのものです。翻訳した音声ではありません。
