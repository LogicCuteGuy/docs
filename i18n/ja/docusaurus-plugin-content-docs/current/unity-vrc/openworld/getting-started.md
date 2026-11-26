---
sidebar_position: 2
---

# OpenWorld をはじめる

## 1. ワールドを作る

1. グリッドの **(0, 0) の角**にしたい位置に空の GameObject を作ります。グリッドは XZ 平面上で +X と +Z 方向に広がります。回転とスケールは無視されます。
2. **Add Component > OpenWorld > OpenWorld Settings** を追加します。実行時用の `OpenWorld` UdonSharp が同じオブジェクトに追加され、Inspector では非表示になります。設定はすべて OpenWorld Settings で編集します。
3. **Chunk Size**、**Chunks X**、**Chunks Z** を設定します。Unity の Terrain がある場合は、**Fit Grid To Terrains** で角の移動とチャンク数の設定ができます。
4. コンテンツを追加します。OpenWorld オブジェクトの子にするか、シーン内の他のオブジェクトを **Content Roots** に登録します。

編集用シーンの階層は作ったままです。チャンクのルート、Block、インポスターは、Play モードとビルドで使うシーンのコピーにだけ追加されます。

:::warning 動くオブジェクト
乗り物やボートのように動くものは、チャンク化されたコンテンツに入れないでください。**開始位置**のチャンクと一緒にオフになるため、その場所から離れると消えてしまいます。[Chunk Entity](#chunk-entity) にするか、OpenWorld オブジェクトと Content Roots の外に置くか、そのレイヤーを **Chunk Layers** から外してください。
:::

## 2. チャンク化する対象を選ぶ

| 設定 | 効果 |
|---|---|
| **Chunk Layers** | このレイヤーのオブジェクトだけがチャンクに振り分けられます。それ以外は常に有効です。 |
| **OpenWorld Area** コンポーネント | シーンに 1 つでもある場合、中心がいずれかのエリア内にあるオブジェクトだけがチャンク化されます。 |
| **OpenWorld Object** コンポーネント | 遠くから見える壁やランドマーク向けに、そのオブジェクトを中距離リングより **Extra Rings** 分だけ遠くまで表示します。 |

オブジェクトは、Renderer のバウンズの中心があるチャンクに属します。グリッド外のオブジェクトはストリーミングされず、その数が警告で表示されます。

## 3. 距離リングを設定する

リングは、プレイヤーのいるチャンクからのチャンク単位の距離です。

| リング | 有効になるもの | 初期値 (PC / Quest) |
|---|---|---|
| Near | メッシュとコライダー | 1 / 1 |
| Mid | メッシュのみ（コライダーはオフ） | 3 / 2 |
| それより遠く | 無効（インポスターで表示） | |

**Changes Per Frame** (2 / 1) は 1 フレームで切り替えるチャンク数の上限です。チャンクの境界を越えても負荷が急増しません。

## 4. 繰り返し配置には Block を使う

**Block Prefabs** にプレハブを追加します。そのインスタンスはデータテクスチャを使った GPU インスタンシングで描画され、実行時に GameObject は不要です。コライダーを持つインスタンスは、コライダーだけが残ります。Terrain の木のプロトタイプは自動で一覧に追加されます。

Block のマテリアルは GPU Instancing が自動で有効になります。独自シェーダーはインスタンシングに対応している必要があります。

**Grid Prefabs** は、床・壁・草のようにグリッドに沿って密に並ぶコンテンツ向けです。各チャンクは 64 × 64 セルのレイヤーを 5 枚持ちます。レイヤーごとに、固定の高さに置くか、ベイク時の下向きレイキャストで見つけた床の上に置くかを選べます。

## 5. インポスターをベイクする

シーンを保存してから **Bake Impostors** をクリックします。コンテンツやライティングを変えたら再ベイクしてください。**Bake On Build**（初期値はオン）では、VRChat のビルドのたびにチャンク割り当てとインポスターベイクをやり直し、シーンを保存します。

## 6. 検証する

**Validate** をクリックするか、**Tools > OpenWorld > Validation** を開きます。PC と Quest について、最も負荷の高い有効範囲のドローコール、三角形数、Block、テクスチャメモリを確認し、ルール違反を一覧表示します。**エラーがあると VRChat のビルドは停止します。**

予算の値は初期値です。Quest の実機ではまだ計測していないので、ご自身のワールドをプロファイルしてください。

## 7. テストする

ClientSim で **Play** を押し、チャンクの境界を歩いて越えてみます。Scene ビューでは各チャンクの枠がリングごとに色分けされます。緑が Near、黄が Mid、灰色がオフです。

## Web からのストリーミング（任意）

**OpenWorldStream** ビヘイビアを追加します。これは [StreamData](../streamdata/getting-started.md) に Block の配置を加えたものです。

- **Stream Block Placement**: Block の配置を書き出し、ワールドを再アップロードせずに配置を変更できるようにします。Block の種類（メッシュとマテリアル）は変えられません。
- **Ship Block Placement**: 配置をワールドにも含めます。オフにするとワールドは小さくなりますが、Block はダウンロード後にしか表示されず、オフラインでは表示されません。

書き出しと公開は StreamData のガイドに従ってください。

## Block Entity

Block Entity は、ドアやスイッチのように、0～255 の同期ステートを 1 つ持つチャンク内のオブジェクトです。ステートはリージョン単位で保持されるため、チャンクが解放されても残り、後から参加したプレイヤーにも届きます。

- オン/オフのオブジェクトには **BlockEntityToggle** を使います。オブジェクトの表示/非表示と Animator の bool の設定ができます。Interact にはコライダーが必要です。
- 独自の動作は `BlockEntity` を継承し、`OnStateChanged(int state)` をオーバーライドして、`_SetState(value)` を呼びます。`OnEnable` をオーバーライドする場合は `base.OnEnable()` を呼んでください。

## Chunk Entity

`ChunkEntity` は NPC や Pickup のような、自由に動きオーナーが同期するオブジェクトです。チャンクと一緒に解放されるのではなく、リングでカリングされます。

1. **Body** に、Renderer とコライダーを持つ**子**オブジェクトを指定します。
2. Near リング内でオーナー側が実行する処理は、`OnSimulate(float deltaTime)` をオーバーライドして書きます。
3. 多数を生成するには、**ChunkEntityPool** と VRC Object Pool を持つオブジェクトの子にします。`_Spawn(position, rotation)` で生成し、エンティティ側の `_Despawn()` で返却します。

## ランタイム編集

**Editable** をオンにすると、プレイヤーが Block を配置・移動・削除できます。編集は同期され、後から参加したプレイヤーにも届きます。**Max Adds Per Region** (64) と **Max Grid Edits Per Region** (256) が同期データの上限です。

すぐ使えるツールとして、**ChunkEditTool** を VRC Pickup に追加できます。スクリプトからは `OpenWorld` の `_PickBlock`、`_PlaceBlock`、`_PlaceGridBlock`、`_MoveBlock`、`_RemoveBlock` を呼べます。

## DigHoleIt ボクセル地形（任意）

[DigHoleIt](../digholeit/intro.md) (`com.logiccuteguy.digholeit`) をインストールすると、OpenWorld が `ChunkTerrain` の U# プログラムアセットを作成し、シーンに Dig Zone のランタイムがあればワールドに `ChunkTerrain` を自動で追加します。アセットがない場合は **Tools > OpenWorld > Create Missing U# Program Assets** を実行してください。Terrain と Dig Zone はチャンク化されるコンテンツに入れないでください。

DigHoleIt を**削除する**場合は、`Packages/com.logiccuteguy.openworld/Runtime/Terrain/ChunkTerrain.asset` を削除してください。削除しないと、`ChunkTerrain.cs` が U# アセンブリに属していないというエラーが出ます。

## トラブルシューティング

| 症状 | 確認すること |
|---|---|
| 離れるとオブジェクトが消える | 動くオブジェクトがチャンク化されています。手順 1 の注意を参照してください。 |
| オブジェクトがストリーミングされない | グリッド外か、Chunk Layers または OpenWorld Area で除外されています。 |
| ビルドが停止する | **Tools > OpenWorld > Validation** を開き、エラーを修正します。 |
| 遠くのチャンクが古いまま | インポスターを再ベイクします。 |
| `ChunkTerrain.cs does not belong to a U# assembly` | DigHoleIt が削除されています。上記のとおり `ChunkTerrain.asset` を削除してください。 |
