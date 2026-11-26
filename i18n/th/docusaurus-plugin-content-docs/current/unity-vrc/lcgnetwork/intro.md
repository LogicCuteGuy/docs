---
sidebar_position: 1
---

# LCG Network System

> เวอร์ชันเอกสาร: **0.1.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGNetwork/releases/tag/0.1.0)

**LCG Network System** (`com.logiccuteguy.lcgnetwork`) เพิ่ม networking แบบ event-driven ที่จำกัดตามโซนให้ world ของ VRChat เมื่อนำ object ที่มี network ไปไว้ใต้ `LCGNetworkZone` ตัวแปร sync และ network event ของ object นั้นจะไปถึงเฉพาะผู้เล่นที่อยู่ในโซน

คุณยังเขียน Udon networking ตามปกติ ตอน build และตอนเข้า Play Mode แพ็กเกจจะเขียน Udon program ที่ compile แล้วใหม่ ให้ `RequestSerialization`, `SendCustomNetworkEvent` และ `NetworkCalling.CallingPlayer` ผ่าน LCG เนื่องจากทำกับ program ที่ compile แล้ว **UdonSharp, Udon Graph และ Udon Assembly** จึงทำงานเหมือนกัน และไม่ต้องใช้คอมไพเลอร์พิเศษ

## ความสามารถ

- **โซน:** trigger volume จำกัด packet, ownership และ object sync ไว้กับผู้เล่นข้างใน
- **เขียนโค้ดปกติ:** โค้ดเดิมที่ใช้ `[UdonSynced]` + `RequestSerialization` และ `SendCustomNetworkEvent` ถูกจัดเส้นทางให้อัตโนมัติ object ที่อยู่นอกทุกโซนใช้ทั้ง instance เป็นโซน
- **ทุกรูปแบบการเขียน:** UdonSharp ของ VRChat SDK, Udon Graph และ Udon Assembly รวมถึง [LCGUdonSharp](/unity-vrc/lcgudonsharp/intro) ซึ่งต่อยอดจาก UdonSharp ของ SDK
- **ส่วนเสริมสำหรับ UdonSharp:** ฟิลด์และเมธอด `[LCGPacket]` ที่กำหนด authority ได้ (`Any`, `ObjectOwner`, `Master`), callback ตอนรับ และ `LCGRuntime.SendToPlayer` สำหรับส่งหาผู้เล่นคนเดียว
- **Object sync ในโซน:** `LCGManualObjectSync` แทน `VRC Object Sync` ภายในโซน และ ownership guard ปฏิเสธคำขอจากคนนอก
- **Late join และกลับเข้าโซน:** owner ส่ง snapshot ให้ผู้เล่นที่ join หรือเข้าโซน
- **ไม่แก้ของเดิม:** component ที่สร้างขึ้นและ program ที่เขียนใหม่มีอยู่เฉพาะในสำเนาตอน build หรือ Play Mode scene และ program asset ของคุณไม่ถูกแก้

## ข้อกำหนด

- **Unity** 2022.3
- **VRChat Worlds SDK** 3.8.1 ขึ้นไป (`com.vrchat.worlds`)

## License

MIT

## การติดตั้ง

### VCC / ALCOM

1. [เพิ่ม repository VPM ของ LogicCuteGuy](https://vpm.logiccuteguy.com/) เข้า VCC/ALCOM หรือเพิ่ม `https://vpm.logiccuteguy.com/index.json` เอง ถ้าเพิ่มไว้แล้วให้ refresh รายการ
2. เปิด **Manage Project** ของโปรเจกต์ Unity
3. หา **LCG Network System** (`com.logiccuteguy.lcgnetwork`) แล้วเพิ่ม **0.1.0**

### Unity Package Manager / ติดตั้งเอง

ใน **Window > Package Manager > + > Add package from git URL** ให้ใส่:

```text
https://github.com/LogicCuteGuy/LCGNetwork.git#0.1.0
```

เลือก**วิธีติดตั้งเพียงวิธีเดียวต่อโปรเจกต์** ห้ามใช้ **Source code (zip)** อัตโนมัติของ GitHub LCGUdonSharp 0.5.0 ขึ้นไปไม่มี networking แล้ว จึงติดตั้งคู่กันได้

## เริ่มต้นใช้งาน

1. สร้าง GameObject ที่มี **Collider** ซึ่งตั้งเป็น **Is Trigger** แล้วเพิ่ม component **LCGNetworkZone**
2. ย้าย object ที่มี network ไปไว้ใต้ GameObject นั้น
3. เข้า Play Mode หรือ build

```csharp
using UdonSharp;
using VRC.SDKBase;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class ZoneCounter : UdonSharpBehaviour
{
    [UdonSynced] private int count;

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        count++;
        RequestSerialization();      // sent only to players in this zone
    }

    public override void OnDeserialization() { /* update visuals */ }
}
```

โค้ดเดียวกันที่เขียนด้วย Udon Graph หรือ Udon Assembly ก็ทำงานเหมือนกัน

ถัดไป: [การใช้งาน LCG Network](./usage.md)

## สถานะ

รุ่นนี้เป็น preview ตรวจแล้วใน Play Mode ด้วย [ClientSim Net](../clientsimnet/intro.md) กับผู้เล่นจำลองสองคน แต่**ยังไม่ได้ตรวจใน VRChat build จริงที่มีหลาย client** ก่อนเผยแพร่ world ให้ทดสอบด้วย **Build & Test** โดยใช้สอง client wire protocol อาจเปลี่ยนระหว่างรุ่น
