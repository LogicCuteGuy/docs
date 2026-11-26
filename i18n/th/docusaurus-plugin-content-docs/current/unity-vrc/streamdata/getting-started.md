---
sidebar_position: 2
---

# เริ่มต้นใช้งาน StreamData

## 1. ตั้งค่าคอมโพเนนต์

1. บันทึกฉาก
2. สร้าง GameObject แล้วเพิ่ม UdonSharp behaviour **StreamData**
3. เพิ่ม material ที่จะสตรีมลงใน **Stream Materials** ระบบจะสตรีม texture สีของ material (sRGB, ชนิด texture เป็น Default)

| การตั้งค่า | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| **Base Url** | | URL ของโฟลเดอร์ที่เก็บไฟล์ที่ export ลงท้ายด้วย `/` |
| **Backup Base Url** | | โฮสต์ที่สอง (ไม่บังคับ) |
| **Fallback Size** | 128 | ด้านยาวสุดของ texture ที่ใส่ไปกับโลก |
| **Max Stream Size** | 1024 | ด้านยาวสุดของ texture ที่สตรีม ไม่เกิน 2048 |
| **Stream Lightmaps** | ปิด | สตรีม color lightmap ของฉากด้วย |
| **Lightmap Ship Size** | 0 | ถ้ามากกว่า 0 ปุ่ม Export Stream จะตั้ง Max Size ของ texture lightmap ในฉากเป็นค่านี้ |
| **Load Distance** | 0 | ระยะ (เมตร) ที่จะดาวน์โหลด texture ค่า 0 คือโหลดทั้งหมดจากใกล้ไปไกลและไม่ปล่อยออก |
| **Unload Factor** | 1.5 | texture ที่ไกลกว่า Load Distance × ค่านี้จะกลับไปใช้ตัวสำรอง |

:::note
**Lightmap Ship Size** จะเปลี่ยน import setting ของ texture lightmap
:::

## 2. Export

กด **Export Stream** ระบบจะเขียนข้อมูลขนาดเต็มไปที่ `<scene>_StreamData/Export~` และสร้าง texture สำรอง ต้อง export ใหม่เมื่อเปลี่ยน texture, material หรือ URL

material เดิมของคุณจะไม่ถูกแก้ build และ Play mode จะใช้สำเนาที่ใส่ texture สำรอง

## 3. ทดสอบใน editor

ตั้ง **Base Url** เป็นที่อยู่ localhost เช่น `http://localhost:8765/` แล้ว export จากนั้นกด **Start Test Server** เซิร์ฟเวอร์รับการเชื่อมต่อจาก localhost เท่านั้น และบันทึกทุกคำขอลง Console ถ้าตั้งค่าการเผยแพร่ด้านล่างแล้ว ตัวเลือก **Play Mode Uses Export~** จะทำขั้นตอนนี้ให้

## 4. เผยแพร่

เปิด **Tools > StreamData > Publish** แล้วเลือกโฮสต์

:::warning การเผยแพร่เป็นสาธารณะ และเป็นอัตโนมัติโดยค่าเริ่มต้น
เมื่อตั้งโฮสต์แล้ว การ build ของ VRChat ทุกครั้ง รวมถึง Build & Test จะ export และเผยแพร่ อ่าน [การเผยแพร่ข้อมูล stream](./publishing.md) ก่อน build ครั้งแรก
:::

## ขณะเล่น

ไฟล์ `manifest` จะดาวน์โหลดก่อน ถ้าล้มเหลว เช่น ออฟไลน์หรือ URL ถูกบล็อก ระบบจะไม่ขอรูปเลยและโลกจะใช้ texture สำรองต่อไป จากนั้นรูปจะดาวน์โหลดทีละรูปจากที่ใกล้ผู้เล่นที่สุด VRChat ให้โหลดได้ 1 รูปต่อ 5 วินาที โลกขนาดใหญ่จึงใช้เวลาโหลดครบพอสมควร

อย่าแก้ช่องในหมวด **Baked** เพราะ Export Stream เป็นคนเขียนค่า

## แก้ปัญหา

| อาการ | สิ่งที่ต้องตรวจ |
|---|---|
| texture ยังเบลอ | เปิด Base Url + `manifest` ในเบราว์เซอร์ ตรวจว่า URL ลงท้ายด้วย `/` และเผยแพร่หลัง export ครั้งล่าสุดแล้ว |
| เครื่องคุณโหลดได้แต่คนอื่นไม่ได้ | โฮสต์ไม่ใช่ `*.github.io` ผู้เล่นจึงต้องเปิด Allow Untrusted URLs |
| texture ที่แก้ไม่อัปเดต | export และเผยแพร่ใหม่ ถ้าเปลี่ยน URL ต้องอัปโหลดโลกใหม่ |
| build หยุดตอนเผยแพร่ | อ่าน error ใน Console แล้วกด **Check gh Login** หรือปิด **Publish On Build** |
