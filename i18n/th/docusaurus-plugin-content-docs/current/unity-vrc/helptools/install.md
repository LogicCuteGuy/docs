---
sidebar_position: 1
---

# การติดตั้ง

ในการติดตั้ง **LogicCuteGuy Help Tools** ลงในโปรเจกต์ Unity ของคุณ เราขอแนะนำให้ใช้ **VRChat Creator Companion (VCC)** วิธีนี้จะช่วยให้คุณมั่นใจได้ว่าจะมีเวอร์ชันล่าสุดอยู่เสมอ และการพึ่งพา (dependencies) ทั้งหมดจะถูกจัดการโดยอัตโนมัติ

## การติดตั้งอย่างรวดเร็ว (VCC)

หากคุณติดตั้ง VRChat Creator Companion อยู่แล้ว คุณสามารถคลิกปุ่มด้านล่างเพื่อเพิ่มคลังเครื่องมือของเราและติดตั้งแพ็กเกจด้วยการคลิกเพียงครั้งเดียว

<div style={{textAlign: 'center', padding: '2rem 0'}}>
  <a href="vcc://vpm/addRepo?url=https://raw.githubusercontent.com/LogicCuteGuy/LogicCuteGuy/refs/heads/main/vpm.json" className="button--vcc">
    <span>ติดตั้งผ่าน VCC</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
  </a>
</div>

---

## การติดตั้งด้วยตนเอง

1. เปิดโปรเจกต์ Unity ของคุณ
2. ไปที่ `Window` > `Package Manager`
3. คลิกปุ่ม `+` ที่มุมซ้ายบน
4. เลือก `Add package from git URL...`
5. วาง URL ต่อไปนี้:
   ```text
   https://github.com/LogicCuteGuy/com.logiccuteguy.helptools.git
   ```
6. คลิก **Add**

## ความต้องการของระบบ
- **Unity 2022.3.x** (แนะนำสำหรับ VRChat)
- **VRChat SDK 3.0** (ข้อกำหนดพื้นฐานสำหรับเครื่องมือส่วนใหญ่)
