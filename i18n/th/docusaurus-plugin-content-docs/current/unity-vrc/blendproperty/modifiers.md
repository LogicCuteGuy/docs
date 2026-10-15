---
sidebar_position: 2
---

# Modifier และข้อจำกัด

> เวอร์ชันเอกสาร: **0.1.1**

[สร้าง stack](./intro.md) ก่อน Modifier ทำงานตาม **ลำดับ component** เปลี่ยนลำดับแล้วผลเปลี่ยน

| Group | Modifiers |
|---|---|
| **Generate** | Array, Bevel, Boolean, Decimate, Mirror, Remesh, Screw, Solidify, Subdivision Surface, Triangulate, Weld, Wireframe |
| **Deform** | Cast, Curve, Displace, Hook, Laplacian Smooth, Lattice, Shrinkwrap, Simple Deform, Smooth, Warp, Wave |
| **Edit** | UV Project, UV Warp |
| **Normals** | Smooth by Angle, Weighted Normal, Normal Edit |

## เลือก modifier

- **Array**: Line / Circle / Curve / Transform พร้อม copy rotation/scale, randomization และ merge
- **Bevel**: edge/vertex cut, width mode, angle limit, segment/profile โดย vertex mode เป็น flat cut และไม่ใช้ Segments
- **Boolean**: Intersect / Union / Difference ใช้ object หรือ mesh ใต้ collection object ต้องซ่อน MeshRenderer ของ cutter เอง
- **Simple Deform**: Twist / Bend / Taper / Stretch ส่วน **Wave** ที่ Runtime Off bake ที่ time คงที่ หากต้องการเคลื่อนไหวใช้[วิธี runtime](./runtime.md)
- **Remesh**: Blocks / Smooth / Sharp / Voxel ส่วนที่บางกว่า voxel อาจหายไป

ดู option ทั้งหมดใน[README ที่ตรึงเวอร์ชัน](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.1.1/README.md)

## ตั้งค่า Lattice

1. เพิ่ม **Blend Property > Modifiers > Lattice Object** ใน GameObject ว่าง
2. ย้าย/scale ให้ cage ครอบ mesh และตั้ง **Resolution U / V / W** (เริ่มต้น 2 × 2 × 2)
3. เพิ่ม **Deform > Lattice** ที่ mesh แล้วกำหนด cage
4. เลือก cage แล้วลาก point ใน Scene view ใช้ **Reset Points** เพื่อคืนตำแหน่ง

Lattice ใช้ trilinear interpolation ส่วน Boolean / Hook / Lattice / Curve / Shrinkwrap / Warp และ Mirror / Array / Screw ที่ใช้ object จะอ่าน transform อื่น การย้าย dependency ทำให้ Editor stack rebuild ใช้ **Reset Hook** ใน ⋮ เพื่อ bind Hook ใหม่

## หน่วยและแกน

ระยะใช้เมตรใน scene: Bevel width `0.02` คือ 2 cm แม้ imported mesh มี scale ค่าเปอร์เซ็นต์, factor, มุมและ UV ไม่ใช่ระยะ Object ที่ scale ไม่เท่ากันใช้ค่าเฉลี่ยสามแกนสำหรับระยะทั่วไป แต่ offset ใช้ scale แยกแกน

Unity เป็น **Y-up / Z-forward** Operation ที่ Blender ใช้ Z-up เป็นค่าเริ่มต้น เช่น circle Array / Wave / Cylinder Cast / Simple Deform / Screw จะใช้ Y ที่นี่ ส่วน GPU Wave shader ใช้หน่วย mesh-local

## ข้อจำกัด

- ใช้ MeshFilter เท่านั้น ไม่รองรับ skinned mesh, bone, blend shape หรือ vertex group
- ไม่รองรับ crease/bevel weight/face strength, Boolean Exact/Self Intersection, Solidify Complex, Decimate Symmetry, Shrinkwrap Target Normal Project และ Remesh Adaptivity
- Boolean ใช้ BSP CSG ต้องเป็น closed mesh ช้าหากเกินไม่กี่พัน face และอาจเหลือ T-junction บนขอบ cut
- Bevel corner ใช้ triangle fan ไม่ใช่ patch grid ของ Blender
- Decimate ใช้ greedy QEM และ Un-Subdivide เปลี่ยนเฉพาะ all-quad mesh ที่มาจาก subdivision
- Shrinkwrap ตรวจ triangle ของ target จึงช้าเมื่อ target ใหญ่ UV Project ใช้ orthographic projector เดียว
- Remesh ใช้ inside/outside grid ไม่ใช่ distance field และจำกัด 192 voxel ต่อแกน
- Hook กระทบ vertex ทั้งหมดในรัศมี ไม่ใช้ vertex group

Editor rebuild เฉพาะส่วนที่เปลี่ยน หากเกิน 80 ms จะรอปล่อย mouse นี่เป็นกฎตอบสนองของ Editor ไม่ใช่ runtime frame budget

## Array, Splines และ live modifier ใน 0.1.1

**Array Curve** และ **Curve** ตาม Transform หรือ Unity Splines `SplineContainer` ที่ติดตั้งเสริมได้ **Split Copies** สร้าง child `Array Copy N` ที่แชร์ final mesh และใช้ modifier หลังจากนั้นแยกแต่ละ copy ส่วน **Collider Per Copy** เพิ่ม child BoxCollider ให้ compound Rigidbody เป็นคนละ workflow กับ runtime Array example ที่ไม่สร้าง collider

Wave / Simple Deform / Lattice / Hook / Warp มี **Runtime > Off / GPU** ให้ย้าย GPU ไว้ท้าย stack จำกัดแปด operation, Lattice หนึ่งตัว และ 512 point Wave Along Normals / Warp Preserve Volume ยังไม่ live ใช้[การแปลง runtime](./runtime.md) แทนการเพิ่ม component Wave/SimpleDeform/Lattice แยกแบบเดิม

[คู่มือ modifier พร้อมภาพ](https://github.com/LogicCuteGuy/BlendProperty/blob/v0.1.1/Documentation~/IllustratedModifiers.md) มี setting และ before/after
