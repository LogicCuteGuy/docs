---
sidebar_position: 3
---

# API ของ WasmGpuRunner

`WasmGpuRunner` รันฟังก์ชันที่ export จาก `.wasm` หนึ่งไฟล์ หนึ่งพิกเซลของ render texture คือการเรียกฟังก์ชันปัจจุบันหนึ่งครั้ง namespace คือ `LogicCuteGuy.Wasm2Hlsl` เมื่อลาก `.wasm` เข้าฉาก จะได้ runner ที่ตั้งค่าแล้ว

## ฟิลด์ที่คุณตั้งค่า

| ฟิลด์ | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| `callbackTarget` | ไม่มี | behaviour ที่รับ event เมื่อผลพร้อม |
| `callbackEvent` | `OnWasmComplete` | ชื่อ event |
| `readback` | true | คัดลอกผลกลับมาที่ CPU ปิดได้ถ้ามีแค่ material ที่อ่าน `target` |
| `bands` | 1 | แบ่ง texture เป็นแถบแนวนอน |
| `band` | 0 | แถบที่ `Run()` ครั้งถัดไปจะคำนวณ (ซ่อนใน Inspector) |

`wasmMaterial` และ `target` เป็นของฟังก์ชันปัจจุบัน `SetFunction` จะเปลี่ยนทั้งคู่

## เมธอด

| เมธอด | ทำอะไร |
|---|---|
| `SetFunction(name)` | เลือกฟังก์ชันที่ `Run()` จะเรียก ถ้าไม่มี export ชื่อนั้นจะ return false และ log error |
| `SetFunctionIndex(i)` | เลือกด้วย index ถ้าเกินช่วงจะไม่ทำอะไร |
| `FunctionIndex(name)` | index ของ export หรือ -1 |
| `FunctionName()` | ชื่อฟังก์ชันปัจจุบัน |
| `SetNamedArgInt(name, value)`, `SetNamedArgFloat(name, value)` | ตั้งอาร์กิวเมนต์ด้วยชื่อจาก source ถ้าไม่มีชื่อนั้นจะ log error |
| `SetArgInt(index, value)`, `SetArgFloat(index, value)` | ตั้งด้วย index ของพารามิเตอร์ wasm พารามิเตอร์ 0 คือ index ของพิกเซลเมื่อเป็น `i32` ถ้าเกินช่วงจะไม่ทำอะไร |
| `ArgIndex(name)` | index ของอาร์กิวเมนต์ หรือ -1 |
| `SetInput(int[] words)` | อัปโหลดข้อมูลที่ `env.input(i)` อ่าน และคงค่าไว้ใช้ในการรันครั้งต่อไป |
| `Run()` | รันฟังก์ชันปัจจุบัน ไม่ทำอะไรขณะ `busy` |
| `RunFunction(name)` | `SetFunction` แล้ว `Run()` ไม่ทำอะไรขณะ `busy` |
| `GetResultFloat(i)` | ผลลำดับ `i` เป็น float |
| `BitsToFloat(bits)` (static) | อ่านบิตของ `int` เป็น float |

## ผลลัพธ์

| ฟิลด์ | เนื้อหา |
|---|---|
| `resultLo`, `resultHi` | ผลแบบจำนวนเต็ม `resultHi` เก็บ 32 บิตบนของ `i64` |
| `resultFloat` | ผลของฟังก์ชัน `f32` และ `f64` ซึ่งจะไม่ตั้ง `resultLo` |
| `resultIsFloat` | เป็น true เมื่อฟังก์ชันปัจจุบันคืน float |
| `resultFunction` | ฟังก์ชันที่ให้ผลชุดนี้ |
| `trapped` | มีการเรียกบางครั้ง trap ต้องเปิด **Trap Check** |
| `busy` | มีการรันที่กำลังรอ readback |

ถ้า callback เดียวรับผลจากหลายฟังก์ชัน ให้ตรวจ `resultFunction`:

```csharp
public void OnWasmComplete()
{
    if (runner.resultFunction == "tone")
        Debug.Log(runner.resultFloat[0]);
}
```

## จังหวะการทำงาน

readback เป็นแบบ asynchronous `Run()` เริ่มงานบน GPU แล้ว return ทันที callback จะมาในเฟรมถัด ๆ ไป การเรียกขณะ `busy` จะ **ถูกทิ้ง ไม่ได้ต่อคิว** จึงควรสั่งรันครั้งถัดไปจากใน callback

ถ้า readback ล้มเหลว runner จะ log error และ **ไม่เรียก callback** ส่วน `busy` กลับเป็น false

ถ้าปิด `readback` ค่า `busy` จะกลับเป็น false ทันที และไม่มี callback

## กระจายงานหลายเฟรม

ฟังก์ชันหนัก ๆ อาจทำให้เฟรมค้าง ถ้า `bands` มากกว่า 1 แต่ละ `Run()` จะคำนวณเฉพาะแถบ `band` แถวอื่นยังเก็บพิกเซลเดิม bands ออกแบบมาสำหรับผลที่ material แสดง จึงควรใช้ร่วมกับการปิด `readback`

```csharp
int next;

void Update()
{
    runner.bands = 8;
    runner.band = next;
    next = (next + 1) % 8;
    runner.Run();
}
```

## หลายฟังก์ชัน

runner ตัวเดียวเก็บทุก export และแต่ละฟังก์ชันเก็บค่าอาร์กิวเมนต์ของตัวเอง แต่รันได้ทีละฟังก์ชัน ถ้าต้องการรันสองฟังก์ชันพร้อมกัน ให้ใช้ runner สองตัว

## Networking

runner ไม่ sync อะไรเลย ให้ sync ข้อมูลเข้า เช่น พารามิเตอร์หรือ seed ในสคริปต์ของคุณเอง แล้วให้ผู้เล่นแต่ละคนคำนวณผล ผล `f32` บน GPU อาจต่างกันในบิตท้าย ๆ ระหว่างอุปกรณ์ จึงไม่ควรตัดสินเรื่องที่ใช้ร่วมกันในเกมจากค่า `f32` ที่ต้องตรงกันเป๊ะ
