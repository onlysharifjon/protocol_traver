# DNS tuzatish — spamga tushish muammosi (protocoldmc.com)

**Sana:** 2026-06-17
**Sabab:** Chiquvchi xatlar **Brevo relay** orqali ketadi, lekin DNS'dagi SPF
yozuvi Brevo'ni ruxsat bermaydi → qabul qiluvchi serverlar SPF FAIL ko'radi →
spam.

**DNS qayerda:** Spaceship (`launch1/launch2.spaceship.net`).
Panel: https://www.spaceship.com → Domains → protocoldmc.com → DNS / Advanced DNS.

Server tarafida hammasi joyida (Postfix/Dovecot/OpenDKIM active, test xat
`status=sent`). Faqat quyidagi DNS yozuvlarini tuzatish kerak.

---

## 1) SPF — O'ZGARTIRISH (eng muhim)

Mavjud TXT yozuvni toping va almashtiring:

| Maydon | Qiymat |
|--------|--------|
| Type | `TXT` |
| Host/Name | `@` (yoki `protocoldmc.com`) |
| Value | `v=spf1 mx a:mail.protocoldmc.com include:spf.brevo.com -all` |

**Eski (xato):** `v=spf1 mx a:mail.protocoldmc.com -all`
**Yangi:** yuqoridagi — `include:spf.brevo.com` qo'shilgan.

> Eslatma: domen uchun faqat **bitta** SPF (`v=spf1...`) TXT yozuvi bo'lishi shart.
> Ikkita bo'lsa — ikkalasi ham buziladi.

---

## 2) DMARC — TAVSIYA (bir necha kundan keyin)

Hozir: `v=DMARC1; p=none; rua=mailto:postmaster@protocoldmc.com` — ishlaydi.
SPF tuzatilib, 3-5 kun muammosiz ketgach quyidagiga o'zgartiring:

| Maydon | Qiymat |
|--------|--------|
| Type | `TXT` |
| Host/Name | `_dmarc` |
| Value | `v=DMARC1; p=quarantine; rua=mailto:postmaster@protocoldmc.com; adkim=r; aspf=r` |

---

## 3) Allaqachon TO'G'RI (o'zgartirmang)

| Yozuv | Holat |
|-------|-------|
| `A` → mail.protocoldmc.com → 37.140.216.113 | ✅ |
| `MX` → 10 mail.protocoldmc.com | ✅ |
| DKIM (lokal) `mail._domainkey` | ✅ chop etilgan |
| DKIM (Brevo) `b1`/`b2.protocoldmc-com.dkim.brevo.com` | ✅ chop etilgan |

---

## 4) PTR (reverse DNS) — ixtiyoriy

`37.140.216.113 → mail.protocoldmc.com` PTR yo'q. Aynan shu sabab Brevo relay
ishlatilyapti (to'g'ri yechim). Agar kelajakda to'g'ridan-to'g'ri (relaysiz)
yuborishni xohlasangiz, VDS provayder panelidan PTR so'rang. Hozircha shart emas.

---

## Tekshirish (SPF o'zgargandan ~30 daqiqa keyin)

1. DNS tarqalganini tekshirish:
   ```bash
   dig +short TXT protocoldmc.com
   ```
   `include:spf.brevo.com` ko'rinishi kerak.

2. Haqiqiy ball: https://www.mail-tester.com — sahifadagi manzilga
   `info@protocoldmc.com` dan test xat yuboring, 10/10 ga intiling.

3. Yoki Gmail'ga yuborib, xatni oching → "Show original" → SPF/DKIM/DMARC
   uchunchalasi ham **PASS** bo'lishi kerak.
