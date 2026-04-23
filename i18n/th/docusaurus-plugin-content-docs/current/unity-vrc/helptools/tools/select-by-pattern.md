---
sidebar_position: 7
---

# เลือกออบเจกต์ลูกตามรูปแบบ (Select Children By Pattern)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Select Children By Pattern | パターンによる子の選択 | เลือกออบเจกต์ลูกตามรูปแบบ<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/Unity?src=hash&amp;ref_src=twsrc%5Etfw">#Unity</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/Select?src=hash&amp;ref_src=twsrc%5Etfw">#Select</a> <a href="https://twitter.com/hashtag/Pattern?src=hash&amp;ref_src=twsrc%5Etfw">#Pattern</a> <a href="https://t.co/F2eUL0cbn6">pic.twitter.com/F2eUL0cbn6</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2047271175907348568?ref_src=twsrc%5Etfw">April 23, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `GameObject > LogicCuteGuy > Select Children By Pattern`

ยูทิลิตี้การเลือกที่ทรงพลัง ซึ่งใช้รูปแบบข้อความที่เป็นจังหวะเพื่อกรองออบเจกต์ลูกของ Parent สิ่งนี้มีค่ามากสำหรับงานเลย์เอาต์ที่ซับซ้อนหรือการแก้ไขกลุ่มออบเจกต์ที่ซ้ำกันจำนวนมาก

## ฟีเจอร์

- **ไวยากรณ์รูปแบบ (Pattern Syntax)**:
    - `x` = เลือกช่องนี้
    - `-` = ข้ามช่องนี้
- **การทำซ้ำแบบวนรอบ (Cyclic Repetition)**: รูปแบบจะทำซ้ำโดยอัตโนมัติจนกว่าออบเจกต์ลูกทั้งหมดจะถูกตรวจสอบ (เช่น `x-` จะเลือกออบเจกต์ลูกลำดับที่คี่ทั้งหมด: 1, 3, 5...)
- **พรีวิวแบบสด**: ดูความยาวรอบและจำนวนที่ถูกเลือกได้แบบเรียลไทม์ในขณะที่คุณพิมพ์รูปแบบ
- **ชุดคำสั่ง**:
    - **Find & Select**: เลือกออบเจกต์ลูกที่ตรงกันทันที
    - **Delete**: ลบออบเจกต์ที่ตรงกันทั้งหมดอย่างปลอดภัยผ่านระบบ Undo
    - **Deselect**: เอาออบเจกต์ที่ตรงกันออกจากรายการที่คุณเลือกไว้หลายรายการในปัจจุบัน

## ตัวอย่างรูปแบบ

- `x-`: เลือกทุก ๆ 2 ตัว (ตัวที่ 1, 3, 5...)
- `x--`: เลือกทุก ๆ 3 ตัว (ตัวที่ 1, 4, 7...)
- `xx-`: เลือกสองตัว ข้ามหนึ่งตัว วนไปเรื่อย ๆ

## วิธีใช้งาน

1. กำหนดออบเจกต์ **Parent Object**
2. พิมพ์รูปแบบของคุณโดยใช้ `x` และ `-`
3. เลือกฟิลเตอร์ **Include Inactive** (รวมออบเจกต์ที่ปิดใช้งาน)
4. คลิก **Find & Select**

> [!NOTE]
> การจับคู่รูปแบบจะดำเนินการตาม**ลำดับใน Hierarchy** ของออบเจกต์ลูก
