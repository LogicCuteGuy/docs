---
sidebar_position: 3
---

# C# インターフェース

> ドキュメントバージョン: **0.3.4**

通常の C# インターフェースを定義し、`UdonSharpBehaviour` で実装できます。引数、戻り値、プロパティ、複数実装、インターフェース配列に対応します。

```csharp
public interface INumberOperation
{
    int Apply(int value);
    int LastResult { get; }
}

public class AddNumberOperation : UdonSharpBehaviour, INumberOperation
{
    [SerializeField] private int amount = 5;
    private int _lastResult;
    public int LastResult => _lastResult;

    public int Apply(int value)
    {
        _lastResult = value + amount;
        return _lastResult;
    }
}
```

Unity はインターフェース型フィールドをシリアライズできません。具体的なコンポーネントを保存し、実行時にインターフェース型のローカル変数へ代入してください。

対応外: generic interface/method、interface 継承、default/static member、event、indexer、明示的実装、組み込み Udon event と衝突する名前。

- [拡張言語機能](./extended-language.md)
- [サンプル](./examples.md)
