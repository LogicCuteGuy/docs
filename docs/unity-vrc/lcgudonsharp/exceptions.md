---
sidebar_position: 5
---

# Synchronous Exception Handling

Compiler-managed `try`/`catch`/`finally` with explicit `throw`s, rethrow, and guarded null, index, and integral divide/modulo failures — without relying on unavailable Udon exception opcodes.

```csharp
try
{
    LoadSlot(selectedIndex);
}
catch (ArgumentException exception)
{
    Debug.LogError(exception.Message);
}
catch (UdonException exception)
{
    Debug.LogError(exception.Operation + ": " + exception.Message);
}
finally
{
    isBusy = false;
}
```

## What is guarded

The compiler recognizes explicit `throw new` statements and guards:

- null receivers,
- array/string indices,
- integral division or modulo,

inside protected code **and its same-behaviour call graph**.

`UdonException` carries `Kind`, `Code`, `Operation`, and `Message`; standard catch variables expose only `Message`. Catch-all clauses and `throw;` are supported, and all abrupt exits run applicable `finally` blocks.

:::caution Synchronous emulation
This is synchronous emulation. A real fault raised inside an Udon extern cannot be intercepted and still halts that behaviour. Custom events, network calls, other behaviours, floating-point division, overflow, casts, and SDK domain failures are exception boundaries or outside v1.
:::

`await` inside `try` is rejected with a targeted diagnostic; existing asynchronous callback/result behavior is unchanged. See [`ExceptionHandlingExample.cs`](https://github.com/LogicCuteGuy/LCGUdonSharp/blob/main/Example/ExtendedLanguage/ExceptionHandlingExample.cs).

## See also

- [Async/Await](./async-await.md)
- [Troubleshooting](./troubleshooting.md)
