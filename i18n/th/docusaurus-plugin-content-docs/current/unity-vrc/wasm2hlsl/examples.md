---
sidebar_position: 4
---

# ตัวอย่าง

ตัวอย่างอยู่ในโฟลเดอร์ `Example/` ของแพ็กเกจ โดยมี `Showcase.unity` เป็นฉากสาธิต แต่ละโฟลเดอร์มี source ภาษา Rust, `.wasm` ที่ build แล้ว, สคริปต์ UdonSharp และ README

| ตัวอย่าง | แสดงอะไร | เทคนิค |
|---|---|---|
| **Mandelbrot** | ภาพ fractal ที่ sync มุมมอง | palette 64 KB เป็นข้อมูลคงที่ |
| **Juno6** | synthesizer หลายเสียงที่เล่นได้ | render เสียง, MIDI, network event |
| **AudioDsp** | เอฟเฟกต์กรองเสียง | FIR filter บน GPU |
| **DeepZoom** | ซูม Mandelbrot ระดับลึก | `f64`, bands, ปิด readback |
| **SimdPlasma** | พลาสมาเคลื่อนไหว | SIMD `v128`, ปิด readback |
| **Chroma** | กรองเสียงสดตามสเกลดนตรี | ประมวลผลเสียงแบบ real-time |

DeepZoom และ SimdPlasma เพิ่มได้ด้วย **Tools > WASM2HLSL > Add f64 + SIMD Examples To Scene** แล้วบันทึกฉาก

## Mandelbrot

ภาพหลักและ Julia set ขนาดภาพละ 256 × 256 index ของมุมมองถูก sync และ **Interact** จะเปลี่ยนไปมุมมองถัดไป

## Juno6

synthesizer 12 เสียง เล่นโน้ต C2 ถึง C5 รับ MIDI ผ่าน `VRCMidiListener` (เปิด VRChat ด้วย `--midi=<device>`) ค่าบนแผงควบคุมถูก sync และส่งโน้ตเป็น network event

แต่ละคีย์ render เสียง stereo 32 kHz ยาว 3 วินาที ประมาณ 2.3 ล้านค่า ในเวลา 30 ถึง 90 ms โดยเล่นวินาทีที่ 0 ถึง 2 หนึ่งครั้ง แล้ววนวินาทีที่ 2 ถึง 3 เพราะแต่ละพิกเซลคำนวณแยกกัน จึงต้องสร้างสถานะ filter ใหม่ทุก sample ด้วยการรันซ้ำบน 256 sample ก่อนหน้า

## AudioDsp

ประมวลผล sweep 98,304 sample (texture 512 × 192) ด้วย FIR filter 65 tap ที่ cutoff เลื่อนจาก 200 Hz ถึง 8 kHz ทุก 2 วินาที **Interact** วนระหว่าง off, dry และ sweep ค่าที่เลือกถูก sync

## DeepZoom

ซูมขนาด 256 × 256 ด้วย `f64` ที่ขยายสองเท่าได้ 32 ครั้ง ถ้าใช้ `f32` จะเพี้ยนหลังประมาณ 17 ครั้ง เมื่อใช้ 8 band จะใช้เวลาประมาณ 3.5 ms ต่อเฟรม หรือประมาณ 27 ms ต่อภาพเต็ม

:::note
shader นี้ใช้เวลา compile ประมาณหนึ่งนาที
:::

ผลตรงกับ Node.js แสดงผลด้วย `WASM2HLSL/Int Display` ในโหมด **Iteration Palette**

## SimdPlasma

พลาสมาที่คำนวณด้วย SIMD แสดงในโหมด **Packed RGBA8** ใช้เวลา compile ไม่ถึงหนึ่งวินาที ค่าสีต่างจากค่าอ้างอิงไม่เกิน 1 ต่อไบต์

## Chroma

กรองเสียงสดให้เหลือโน้ตในสเกลดนตรี แผงควบคุมมี **Color** (0 ถึง 200), **Key**, **Scale** (5 ตัวเลือก), สวิตช์คุณภาพ (HQ latency 43 ms, LOW 21 ms) และ **Bypass** ใช้เวลา GPU ประมาณ 0.7 ms ต่อบล็อกเสียง และมี buffer 50 ถึง 80 ms

:::note
README ของ Chroma พูดถึงเมนู **Add Chroma Chain To Scene** เมนูนั้นอยู่ในโปรเจกต์ของผู้พัฒนาเอง และ **ไม่ได้อยู่ในแพ็กเกจ**
:::

## การ build ใหม่

ตัวอย่าง build ด้วย stack 1 KB (`-zstack-size=1024`) ดูคำสั่งใน README ของแต่ละโฟลเดอร์ และดู flag ทั่วไปได้ที่ [เริ่มต้นใช้งาน](./getting-started.md)

ตัวเลขเวลาในหน้านี้มาจาก README ของตัวอย่างในแพ็กเกจ GPU ของคุณจะให้ตัวเลขต่างออกไป
