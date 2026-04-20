---
sidebar_position: 4
---

# จัดเรียงออบเจกต์ลูก (Sort Parent Children)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Sort Parent Children | 親オブジェクトの子をソート | จัดเรียงออบเจกต์ลูก <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/sort?src=hash&amp;ref_src=twsrc%5Etfw">#sort</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/eGuBBSyOEI">pic.twitter.com/eGuBBSyOEI</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046207151677542581?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `GameObject > LogicCuteGuy > Sort Parent Children`

เครื่องมือจัดระเบียบที่แม่นยำสำหรับเรียงลำดับ GameObject ลูกใน Hierarchy ตามเกณฑ์ต่าง ๆ สิ่งนี้จำเป็นสำหรับการรักษาโครงสร้างของฉากที่ซับซ้อนและทำให้ออบเจกต์ลูกค้นหาได้ง่ายขึ้น

## ฟีเจอร์

- **โหมดการจัดเรียง**:
    - **Name A-Z / Z-A**: จัดเรียงตามตัวอักษร
    - **แกน Local Position**: จัดเรียงตามพิกัด Local X, Y หรือ Z (จากน้อยไปมากหรือมากไปน้อย) เหมาะสำหรับออบเจกต์ที่วางเรียงเป็นแถวหรือตาราง
- **การดำเนินการแบบกลุ่ม**: จัดเรียงลูกของออบเจกต์แม่ชิ้นเดียวที่กำหนด หรือประมวลผลออบเจกต์แม่หลายชิ้นที่เลือกพร้อมกัน
- **ความเสถียรของลำดับ (Index Stability)**: ใช้การเรียงลำดับดัชนีพี่น้อง (`SetSiblingIndex`) ซึ่งปลอดภัยและรักษาข้อมูลไว้ได้
- **รองรับการเลิกทำ (Undo Support)**: การจัดเรียงทั้งหมดสามารถเลิกทำ (Undo) ได้อย่างสมบูรณ์ในขั้นตอนเดียว

## วิธีใช้งาน

1. เลือก GameObject ที่เป็นตัวแม่ (Parent) หรือเปิดหน้าต่างเครื่องมือ
2. เลือก **Sort Mode** (เช่น `Name A-Z` หรือ `Local Pos X Asc`)
3. คลิก **Sort Children** สำหรับออบเจกต์แม่ที่กำหนด หรือ **Sort Selected Parents** สำหรับสิ่งที่คุณเลือกในปัจจุบัน

> [!TIP]
> การจัดเรียงตาม **Local Pos X Asc** มีประโยชน์มากเมื่อคุณมีชุดปุ่ม UI, ช่องเก็บของ (Inventory), หรือพร็อพในฉากที่วางซ้ำ ๆ กัน และต้องการให้ลำดับใน Hierarchy ตรงกับลำดับที่มองเห็นจากซ้ายไปขวา
