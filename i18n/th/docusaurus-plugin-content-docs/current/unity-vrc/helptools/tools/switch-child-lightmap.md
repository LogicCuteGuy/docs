---
sidebar_position: 2
---

# สลับโหมด Lightmap ของออบเจกต์ลูก (Switch Child Lightmap Mode)

**เมนู**: `คลิกขวาที่ MeshRenderer > LogicCuteGuy > Switch Child Lightmap Mode...`

ยูทิลิตี้นี้ช่วยให้สามารถเปลี่ยนแปลงกลยุทธ์การจัดแสงในระดับสูงได้อย่างรวดเร็ว คุณสามารถสลับลำดับขั้นขนาดใหญ่ไปมาระหว่างการใช้ Lightmap แบบ Bake หรือการใช้ Light Probe ได้ในทันที

## ฟีเจอร์

- **การสลับโหมด**: สลับระหว่าง `Lightmap` (แบบ Bake) และ `Light Probes` (แบบ Realtime/Probe Lit)
- **ระบบ Static Flag อัตโนมัติ**: เปิด/ปิด Static Flag `Contribute GI` บน GameObject โดยอัตโนมัติเพื่อให้สอดคล้องกับโหมดการจัดแสงที่เลือก
- **การควบคุมคุณสมบัติแบบรวมศูนย์**: ตั้งค่า `receiveGI` เป็น `Lightmaps` หรือ `LightProbes` และสลับการใช้งาน `lightProbeUsage`
- **การควบคุมสเกล Lightmap**: ตัวเลือกในการกำหนดค่า `Scale In Lightmap` ในระหว่างการสลับ (เช่น ตั้งเป็น 1.0 เมื่อใช้ Lightmap และตั้งเป็น 0.0 เมื่อใช้ระบบ Probe เพื่อประหยัดพื้นที่ Atlas)
- **การประมวลผลแบบลำดับขั้น**: ปรับใช้กับออบเจกต์ที่เลือกเท่านั้น หรือปรับใช้กับลูกหลานทั้งหมดแบบลำดับขั้น (รวมถึงออบเจกต์ที่ปิดใช้งานหากเลือกไว้)

## วิธีใช้งาน

1. คลิกขวาที่ **MeshRenderer** ใด ๆ ใน Hierarchy หรือเปิดจากเมนู **LogicCuteGuy**
2. เลือก **Lighting Mode** เป้าหมาย
3. (ไม่บังคับ) ติ๊กถูกที่ **Set Scale In Lightmap** เพื่อบังคับค่าความหนาแนนเฉพาะในขณะที่สลับ
4. คลิก **Apply To Target Or Selected**

> [!IMPORTANT]
> เครื่องมือนี้มีการแก้ไข `StaticEditorFlags` ตรวจสอบให้แน่ใจว่าคุณอยู่ในสถานะที่การแก้ไข Static Flag ปลอดภัยต่อโครงสร้างฉากของคุณ
