---
sidebar_position: 7
---

# วิธีทำงาน

> เวอร์ชันเอกสาร: **0.6.1**

## Grid และ compression

Zone sample terrain เป็น quantized signed-distance field หนึ่ง sample คือหนึ่ง byte: 128 คือ surface, ค่าน้อยกว่าคือ solid, มากกว่าคือ air Grid และ paint ใช้ run-length compression โดยทั่วไปเหลือราว 2–5% ของ raw size

VRChat runtime เก็บ compressed data และ offset ต่อ chunk แล้ว decode เฉพาะ chunk ที่ได้รับ edit เป็น `(chunkCells + 2)³` sample Reset เพียงทิ้ง decoded chunk และคืน Bake mesh จึงทำงานทันที

## Edit และ mesh

หนึ่ง edit pack position, radius, operation และ layer ลงใน `long` Dig/Add/Paint เป็น idempotent `DigBrush` แก้ sample และ `SurfaceNets` สร้าง mesh ให้ dirty chunk Chunk เก็บ sample ข้างเคียงเป็น border หนึ่ง voxel เพื่อให้ seam ตรงกัน

เฉพาะ chunk ที่มี surface เท่านั้นที่มี GameObject, mesh และ collider เมื่อเกิด surface ใหม่ตอน runtime ระบบจะคัดลอก Chunk Template

## Shading และ lighting

Standard shader ใช้ terrain splat/normal สูงสุด 16 layer ส่วน DigTerrain Lite สำหรับ Quest ใช้สูงสุด 8 แต่ละ chunk เก็บ painted terrain layer ได้สูงสุด 4 พร้อม dug soil

เมื่อเปิด Baked Lighting chunk จะมี lightmap UV และ static flag Chunk ที่ remesh ตอน runtime เปลี่ยนไปใช้ light probe และ Reset จะคืน lightmap index กับ scale/offset เดิม

## Tree และ detail

`DigFoliageBaker` ย้าย tree ใน terrain hole เข้า `DigZoneData` และรวม detail instance เป็น mesh ต่อ chunk column แต่ละ instance มี surface anchor Runtime ตรวจ signed-distance field รอบ anchor; หาก surface ถูกขุดออกหรือฝัง ระบบจะปิด tree และซ่อน detail ผ่าน RGBA foliage mask การ Reset จะคืน mask และ object state ตอน Bake

## Network

ผู้ขุด apply edit แบบ local prediction แล้ว owner กำหนด sequence number และ broadcast ทุก client apply ตามลำดับและ buffer edit ที่มาถึงก่อน Late joiner รับ full log จาก owner แล้ว replay แบบแบ่งเฟรม Reset เริ่ม epoch ใหม่และล้าง log
