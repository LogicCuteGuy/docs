---
sidebar_position: 2
---

# Switch Child Lightmap Mode (子のライトマップモード切替)

**メニューパス**: `MeshRenderer を右クリック > LogicCuteGuy > Switch Child Lightmap Mode...`

このユーティリティは、ハイレベルなライティング戦略の迅速な変更を可能にします。大規模な階層全体で、ベイク済みライトマップの使用とライトプローブへの依存を即座に切り替えることができます。

## 主な機能

- **モード切替**: `Lightmap` (ベイク済み) と `Light Probes` (リアルタイム/プローブ点灯) を切り替えます。
- **スタティックフラグの自動化**: 選択したライティングモードに合わせて、GameObject の `Contribute GI` スタティックフラグを自動的に有効/無効にします。
- **統合されたプロパティ制御**: `receiveGI` を `Lightmaps` または `LightProbes` に設定し、`lightProbeUsage` を切り替えます。
- **ライトマップスケール制御**: 切替時に `Scale In Lightmap` プロパティを設定するオプションのオーバーライド（例：ライトマッピング時は 1.0 に、アトラス空間を節約するためにプローブ点灯時は 0.0 に設定）。
- **再帰的処理**: 選択したオブジェクトのみに適用するか、すべての子（トグルの設定により非アクティブなものを含む）に再帰的に適用するかを選択できます。

## 使い方

1. Hierarchy 内の任意の **MeshRenderer** を右クリックするか、**LogicCuteGuy** メニューから開きます。
2. ターゲットとなる **Lighting Mode** を選択します。
3. （オプション）切替時に特定の密度を強制する場合は、**Set Scale In Lightmap** にチェックを入れます。
4. **Apply To Target Or Selected** をクリックします。

> [!IMPORTANT]
> このツールは `StaticEditorFlags` を変更します。シーンのアーキテクチャにおいてスタティックフラグの変更が安全な状態であることを確認してください。
