---
sidebar_position: 1
---

# インストール

**LogicCuteGuy Help Tools** を Unity プロジェクトにインストールするには、**VRChat Creator Companion (VCC)** の使用をお勧めします。これにより、常に最新バージョンが保たれ、すべての依存関係が自動的に管理されます。

## クイックインストール (VCC)

VRChat Creator Companion がインストールされている場合は、以下のボタンをクリックしてリポジトリを追加し、ワンクリックでパッケージをインストールできます。

<div style={{textAlign: 'center', padding: '2rem 0'}}>
  <a href="vcc://https://raw.githubusercontent.com/LogicCuteGuy/LogicCuteGuy/refs/heads/main/vpm.json" className="button--vcc">
    <span>VCC でインストール</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
  </a>
</div>

---

## 手動インストール

1. Unity プロジェクトを開きます。
2. `Window` > `Package Manager` を開きます。
3. 左上の `+` ボタンをクリックします。
4. `Add package from git URL...` を選択します。
5. 次の URL を貼り付けます：
   ```text
   https://github.com/LogicCuteGuy/com.logiccuteguy.helptools.git
   ```
6. **Add** をクリックします。

## 必要条件
- **Unity 2022.3.x** (VRChat 推奨)
- **VRChat SDK 3.0** (ほとんどのツールの基本要件)
