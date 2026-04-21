---
sidebar_position: 6
---

# วางเป็นออบเจกต์ลูกให้กับ Parent ทั้งหมดที่เลือก (Paste As Child To All Selected Parents)

<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="ja" dir="ltr">Paste As Child To All Selected Parents | 全選択中の親に子として貼り付け | วางเป็นออบเจกต์ลูกให้กับ Parent ทั้งหมดที่เลือก<a href="https://twitter.com/hashtag/Vrchat?src=hash&amp;ref_src=twsrc%5Etfw">#Vrchat</a> <a href="https://twitter.com/hashtag/VCC?src=hash&amp;ref_src=twsrc%5Etfw">#VCC</a> <a href="https://twitter.com/hashtag/unity?src=hash&amp;ref_src=twsrc%5Etfw">#unity</a> <a href="https://twitter.com/hashtag/Paste?src=hash&amp;ref_src=twsrc%5Etfw">#Paste</a> <a href="https://twitter.com/hashtag/Selected?src=hash&amp;ref_src=twsrc%5Etfw">#Selected</a> <a href="https://twitter.com/hashtag/Copy?src=hash&amp;ref_src=twsrc%5Etfw">#Copy</a> <a href="https://t.co/Cz0tsYrBXT">pic.twitter.com/Cz0tsYrBXT</a></p>&mdash; LogicCuteGuy (@LogicCuteGuy) <a href="https://twitter.com/LogicCuteGuy/status/2046669419951300893?ref_src=twsrc%5Etfw">April 21, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

**เมนู**: `GameObject > LogicCuteGuy > Paste As Child To All Selected Parents...`

เครื่องมือนี้ช่วยเพิ่มประสิทธิภาพเวิร์กโฟลว์ "Copy-Paste" ของคุณ โดยอนุญาตให้เลือกออบเจกต์ "ต้นทาง" หนึ่งชิ้นหรือมากกว่า แล้ววางสำเนาของพวกมันลงในออบเจกต์ "ต้นทางปลายทาง" (Parents) หลาย ๆ ชิ้นพร้อมกัน

## ฟีเจอร์

- **รองรับหลายต้นทาง**: ตั้งค่ากลุ่มออบเจกต์เป็น "คลิปบอร์ด" ต้นทางของคุณ
- **รองรับหลาย Parent**: เลือก GameObject หลายชิ้นใน Hierarchy เพื่อเป็นเป้าหมายในการวาง
- **โหมดการวาง**:
    - **Preserve World**: รักษาตำแหน่ง Global ปัจจุบันของสำเนาไว้ในขณะที่เปลี่ยน Parent
    - **Copy Source Local**: คัดลอกค่า Local Pos/Rot/Scale จากออบเจกต์ต้นทางไปยังสำเนาใหม่โดยตรง
    - **Reset Local**: วางสำเนาแล้วรีเซ็ตค่า Local Transform เป็นศูนย์ทันที (ตำแหน่งและหมุนเป็น 0,0,0)
- **ระบบ Prefab อัจฉริยะ**: หากต้นทางเป็น Prefab Asset เครื่องมือจะสร้างอินสแตนซ์เป็น **Prefab Instance** เพื่อรักษาการเชื่อมโยงไว้สำหรับการอัปเดตในอนาคต

## วิธีใช้งาน

1. เลือกออบเจกต์ต้นทางแล้วคลิก **Set Sources From Selection**
2. เลือก GameObject ที่เป็น **Parent** หนึ่งชิ้นหรือมากกว่าใน Hierarchy
3. เลือก **Paste Mode** (โหมดการวาง)
4. คลิก **Paste To Selected Parents**

> [!TIP]
> ใช้สิ่งนี้เพื่อวางพร็อพในฉากอย่างรวดเร็ว ตัวอย่างเช่น เลือก Prefab "เก้าอี้" เป็นต้นทาง จากนั้นเลือกออบเจกต์ "โต๊ะ" 10 ตัวแล้วสั่งวาง โต๊ะแต่ละตัวก็จะมีเก้าอี้เป็นออบเจกต์ลูกที่ถูกสร้างขึ้นอย่างถูกต้อง
