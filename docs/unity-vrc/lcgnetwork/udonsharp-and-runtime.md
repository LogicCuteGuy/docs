---
sidebar_position: 4
---

# UdonSharp extras and runtime ABI

Normal Udon networking is routed without any of this. These extras add finer control. They work with the VRChat SDK's UdonSharp, and with [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro), which builds on it.

## Example

```csharp
using UdonSharp;
using UnityEngine;
using VRC.SDK3.UdonNetworkCalling;
using VRC.SDKBase;
using VRC.Udon;

[UdonBehaviourSyncMode(BehaviourSyncMode.NoVariableSync)]
public class Lamp : UdonSharpBehaviour
{
    public LCGRuntime lcg;                                    // filled at build; leave empty
    [HideInInspector] public VRCPlayerApi __lcgPacketSender;  // sender while a handler runs

    [LCGPacket(Authority = LCGPacketAuthority.ObjectOwner, Callback = nameof(OnLightChanged))]
    private bool lightOn;

    private void Toggle()
    {
        lightOn = !lightOn;
        RequestSerialization();      // sends every [LCGPacket] field of this behaviour
    }

    public void OnLightChanged() { /* runs on receivers */ }

    [LCGPacket(Authority = LCGPacketAuthority.Any), NetworkCallable]
    public void ReceivePing(string message) { }

    public void PingOwner()
    {
        VRCPlayerApi owner = Networking.GetOwner(gameObject);
        lcg.SendToPlayer((UdonBehaviour)(Component)this, owner, nameof(ReceivePing), new object[] { "hi" });
    }
}
```

## `[LCGPacket]`

It goes on a field or a method.

| Setting | Meaning |
|---|---|
| `Authority` | Who may send: `Any` zone member (default), only the `ObjectOwner`, or only the instance `Master` |
| `Callback` | Fields only. The method to run on receivers. |

- A method with parameters needs `[NetworkCallable]`, which supplies the parameter information. So does a callback that takes a `VRCPlayerApi`.
- An unsupported field or parameter type, or missing parameter information, is a **build error**.
- `__lcgPacketSender` is optional. Declare it to read the sender in a handler. `NetworkCalling.CallingPlayer` also works.

## Sending to one player

`SendToPlayer(behaviour, player, eventName, args)` takes up to **8 arguments**. The event must be a registered network event with the same number of parameters, otherwise a warning is logged.

## Settings Inspector

**Add Component > LCG Network > LCG Network Settings** shows an object's zone, the variables **Synced via LCG** and its **Network events**. Click **Refresh** to update it. Tick **Use Native Networking** to opt an object out. The component is removed from builds.

If a program isn't recognised, the build warns `Left '<name>' on native networking`.

## Runtime ABI (explicit sends)

For sends the automatic routing doesn't cover, any coding style can call the runtime directly.

:::note
The ABI is experimental and may change.
:::

The build fills these variables on receivers:

| Variable | Type |
|---|---|
| `__lcgRuntime` | UdonBehaviour |
| `__lcgReceiverId` | int |
| `__lcgZoneId` | int |
| `__lcgPacketSender` | VRCPlayerApi |

To send, first set `__lcgSenderReceiver`, `__lcgSenderReceiverId`, `__lcgSenderZoneId` and `__lcgSenderAddress` on `__lcgRuntime`. Then send one of these:

| To send | Set | Then send the event |
|---|---|---|
| A field | `__lcgSenderType`, `__lcgSenderValue` | `__lcgSendField` |
| A method | `__lcgSenderArgCount`, `__lcgSenderArgTypeN`, `__lcgSenderArgN`, and `__lcgSenderTargetMode` (a `NetworkEventTarget`, or -1 with `__lcgSenderPlayer`) | `__lcgSendMethod` |

## Udon Graph and Udon Assembly

Use the normal networking nodes or instructions. Set the sync mode to **Manual** to sync variables. The **LCG Network Examples** sample has a complete assembly program, `UdonAssembly/LCGAsmLamp.uasm`, and an UdonSharp one, `LCGStockLamp.cs`.

## Frame limits

| Limit | Value |
|---|---|
| Frame size | 12 KB |
| Pending packets | 128 field and 128 method packets |
| Packets sent per frame | 16 |
| Mailbox delivery | 100 events per second per player, as for any `[NetworkCallable]` event |

Changes to the same variable within one frame are merged.
