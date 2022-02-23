# Covid-Safe-ZoneApp
เป็นแอปพลิเคชันที่จะบอกว่าแต่ละพื้นที่ มีคนรับวัคซีนป้องกันโควิด-19 ไปแล้วเท่าไหร่ สามารถใช้ช่วยประกอบการตัดสินใจในการเดินทางได้ และยังมี Feature อื่นๆ ที่ช่วยให้ผู้ใช้สามารถรับรู้ข้อมูลของโควิด-19 ได้อีกด้วย เช่น สามารถดูยอดการติดเชื้อรายวัน รายจังหวัดได้ สามารถดูยอดการรับวัคซีนของทั้งประเทศ หรือของแต่ละจังหวัดได้ สามารถดูสถานที่ฉีดวัคซีนที่ใกล้ที่สุดได้ มี Heat Map เพื่อแสดงให้เห็นว่าแต่ละจังหวัด มีการฉีดวัคซีนไปแล้วกี่เปอร์เซ็นต์ต่อจำนวนประชากรของแต่ละจังหวัด โดยคำนวณจาก (จำนวนประชากรของแต่ละจังหวัด / จำนวนโดสที่ฉีดในจังหวัด) * 100 สูตรการอ้างอิงจากหมอพร้อม

## หลักการทำงานของระบบ
ผู้ใช้ต้องเปิด GPS เพื่อให้ทางแอปพลิเคชันสามารถบันทึกตำแหน่งพิกัดของผู้ใช้ลงบนแผนที่ได้ โดยจะให้ผู้ใช้กรอกข้อมูลการฉีดวัคซีนของตนเอง หลังจากที่ผู้ใช้กรอกข้อมูลเสร็จ ทางแอปพลิเคชันจะทำการบันทึกข้อมูลและตำแหน่งพิกัดของผู้ใช้ลงในฐานข้อมูล และดึงข้อมูลพิกัด กับข้อมูลการฉีดวัตซีนของผู้ใช้มาแสดงบนแผนที่ Safe-Zone เพื่อให้ผู้ใช้สามารถดูได้ว่ามีตำแหน่งใดบ้างบนแผนที่ที่มีคนฉีดวัคซีนโควิด-19 แล้ว

## Installation
```
1. Clone Project ลงเครื่อง
2. yarn install
3. expo start
4. เอาโทรศัพท์มาแสกน QR CODE ที่ได้จาก Expo แล้วรันในโทรศัพท์
```
* ภายในแอปพลิเคชันมีฟังก์ชันการแสกน QR CODE ต้องใช้โทรศัพท์จริงๆมาลองรันแอปพลิเคชัน
* แอปพลิเคชันสามารถทำงานได้ทั้งบน IOS และ Android แต่ใน IOS หน้าตาของ UI อาจจะไม่เสถียรเท่าฝั่ง Android
* ไม่รองรับการ Responsive หน้าตา UI อาจมีการผิดเพี้ยน

## Video Demo
วิดีโอสาธิตการใช้งานแอปพลิเคชัน : [COVID19 Safe Zone! App Presentation](https://youtu.be/ivoMWmO9CcI) เริ่ม Demo นาทีที่ 07:18

## Spec Doc

## Data Collection
ใช้ ``Firebase`` ในการเก็บข้อมูลของผู้ใช้
* Collection ``infoVaccineUser`` เก็บข้อมูลดังนี้

| Field Name | Description |
|------------|-------------|
| CertificateNo | Certificate Serial No. 10 หลัก ที่ได้รับจากเอกสารการฉีดวัคซีนของหมอพร้อม |
| CertificateCode | ได้จากการสแกน QR CODE ของหมอพร้อม |
| vaccineBrandFirstDose | วัคซีนเข็มที่ 1|
| vaccineBrandSecondDose | วัคซีนเข็มที่ 2 |
| vaccineBrandThirdDose | วัคซีนเข็มที่ 3 |
| vaccinationPlace | สถานที่ฉีดวัคซีน |
| quantity | จำนวนโดสของวัคซีนที่ผู้ใช้รับมา |
| name | ชื่อ - นามสกุล |
| gender | เพศ |
| age | อายุ |
| longitude | พิกัด longitude ของผู้ใช้ |
| latitude | พิกัด latitude ของผู้ใช้ |
