---
sidebar_position: 2
---

# はじめに

> ドキュメントバージョン: **0.7.0** · [リリースノート](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

## 要件

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| その他 | Worlds SDK 3.10.5、LCGUdonSharp 0.3.4 以上 | なし |

## インストール

[LogicCuteGuy VPM リスト](https://vpm.logiccuteguy.com/index.json)を更新し、VCC/ALCOM で **0.7.0** を導入できます。ほかに `https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0`、tag repository の埋め込み、[リリース](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)の `com.logiccuteguy.digholeit-0.7.0.zip` の展開にも対応します。自動生成 source archive は使わないでください。VRChat の Git/ZIP 導入では先に LCGUdonSharp を[インストール](../lcgudonsharp/install.md)します。

Git からインストールする場合は Unity Package Manager の **Add package from git URL** に次を入力します。

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0
```

または repository を `Packages/com.logiccuteguy.digholeit` に配置します。VRChat project では先に LCGUdonSharp をインストールしてください。

## Example scene

0.6.0 以降には、Project window の *Packages > DigHoleIt - Diggable Voxel Terrain > Example* に次の scene が含まれます。

- **`VRChat/DigHoleItVRChatDemo`**: Bake 済み Dig Zone、VRCWorld spawn、dig/add/paint 用の 3 本の shovel。ClientSim で Play し、shovel を持って Use を押します。
- **`Standalone/DigHoleItStandaloneDemo`**: Bake 済み zone と `DigToolStandalone` 付き camera。左 click は選択 mode（既定 dig）、右は add、middle は paint です。VRChat project では standalone runtime が compile されないため script は missing 表示になります。
- **`Showcase/DigHoleItShowcase`**: README screenshot 用の 200 m forest terrain、pit、rock 下の cave、内部の tree/grass を含む scene。Runtime はなく、無効な *Shot Pit* / *Shot Cave* camera が撮影 view を保持します。

各 example は専用の terrain、zone data、material を同じ folder に保持します。Git URL package は read-only のため、編集または Re-bake する前に example folder を `Assets` へ copy してください。VCC install では `Packages` 内を編集できます。

新しい demo scene を project に生成することもできます。

- **Tools > DigHoleIt > Create VRChat Demo Scene**: terrain、Bake 済み zone、spawn、dig/add/paint の shovel を作成します。ClientSim で Play し、shovel を持って Use を押します。
- **Tools > DigHoleIt > Create Standalone Demo Scene**: terrain、zone、`DigToolStandalone` 付き camera を作成します。左 click は選択 mode（既定 dig）、右は add、middle は paint です。

## 独自 Terrain へ追加する

1. 空の GameObject に **DigHoleIt > Dig Zone** を追加し Terrain を割り当てます。
2. **Voxel Size**、**Cells**、**Chunk Cells** を設定し、**Fit To Terrain**、**Bake** の順に実行します。
3. VRChat では **Add VRChat Runtime**、standalone では **Add Standalone Runtime** を押します。Zone の作成や Bake だけでは runtime は追加されません。
4. VRChat では pickup に `DigTool` を追加して zone を `zones` array に登録します。Standalone では camera に `DigToolStandalone` を追加します。
5. 必要に応じて [Editor brush](editor-brushes.md) で sculpt/paint します。
6. Baked light を使う場合は **Add Light Probes** を実行して lighting を Bake します。

0.4 から 0.5 へ更新する場合は、木・detail と新しい zone height data を取り込むため各 zone を一度 Re-bake してください。Voxel size と lattice が同じなら sculpt と paint は保持されます。

## 0.7.0 の Dig Pen と showcase

`Example/Pen/Dig Pen (VRChat).prefab` は VRC Object Sync 付き pickup、world-space 設定パネル、brush cursor を含みます。`Dig Pen (Standalone).prefab` は mouse pen と画面上のパネルです。配布 demo scene は両方とも pen を含みます。Scene-builder menu は従来の shovel/camera 構成です。

Dig/add/paint/tree/detail/smooth、size/rate、layer/prefab/erase を選択できます。Standalone の左 mouse は選択中の mode、右は add、middle は paint。**Show Settings** でパネルを有効にし、Tab で切り替えます。

空の `zones` / `layerNames`、runtime の `treePrefabs` / `detailPrefabs` は bake・scene open/save/play 時に scene zone と terrain prototype（なければ example prefab）から補完されます。独自の選択には配列を指定してください。DigTool Inspector の **Refresh Zones** は zone と layer name を再設定し、削除 zone は save/play 時に外れます。

`Example/VRChat/DigHoleItVRChatShowcase.unity` は専用 terrain、四つの pen、0.5 m voxel の 151 × 89 × 155-cell zone を含みます。従来の runtime なし `Showcase/DigHoleItShowcase` とは別です。Git sample は編集前に Assets へ copy します。
