---
sidebar_position: 7
---

# コレクション、JSON、バイト、ビット

> ドキュメントバージョン: **0.3.4**

正確な `List<T>` と `Dictionary<TKey,TValue>` は VRChat の `DataList`、`DataDictionary`、`DataToken` 操作へ変換されます。SDK 型や `VRCJson` を直接使用する既存コードは変更されません。

```csharp
List<int> values = new List<int> { 1, 2, 3 };
Dictionary<string, int> scores = new Dictionary<string, int>
{
    { "alpha", 10 },
};
string json = JsonSerializer.Serialize(scores);
Dictionary<string, int> copy =
    JsonSerializer.Deserialize<Dictionary<string, int>>(json);
```

## 対応範囲

- constructor、initializer、Count、Capacity、typed indexer
- `foreach`、一般的な追加・挿入・削除・検索操作
- `TryGetValue`、Keys/Values、typed `ToArray`
- 入れ子の collection field と collection array
- null と空の値を区別し、primitive/enum の正確な token type を保持

collection interface、派生 collection、custom comparer、nullable annotation、Inspector serialization、collection LINQ は対応外です。

## JSON と同期

VRCJson ベースの `System.Text.Json` facade を提供します。文字列 key の dictionary は通常の JSON object、それ以外の安全な key は `$lcgDictionary` envelope を使用します。object reference、`NaN`、Infinity は拒否されます。

同期する collection は Manual-sync behaviour の非 Inspector field にします。

```csharp
[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class SharedValues : UdonSharpBehaviour
{
    [UdonSynced, System.NonSerialized]
    private List<int> values = new List<int>();
}
```

Continuous sync、`FieldChangeCallback`、Inspector serialization、JSON に変換できない要素は拒否されます。`byte[]`、bitwise operator、`BitConverter`、`Buffer.BlockCopy`、UTF-8、`DataToken.Bitcast` も利用できます。

:::caution 名前空間の競合
別の実体 `System.Text.Json` assembly を追加すると intrinsic facade と競合する場合があります。
:::
