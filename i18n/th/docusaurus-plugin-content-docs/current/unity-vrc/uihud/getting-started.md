---
sidebar_position: 2
---

# เริ่มต้นใช้งาน

สร้าง HUD พร้อมเมนู แก้ไขใน Inspector และเรียกใช้จาก Udon

## เริ่มอย่างรวดเร็ว

1. เลือก **GameObject > UIHUD > UIHUD System (HUD + Menu)** จะได้ `UIHudManager`, canvas ของ HUD และเมนูหลักที่ต่อ event ไว้แล้ว ถ้า scene ยังไม่มี EventSystem ระบบจะเพิ่มให้
2. กด Play แล้วเปิดเมนูด้วย **M** บน desktop, ปุ่มบนข้อมือใน VR (ค่าเริ่มต้นคือมือซ้าย) หรือปุ่ม **MENU** บนมือถือ
3. import sample ผ่าน **Window > Package Manager > UIHUD > Samples > Examples > Import** แล้วเปิด `Assets/Samples/UIHUD/…/Examples/UIHUD Examples.unity` เพื่อดู widget ทุกแบบ, เมนูทั้งสอง, widget ตอน runtime, animation และ world panel

## แก้ไขใน Inspector

เลือก `UIHUD` (manager):

- **Menus:** เปลี่ยนชื่อ, เปลี่ยนด้าน, เปิดปิด **Main** (เปิดด้วย M / ข้อมือ / มือถือ), **Edit** เพื่อเลือกเมนู, ลบด้วย **✕** และเพิ่มด้วย **+ Add Menu**
- **HUD:** แสดง / ซ่อน / เปลี่ยนชื่อ / จัดลำดับรายการ และเพิ่มด้วย **+ Bar / + Label / + Notification**
- **Open the menu with:** ปุ่มบน desktop และปุ่มบนข้อมือของ VR กับมือถือ

เลือก canvas ของเมนู (เช่น `CenterMenu Canvas`):

- **Menu:** ชื่อ, ด้าน (Left / Right / Top / Bottom / Center), preset ขนาด (Small / Wide bar / Big)
- **Pages:** ○ คือหน้าเริ่มต้น เปลี่ยนชื่อ (แท็บจะเปลี่ยนตาม), จัดลำดับ, ลบ และ **+ Add Page** เลือก **Widgets** เพื่อ preview หน้านั้น
- **Widgets on the page:** แสดง / ซ่อน / เปลี่ยนชื่อ / จัดลำดับ / ลบ และ **+ Button / Toggle / Slider / Label / Bar** ปุ่ม **+ Add widget** แสดง preview ของแต่ละชนิดพร้อม style วางเมาส์เพื่อดู คลิกเพื่อเพิ่ม container (Row, Grid, Scroll, Pages) ใส่ widget ซ้อนกันได้ไม่จำกัดชั้น
- **Quick edit** (▸ บนแถว widget): ข้อความ, font, สี, การจัดชิด, ความสูง (เมนู) หรือ anchor / offset / ขนาด (HUD), ค่าเริ่มต้นของ toggle, ช่วงของ slider, sprite, action และ callback เมื่อกำหนด **Target** ของ callback ช่อง **Event Name** จะกลายเป็น dropdown ของเมธอด public ของ target นั้น ปุ่ม ⧉ ทำสำเนา widget และต่อ event ใหม่ให้
- **หน้าต่าง preview** (`Window > UIHUD Preview`): ดู HUD, เมนู และ world panel แบบ live คลิกเพื่อเลือก widget (Alt+คลิก เลือกชิ้นส่วนตรงจุด) ลากเพื่อย้าย widget บน HUD และ widget ที่ใช้ตำแหน่ง absolute หน้าเมนูที่เนื้อหาสูงจะเลื่อนได้แทนการบีบเนื้อหา

## Widget

เพิ่มจาก **GameObject > UIHUD > Widgets** โดยเลือกหน้าหรือ canvas ไว้ก่อน:

| Widget | การใช้งาน |
|---|---|
| `UIHudButton` | เปิดปิด object, เปิด / ปิดเมนู, teleport, respawn, toast, เสียง |
| `UIHudToggle` | เปิด / ปิดรายการ object (`isOn`, `SetIsOn`) |
| `UIHudSlider` | ป้ายแสดงค่า, ระดับเสียงของ AudioSource (`value`, `SetValue`) |
| `UIHudBar` / Radial Bar | พลังชีวิต / ความคืบหน้า พร้อมสีไล่ระดับ (`SetValue`, `SetCurrent`, `Add`) |
| `UIHudNotification` | ข้อความ toast แบบเข้าคิว (`Show`) |
| `UIHudSelector` | ตัวเลือกค่า (`Selected`, `SetIndex`) |
| `UIHudInput` | ช่องข้อความที่ใช้คีย์บอร์ดของ VRChat (`text`, `SetText`) |
| `UIHudPlayerList` | ผู้เล่นใน instance (`Refresh`) |
| `UIHudInfo` | ข้อความจาก template แบบ live (`{time} {date} {players} {fps} {name}`) |
| `UIHudPages` | หน้าแบบแท็บที่ซ้อนกันได้ (`ShowPage`) |
| `UIHudValue` | ติดตามตัวแปรหนึ่งตัว พร้อม format string (`SetValue`, `Refresh`) |
| `UIHudTable` | แถว / คอลัมน์จาก DataList / DataDictionary / JSON (`SetList`, `SetDictionary`, `SetJson`, `Render`) |
| `UIHudGraph` | ประวัติแบบเส้น / แท่งจากตัวแปรที่เก็บตัวอย่าง (`AddSample`, `SetSamples`, `Clear`) |
| `UIHudStat` | ตัวเลขใหญ่พร้อมค่าที่เปลี่ยน (`SetValue`) |
| `UIHudPie` / `UIHudBarList` | แจกแจงตัวเลขตามชื่อ (`SetJson`, `SetEntry`, `SetList`, `SetDictionary`, `Clear`) |
| `UIHudGauge` | หน้าปัดครึ่งวงกลมพร้อมเข็ม (`SetValue`) |
| Row / Grid / Scroll | container สำหรับจัดวาง โดย Scroll รองรับรายการแนวตั้งและแถบแนวนอน |

widget แสดงข้อมูลรับ `DataDictionary`, `DataList` หรือ JSON ได้ widget บนหน้าที่ซ่อนจะอัปเดตเมื่อแสดง ถ้าต้องการเก็บประวัติต่อเนื่อง ให้เรียก `AddSample` จากสคริปต์ที่ทำงานตลอดเวลา

widget ทุกตัวเรียกสคริปต์ได้: ตั้ง `target` และ `eventName` และถ้าต้องการรับค่าของ widget ก่อน event ทำงาน ให้ตั้ง `valueVariable`

## เมนู, hotbar และ world panel

- `UIHudMenu` แต่ละตัวมี canvas ของตัวเองและเลื่อนเข้าจากด้านที่ตั้งไว้ `openWithMainButton` กำหนดว่าจะตอบสนองต่อ M / ข้อมือ / MENU หรือไม่ เมนูที่ปิดค่านี้เปิดได้จากปุ่มอื่นเท่านั้น ใน Inspector ของเมนูยังกำหนดปุ่ม desktop และปุ่มข้อมือ / มือถือเฉพาะเมนูได้
- Udon: `Open`, `Close`, `Toggle`, `ShowPage(i)`, `NextPage`, `PrevPage`, `SetSideLeft` / `Right` / `Top` / `Bottom` / `Center`
- **Hotbar** (`GameObject > UIHUD > Hotbar`): canvas แยกอยู่ใต้ระดับสายตา (ค่าเริ่มต้นใน VR คือก้มลง 45°) widget ใดก็เป็น slot ได้ Udon: `Select(i)`, `SelectNext`, `SelectPrevious`, `Deselect`, `Show`, `Hide`, `ToggleVisible`
- **World Panel** (`GameObject > UIHUD > World Panel (standalone)`): ตั้งอยู่ใน world สำหรับ kiosk และบอร์ด ไม่ต้องมี manager ใช้หน้า, widget, style และ animation แบบ zoom / fade เหมือนกัน เมนูใดก็สลับระหว่าง Player view และ World (standalone) ได้ใน Inspector

## Style และ animation

- เลือก `UIHUD` → **Style** → **New** เพื่อสร้าง `Assets/UIHUD Style.asset` มี preset: Dark / Light / Glass / Neon การแก้ไขมีผลทันที เมนูและ widget ใหม่ใช้ style นี้ asset นี้ใช้เฉพาะใน editor และ upload ได้อย่างปลอดภัย
- Inspector ของเมนู → **Animation:** preset แบบ Slide / Pop / Fade / Drop / Instant, ผสม Slide + Fade + Zoom, easing, กำหนดเวลาเปิด / ปิดแยกกัน และ fade / slide ตอนสลับหน้า ปุ่ม **▶ Play** preview ลำดับ เปิด → ค้าง → ปิด
- Inspector ของ widget → **Entrance:** Fade, Fly, Zoom, Pop, Spin, Typewriter กำหนดจังหวะแบบ With / After previous, ระยะเวลา, easing และระยะที่บินเข้ามา ในเกมขับด้วย VRCTween ส่วนใน editor แสดงแบบ sample ในหน้าต่าง preview

## Manager API และ widget ตอน runtime

`OpenMenu`, `CloseMenu`, `ToggleMenu`, `ShowHud`, `HideHud`, `ToggleHud` รวมถึง `platform` และ `isMenuOpen` และมี callback ตอนเปิด / ปิด / เปลี่ยนแพลตฟอร์มให้เลือกใช้

Udon เพิ่ม component ไม่ได้ widget ตอน runtime จึงคัดลอกจาก template ที่ซ่อนไว้ สร้าง template ครั้งเดียวที่ Inspector ของ manager → **Add widgets at runtime → Make runtime templates** (หลังแก้ style ให้สร้างใหม่):

```csharp
GameObject b = manager.AddWidget("Button", page, "Teleport");
manager.SetEvent(b, this, nameof(OnTeleport), "");
manager.SetLabel(b, "Teleport (2)");
manager.RemoveWidget(b);
```

ชนิดที่ใช้ได้: Button, Toggle, Slider, Label, Header, Bar, Radial, Notification, Image, Space, Divider, Selector, Input, PlayerList, Info, Row, Grid, Scroll โดย widget ตอน runtime มีอยู่เฉพาะบนเครื่องตัวเอง

## หมายเหตุ

- ทุกอย่างทำงานบนเครื่องตัวเอง (`NoVariableSync`) ไม่มีการ sync
- canvas ใช้ layer Walkthrough โดยแต่ละ canvas มี Ui Shape และ collider บน object เดียวกัน canvas ที่ติดกับผู้เล่นจะปิด Focus View ผู้เล่น desktop เล็งด้วย crosshair หรือกด Tab ค้างเพื่อใช้เคอร์เซอร์อิสระ
- เกม standalone ทำงานได้โดยไม่ต้องมี VRChat SDK: assembly ในตัวทำหน้าที่แทน API ของ VRChat, กล้องหลักคือหัว และสคริปต์ยังเขียนแบบ `UdonSharpBehaviour` ได้ เมื่อเล่นคนเดียว การ sync ไม่ทำอะไร และ `Networking.IsOwner` เป็น true เสมอ
