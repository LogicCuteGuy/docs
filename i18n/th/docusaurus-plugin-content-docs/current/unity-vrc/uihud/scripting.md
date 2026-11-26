---
sidebar_position: 4
---

# Scripting

## เรียกสคริปต์ของคุณจาก widget

ตั้ง **Target** และ **Event Name** ของ widget ถ้าต้องการรับค่าของ widget ให้ตั้ง **Value Variable** ด้วย UIHUD จะเขียนค่าลงตัวแปรนั้นก่อน แล้วจึงส่ง event

```csharp
public class VolumePanel : UdonSharpBehaviour
{
    [HideInInspector] public float volume;   // Value Variable = volume
    public AudioSource music;

    public void OnVolumeChanged()            // Event Name = OnVolumeChanged
    {
        music.volume = volume;
    }
}
```

เมธอดต้องเป็น public และชื่อต้องตรงกันทุกตัวอักษร

ค่าที่สคริปต์ของคุณตั้งไว้จะยังอยู่ขณะที่หน้าของ widget ถูกซ่อน slider ที่มีแหล่งแบบ **Audio Volume** จะเริ่มที่ระดับเสียงของแหล่งนั้น และ `SetValue` ของ slider จะตั้งระดับเสียงด้วย

## Manager

| สมาชิก | หน้าที่ |
|---|---|
| `OpenMenu()`, `CloseMenu()`, `ToggleMenu()` | เหมือนปุ่มหลัก |
| `ShowHud()`, `HideHud()`, `ToggleHud()`, `SetHudVisible(bool)` | การแสดง HUD |
| `isMenuOpen`, `platform` | สถานะปัจจุบัน โดย `platform` เป็น `Desktop`, `VR` หรือ `Mobile` |
| `IsTyping()` | ผู้เล่นกำลังพิมพ์ในช่องข้อความของ UIHUD |
| `SetWristLeft()`, `SetWristRight()`, `SwapWristHand()` | มือที่สวมปุ่มบนข้อมือ |

สำหรับ toggle **Show HUD** ให้ตั้ง **Value Variable** เป็น `hudVisibleValue` และ **Event** เป็น `_ApplyHudToggle` ถ้าต่อ toggle กับ `ToggleHud` สถานะจะไม่ตรงกันหลังโค้ดของคุณเรียก `HideHud`

ถ้าต้องการ callback ให้ตั้ง `callbackTarget` ของ manager พร้อม `onMenuOpenedEvent`, `onMenuClosedEvent` หรือ `onPlatformChangedEvent`

## เมนู

`Open()`, `Close()`, `Toggle()`, `ShowPage(i)`, `NextPage()`, `PrevPage()` และ `SetSideLeft()`, `SetSideRight()`, `SetSideTop()`, `SetSideBottom()`, `SetSideCenter()`

เมนูแต่ละตัวมี `callbackTarget` พร้อม `onOpenEvent`, `onCloseEvent` และ `onPageChangedEvent`

## Hotbar

`Select(i)`, `SelectNext()`, `SelectPrevious()`, `Deselect()`, `SelectedSlot()`, `selectedIndex`, `Show()`, `Hide()`, `ToggleVisible()` หลังเพิ่ม slot ตอน runtime ให้เรียก `RefreshSlots()`:

```csharp
manager.AddWidget("Toggle", hotbar.content, "Light");
hotbar.RefreshSlots();
```

## Widget ตอน runtime

Udon เพิ่ม component ไม่ได้ UIHUD จึงคัดลอกจาก template ที่ซ่อนไว้ ที่ manager ให้กด **Add widgets at runtime > Make runtime templates** และกดซ้ำหลังเปลี่ยน style

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

ชนิดที่ใช้ได้: Button, Toggle, Slider, Label, Header, Bar, Radial, Notification, Image, Space, Divider, Selector, Input, PlayerList, Info, Row, Grid, Scroll ส่วน widget แสดงข้อมูล Value, Table และ Graph ใช้ได้หลังสร้าง template ใหม่ ถ้าใส่ชนิดที่ไม่รู้จักจะคืน null

widget ตอน runtime เป็น **local** ผู้เล่นคนอื่นมองไม่เห็น

## Widget แสดงข้อมูล

### Pie และ Bar List

ทั้งสองแบบรับตัวเลขที่มีชื่อกำกับในรูปแบบใดก็ได้ต่อไปนี้:

- `DataDictionary` เช่น `{"Red": 4}`
- `DataList` ของ dictionary โดยใช้ `labelKey` และ `valueKey`
- `DataList` ของรายการ `[name, value]`
- ข้อมูลเดียวกันในรูป JSON (`SetJson`)

ใช้ `SetEntry(name, value)` เพื่อเปลี่ยนรายการเดียว และ `Clear()` เพื่อลบทั้งหมด pie มี 8 ชิ้น รายการที่เกินจะรวมเป็น **Other** ส่วน bar list แสดง 6 แถว เรียงจากมากไปน้อย

### Table

`SetList`, `SetDictionary`, `SetData`, `SetJson`, `Render()`

| ฟิลด์ | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| `columns` | `name`, `score` | key ที่จะอ่าน |
| `titles` | `Player`, `Score` | หัวคอลัมน์ |
| `sortBy` | `score` | คอลัมน์ที่ใช้เรียง |
| `descending` | true | ลำดับการเรียง |
| `showRank` | true | แสดงคอลัมน์อันดับ |
| `maxRows` | 10 | จำนวนแถวที่แสดง |
| `maxCellChars` | 16 | ข้อความที่ยาวกว่านี้จะถูกตัดและลงท้ายด้วย `...` |
| `highlight` | `{me}` | เน้นแถวของคุณเอง |
| `emptyText` | `No data` | แสดงเมื่อไม่มีแถว |

### Graph

`AddSample(v)`, `SetSamples(float[])`, `Clear()`, `SetStyle(0)` สำหรับกราฟเส้น หรือ `SetStyle(1)` สำหรับกราฟแท่ง เก็บได้ 30 จุด

widget บนหน้าที่ซ่อนหรือเมนูที่ปิดจะไม่ทำงาน ตัวแปรที่ติดตามจึงถูกเก็บตัวอย่างเฉพาะตอนมองเห็น ถ้าต้องการเก็บประวัติ ให้เรียก `AddSample` จากสคริปต์ที่ active ตลอดเวลา

### ค่าเดี่ยว

| Widget | การใช้งาน |
|---|---|
| Stat | `SetValue(v)` แสดงตัวเลขและค่าที่เปลี่ยน โดย `higherIsBetter` ใช้สลับสี |
| Gauge | `SetValue(v)` ในช่วง `min` ถึง `max` |
| Value | แสดงตัวแปรตามรูปแบบ เช่น `Coins: {0}` |
| Info | template ที่ใช้ `{time}` `{time12}` `{date}` `{players}` `{fps}` `{name}` `{uptime}` `{height}` |
| Bar | `SetValue(current, max)`, `SetCurrent(v)`, `Add(delta)` |
| Notification | `Show("text")` เพิ่มข้อความเข้าคิว |

## Networking

UIHUD ไม่ sync อะไรเลย ถ้าต้องการแชร์ state ให้ sync ในสคริปต์ของคุณเอง แล้วอัปเดต widget บนเครื่องของผู้เล่นแต่ละคน ดูวิธีทำจาก sample `ExampleWorldCounter` และ `ExamplePoll`

## สคริปต์ตัวอย่าง

ให้ import **Examples** จาก Package Manager

| สคริปต์ | แสดงอะไร |
|---|---|
| `ExampleHealth` | ปุ่มที่เรียกเมธอดของคุณและควบคุม bar บน HUD |
| `ExampleSettings` | การส่งค่าของ widget ให้สคริปต์ |
| `ExampleRuntimeList` | การเพิ่มและลบ widget ตอน runtime |
| `ExampleShop` | panel ร้านค้าที่แสดงจำนวนเหรียญแบบ live |
| `ExampleMenuEvents` | callback ของ manager |
| `ExampleWorldCounter` | ตัวนับแบบ sync |
| `ExamplePoll` | โพลแบบ sync ที่ใช้ `[NetworkCallable]` |
