---
sidebar_position: 4
---

# StreamData ทำงานอย่างไร

## สิ่งที่การ export ทำ

**Export Stream** เขียนลงใน `<scene>_StreamData/Export~` โดย **ล้างโฟลเดอร์นี้ก่อน** จึงอย่าเก็บไฟล์ของตัวเองไว้ในนั้น

1. รวบรวม texture ของ **Stream Materials** texture ที่หลาย material ใช้ร่วมกันจะดาวน์โหลดครั้งเดียว
2. บันทึกสำเนาสำรองขนาดเล็กของแต่ละอันเป็น asset ชื่อ `Stream_*`
3. รวม texture ลงหน้า atlas ขนาดสูงสุด 2048 × 2048 เพื่อให้หลายอันมาในการดาวน์โหลดเดียว texture ที่อยู่หน้าเดียวคนเดียวจะได้ไฟล์ของตัวเอง
4. ตั้งชื่อภาพเป็น `page_` ตามด้วย hash ของเนื้อหา
5. export lightmap ถ้าเปิด **Stream Lightmaps**
6. เขียนไฟล์ `manifest` และ bake URL ลงใน component

### texture แบบไหนที่ถูก stream

| เงื่อนไข | ถ้าไม่ผ่าน |
|---|---|
| import จากไฟล์ และ texture type เป็น **Default** | ข้ามพร้อมคำเตือน |
| เปิด **sRGB** | ข้ามพร้อมคำเตือน |
| ด้านยาวสุดใหญ่กว่า **Fallback Size** | ข้าม เพราะเล็กอยู่แล้ว |

normal map และ mask แบบ linear ไม่ถูก stream เพราะภาพที่ดาวน์โหลดมาเป็น sRGB จะ decode ผิด

### Lightmap

lightmap สีถูกบันทึกเป็น PNG แบบ RGBM ซึ่งเก็บความสว่างได้ถึง 16 ตอน runtime จะ blit บน GPU หนึ่งครั้งเพื่อ decode ลง render texture แล้วใส่ให้ renderer ผ่าน material property block จึงไม่ต้องแก้ shader บน Android และ iOS texture ที่ decode แล้วใช้ format 8 บิตที่เล็กกว่า

## ลำดับการดาวน์โหลด

1. ดาวน์โหลด `manifest` ก่อน ถ้าล้มเหลวทั้งสองโฮสต์ หรือ format ไม่รู้จัก จะไม่ขอภาพเลย
2. ทุก ๆ **check interval** (1 วินาที) StreamData เลือก texture ที่รออยู่และใกล้ผู้เล่นที่สุด ระยะวัดถึง bounds ของ object ที่ใช้ texture นั้น
3. ดาวน์โหลดภาพทีละหนึ่ง VRChat อนุญาตหนึ่งภาพต่อ 5 วินาที
4. ถ้าดาวน์โหลดไม่สำเร็จ จะลอง **Backup Base Url** ถ้ายังไม่สำเร็จ จะใช้ภาพสำรองต่อไป

รายการที่ล้มเหลวจะไม่ลองใหม่จนกว่าจะโหลดโลกอีกครั้ง ถ้าหน้า atlas ล้มเหลว texture ทุกอันที่รอหน้านั้นจะล้มเหลวด้วย

## หน่วยความจำ

หน้า atlas จะถูกทำลายหลังคัดลอก texture แต่ละอันไปยัง render texture ของตัวเองแล้ว

ถ้า **Load Distance** มากกว่า 0 จะดาวน์โหลดเฉพาะ texture ในระยะนั้น อันที่ไกลกว่า **Load Distance × Unload Factor** จะกลับไปใช้ภาพสำรองและคืนหน่วยความจำ เมื่อกลับเข้าใกล้จะดาวน์โหลดอีกครั้ง ช่องว่างระหว่างสองระยะกันไม่ให้ texture โหลดสลับกับ unload ที่เส้นขอบ ถ้า Load Distance เป็น 0 จะดาวน์โหลดทั้งหมดและเก็บไว้

## สถานะของแต่ละรายการ

`state[i]` เก็บสถานะของรายการที่ stream แต่ละรายการ

| ค่าคงที่ | ค่า | ความหมาย |
|---|---|---|
| `StateFallback` | 0 | แสดงภาพสำรอง กำลังรอ |
| `StateLoading` | 1 | กำลังดาวน์โหลด |
| `StateLoaded` | 2 | แสดง texture เต็มแล้ว |
| `StateFailed` | 3 | ล้มเหลว ใช้ภาพสำรองต่อ |

`manifestState` มีค่า `ManifestPending` (0), `ManifestOk` (1) หรือ `ManifestFailed` (2)

```csharp
using LogicCuteGuy.StreamData.Udon;
using UdonSharp;

public class StreamProgress : UdonSharpBehaviour
{
    public StreamData stream;
    public TMPro.TextMeshProUGUI label;

    private void Start() { _Refresh(); }

    public void _Refresh()
    {
        if (stream.state != null)
        {
            int loaded = 0;
            for (int i = 0; i < stream.state.Length; i++)
                if (stream.state[i] == StreamData.StateLoaded) loaded++;
            label.text = loaded + " / " + stream.state.Length;
        }
        SendCustomEventDelayedSeconds(nameof(_Refresh), 1f);
    }
}
```

ถ้าใช้ Load Distance จำนวนที่โหลดแล้วอาจลดลงเมื่อคุณเดินออกห่าง

## การตั้งค่าสำหรับทดสอบ

ตั้ง **Target** เพื่อวัดระยะจาก transform อื่นแทนผู้เล่นในเครื่อง เช่น กล้อง

## การต่อยอด StreamData

subclass สามารถ stream ข้อมูลของตัวเองได้ `OpenWorldStream` ของ OpenWorld ใช้วิธีนี้กับผัง Block

| Override | ถูกเรียกเมื่อ |
|---|---|
| `_OnInit()` | หลัง reset สถานะ texture |
| `_OnManifest(DataDictionary)` | อ่าน manifest แล้ว |
| `_OnStringLoaded(...)`, `_OnStringError(...)` | มีการดาวน์โหลด string ที่ไม่ใช่ manifest |
| `_StepData(Vector3)` | ทุกรอบการตรวจ ใช้เริ่มดาวน์โหลด string |
| `_StepImage(Vector3)` | ไม่มีภาพกำลังดาวน์โหลด ให้ return true หลังเริ่มดาวน์โหลด |
| `_OnImage(...)`, `_OnImageError(...)` | ภาพของคุณเสร็จหรือล้มเหลว |

ฝั่ง editor ให้ implement `IStreamExtension` (ต้องมี public constructor ที่ไม่มีพารามิเตอร์) เพื่อเพิ่มไฟล์และข้อมูล manifest ในการ export
