---
sidebar_position: 6
---

# Extended Language

LCGUdonSharp lowers extended C# constructs at build time to concrete Udon-friendly code — loops, arrays, and locals instead of runtime abstractions.

## ref / out

`ref`/`out` work on locals, fields, array elements, `out var`, and in recursion:

```csharp
// ref/out — locals, fields, array elements, out var, recursion
Swap(ref values[0], ref values[1]);
AddUntil(ref values[0], target, out int recursiveCalls);
```

## LINQ closures

LINQ lambdas with captures are lowered to loops at build time — no delegates at runtime:

```csharp
int[] result = values
    .Where(value => value >= minimum)
    .Select(value => value * localScale)
    .ToArray();
```

## Also supported

- Closed generic static helpers
- Closed generic interface diamonds
- Proven `dynamic`
- Array-backed local `Span<int>`

## Build-time diagnostics

Unsupported or ambiguous forms are rejected at build time with targeted diagnostics rather than failing at runtime. `Example/GenericRestrictions` contains the accepted/rejected pairs for open generics, `List<T>`, interface contracts, multiple bases, and `Task<T>`.

## See also

- [C# Interfaces](./interfaces.md)
- [Examples](./examples.md) — `Example/ExtendedLanguage` covers try/catch, ref/out, generics, LINQ, `dynamic`, `Span<T>`
