---
sidebar_position: 4
---

# เขียนสคริปต์กับ ZoneArea

เมื่อเปิด **Scripting Ref** (ค่าเริ่มต้น) การ bake จะใส่ UdonSharp behaviour ชื่อ `ZoneArea` ไว้บน object `_ZoneColliders` ให้ลาก object นั้นใส่ช่องในสคริปต์ของคุณ

## ตรวจว่าผู้เล่นอยู่ข้างในหรือไม่

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using UnityEngine;

public class ZoneSign : UdonSharpBehaviour
{
    public ZoneArea area;
    public GameObject sign;

    private void Start() { _Check(); }

    public void _Check()
    {
        sign.SetActive(area.IsLocalPlayerInside());
        SendCustomEventDelayedSeconds(nameof(_Check), 0.2f);
    }
}
```

`Contains` วนผ่านทุกจุด การตรวจวินาทีละไม่กี่ครั้งจึงพอสำหรับงานส่วนใหญ่

## เมธอด

| เมธอด | ทำอะไร |
|---|---|
| `Contains(Vector3)` | ตำแหน่งในโลกอยู่ใน zone หรือไม่ barrier จะได้ false เสมอ |
| `IsPlayerInside(VRCPlayerApi)` | ตรวจแบบเดียวกันกับตำแหน่งผู้เล่น ผู้เล่นที่ไม่ valid จะได้ false |
| `IsLocalPlayerInside()` | ตรวจแบบเดียวกันกับตัวคุณ |
| `SetCollidersEnabled(bool)`, `EnableColliders()`, `DisableColliders()` | เปิดหรือปิด collider ทั้งหมด |
| `SetGroundEnabled(bool)`, `EnableGround()`, `DisableGround()`, `IsGroundEnabled()` | เฉพาะพื้น |
| `SetCeilingEnabled(bool)`, `EnableCeiling()`, `DisableCeiling()`, `IsCeilingEnabled()` | เฉพาะเพดาน |
| `SetVisualEnabled(bool)`, `ShowVisual()`, `HideVisual()` | แสดงหรือซ่อน render mesh ถ้าไม่มี Render Material จะไม่มีผล |

เมธอดที่ไม่มีพารามิเตอร์ใช้กับ `SendCustomEvent` ได้ ปุ่ม UI จึงเรียกได้

## ฟิลด์

การ bake เป็นผู้กรอกค่าเหล่านี้ ให้ถือว่าอ่านอย่างเดียว เพราะ bake ครั้งถัดไปจะเขียนทับ

| ฟิลด์ | ความหมาย |
|---|---|
| `isZone` | true คือ zone, false คือ barrier |
| `points` | จุดใน local space ของ transform นี้ |
| `closed` | รูปทรงปิดวงหรือไม่ |
| `height`, `bottomOffset` | ค่าการยืดรูปทรง |
| `colliders` | collider ที่ bake ทั้งหมด |
| `groundColliders`, `ceilingColliders` | ชุดย่อยของพื้นและเพดาน |
| `visual` | mesh renderer หรือ null |

## ประตูที่ sync กัน

การเรียก `ZoneArea` มีผลเฉพาะเครื่องตัวเองและไม่มีตัวแปร sync ถ้าจะเปิดประตูให้ทุกคน ต้อง sync สถานะในสคริปต์ของคุณเอง:

```csharp
using LogicCuteGuy.ZoneDraw;
using UdonSharp;
using VRC.SDKBase;

[UdonBehaviourSyncMode(BehaviourSyncMode.Manual)]
public class Gate : UdonSharpBehaviour
{
    public ZoneArea barrier;
    [UdonSynced] private bool open;

    public override void Interact()
    {
        Networking.SetOwner(Networking.LocalPlayer, gameObject);
        open = !open;
        RequestSerialization();
        Apply();
    }

    public override void OnDeserialization() { Apply(); }

    private void Apply()
    {
        barrier.SetCollidersEnabled(!open);
        barrier.SetVisualEnabled(!open);
    }
}
```

## ความสูงบนพื้นไม่เรียบ

`Contains` ใช้ช่วงความสูงเดียวกับทั้งรูปทรง คือจากจุดต่ำสุดลบ **Bottom Offset** ถึงจุดสูงสุดบวก **Height** แต่ collider อิงความสูงของแต่ละจุด บนพื้นชันจึงอาจได้ true แม้อยู่เหนือหรือใต้ collider ให้แบ่งพื้นที่แบบนี้เป็นหลาย zone
