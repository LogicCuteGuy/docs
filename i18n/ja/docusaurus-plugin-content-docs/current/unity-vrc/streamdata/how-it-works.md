---
sidebar_position: 4
---

# StreamData の仕組み

## エクスポートの処理

**Export Stream** は `<scene>_StreamData/Export~` に書き込みます。**最初にこのフォルダーを空にする**ので、自分のファイルを置かないでください。

1. **Stream Materials** のテクスチャを集めます。複数のマテリアルが共有するテクスチャは 1 回だけダウンロードします。
2. 各テクスチャの小さな代替コピーを `Stream_*` アセットとして保存します。
3. 最大 2048 × 2048 のアトラスページにまとめ、複数のテクスチャを 1 回のダウンロードで受け取れるようにします。ページに 1 枚だけの場合は単独のファイルになります。
4. 画像の名前を `page_` + 内容のハッシュにします。
5. **Stream Lightmaps** がオンならライトマップを書き出します。
6. `manifest` ファイルを書き、URL をコンポーネントにベイクします。

### ストリーミングされるテクスチャ

| 条件 | 満たさない場合 |
|---|---|
| ファイルからインポートし、種類が **Default** | 警告を出してスキップ |
| **sRGB** がオン | 警告を出してスキップ |
| 長辺が **Fallback Size** より大きい | 十分小さいのでスキップ |

法線マップとリニアのマスクはストリーミングしません。ダウンロード画像は sRGB なので、正しくデコードできないためです。

### ライトマップ

カラーライトマップは、明るさ 16 まで保持できる RGBM PNG として保存します。実行時に GPU の Blit 1 回でレンダーテクスチャにデコードし、マテリアルプロパティブロックでレンダラーに設定します。シェーダーの変更は不要です。Android と iOS では、より小さい 8 ビット形式を使います。

## ダウンロードの順序

1. 最初に `manifest` をダウンロードします。両方のホストで失敗するか、形式が不明な場合は画像を要求しません。
2. **確認間隔**（1 秒）ごとに、待機中でプレイヤーに最も近いテクスチャを選びます。距離は、そのテクスチャを使うオブジェクトのバウンズまでです。
3. 画像は 1 枚ずつダウンロードします。VRChat の制限は 5 秒に 1 枚です。
4. 失敗した場合は **Backup Base Url** を試し、それも失敗すれば代替テクスチャのままにします。

失敗した項目はワールドを読み込み直すまで再試行しません。アトラスページが失敗すると、そのページを待つテクスチャはすべて失敗になります。

## メモリ

アトラスページは、各テクスチャを専用のレンダーテクスチャにコピーした後に破棄します。

**Load Distance** が 0 より大きい場合は、その距離内だけをダウンロードします。**Load Distance × Unload Factor** より離れると代替に戻してメモリを解放し、近づくと再びダウンロードします。2 つの距離の差により、境界で読み込みと解放を繰り返すことを防ぎます。0 の場合はすべてダウンロードして保持します。

## 項目の状態

`state[i]` は各ストリーミング項目の状態です。

| 定数 | 値 | 意味 |
|---|---|---|
| `StateFallback` | 0 | 代替を表示して待機中 |
| `StateLoading` | 1 | ダウンロード中 |
| `StateLoaded` | 2 | フルテクスチャを表示中 |
| `StateFailed` | 3 | 失敗、代替のまま |

`manifestState` は `ManifestPending`（0）、`ManifestOk`（1）、`ManifestFailed`（2）のいずれかです。

```csharp
using LogicCuteGuy.StreamData.Udon;
using UdonSharp;

public class StreamProgress : UdonSharpBehaviour
{
    public StreamData stream;
    public TMPro.TextMeshProUGUI label;

    private void Start() { _Refresh(); }

    public void _Refresh()
    {
        if (stream.state != null)
        {
            int loaded = 0;
            for (int i = 0; i < stream.state.Length; i++)
                if (stream.state[i] == StreamData.StateLoaded) loaded++;
            label.text = loaded + " / " + stream.state.Length;
        }
        SendCustomEventDelayedSeconds(nameof(_Refresh), 1f);
    }
}
```

Load Distance を使う場合、離れると読み込み済みの数が減ることがあります。

## テスト用の設定

**Target** を設定すると、ローカルプレイヤーの代わりにその Transform（カメラなど）から距離を測ります。

## StreamData の拡張

サブクラスで独自のデータをストリーミングできます。OpenWorld の `OpenWorldStream` は Block の配置にこれを使います。

| オーバーライド | 呼ばれるタイミング |
|---|---|
| `_OnInit()` | テクスチャの状態をリセットした後 |
| `_OnManifest(DataDictionary)` | マニフェストを読み込んだとき |
| `_OnStringLoaded(...)`、`_OnStringError(...)` | マニフェスト以外の文字列ダウンロード |
| `_StepData(Vector3)` | 確認のたび。文字列ダウンロードを開始します |
| `_StepImage(Vector3)` | 画像をダウンロードしていないとき。開始したら true を返します |
| `_OnImage(...)`、`_OnImageError(...)` | 独自の画像が完了または失敗したとき |

エディター側では、`IStreamExtension`（引数なしの public コンストラクターが必要）を実装して、エクスポートにファイルとマニフェスト項目を追加できます。
