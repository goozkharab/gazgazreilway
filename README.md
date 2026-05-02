# وضعیت فعلی

هنوز در مرحله تست گازگاز هستیم  
باید sni تمیز پیدا بشه.

---

## متغیرهای محیطی (Environment Variables)

یادتون باشه environment variable مقادیر زیر بزارین:

| Key | Value |
| --- | --- |
| `DATA_SOURCE_ENDPOINT` | `https://your_domain:port` |

---

## بررسی وضعیت دیپلوی

اگه میخواین ببینین که این کد به درستی دیپلوی شده یا نه کافیه آدرس زیر رو بزنید:
https://your_deployed_domain.up.railway.app/status


> این مورد آخری رو هم حواستون باشه»

---

## دریافت دامنه اختصاصی (Public Domain)

Railway به صورت خودکار دامنه نمی‌سازه. برای گرفتن لینک:

1. به تب **Settings** برید.
2. در بخش **Networking**، روی دکمه **Generate Domain** کلیک کنید.
3. یک آدرس شبیه به `project-production.up.railway.app` به شما میده.

---

> ***این کد توسط هوش مصنوعی نوشته شده پس ممکنه باگ داشته باشه، ولی توسط خودم تست شده و مشکلی نداشته.***
