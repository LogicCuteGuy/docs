---
sidebar_position: 1
slug: /
---

# LogicCuteGuy VRC/Unity

<div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
  <img src="/img/icon.png" alt="อวตาร LogicCuteGuy" style={{borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover', border: '4px solid var(--ifm-color-primary)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'}} />
</div>

ยินดีต้อนรับสู่คลังเครื่องมือพัฒนา Unity และ VRChat ของ **LogicCuteGuy** เรานำเสนอชุดเครื่องมือที่ออกแบบมาเพื่อเพิ่มประสิทธิภาพเวิร์กโฟลว์ ปรับปรุงประสิทธิภาพ และทำให้การสร้างโลกเป็นเรื่องง่าย

<div style={{padding: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', background: 'var(--glass-bg)', borderRadius: '2rem', border: '1px solid var(--glass-border)', margin: '2rem 0'}}>
  <h2 style={{margin: 0, fontSize: '1.8rem', fontWeight: 800}}>การติดตั้งอย่างรวดเร็ว</h2>
  <p style={{opacity: 0.8, textAlign: 'center', maxWidth: '500px'}}>เพิ่มคลังเครื่องมือของเราลงใน VRChat Creator Companion (VCC) เพื่อเข้าถึงและอัปเดตเครื่องมือทั้งหมดด้วยการคลิกเพียงครั้งเดียว</p>
  
  <a href="vcc://vpm/addRepo?url=https://vpm.logiccuteguy.com/index.json" className="button--vcc" style={{fontSize: '1.2rem', padding: '16px 36px'}}>
    <span>ติดตั้งผ่าน VCC</span>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
  </a>
  
  <span style={{fontSize: '0.9rem', opacity: 0.6}}>รองรับ Unity 2022.3.x และ VCC</span>
</div>

[รับโค้ด VCC embed แบบสี่เหลี่ยมจัตุรัสสำหรับ BOOTH](/th/booth-embed)

## โปรเจกต์ที่พร้อมใช้งาน

แพ็กเกจทั้งสามมีใน [รายการ VPM ของ LogicCuteGuy](./packages.md) (`https://vpm.logiccuteguy.com/index.json`) และ DigHoleIt ยังมี Git tag กับแพ็กเกจ GitHub Release แบบมีชื่อ

### [Help Tools (เครื่องมือช่วยเหลือ)](./helptools/intro.md) — `com.logiccuteguy.helptools` v1.0.1
ชุดเครื่องมือ Editor ระดับมืออาชีพกว่า 15 รายการ สำหรับการปรับขนาด Lightmap, การวิเคราะห์การใช้งาน Asset, การจัดการ Shader และการจัดระเบียบ Hierarchy

### [LCGUdonSharp](./lcgudonsharp/intro.md) — `com.logiccuteguy.lcgudonsharp` v0.3.10

LCGUdonSharp 0.3.10 ติดตั้ง dependency แบบ embedded **SBP compatibility 1.21.26** ผ่าน VPM ก่อน Unity compile เพื่อกัน VRChat SDK `ExtensionMethods` ชนทั้งตอนติดตั้งใหม่และอัปเกรด ใช้ฐาน Unity SBP 1.21.25 โดยรักษา source/GUID และ Unity Companion License และยังอยู่หลังสร้าง `Library` ใหม่ Unity Localization 1.4.5 ยังรองรับ ดู[การติดตั้ง](./lcgudonsharp/install.md) การติดตั้งเองต้องใช้ release ZIP **ทั้งสองไฟล์**

LCGUdonSharp 0.3.9 เพิ่ม [Localization ของข้อความและ asset](./lcgudonsharp/localization.md): bake Unity String/Asset Tables เป็น Udon, เลือกภาษาแบบ local พร้อม fallback, dropdown/callback, Smart Strings ที่ตรวจ syntax และสลับ sprite/texture/เสียง/prefab เพิ่มตัวอย่าง EN/TH/JA, เครื่องมือ JSON เดิม, dependency Unity Localization 1.4.5 และ Scriptable Build Pipeline 1.21.25 พร้อมแก้ compatibility ตอน build และ compiler worker thread ต้อง build world ใหม่หลังแก้ table หรืออัปเดต

LCGUdonSharp 0.3.8 เพิ่ม [snapshot ข้อมูล ScriptableObject](./lcgudonsharp/scriptableobjects.md) แบบซ้อนและ polymorphic พร้อม type test และ checked cast, ตรวจ cycle/ความลึก และตัวอย่างอุปกรณ์แบบ local ต้อง build Udon program ทั้งหมดและ bake ข้อมูล scene/prefab ใหม่หลังอัปเดต เพราะ snapshot ใช้ layout ใหม่ที่มี runtime type tag

คอมไพเลอร์ UdonSharp สำหรับ VRChat ที่รองรับ C# interface, async/await ตอน build, exception แบบ synchronous, collection/JSON, ความสามารถภาษาเพิ่มเติม และระบบ packet network แบบกำหนดเองพร้อม bounded object-motion batching และ zone recovery

### [DigHoleIt](./digholeit/intro.md) — `com.logiccuteguy.digholeit` v0.7.0

DigHoleIt 0.7.0 เพิ่ม prefab Dig Pen, ปลูก/ลบ tree และ detail ตอน runtime (รวม foliage ที่ bake ไว้), smoothing แบบ sync, VRChat showcase และ Refresh Holes / Refresh Zones การตั้งค่าเป็น local แต่ edit ใน VRChat sync และ replay ให้ late joiner

0.7.0 มีทั้งใน VPM และ GitHub ดู[วิธีติดตั้ง](./digholeit/getting-started.md)
ระบบ voxel terrain ที่ขุดได้สำหรับ Unity รองรับหลุม อุโมงค์ ถ้ำ การเติมดิน และระบาย terrain layer ตอน runtime พร้อมการ sync ใน VRChat และ runtime C# สำหรับเกม standalone

ดูเวอร์ชัน การพึ่งพา และ repository ได้ที่[รายการแพ็กเกจ](./packages.md)

---

## การสนับสนุนและชุมชน
- **GitHub**: [LogicCuteGuy Repository](https://github.com/LogicCuteGuy)
- **อัปเดต**: ติดตามเราเพื่อรับข่าวสารเครื่องมือล่าสุดและการเพิ่มประสิทธิภาพ
