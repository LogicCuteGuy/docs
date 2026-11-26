---
sidebar_position: 8
---

# Networking

> เวอร์ชันเอกสาร: **0.5.0** · [บันทึกประจำรุ่น](https://github.com/LogicCuteGuy/LCGUdonSharp/releases/tag/0.5.0)

LCGUdonSharp 0.5.0 ไม่มีโค้ด network แล้ว `[LCGPacket]`, `LCGNetworkZone`, `SendLCGNetworkEvent`, `ForceSendPacket` และ `LCGNetwork.RequestObjectSync` ไม่ได้เป็นส่วนหนึ่งของคอมไพเลอร์อีกต่อไป สำหรับ state และ event ที่ sync ให้ใช้ตัวแปร `[UdonSynced]` และเมธอด `[NetworkCallable]` ของ VRChat ซึ่งใช้กับคอมไพเลอร์นี้ได้

ระบบ packet network ย้ายไปเป็นแพ็กเกจแยก [LCG Network System](../lcgnetwork/intro) (รุ่น preview) ซึ่งใช้ได้กับ UdonSharp ของ SDK, Udon Graph, Udon Assembly และ LCGUdonSharp
