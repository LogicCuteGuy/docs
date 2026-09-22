---
sidebar_position: 3
---

# C# Interfaces

Define a plain C# interface and implement it on `UdonSharpBehaviour` classes. Method calls dispatch through the interface — with parameters, return values, properties, multiple implementations, and interface arrays.

```csharp
public interface INumberOperation
{
    int Apply(int value);
    int LastResult { get; }
}

[UdonBehaviourSyncMode(BehaviourSyncMode.NoVariableSync)]
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

Dispatch through the interface:

```csharp
INumberOperation firstOperation  = addOperation;       // AddNumberOperation
INumberOperation secondOperation = multiplyOperation;  // MultiplyNumberOperation

int added      = firstOperation.Apply(input);   // 10 → 15
int multiplied = secondOperation.Apply(input);  // 10 → 30
```

## Interface field serialization

Unity cannot serialize interface fields. Store the concrete components on your behaviour and assign them to interface locals at runtime (as in the example above).

## Interface limitations

Interface support targets the common polymorphism patterns used in worlds:

- Supported: method dispatch with parameters/returns, properties, multiple implementations per class, interface arrays, closed generic interface diamonds.
- Rejected at build time (with diagnostics): constructs outside the supported contract — see `Example/GenericRestrictions` for the accepted/rejected pairs.

## See also

- [Extended Language](./extended-language.md) — closed generics and interface diamonds
- [Examples](./examples.md) — `Example/Interfaces` runs `INumberOperation` end to end
