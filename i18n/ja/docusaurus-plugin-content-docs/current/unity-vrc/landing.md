---
sidebar_position: 1
slug: /
---

# LogicCuteGuy VRC/Unity

<div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
  <img src="/img/icon.png" alt="LogicCuteGuy アバター" style={{borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', border: '4px solid var(--ifm-color-primary)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}} />
</div>

**LogicCuteGuy** の Unity および VRChat 開発ツールのセントラルリポジトリへようこそ。ワークフローの強化、パフォーマンスの最適化、およびワールド構築の簡素化を実現するために設計された一連のユーティリティを提供します。

<div style={{padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', background: 'var(--glass-bg)', borderRadius: '2rem', border: '1px solid var(--glass-border)', margin: '2rem 0'}}>
  <h2 style={{margin: 0, fontSize: '1.8rem', fontWeight: 800}}>クイックインストール</h2>
  <p style={{opacity: 0.8, textAlign: 'center', maxWidth: '500px'}}>VRChat Creator Companion (VCC) にリポジトリを追加して、ワンクリックですべてのツールにアクセスし、更新できます。</p>
  
  <a href="vcc://vpm/addRepo?url=https://vpm.logiccuteguy.com/index.json" className="button--vcc" style={{fontSize: '1.2rem', padding: '16px 36px'}}>
    <span>VCC でインストール</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
  </a>
  
  <span style={{fontSize: '0.9rem', opacity: 0.6}}>Unity 2022.3.x および VCC をサポート</span>
</div>

## 利用可能なプロジェクト

3 つの package はすべて [LogicCuteGuy VPM リスト](./packages.md)（`https://vpm.logiccuteguy.com/index.json`）で公開されています。DigHoleIt は Git tag と名前付き GitHub Release package も公開しています。

### [Help Tools (ヘルプツール)](./helptools/intro.md) — `com.logiccuteguy.helptools` v1.0.1
ライトマップのスケーリング、アセット分析、シェーダーマッピング、および階層の整理のための 15 以上のプロフェッショナルなエディターユーティリティのコレクション。

### [LCGUdonSharp](./lcgudonsharp/intro.md) — `com.logiccuteguy.lcgudonsharp` v0.3.9

LCGUdonSharp 0.3.9 は [テキストとアセットのローカライズ](./lcgudonsharp/localization.md) を追加します。Unity String/Asset Tables の Udon ベイク、ローカル言語選択とフォールバック、ドロップダウン・通知、検証付き Smart Strings、画像・音声・プレハブの切り替えに対応します。EN/TH/JA サンプル、従来の JSON ツール、Unity Localization 1.4.5 と Scriptable Build Pipeline 1.21.25 の依存関係、ビルド・ワーカースレッドの互換性修正も含まれます。テーブル変更や更新後はワールドを再ビルドしてください。

LCGUdonSharp 0.3.8 は入れ子・多態的な [ScriptableObject データスナップショット](./lcgudonsharp/scriptableobjects.md)、実行時の型判定とチェック付きキャスト、循環・深度の検証、ローカル装備サンプルに対応します。型タグ付きの新しいレイアウトを使用するため、更新後は全 Udon プログラムを再ビルドし、シーンとプレハブのデータを再ベイクしてください。

C# インターフェース、ビルド時の async/await、同期例外処理、コレクション/JSON、拡張言語機能、bounded object-motion batching と zone recovery を備えた手動パケット通信に対応する VRChat 向け UdonSharp コンパイラーです。

### [DigHoleIt](./digholeit/intro.md) — `com.logiccuteguy.digholeit` v0.6.1
Unity Terrain に実行時の穴、トンネル、洞窟、土の追加、terrain layer のペイントを提供する voxel terrain システムです。VRChat 同期と standalone C# runtime に対応します。

バージョン、依存関係、リポジトリについては[パッケージ一覧](./packages.md)をご覧ください。

---

## サポート & コミュニティ
- **GitHub**: [LogicCuteGuy リポジトリ](https://github.com/LogicCuteGuy)
- **アップデート**: 最新のツールリリースやパフォーマンスの最適化のためにフォローしてください。
