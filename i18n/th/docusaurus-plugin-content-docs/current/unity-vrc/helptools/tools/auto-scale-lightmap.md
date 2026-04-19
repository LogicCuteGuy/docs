---
sidebar_position: 1
---

# การปรับขนาด Lightmap อัตโนมัติ (Auto Scale In Lightmap)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Auto Scale In Lightmap | ライトマップ自動スケーリング | การปรับขนาด Lightmap อัตโนมัติ <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://twitter.com/hashtag/lightmap?src=hash&amp;ref_src=twsrc%5Etfw">#lightmap</a> <a href="https://t.co/YxtXZwSjqx">pic.twitter.com/YxtXZwSjqx</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2045964665222807878?ref_src=twsrc%5Etfw">April 19, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `GameObject > LogicCuteGuy > Auto Scale In Lightmap`

เครื่องมือ **Auto Scale In Lightmap** ช่วยแก้ปัญหาความหนาแนนของ Texel ที่ไม่เท่ากันระหว่างออบเจกต์ต่าง ๆ ในฉาก โดยมีอัลกอริทึมขั้นสูงสองแบบในการปรับค่าคุณสมบัติ `Scale In Lightmap` ของ MeshRenderer ให้เป็นมาตรฐาน

## ฟีเจอร์

- **Match Scale First (Global Multiplier)**: ปรับออบเจกต์ทุกชิ้นให้เป็นมาตรฐาน เพื่อให้ใช้พื้นที่ Lightmap เริ่มต้นในสัดส่วนที่เท่ากันโดยไม่คำนึงถึงขนาดทางกายภาพ วิธีนี้ช่วยให้มั่นใจได้ว่ากำแพงขนาดใหญ่และลูกบาศก์ขนาดเล็กจะมีความละเอียดที่สมดุลก่อนที่คุณจะใช้ตัวคูณสุดท้าย
- **โหมด Min/Max Ratio**: จับคู่ออบเจกต์ที่เล็กที่สุดให้มีความละเอียดสูง และออบเจกต์ที่ใหญ่ที่สุดให้มีความละเอียดต่ำโดย自動ตามช่วงขนาดจริงในฉากของคุณ
- **การคำนวณตามปริมาตร (Volume-Based)**: ตัวเลือกในการคำนวณ "ขนาด" ตามรากที่สามของปริมาตร (กว้าง × สูง × ลึก) เพื่อผลลัพธ์ที่แม่นยำยิ่งขึ้นตามหลักฟิสิกส์สำหรับรูปทรงที่หลากหลาย
- **การปรับใช้เฉพาะส่วน**: เลือกปรับใช้กับทั้งฉาก หรือเฉพาะออบเจกต์ที่เลือกและลูกหลานของมันเท่านั้น
- **ฟีเจอร์เพื่อความปลอดภัย**: รีเซ็ตสเกลทั้งหมดเป็น 1.0 ด้วยการคลิกเพียงครั้งเดียว หรือเลือกรวมออบเจกต์ที่ปิดใช้งาน (inactive) เข้าไปในกระบวนการปรับขนาดอัตโนมัติ

## วิธีใช้งาน

1. เปิดเครื่องมือจากเมนู **LogicCuteGuy**
2. เลือก **Scaling Mode**:
   - สำหรับความหนาแน่นที่สม่ำเสมอ ให้ใช้ **Global Multiplier**
   - สำหรับความหนาแน่นแบบลำดับขั้น (ของชิ้นเล็ก = ความละเอียดสูง) ให้ใช้ **Min Max Ratio**
3. เปิดใช้งาน **Calculate by Volume** สำหรับรูปทรงที่ซับซ้อน
4. คลิก **Apply Auto Scale**
5. ตรวจสอบหน้าต่าง Console สำหรับสรุปจำนวนออบเจกต์ที่ได้รับการอัปเดต

> [!TIP]
> ใช้เครื่องมือนี้ก่อนการ Bake Lightmap ครั้งสุดท้ายเพื่อลดเวลาในการ Bake อย่างมาก และกำจัดเงาที่เป็น "เหลี่ยมพิกเซล" บนรายละเอียดขนาดเล็ก ในขณะที่ยังคงรักษาพื้นผิวขนาดใหญ่ให้เหมาะสมที่สุด
