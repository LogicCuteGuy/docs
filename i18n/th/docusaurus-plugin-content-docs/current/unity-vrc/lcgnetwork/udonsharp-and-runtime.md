---
sidebar_position: 4
---

# ส่วนเสริม UdonSharp และ runtime ABI

Udon networking ปกติถูกจัดเส้นทางให้โดยไม่ต้องใช้สิ่งในหน้านี้ ส่วนเสริมเหล่านี้ให้ควบคุมได้ละเอียดขึ้น ใช้ได้กับ UdonSharp ของ VRChat SDK และ [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro) ซึ่งต่อยอดจากตัวนั้น

## ตัวอย่าง

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

ใช้กับฟิลด์หรือเมธอด

| การตั้งค่า | ความหมาย |
|---|---|
| `Authority` | ใครส่งได้: สมาชิกโซนคนใดก็ได้ `Any` (ค่าเริ่มต้น), เฉพาะ `ObjectOwner` หรือเฉพาะ `Master` ของ instance |
| `Callback` | ใช้กับฟิลด์เท่านั้น คือเมธอดที่จะรันบนผู้รับ |

- เมธอดที่มี parameter ต้องมี `[NetworkCallable]` ซึ่งให้ข้อมูล parameter และ callback ที่รับ `VRCPlayerApi` ก็ต้องมีเช่นกัน
- ชนิดฟิลด์หรือ parameter ที่ไม่รองรับ หรือไม่มีข้อมูล parameter จะเป็น **build error**
- `__lcgPacketSender` ใช้หรือไม่ก็ได้ ประกาศไว้ถ้าต้องการอ่านผู้ส่งใน handler และใช้ `NetworkCalling.CallingPlayer` ก็ได้

## ส่งหาผู้เล่นคนเดียว

`SendToPlayer(behaviour, player, eventName, args)` รับ argument ได้ไม่เกิน **8 ตัว** event ต้องเป็น network event ที่ลงทะเบียนไว้และมีจำนวน parameter ตรงกัน ไม่เช่นนั้นจะมีคำเตือนใน log

## Settings Inspector

**Add Component > LCG Network > LCG Network Settings** แสดงโซนของ object, ตัวแปรในหัวข้อ **Synced via LCG** และ **Network events** กด **Refresh** เพื่ออัปเดต ติ๊ก **Use Native Networking** ถ้าไม่ต้องการให้ object ใช้ LCG component นี้ถูกนำออกจาก build

ถ้าระบบไม่รู้จัก program ใด ตอน build จะมีคำเตือน `Left '<name>' on native networking`

## Runtime ABI (ส่งแบบสั่งเอง)

สำหรับการส่งที่การจัดเส้นทางอัตโนมัติไม่ครอบคลุม การเขียนทุกรูปแบบเรียก runtime โดยตรงได้

:::note
ABI นี้ยังอยู่ในขั้นทดลองและอาจเปลี่ยนได้
:::

ตอน build ระบบจะใส่ค่าตัวแปรเหล่านี้บนผู้รับ:

| ตัวแปร | ชนิด |
|---|---|
| `__lcgRuntime` | UdonBehaviour |
| `__lcgReceiverId` | int |
| `__lcgZoneId` | int |
| `__lcgPacketSender` | VRCPlayerApi |

ถ้าจะส่ง ให้ตั้ง `__lcgSenderReceiver`, `__lcgSenderReceiverId`, `__lcgSenderZoneId` และ `__lcgSenderAddress` บน `__lcgRuntime` ก่อน แล้วส่งอย่างใดอย่างหนึ่ง:

| สิ่งที่ส่ง | ตั้งค่า | แล้วส่ง event |
|---|---|---|
| ฟิลด์ | `__lcgSenderType`, `__lcgSenderValue` | `__lcgSendField` |
| เมธอด | `__lcgSenderArgCount`, `__lcgSenderArgTypeN`, `__lcgSenderArgN` และ `__lcgSenderTargetMode` (ค่า `NetworkEventTarget` หรือ -1 คู่กับ `__lcgSenderPlayer`) | `__lcgSendMethod` |

## Udon Graph และ Udon Assembly

ใช้ node หรือคำสั่ง networking ตามปกติ ถ้าต้องการ sync ตัวแปรให้ตั้ง sync mode เป็น **Manual** sample **LCG Network Examples** มี assembly program ที่สมบูรณ์ `UdonAssembly/LCGAsmLamp.uasm` และตัวอย่าง UdonSharp `LCGStockLamp.cs`

## ขีดจำกัดของ frame

| ขีดจำกัด | ค่า |
|---|---|
| ขนาด frame ข้อมูล | 12 KB |
| Packet ที่รอส่ง | packet ของฟิลด์ 128 และของเมธอด 128 |
| Packet ที่ส่งต่อเฟรม | 16 |
| การส่งผ่าน mailbox | 100 event ต่อวินาทีต่อผู้เล่น เหมือน event `[NetworkCallable]` ทั่วไป |

การเปลี่ยนตัวแปรเดียวกันภายในเฟรมเดียวจะถูกรวมกัน
