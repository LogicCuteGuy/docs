---
sidebar_position: 2
---

# はじめに：画像付きチュートリアル

> ドキュメントバージョン: **0.7.0** · [リリースノート](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

DigHoleIt のインストール、掘れる範囲の Bake、Unity での sculpt、VRChat 用 Dig Pen の設定を順番に説明します。画像は提供された `2026-10-10 06-45-13.mp4` の実際のフレームです。キャプションは動画内の時刻です。画像をクリックすると原寸で確認できます。

録画は Play mode を使わない **Editor での作業**で、未解決の Udon program asset エラーも含みます。World をテストする前に、以下の runtime 設定と確認を完了してください。

## 要件

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| その他 | Worlds SDK 3.10.5、**LCGUdonSharp** 0.3.4 以上 | なし |

## 1. Package をインストール

VRChat では **VCC または ALCOM** を使います。

1. VCC は **Settings > Packages > Add Repository**、ALCOM は **Resources > Add Repository** を開き、次を入力します。

   ```text
   https://vpm.logiccuteguy.com/index.json
   ```

2. **DigHoleIt - Diggable Voxel Terrain** がリストにあることを確認し、repository を追加します。

[![ALCOM の LogicCuteGuy VPM repository 確認画面](/img/digholeit/tutorial/add-repository.webp)](/img/digholeit/tutorial/add-repository.webp)

*00:05 — ALCOM の確認画面。VCC は配置が異なりますが URL は同じです。*

3. Project の **Manage Packages** を開き、更新して **DigHoleIt** を検索し、**0.7.0** をインストールします。VPM package は Worlds SDK 3.10.5 と LCGUdonSharp 0.3.4 以上を依存関係として指定しています。
4. Unity を開き、import と compile の完了を待ちます。Play/build の前に Console エラーを解決します。[Udon program asset エラー](troubleshooting.md#udon-program-assets)を参照してください。

[![ALCOM で DigHoleIt 0.7.0 のインストールが完了した画面](/img/digholeit/tutorial/install-package.webp)](/img/digholeit/tutorial/install-package.webp)

*00:23 — Installed / Latest が 0.7.0 で、インストール成功のメッセージがあります。*

**Git install** の VRChat project では、先に [LCGUdonSharp](../lcgudonsharp/install.md) を導入します。**Window > Package Manager > + > Add package from git URL** に入力します。

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0
```

または tagged repository、もしくは release の `com.logiccuteguy.digholeit-0.7.0.zip` の内容を `Packages/com.logiccuteguy.digholeit` に配置します。`package.json` はこの folder の直下に置きます。GitHub の自動 source archive より、名前付き package ZIP を推奨します。

## 2. Example または自分の Terrain を選ぶ

Project window の **Packages > DigHoleIt - Diggable Voxel Terrain > Example** を開きます。

| Scene | 内容 |
|---|---|
| `VRChat/DigHoleItVRChatDemo.unity` | Bake 済み zone、spawn、3 本の shovel と pen。最初の ClientSim テスト向け。 |
| `VRChat/DigHoleItVRChatShowcase.unity` | 録画の forest scene。Bake 済み zone と 4 本の pen。 |
| `Standalone/DigHoleItStandaloneDemo.unity` | Non-VRChat project 用の mouse 操作と pen。 |
| `Showcase/DigHoleItShowcase.unity` | Editor 専用の pit/cave。Runtime はありません。 |

現在の scene を保存してから example を開きます。Git URL package は read-only です。編集・Re-bake の前に example folder を `Assets` へ copy します。編集する Terrain / zone data が read-only package を参照している場合、それらも copy して割り当て直してください。`.unity` だけの copy では asset reference は変わりません。

Example には zone があるので、まずその zone を選択して確認します。新しい zone は自分の **Unity Terrain**（mesh ではありません）で作成し、scene を `Assets` に保存します。Material は holes 対応が必要です。標準 Built-in terrain material は対応しています。

**Tools > DigHoleIt > Create VRChat Demo Scene** は `Assets/DigHoleIt/Demo` に Bake 済み zone、spawn、3 本の shovel を作成します。Menu で生成する scene は shovel、配布 0.7.0 example は pen を含みます。**Create Standalone Demo Scene** は通常 non-VRChat project だけに表示されます。

## 3. Dig Zone を作成して Bake

1. Hierarchy で Terrain を選択します。
2. Terrain component の **Paint Terrain**（brush アイコン）で **DigHoleIt: Dig Voxels** を選択します。

[![Paint Terrain dropdown の四つの DigHoleIt tool](/img/digholeit/tutorial/terrain-tools.webp)](/img/digholeit/tutorial/terrain-tools.webp)

*01:08 — Dig Voxels / Paint Voxels / Paint Trees / Paint Details は別の tool です。*

3. **Dig Zones** panel の **Create Dig Zone** を押します。この方法は Terrain の割り当て、縦方向の Fit、Bake を自動実行します。空の GameObject に **DigHoleIt > Dig Zone** を追加する方法では、Terrain を割り当て、**Fit To Terrain**、**Bake** を自分で押します。
4. Zone を選択し、色付き face handle で移動・resize します。Orange box は zone、green box は **Border Voxels** を除いた編集範囲です。Footprint を Terrain 内に収め、別の zone には別の範囲を使います。
5. Package default の **Voxel Size 0.5**、**Chunk Cells 16**、**Border Voxels 2**、**Depth Below Terrain 8**、**Headroom Above Terrain 4** から始めます。Fit To Terrain は縦の cell 数を調整します。性能保証ではありません。[Performance and limits](performance.md) を参照してください。
6. **Re-bake after dragging the zone handles** が有効なら handle を離すと Re-bake します。Inspector の寸法を変えた場合は **Bake** を押します。完了後、surface が見え、**Data** asset と chunk object があることを確認します。

[![Bake 済み Dig Zone の orange/green bounds と face handles](/img/digholeit/tutorial/zone-bounds.webp)](/img/digholeit/tutorial/zone-bounds.webp)

*01:30 — 0.5 m の 64 × 27 × 48 cells：32 × 13.5 × 24 m。Fit 後の高さは Terrain によって変わります。*

Bake は voxel size/lattice が互換なら通常 sculpt/paint を保持します。変更前に Inspector の警告を読んでください。**Reset To Terrain** は sculpt/paint を破棄します。Setup に必要な操作ではありません。[Dig Zones](dig-zones.md) を参照してください。

## 4. Pit を掘って形を整える

1. Terrain を選択し **DigHoleIt: Dig Voxels** に戻ります。
2. **Dig**、soft round brush、小さい radius（例：**2 m**）、**Strength 0.5** から始めます。Green box 内を狙い、Scene view で左 mouse を押し続けるか drag します。
3. Mouse を離して stroke を終了します。Pit に dug soil が見えます。壁を狙うと tunnel を延ばせます。
4. **Add** は土を戻し、**Smooth** は表面を整え、**Reset** は一部を baked terrain に近づけます。**Shift** は一時的に Add、**Ctrl** は Smooth。**A + drag** は size、**S + drag** は strength、**[ / ]** は size を変更します。Undo で stroke を戻せます。

[![Dig mode で掘った pit と brush settings](/img/digholeit/tutorial/dig-pit.webp)](/img/digholeit/tutorial/dig-pit.webp)

*01:54 — 録画は 4.84 m の editor brush。最初は小さくしてください。赤い status は未解決の Udon エラーで、runtime 成功の証拠ではありません。*

Zone を選択して **Sculpt Tool** を押すと Scene-view panel も使えます。[Editor brushes](editor-brushes.md) を参照してください。

## 5. 土・草・花・木を Paint

### Voxel surface を Paint

**DigHoleIt: Paint Voxels** で Terrain layer または **Dug Soil** を選択し、掘った表面を drag します。**Auto** は明示的な paint を消し、自動 shading に戻します。Strength を下げると coverage が blend します。Terrain layer を先に追加し、layer list の変更後は zone を Bake します。

[![Paint Voxels の Auto、Grass、Rock、Sand、Moss、Dug Soil](/img/digholeit/tutorial/paint-voxels.webp)](/img/digholeit/tutorial/paint-voxels.webp)

*02:49 — この Terrain は四つの named layer を持ちます。選択肢は自分の Terrain から取得されます。*

### Pit 内に草や花を Paint

**DigHoleIt: Paint Details** で thumbnail を選ぶか **Edit Details** で追加します。Brush Size、Opacity、Target Strength を設定し、床や壁を paint します。**Surface Angle** の **Floors** / **Walls** / **Ceilings** / **All** で配置面を制限します。壁・天井の detail は stroke の停止・終了時に表示されます。**Shift** は削除、**Ctrl** は選択 detail だけ削除。Detail Resolution が 0 なら Terrain Settings で設定するか、表示される **Set Detail Resolution To 512** を使います。

[![Flowers を選択した Paint Details と pit の花](/img/digholeit/tutorial/paint-details.webp)](/img/digholeit/tutorial/paint-details.webp)

*02:25 — Flowers を選択。Surface Angle は brush settings の下です。*

### Voxel surface に木を Paint

**DigHoleIt: Paint Trees** で thumbnail を選ぶか **Edit Trees** で prefab を追加します。最初は小さい brush と低い density にします。**Tree Direction In Zones > Upright** は直立（天井では下向き）、**Along Surface** は斜面や壁から伸びます。**Shift** は削除、**Ctrl** は選択 tree だけ削除します。

[![Tree thumbnails と Along Surface を選んだ Paint Trees](/img/digholeit/tutorial/paint-trees.webp)](/img/digholeit/tutorial/paint-trees.webp)

*03:10 — Along Surface を選択。録画の大きな brush/density は多数の木を作るので、最初は小さくしてください。*

Zone 内は **DigHoleIt** の foliage tool を使います。Unity 標準 brush は Terrain hole を通して届きません。支える地面を掘る・埋めると tree/detail は消えます。[木と detail](dig-zones.md) を参照してください。

## 6. VRChat のプレイヤーが掘れるようにする

Editor brush には runtime は不要ですが、プレイヤーには必要です。

Scene には **VRC Scene Descriptor** と固い地面上の spawn も必要です。配布 VRChat scene は **VRCWorld** を含みます。独自 scene に descriptor がなければ SDK prefab `Packages/com.vrchat.worlds/Samples/UdonExampleScene/Prefabs/VRCWorld.prefab` を追加し、spawn を Terrain の上の安全な位置に置きます。

1. Bake 済み zone の **Add VRChat Runtime** を押します。Zone に **DigZoneRuntime**、child GameObject に **DigSync** が追加され、Inspector に **VRChat runtime: DigZoneRuntime + DigSync** と表示されます。

[![Runtime 追加前の Bake / Add VRChat Runtime ボタン](/img/digholeit/tutorial/zone-inspector.webp)](/img/digholeit/tutorial/zone-inspector.webp)

*01:30 — Runtime 追加前。まだプレイヤーは掘れません。Add VRChat Runtime を押して設定を完了します。*

2. **Example/Pen/Dig Pen (VRChat).prefab** を scene に drag し、安全な player spawn から取れる位置に置きます。Prefab の pickup、Rigidbody、Object Sync、settings Canvas、cursor を使います。
3. **DigTool** のある **Pen** child を選択して **Refresh Zones** を押します。**Zones** に `DigZoneRuntime` があり、**Layers** が zone の **Chunk Layer** を含み、**Reach** が十分か確認します。Refresh Zones は list を scene の全 zone に置き換えるので、custom list はその後に再指定します。空の list は scene open/save/play 時にも補完されます。
4. Tree/Detail mode を使うなら runtime の **Tree Prefabs** / **Detail Prefabs** を確認します。空なら Terrain prototype または example default を使います。独自の選択肢には array を指定します。
5. Authoring zone の Re-bake/sculpt で runtime を更新します。Runtime の baked grid field を手で変更しないでください。
6. Baked light は **Add Light Probes** または **Update Light Probes** を押し、最後の zone bake/sculpt 後に lighting を Bake します。Runtime で変更した chunk は probes を使います。
7. 保存し、Console エラーを解決してから ClientSim で **Play** します。Pen を持ち、zone を狙って **Use** を押し続けます。Panel で **Dig** / **Add** / **Paint** / **Tree** / **Detail** / **Smooth**、Size/Rate、option arrows を選べます。

ClientSim は local pickup/UI と edit の確認です。Built world を VRChat の二つの client と late joiner でテストし、sync/replay を確認します。Pen の **Reset Zones** は全員を baked state に戻す要求で、既定は master のみです。[VRChat runtime](vrchat-runtime.md) を参照してください。

## Standalone setup

Mouse tool は Unity の legacy Input Manager を使います。この backend（または Both）を有効にしてください。Input System のみなら `EditAtScreen` を自分で呼び出す必要があります。

Non-VRChat project で zone を Bake し **Add Standalone Runtime** を押します。配布 demo、camera の `DigToolStandalone`、または **Example/Pen/Dig Pen (Standalone).prefab** を使い camera/zones を指定します。左 mouse は選択 mode、右は Add、middle は Paint。**Show Settings** で panel を有効にし、**Tab** で表示を切り替えます。Save/multiplayer は [Standalone runtime](standalone-runtime.md) を参照してください。VRChat project では通常この script は無効です。

## World テスト前の確認

- Scene と編集した Terrain/zone data が writable で保存済み。Compile/program asset エラーがない。
- Zone に baked data/chunks があり、green bounds が掘る範囲を覆う。
- VRChat zone に **DigZoneRuntime + DigSync** があり、pen が zone を見つけて Chunk Layer に当たる。
- ClientSim で Dig/Add/Paint、使用する foliage option/settings button が動く。
- VRChat の二つの client と late joiner が同じ変更を見る。Target-device performance は別途確認する。

手順は [DigHoleIt 0.7.0 source](https://github.com/LogicCuteGuy/DigHoleIt/tree/0433a4f83616df0900edfca1676d4f5eb6ddfc63) と照合済みです。録画は Play mode、world build、multiplayer、target-device performance を実証していません。
