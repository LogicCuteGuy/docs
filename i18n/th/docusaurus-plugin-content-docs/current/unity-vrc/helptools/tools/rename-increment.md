---
sidebar_position: 5
---

# เปลี่ยนชื่อออบเจกต์ลูกพร้อมเลขลำดับ (Rename Children Increment)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Rename Children Increment | 子の連番リネーム | เปลี่ยนชื่อออบเจกต์ลูกพร้อมเลขลำดับ <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/rename123">pic.twitter.com/rename123</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046370648537395297?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `GameObject > LogicCuteGuy > Rename Children Increment...`

ยูทิลิตี้เปลี่ยนชื่อแบบกลุ่มที่ทรงพลัง โดยการใช้รูปแบบชื่อพร้อมตัวเลขลำดับกับออบเจกต์ลูกทั้งหมดของออบเจกต์ที่เลือก เหมาะสำหรับตั้งชื่อองค์ประกอบที่ซ้ำกัน เช่น รายการในลิสต์, แผ่นกระเบื้อง หรือชุดดวงไฟ

## ฟีเจอร์

- **การเปลี่ยนชื่อตามรูปแบบ (Pattern-Based)**: ใช้ตัวสำรอง `{0}` เพื่อกำหนดตำแหน่งที่ต้องการใส่ตัวเลข (เช่น `Object_{0}_Model`)
- **กำหนดดัชนีเริ่มต้นได้เอง**: เริ่มต้นการนับเลขจากจำนวนเต็มใดก็ได้ (เช่น 0, 1 หรือ 100)
- **รองรับออบเจกต์ที่ปิดใช้งาน**: เลือกว่าจะรวมออบเจกต์ลูกที่ปิดใช้งาน (inactive) เข้าไปในกระบวนการเปลี่ยนชื่อหรือไม่
- **เวิร์กโฟลว์อัตโนมัติ**: เครื่องมือจะปิดลงโดยอัตโนมัติหลังจากเปลี่ยนชื่อสำเร็จเพื่อความคล่องตัวในการทำงาน

## วิธีใช้งาน

1. เลือกออบเจกต์ **Parent** ใน Hierarchy
2. เปิดเครื่องมือและใส่ **Pattern** ของคุณ (เช่น `Item_{0}`)
3. ตั้งค่า **Start Index** (ดัชนีเริ่มต้น)
4. คลิก **Rename Children**

> [!IMPORTANT]
> รูปแบบชื่อของคุณ **ต้อง** มีตัวสำรอง `{0}` มิฉะนั้นเครื่องมือจะแสดงคำเตือนและระงับการดำเนินการเพื่อหลีกเลี่ยงการตั้งชื่อที่เหมือนกันทุกประการให้ออบเจกต์ทั้งหมดโดยไม่ได้ตั้งใจ
