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

### GitHub Pages

GitHub Pages (`*.github.io`) อยู่ในรายการ URL ที่ VRChat เชื่อถือ ผู้เล่นที่ใช้ค่าเริ่มต้นจึงโหลดได้

1. ล็อกอินหนึ่งครั้งด้วย `gh auth login` ปุ่ม **Check gh Login** ใช้ดูสถานะ
2. ใส่ **Repo** เป็น `owner/name` หรือใช้ **Select** ปุ่ม **Create Repo** จะสร้าง repository สาธารณะใหม่
3. กด **Enable Pages**
4. ตั้ง **World Folder** repository เดียวเก็บได้หลายโลก โลกละหนึ่งโฟลเดอร์
5. กด **Publish Now**

:::warning ไฟล์ที่เผยแพร่เป็นสาธารณะ และเผยแพร่อัตโนมัติเป็นค่าเริ่มต้น
ไฟล์ใน Pages repository สาธารณะใครก็ดูได้ เมื่อตั้งโฮสต์แล้ว **Export Before Build** และ **Publish On Build** จะ **เปิดเป็นค่าเริ่มต้น** ทุกครั้งที่ build VRChat รวมถึง Build & Test จะ export และเผยแพร่ ถ้าเผยแพร่ไม่สำเร็จ build จะหยุด ถ้าต้องการเผยแพร่เองให้ปิดสองตัวเลือกนี้
:::

การเผยแพร่จะไม่ลบไฟล์เก่า เพราะโลกที่อัปโหลดด้วย export ครั้งก่อนอาจยังเรียกไฟล์เหล่านั้นอยู่

### โฮสต์ของคุณเอง

ใช้ `openworld-host` ได้ เป็นเซิร์ฟเวอร์ Rust ขนาดเล็ก ซอร์สอยู่ใน `Server~` ของแพ็กเกจ [OpenWorld](https://github.com/LogicCuteGuy/OpenWorld) ใส่ URL และ deploy token โดย token ถูกเก็บในเครื่องของคุณเท่านั้น หรือกด **Package for Host** แล้วอัปโหลดไฟล์ใน zip ไปยัง static host ใดก็ได้

โดเมนของคุณเองไม่อยู่ในรายการ URL ที่ VRChat เชื่อถือ ผู้เล่นต้องเปิด **Allow Untrusted URLs** อีกทางคือใช้ GitHub Pages เป็นหลัก แล้วใส่โฮสต์ของคุณใน **Backup Base Url** VRChat ไม่ตาม redirect ดังนั้น URL ต้องชี้ไปที่ไฟล์โดยตรง

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
