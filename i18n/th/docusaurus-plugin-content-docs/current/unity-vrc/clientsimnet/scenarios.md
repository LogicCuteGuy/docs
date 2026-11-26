---
sidebar_position: 4
---

# สถานการณ์ทดสอบ

โค้ด networking ยังไม่ถือว่าเสร็จจนกว่าจะผ่านทุกสถานการณ์ที่เกี่ยวข้อง ใน Play mode โดยมี**ผู้เล่น remote อย่างน้อยสองคน**

## ก่อนเริ่ม

1. ตรวจว่า Unity และ UdonSharp compile ผ่านโดยไม่มี error ใน console
2. เข้า Play mode ใน world ของคุณ หรือใน `NetSimTest.unity` จาก sample **Test World**
3. เพิ่มผู้เล่น remote สองคน
4. ใช้ **Normal** เพื่อจังหวะเวลาที่สมจริง หรือ **Perfect** เมื่อการตรวจต้องได้ผลเหมือนกันทุกครั้ง

"คุณ" หมายถึงผู้เล่นฝั่งเครื่องคุณ และ "Bob" คือผู้เล่น remote ชื่อเมธอดมาจาก [`NetSimApi`](./scripting-api.md)

## Sync และ event

| # | สถานการณ์ | วิธีทำ | ผ่านเมื่อ |
|---|---|---|---|
| 1 | คุณเขียนค่าที่ sync | `Interact(obj)` | log แสดงการส่ง และ state ฝั่ง remote ตรงกับฝั่งคุณ |
| 2 | คนที่ไม่ใช่ owner เขียนค่า | ให้ Bob take ownership แล้วคุณเขียนโดยไม่เรียก `SetOwner` | มีคำเตือน "not the owner" วิธีแก้: take ownership ก่อน |
| 3 | ค่าที่ remote เขียนมาถึงคุณ | `TakeOwnership` แล้ว `SendState` | `OnDeserialization` ทำงาน และ**ภาพที่เห็น**อัปเดต ไม่ใช่แค่ฟิลด์ |
| 4 | Late join | ยกเลิกเครื่องหมาย **Local Player Is Master** แล้วกด Play | state ถูกต้องหลังได้ snapshot และไม่มีส่วนไหนคาดว่า `Start` จะเห็นค่าที่ sync |
| 5 | Event แบบ `Owner` และ `Others` | ให้ Bob เป็น owner แล้วคุณส่งทั้งสองแบบ | ทั้งสองแบบไม่รันบน client ของคุณ ส่วน `All` รัน |
| 6 | Event จาก remote และ `CallingPlayer` | `SendEvent` ในฐานะ Bob | handler ทำงาน และการตรวจสิทธิ์ทำงานถูกต้อง |
| 7 | ส่ง event รัว | ส่งมากกว่า 5 event ในเฟรมเดียว | โค้ดรับได้เมื่อการส่งถูกหน่วง |
| 8 | ขีดจำกัดขนาด | ใส่ string และ array ให้เต็มตามขนาดสูงสุดที่เป็นไปได้จริง | ไม่มี `OnPostSerialization success=false` และ continuous sync ต่ำกว่า 200 B |

## Ownership และการออกจาก instance

| # | สถานการณ์ | วิธีทำ | ผ่านเมื่อ |
|---|---|---|---|
| 9 | แย่ง ownership กัน | คุณกับ Bob take ownership และเขียนค่าภายในช่วง latency | state สุดท้ายสอดคล้องกัน ไม่มีอะไรค้างหรือซ้ำ |
| 10 | ปฏิเสธ ownership | ให้ `OnOwnershipRequest` คืน false แล้วทดสอบทั้งสองทิศทาง | ผู้ขอไม่ได้ ownership ไป และโค้ดไม่ได้สมมติว่า `SetOwner` สำเร็จเสมอ |
| 11 | Master ออก | `MasterLeaves()` โดยมี master เป็น remote | object ย้าย owner และ logic ที่ทำเฉพาะ master ทำงานต่อบน master คนใหม่ |
| 12 | Owner ออก | ให้ Bob เป็น owner แล้ว `Leave("Bob")` | ownership ย้ายไปคนสำรอง และไม่มีอะไรค้างรอ Bob |

## Pickup และ network ที่แย่

| # | สถานการณ์ | วิธีทำ | ผ่านเมื่อ |
|---|---|---|---|
| 13 | แย่ง pickup | Bob ใช้ `Grab` ขณะคุณถืออยู่ | การแย่ง หรือ `DisallowTheft` ทำงานตามที่ออกแบบ |
| 14 | Network แย่ | `Preset("Bad")` | ภาพแบบ continuous ทนการสูญหายได้ และ state แบบ manual ยังกลับมาตรงกัน |

## PlayerObject

| # | สถานการณ์ | วิธีทำ | ผ่านเมื่อ |
|---|---|---|---|
| 15 | สำเนาของผู้เล่นแต่ละคน | เพิ่มผู้เล่น | ผู้เล่นแต่ละคนมีสำเนา `<name> [id]` ในทุก world คนอื่นแก้ได้ผ่าน event แบบ `Owner` เท่านั้น |
| 16 | ส่งคำขอไปหา owner | `SendEvent` ส่ง event แบบ `Owner` จาก Bob ไปยังสำเนาของคุณ | handler ตรวจ `CallingPlayer` ก่อนเขียนค่า และการเรียกจากตัวเองถูกปฏิเสธ |
| 17 | ผู้เล่นที่มี PlayerObject ออก | `Leave("Bob")` | สำเนาของ Bob ถูกทำลาย และยอดรวม เช่น leaderboard refresh โดยไม่มี reference ที่ตายแล้ว |

## Pickup ที่ไม่ได้ sync

| # | สถานการณ์ | วิธีทำ | ผ่านเมื่อ |
|---|---|---|---|
| 18 | Pickup ที่ไม่มี `VRCObjectSync` | หยิบเอง แล้วใช้ `Grab` ในฐานะ Bob ด้วย | ขยับเฉพาะบน client ของคนที่ถือ ลองเทียบกับ pickup ที่มี ObjectSync |

## การทำงานกับ PlayerObject

ใช้ `VRCPlayerObject` เมื่อข้อมูลเป็นของผู้เล่นคนเดียว เช่น คะแนนหรือการตั้งค่า

- หาสำเนาของผู้เล่นด้วย `Networking.FindComponentInPlayerObjects(player, templateComponent)`
- ห้ามเรียก `SetOwner` กับ PlayerObject เพราะเจ้าของคือผู้เล่นคนนั้นตลอดไป
- ถ้าต้องการเปลี่ยนข้อมูลของผู้เล่นคนอื่น ให้ส่ง event แบบ `Owner` ไปที่สำเนาของคนนั้น

sample `NetSimTestPlayerCard` และ `NetSimTestLeaderboard` แสดงรูปแบบนี้

## การรายงานผล

เมื่อบอกว่าโค้ด networking ใช้ได้ ให้ระบุหมายเลขสถานการณ์ที่รันและ preset ที่ใช้ พร้อมบรรทัด log `[ClientSimNet]` ที่เกี่ยวข้อง ข้อที่เหลือให้ระบุว่า**ยังไม่ได้ทดสอบ**

ตัวจำลองไม่ใช่ VRChat ให้ดู[ข้อจำกัดที่ทราบ](./usage.md#known-limits) และทดสอบใน client จริงก่อนเผยแพร่
