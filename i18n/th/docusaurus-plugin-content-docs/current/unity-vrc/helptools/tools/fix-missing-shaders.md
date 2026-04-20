---
sidebar_position: 3
---

# แก้ไข Shader ที่หายไปใน Prefab (Fix Missing Shader On Prefab)
 
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Fix Missing Shader On Prefab | プレハブの消失シェーダー修正 | แก้ไข Shader ที่หายไปใน Prefab <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#vrchat</a> <a href="https://twitter.com/hashtag/shader?src=hash&amp;ref_src=twsrc%5Etfw">#shader</a> <a href="https://twitter.com/hashtag/missing?src=hash&amp;ref_src=twsrc%5Etfw">#missing</a> <a href="https://twitter.com/hashtag/vcc?src=hash&amp;ref_src=twsrc%5Etfw">#vcc</a> <a href="https://t.co/HwyWfkc73j">pic.twitter.com/HwyWfkc73j</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046164392069542231?ref_src=twsrc%5Etfw">April 20, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `คลิกขวาที่ Prefab Asset > Fix Missing Shaders (Prefab → Standard)`

เครื่องมือทำความสะอาดเฉพาะทางสำหรับแก้ไข Material ที่ "เสียจนเป็นสีชมพู" ภายใน Prefab Asset ซึ่งมักเกิดจาก Shader หายไปหรือข้อผิดพลาดของ Shader หลังจากนำเข้า Asset จาก Unity เวอร์ชันที่ต่างกันหรือ Render Pipeline ที่ต่างกัน

## ฟีเจอร์

- **การแก้ไขที่ปลอดภัย**: ใช้ `PrefabUtility.EditPrefabContentsScope` ของ Unity เพื่อแก้ไข Prefab โดยไม่จำเป็นต้องสร้างอินสแตนซ์ลงในฉาก
- **การตรวจจับ**: ระบุ Material ที่มี Shader เป็น `null` หรือ Shader ที่ระบุว่าเป็น "InternalError" (สาเหตุทั่วไปที่ทำให้โมเดลเป็นสีชมพู)
- **การแทนที่อัตโนมัติ**: แทนที่ Shader ที่เสียด้วย Shader **Standard** เริ่มต้นของ Unity
- **การสแกนแบบลำดับขั้น**: สแกน Renderer ลูกทุกตัวและทุกสล็อต Material ภายใน Prefab อย่างละเอียด

## วิธีใช้งาน

1. ค้นหา Prefab ที่ "เป็นสีชมพู" หรือเสียในหน้าต่าง **Project**
2. คลิกขวาที่ Prefab Asset นั้น
3. เลือก **Fix Missing Shaders (Prefab → Standard)**
4. Console จะบันทึกข้อมูลว่า Material ชิ้นใดบ้างที่ได้รับการแก้ไข

> [!NOTE]
> เครื่องมือนี้ถูกออกแบบมาเพื่อทำงานกับ **Prefab Asset** ในหน้าต่าง Project เท่านั้น ไม่ได้ทำงานกับ GameObject อินสแตนซ์ในหน้าต่าง Hierarchy
