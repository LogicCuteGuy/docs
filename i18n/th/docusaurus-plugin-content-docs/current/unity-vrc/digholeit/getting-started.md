---
sidebar_position: 2
---

# เริ่มต้นใช้งาน: tutorial พร้อมภาพ

> เวอร์ชันเอกสาร: **0.7.0** · [Release notes](https://github.com/LogicCuteGuy/DigHoleIt/releases/tag/v0.7.0)

ทำตามขั้นตอนเพื่อติดตั้ง DigHoleIt, Bake พื้นที่ที่ขุดได้, sculpt ใน Unity และเพิ่ม Dig Pen สำหรับ VRChat ภาพประกอบแสดงขั้นตอนใน Editor คลิกภาพเพื่ออ่าน Inspector ขนาดเต็ม

วิดีโอนี้แสดง **การแก้ไขใน Editor** โดยไม่ได้เปิด Play mode และมี Udon program-asset error ที่ยังไม่แก้ ต้องทำ runtime setup และตรวจสอบตามขั้นตอนด้านล่างก่อนทดสอบ world

## ข้อกำหนด

| | VRChat world | Standalone game |
|---|---|---|
| Unity | 2022.3 | 2022.3 |
| Render pipeline | Built-in | Built-in |
| อื่น ๆ | Worlds SDK 3.10.5 และ **LCGUdonSharp** 0.3.4 ขึ้นไป | ไม่มี |

## 1. ติดตั้ง package

สำหรับ VRChat ใช้ **VCC หรือ ALCOM**:

1. VCC: **Settings > Packages > Add Repository**; ALCOM: **Resources > Add Repository** ใส่ URL:

   ```text
   https://vpm.logiccuteguy.com/index.json
   ```

2. ตรวจว่ารายการมี **DigHoleIt - Diggable Voxel Terrain** แล้วเพิ่ม repository

[![หน้าต่างยืนยัน LogicCuteGuy VPM repository ใน ALCOM](/img/digholeit/tutorial/add-repository.webp)](/img/digholeit/tutorial/add-repository.webp)

*00:05 — หน้ายืนยันใน ALCOM ส่วน VCC มี layout ต่างกันแต่ใช้ URL เดียวกัน*

3. เปิด **Manage Packages** ของ project แล้ว refresh ค้นหา **DigHoleIt** และติดตั้ง **0.7.0** VPM package ระบุ dependency เป็น Worlds SDK 3.10.5 และ LCGUdonSharp 0.3.4 ขึ้นไป
4. เปิด Unity รอ import และ compilation ให้เสร็จ แก้ Console error ก่อน Play หรือ build ดู[ปัญหา Udon program asset](troubleshooting.md#udon-program-assets)

[![ALCOM แสดง DigHoleIt 0.7.0 ติดตั้งสำเร็จ](/img/digholeit/tutorial/install-package.webp)](/img/digholeit/tutorial/install-package.webp)

*00:23 — Installed และ Latest แสดง 0.7.0 พร้อมข้อความติดตั้งสำเร็จ*

หากใช้ **Git install** ใน VRChat ให้[ติดตั้ง LCGUdonSharp](../lcgudonsharp/install.md) ก่อน แล้วเปิด **Window > Package Manager > + > Add package from git URL**:

```text
https://github.com/LogicCuteGuy/DigHoleIt.git#v0.7.0
```

หรือวาง tagged repository / เนื้อหาจาก `com.logiccuteguy.digholeit-0.7.0.zip` ใน release ลง `Packages/com.logiccuteguy.digholeit` โดย `package.json` ต้องอยู่ใน folder นี้โดยตรง แนะนำ named package ZIP แทน automatic source archive ของ GitHub

## 2. เลือก example หรือ Terrain ของคุณ

เปิด **Packages > DigHoleIt - Diggable Voxel Terrain > Example** ใน Project window:

| Scene | สิ่งที่มี |
|---|---|
| `VRChat/DigHoleItVRChatDemo.unity` | Zone ที่ Bake แล้ว, spawn, shovel สามอัน และ pen สำหรับเริ่มทดสอบ ClientSim |
| `VRChat/DigHoleItVRChatShowcase.unity` | Forest scene ในวิดีโอ มี zone ที่ Bake แล้วและ pen สี่อัน |
| `Standalone/DigHoleItStandaloneDemo.unity` | Mouse control และ pen สำหรับ non-VRChat project |
| `Showcase/DigHoleItShowcase.unity` | ตัวอย่าง pit/cave สำหรับ Editor ไม่มี runtime |

บันทึก scene ปัจจุบันก่อนเปิด example Package จาก Git URL เป็น read-only ให้ copy example folder ไป `Assets` ก่อนแก้หรือ Re-bake รวมถึง copy และ reassign Terrain / zone data ที่ต้องแก้แต่ยังอ้างอิง read-only package การ copy เฉพาะไฟล์ `.unity` ไม่เปลี่ยน asset reference

Example มี zone อยู่แล้ว ให้เลือก zone นั้นเพื่อดู setting หากสร้าง zone ใหม่ ให้เริ่มบน **Unity Terrain** ของคุณ (ไม่ใช่ mesh) และบันทึก scene ใน `Assets` Material ต้องรองรับ holes ซึ่ง default Built-in terrain material รองรับอยู่แล้ว

**Tools > DigHoleIt > Create VRChat Demo Scene** สร้าง zone ที่ Bake แล้ว, spawn และ shovel สามอันใน `Assets/DigHoleIt/Demo` Scene ที่สร้างจาก menu ใช้ shovel ส่วน packaged example 0.7.0 มี pen **Create Standalone Demo Scene** ปกติแสดงเฉพาะ non-VRChat project

## 3. สร้างและ Bake Dig Zone

1. เลือก Terrain ใน Hierarchy
2. กด **Paint Terrain** (ไอคอน brush) ใน Terrain component แล้วเลือก **DigHoleIt: Dig Voxels**

[![Dropdown Paint Terrain แสดง DigHoleIt tool ทั้งสี่แบบ](/img/digholeit/tutorial/terrain-tools.webp)](/img/digholeit/tutorial/terrain-tools.webp)

*01:08 — Dig Voxels, Paint Voxels, Paint Trees และ Paint Details เป็นคนละ tool*

3. กด **Create Dig Zone** ใน **Dig Zones** panel วิธีนี้ assign Terrain, fit ความสูงและ Bake ให้อัตโนมัติ อีกวิธีคือสร้าง GameObject ว่าง เพิ่ม **DigHoleIt > Dig Zone**, assign Terrain แล้วกด **Fit To Terrain** และ **Bake** เอง
4. เลือก zone แล้วเลื่อนหรือ resize ด้วย coloured face handles กล่องสีส้มคือ zone และกล่องสีเขียวคือพื้นที่แก้ไขได้หลังหัก **Border Voxels** ต้องให้ footprint อยู่ภายใน Terrain และใช้พื้นที่แยกกันสำหรับแต่ละ zone
5. เริ่มด้วย package default: **Voxel Size 0.5**, **Chunk Cells 16**, **Border Voxels 2**, **Depth Below Terrain 8**, **Headroom Above Terrain 4** Fit To Terrain จะเปลี่ยน vertical cell count ค่าเหล่านี้ไม่ใช่การรับประกัน performance ดู[Performance และ limits](performance.md)
6. **Re-bake after dragging the zone handles** จะ Re-bake เมื่อปล่อย handle หากแก้ขนาดใน Inspector ให้กด **Bake** เอง รอจนเสร็จ ผิวควรยังมองเห็นและมี **Data** asset กับ chunk object

[![Dig Zone ที่ Bake แล้ว แสดงกล่องสีส้ม สีเขียว และ face handles](/img/digholeit/tutorial/zone-bounds.webp)](/img/digholeit/tutorial/zone-bounds.webp)

*01:30 — 64 × 27 × 48 cell ที่ 0.5 m เท่ากับ 32 × 13.5 × 24 m ความสูงที่ fit ใน project ของคุณอาจต่างกัน*

Bake ปกติเก็บ sculpt/paint ไว้เมื่อ voxel size และ lattice ยังเข้ากัน อ่าน Inspector warning ก่อนเปลี่ยน **Reset To Terrain** ล้าง sculpt/paint ไม่ใช่ขั้นตอนที่จำเป็นในการ setup ดู[Dig Zones](dig-zones.md)

## 4. ขุด pit และปรับรูปทรง

1. เลือก Terrain แล้วกลับไป **DigHoleIt: Dig Voxels**
2. เลือก **Dig**, soft round brush, radius เล็ก เช่น **2 m** และ **Strength 0.5** เพื่อเริ่ม ชี้ภายในกล่องสีเขียวแล้วกดค้างหรือลาก left mouse ใน Scene view
3. ปล่อย mouse เพื่อจบ stroke จะเห็น dug soil ภายใน pit ชี้ไปที่ผนังเพื่อขุด tunnel ต่อ
4. **Add** เติมดิน, **Smooth** ปรับผิว, **Reset** ปรับบางส่วนกลับไปหา baked terrain กด **Shift** เพื่อ Add ชั่วคราว หรือ **Ctrl** เพื่อ Smooth ใช้ **A + drag** เปลี่ยน size, **S + drag** เปลี่ยน strength และ **[ / ]** เปลี่ยน size Undo ย้อน stroke ได้

[![Dig mode ขุด pit พร้อมแสดง brush setting](/img/digholeit/tutorial/dig-pit.webp)](/img/digholeit/tutorial/dig-pit.webp)

*01:54 — ในวิดีโอใช้ editor brush 4.84 m เริ่มเล็กกว่านี้เพื่อควบคุมง่าย ข้อความสีแดงคือ Udon error ที่ยังไม่แก้ ไม่ใช่ผลทดสอบ runtime สำเร็จ*

อีกวิธีคือเลือก zone แล้วกด **Sculpt Tool** เพื่อเปิด panel ใน Scene view ดู[Editor brushes](editor-brushes.md)

## 5. Paint ผิวดิน หญ้า ดอกไม้ และต้นไม้

### Paint ผิว voxel

เลือก **DigHoleIt: Paint Voxels**, เลือก Terrain layer หรือ **Dug Soil** แล้วลากบนผิวที่ขุด **Auto** ลบ paint ที่กำหนดเองและคืน automatic shading ลด Strength เพื่อ blend coverage เพิ่ม Terrain layer ก่อน แล้ว Bake zone หลังเปลี่ยน layer list

[![Paint Voxels มี Auto, Grass, Rock, Sand, Moss และ Dug Soil](/img/digholeit/tutorial/paint-voxels.webp)](/img/digholeit/tutorial/paint-voxels.webp)

*02:49 — Terrain นี้มี named layer สี่อัน ตัวเลือกใน project ของคุณมาจาก Terrain ของคุณ*

### Paint หญ้าและดอกไม้ใน pit

เลือก **DigHoleIt: Paint Details** เลือก thumbnail หรือเพิ่ม detail ผ่าน **Edit Details** ตั้ง Brush Size, Opacity และ Target Strength แล้ว paint บนพื้นหรือผนัง **Surface Angle** มี preset **Floors**, **Walls**, **Ceilings**, **All** เพื่อจำกัดตำแหน่ง Wall/ceiling detail จะแสดงเมื่อ stroke หยุดหรือจบ **Shift** ลบทั้งหมดใน brush; **Ctrl** ลบเฉพาะ detail ที่เลือก หาก Detail Resolution เป็นศูนย์ ให้ตั้งใน Terrain Settings หรือกด **Set Detail Resolution To 512** เมื่อมีปุ่มนี้

[![Paint Details เลือก Flowers และมีดอกไม้บนผิว pit](/img/digholeit/tutorial/paint-details.webp)](/img/digholeit/tutorial/paint-details.webp)

*02:25 — เลือก Flowers ไว้ ส่วน Surface Angle อยู่ด้านล่าง brush setting*

### Paint ต้นไม้บนผิว voxel

เลือก **DigHoleIt: Paint Trees** เลือก thumbnail หรือเพิ่ม prefab ผ่าน **Edit Trees** เริ่มด้วย brush เล็กและ density ต่ำ **Tree Direction In Zones > Upright** ให้ต้นไม้ตั้งขึ้น (ห้อยลงเมื่ออยู่บน ceiling); **Along Surface** ให้เติบโตออกจาก slope/wall **Shift** ลบ; **Ctrl** ลบเฉพาะ tree ที่เลือก

[![Paint Trees พร้อม tree thumbnail และ Along Surface](/img/digholeit/tutorial/paint-trees.webp)](/img/digholeit/tutorial/paint-trees.webp)

*03:10 — เลือก Along Surface อยู่ Brush/density ขนาดใหญ่ในวิดีโอสร้าง tree ได้จำนวนมาก ควรเริ่มเล็กกว่านี้*

ใช้ foliage tool ของ **DigHoleIt** ภายใน zone เพราะ brush ปกติของ Unity ยิงผ่าน Terrain hole ไม่ได้ Tree/detail จะหายเมื่อพื้นรองรับถูกขุดหรือถูกฝัง ดู[Tree และ detail](dig-zones.md)

## 6. เปิด digging ให้ผู้เล่น VRChat

Editor brush ไม่ต้องใช้ runtime แต่ผู้เล่นต้องใช้:

Scene ต้องมี **VRC Scene Descriptor** และ spawn บนพื้น solid ด้วย Packaged VRChat scene มี **VRCWorld** อยู่แล้ว หาก scene ของคุณยังไม่มี descriptor ให้ลาก SDK prefab `Packages/com.vrchat.worlds/Samples/UdonExampleScene/Prefabs/VRCWorld.prefab` เข้า scene แล้ววาง spawn เหนือ Terrain ในตำแหน่งปลอดภัย

1. เลือก zone ที่ Bake แล้ว กด **Add VRChat Runtime** จะเพิ่ม **DigZoneRuntime** บน zone และ **DigSync** บน child GameObject Inspector ควรแสดง **VRChat runtime: DigZoneRuntime + DigSync**

[![Zone Inspector แสดง Bake และ Add VRChat Runtime ก่อน setup runtime](/img/digholeit/tutorial/zone-inspector.webp)](/img/digholeit/tutorial/zone-inspector.webp)

*01:30 — ยังไม่ได้เพิ่ม runtime ผู้เล่นยังขุด zone นี้ไม่ได้ ต้องกด Add VRChat Runtime เพื่อทำขั้นตอนนี้ให้ครบ*

2. ลาก **Example/Pen/Dig Pen (VRChat).prefab** เข้า scene วางให้หยิบถึงจาก safe player spawn ใช้ pickup, Rigidbody, Object Sync, settings Canvas และ cursor ที่มีอยู่ใน prefab
3. เลือก child **Pen** ที่มี **DigTool** แล้วกด **Refresh Zones** ตรวจว่า **Zones** มี `DigZoneRuntime`, **Layers** รวม **Chunk Layer** ของ zone และ **Reach** เพียงพอ Refresh Zones แทนที่ list ด้วย zone ทั้งหมดใน scene หากใช้ custom list ให้ assign อีกครั้งหลัง refresh List ที่ว่างจะเติมตอนเปิด/save scene หรือ Play ด้วย
4. หากใช้ Tree/Detail mode ตรวจ **Tree Prefabs** / **Detail Prefabs** ของ runtime List ที่ว่างใช้ Terrain prototype หรือ example default กำหนด array เองเพื่อเลือกชุดที่ต้องการ
5. Re-bake หรือ sculpt authoring zone เพื่อ update runtime อย่าแก้ baked grid field ของ runtime เอง
6. หากใช้ baked light กด **Add Light Probes** หรือ **Update Light Probes** แล้ว Bake lighting หลัง zone bake/sculpt ครั้งสุดท้าย Chunk ที่เปลี่ยนตอน runtime จะใช้ probes
7. Save แล้วเข้า **Play** ด้วย ClientSim เมื่อไม่มี Console error หยิบ pen ชี้ที่ zone และกด **Use** ค้าง Panel เลือก **Dig**, **Add**, **Paint**, **Tree**, **Detail**, **Smooth** พร้อม Size/Rate และ option arrows

ClientSim ตรวจ local pickup/UI และ edit ต้องทดสอบ built world ใน VRChat ด้วยสอง client และ late joiner เพื่อยืนยัน sync/replay ปุ่ม **Reset Zones** ของ pen ขอคืน baked state ให้ทุกคน โดย default ใช้ได้เฉพาะ master ดู[VRChat runtime](vrchat-runtime.md)

## Standalone setup

Mouse tool ใช้ legacy Input Manager ของ Unity ต้องเปิด backend นี้หรือ Both หากใช้ Input System อย่างเดียวต้องเรียก `EditAtScreen` เอง

ใน non-VRChat project ให้ Bake zone แล้วกด **Add Standalone Runtime** ใช้ packaged standalone demo, เพิ่ม `DigToolStandalone` บน camera หรือเพิ่ม **Example/Pen/Dig Pen (Standalone).prefab** และ assign camera/zones Left mouse ใช้ mode ที่เลือก, right Add, middle Paint เปิด **Show Settings** เพื่อใช้ panel และ **Tab** เพื่อสลับแสดง ดู[Standalone runtime](standalone-runtime.md) สำหรับ save/multiplayer Script นี้ปกติถูกปิดใน VRChat project

## ก่อนทดสอบ world

- Scene และ Terrain/zone data ที่แก้เป็น writable และ save แล้ว ไม่มี compile/program-asset error ค้าง
- Zone มี baked data/chunks และกล่องสีเขียวครอบคลุมพื้นที่ขุด
- VRChat zone แสดง **DigZoneRuntime + DigSync** และ pen หา zone กับยิงโดน Chunk Layer ได้
- Dig/Add/Paint ทำงานใน ClientSim รวมถึง foliage option และ settings button ถ้าใช้
- VRChat สอง client เห็นการเปลี่ยนแปลงตรงกัน และ late joiner ได้ผลเดียวกัน ต้องตรวจ target-device performance แยกด้วย

ตรวจขั้นตอนกับ [DigHoleIt 0.7.0 source](https://github.com/LogicCuteGuy/DigHoleIt/tree/0433a4f83616df0900edfca1676d4f5eb6ddfc63) แล้ว วิดีโอนี้ไม่ได้แสดง Play mode, world build, multiplayer หรือ target-device performance
