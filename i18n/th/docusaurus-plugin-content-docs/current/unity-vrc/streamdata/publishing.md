---
sidebar_position: 3
---

# การเผยแพร่ข้อมูล stream

เปิด **Tools > StreamData > Publish** แล้วเลือกโฮสต์ repository GitHub Pages หนึ่งอันหรือเซิร์ฟเวอร์หนึ่งตัวเก็บได้ทุกโลก แยกโลกละโฟลเดอร์ **Base Url** คือ root ของเว็บ ต่อด้วยโฟลเดอร์ของโลก และ `/`

## หน้าต่าง Publish

| การตั้งค่า | ค่าเริ่มต้น | ความหมาย |
|---|---|---|
| **Repo** | | `owner/name` ของ repository สำหรับ Pages ต้องเป็น public ถ้าจะใช้ GitHub Pages ฟรี |
| **Branch** | `main` | branch ที่ GitHub Pages ให้บริการ |
| **Custom Domain** | ว่าง | ใช้เมื่อเว็บ Pages มีโดเมนของตัวเอง |
| **Host Url** | | ที่อยู่ `openworld-host` ของคุณ |
| **Deploy Token** | | token ของโฮสต์ เก็บไว้บน PC เครื่องนี้เท่านั้น |
| **World Folder** | ชื่อฉาก แทนช่องว่างด้วย `-` | โฟลเดอร์ของฉากนี้บนโฮสต์ |
| **Export Before Build** | เปิด | export ก่อน build ของ VRChat ทุกครั้ง |
| **Publish On Build** | เปิด | เผยแพร่ก่อน build ของ VRChat ทุกครั้ง |
| **Play Mode Uses Export~** | เปิด | Play mode อ่านไฟล์ในเครื่องผ่านเซิร์ฟเวอร์ทดสอบ |

การตั้งค่าบันทึกใน `ProjectSettings/StreamDataPublish.json` จึงแชร์กับทีมได้ ส่วน deploy token ไม่อยู่ในไฟล์นี้

ปุ่ม **Export** ตั้ง Base Url ให้ StreamData ทุกตัวในฉาก export แล้ว **บันทึกฉาก** ปุ่ม **Publish Now** อัปโหลดผล export ล่าสุด ถ้า URL ที่ bake ในโลกไม่ตรงกับการตั้งค่า publish ระบบจะให้ export ก่อน

## GitHub Pages

GitHub Pages (`*.github.io`) อยู่ในรายการ trusted URL ของ VRChat ผู้เล่นที่ใช้ค่าเริ่มต้นจึงใช้ได้

1. ติดตั้ง `git` และ GitHub CLI แล้ว sign in ครั้งเดียวด้วย `gh auth login` ปุ่ม **Check gh Login** แสดงสถานะ
2. กรอก **Repo** หรือกด **Select** ส่วน **Create Repo** จะสร้าง repository ใหม่แบบ **public**
3. กด **Enable Pages**
4. ตั้ง **World Folder**
5. กด **Publish Now** โดย Pages อาจใช้เวลาราวหนึ่งนาทีกว่าจะอัปเดต

| ชื่อ repository | root ของเว็บ |
|---|---|
| `owner/owner.github.io` | `https://owner.github.io/` |
| `owner/name` | `https://owner.github.io/name/` |

:::note
**Custom Domain** ไม่อยู่ในรายการ trusted URL ของ VRChat มีเฉพาะ `*.github.io`
:::

StreamData เก็บ clone ของ repository ไว้เองใน `Library/StreamDataPublish/` การ publish แต่ละครั้งคัดลอกผล export ไปยังโฟลเดอร์ของโลก เพิ่ม `files.txt` กับ `.nojekyll` แล้ว commit และ push ถ้าไม่มีอะไรเปลี่ยน ระบบจะแจ้งว่าโฟลเดอร์เป็นปัจจุบันแล้ว แต่ละไฟล์ต้องเล็กกว่าขีดจำกัด 100 MB ของ GitHub

## เผยแพร่อัตโนมัติตอน build

:::warning การเผยแพร่เป็นสาธารณะ และเป็นอัตโนมัติโดยค่าเริ่มต้น
ใครก็ดูไฟล์ใน Pages repository แบบ public ได้ เมื่อตั้งโฮสต์แล้ว การ build โลก VRChat ทุกครั้ง รวมถึง Build & Test จะ export และเผยแพร่ฉากที่เปิดใช้งานอยู่ ถ้าขั้นใดล้มเหลว การ build จะหยุด ถ้าต้องการเผยแพร่เอง ให้ปิด **Export Before Build** และ **Publish On Build**
:::

## เซิร์ฟเวอร์ของคุณเอง

[`openworld-host`](../openworld/server-tools.md) เป็นเซิร์ฟเวอร์ Rust ขนาดเล็ก source อยู่ในแพ็กเกจ OpenWorld ให้กรอก **Host Url** และ **Deploy Token** การ publish จะแพ็กผล export แล้วส่งไปที่เซิร์ฟเวอร์

ผู้เล่นต้องเปิด **Allow Untrusted URLs** สำหรับโดเมนของคุณ ถ้าอยากให้ผู้เล่นที่ใช้ค่าเริ่มต้นยังใช้ได้ ให้ใช้ GitHub Pages เป็น **Base Url** และเซิร์ฟเวอร์ของคุณเป็น **Backup Base Url** VRChat ไม่ตาม redirect URL จึงต้องชี้ตรงไปที่ไฟล์

## โฮสต์แบบ static อื่น ๆ

ปุ่ม **Package for Host** บน Inspector ของ StreamData เขียนไฟล์ zip ไว้ที่ `<scene>_StreamData/Package~/` ให้อัปโหลด **เนื้อหาข้างใน** ไปยัง Base Url ผู้เล่นไม่ได้ดาวน์โหลดตัว zip

| ไฟล์ที่เพิ่ม | หน้าที่ |
|---|---|
| `files.txt` | ชื่อ ขนาด และ MD5 ของแต่ละไฟล์ |
| `.nojekyll` | ให้ GitHub Pages ส่งไฟล์โดยไม่แปลง |
| `_headers` | กันไม่ให้ Cloudflare Pages และ Netlify cache ไฟล์ manifest |

ระบบจะไม่ยอมแพ็ก ถ้า Base Url ว่างหรือชี้ไปที่ localhost ถ้ายังไม่เคย export หรือถ้า Base Url เปลี่ยนหลัง export ครั้งล่าสุด

## อัปเดตโลกที่เผยแพร่แล้ว

ชื่อไฟล์มาจากเนื้อหา texture ที่เปลี่ยนจึงได้ไฟล์ใหม่ และไม่ทับไฟล์ที่โลกที่อัปโหลดไว้ยังอ่านอยู่ การ publish ไม่ลบไฟล์เก่า URL ถูก bake ไว้ในโลก หลังเพิ่มหรือเปลี่ยน texture จึงต้อง export, publish **และอัปโหลดโลกใหม่**
