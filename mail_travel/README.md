# mail_travel — Protocol DMC pochta serveri

`@protocoldmc.com` domeni uchun **to'liq pochta serveri**: xat **qabul qiladi**
va **yuboradi**. Stack:

| Komponent | Vazifasi |
|-----------|----------|
| **Postfix** | MTA — SMTP (25), submission (587), SMTPS (465) |
| **Dovecot** | IMAP (993), LMTP yetkazish, Postfix uchun SASL auth |
| **OpenDKIM** | Chiquvchi xatlarni DKIM bilan imzolash |
| **Nodemailer** | Next.js sayti shu server orqali xat yuboradi |

Pochta `maildir` formatida `VMAIL_DIR` ostida saqlanadi, foydalanuvchilar
**virtual** (tizim hisoblariga bog'lanmagan) — `dovecot.users` faylida.

---

## Talablar (o'rnatishdan oldin)

Bu narsalarni **siz** ta'minlashingiz kerak — kod hal qila olmaydi:

1. **DNS boshqaruvi** — `protocoldmc.com` DNS paneliga kirish.
2. **Statik tashqi IP** + **PTR (reverse DNS)** `mail.protocoldmc.com` ga
   yo'naltirilgan (VDS provayder paneli orqali).
3. **25-port ochiq** — ko'p provayderlar uni bloklaydi. Tashqariga xat
   ketishi uchun provayderdan ochishni so'rang.
4. **TLS sertifikat** — `mail.protocoldmc.com` uchun:
   ```bash
   sudo apt install certbot
   sudo certbot certonly --standalone -d mail.protocoldmc.com
   ```

---

## O'rnatish (qadamlar)

```bash
cd mail_travel
cp .env.example .env
nano .env                      # MAIL_DOMAIN, MAIL_HOSTNAME, SMTP_PASS ni to'ldiring
```

1. **DNS A yozuvi** — avval `mail.protocoldmc.com → IP` ni qo'shing (sertifikat
   uchun ham kerak).
2. **TLS sertifikat** oling (yuqoridagi certbot buyrug'i).
3. **O'rnatuvchini** ishga tushiring (root kerak, tizim configini o'zgartiradi):
   ```bash
   sudo ./setup.sh
   ```
   Bu: paketlarni o'rnatadi, Postfix/Dovecot/OpenDKIM ni sozlaydi, DKIM kalitini
   yaratadi va `.env` dagi `SMTP_USER` mailboxini ochadi.
4. **DNS yozuvlarini** sozlang — skript chiqargan yozuvlarni domen paneliga
   qo'shing (istalgan vaqt qayta ko'rish: `./scripts/show-dns.sh`):
   - `A` → `mail.protocoldmc.com`
   - `MX` → `mail.protocoldmc.com`
   - `TXT` SPF, `TXT` DMARC, `TXT` DKIM
   - `PTR` (provayder paneli orqali)

---

## Mailbox boshqaruvi

```bash
# Yangi qutilar (parol bermasangiz — tasodifiy yaratiladi)
sudo ./scripts/add-mailbox.sh info                     # info@protocoldmc.com
sudo ./scripts/add-mailbox.sh admin Parol123!
sudo ./scripts/add-mailbox.sh no-reply Parol123!
```

**Pochta mijozi sozlamasi** (Outlook / Thunderbird / telefon):

| | Server | Port | Xavfsizlik |
|--|--------|------|-----------|
| IMAP | `mail.protocoldmc.com` | 993 | SSL/TLS |
| SMTP | `mail.protocoldmc.com` | 587 | STARTTLS |

Login = to'liq manzil (`user@protocoldmc.com`).

---

## Saytdan xat yuborish (Nodemailer)

Loyihaning asosiy `.env.local` fayliga qo'shing:

```env
SMTP_HOST=mail.protocoldmc.com
SMTP_PORT=587
SMTP_USER=no-reply@protocoldmc.com
SMTP_PASS=...               # add-mailbox bergan parol
MAIL_FROM="Protocol DMC <no-reply@protocoldmc.com>"
```

Keyin kodda `lib/mailer.ts` dan foydalaning:

```ts
import { sendMail } from "@/lib/mailer";

await sendMail({
  to: "mijoz@example.com",
  subject: "Buyurtmangiz qabul qilindi",
  html: "<p>Rahmat! Tez orada bog'lanamiz.</p>",
});
```

Masalan kontakt forma server action / route handler ichida chaqiriladi.

**Test:**
```bash
node mail_travel/scripts/test-send.mjs ozingiz@gmail.com
```

---

## Diagnostika

```bash
sudo tail -f /var/log/mail.log          # barcha pochta loglari
sudo postfix status && sudo doveadm reload
sudo systemctl status postfix dovecot opendkim
echo test | mail -s salom ozingiz@gmail.com   # serverdan test
```

Yetkazib berishni tekshirish: <https://www.mail-tester.com> ga test xat yuboring
(SPF/DKIM/DMARC ballarini ko'rsatadi).

### Tez-tez uchraydigan muammolar
- **Tashqariga xat ketmayapti** → 25-port bloklangan (provayderga murojaat).
- **Xatlar spamga tushyapti** → PTR yo'q yoki SPF/DKIM/DMARC noto'g'ri.
- **Dovecot ishga tushmayapti** → TLS sertifikat yo'li (`TLS_CERT/TLS_KEY`) xato.

---

## Chiquvchi SMTP relay (Brevo) — PTR yo'q bo'lsa

Provayder PTR (reverse DNS) bermasa, Gmail to'g'ridan-to'g'ri yuborishni rad
etadi (`5.7.25`). Yechim — chiquvchi xatni tashqi SMTP relay orqali yuborish:

```bash
# .env ga RELAY_HOST/PORT/USER/PASS yozing (masalan Brevo: smtp-relay.brevo.com:587)
sudo ./scripts/setup-relay.sh
```

Postfix barcha chiquvchi xatni relay orqali yuboradi; relay IP'larida PTR +
reputatsiya bor. Bizning DKIM imzomiz relay orqali ham saqlanadi (DMARC o'tadi).
Qabul qilish o'zgarmaydi — kiruvchi xat baribir o'z serverimizga keladi.

> Brevo: yangi akkaunt notanish IP'ni bloklaydi (`525 5.7.1`) — server IP'sini
> Brevo → Security → Authorized IPs ga qo'shing.

## Webmail (Roundcube) — `https://mail.protocoldmc.com`

Brauzerdan xat o'qish/yozish. O'rnatilgan: `/var/www/roundcube` (1.7,
docroot = `public_html`), SQLite DB `/var/lib/roundcube/roundcube.db`, PHP 8.2-FPM.
nginx vhost va namuna config repo'da: `config/nginx/`, `config/roundcube/`.

## Papka tuzilishi

```
mail_travel/
├── README.md
├── .env.example          # sozlamalar namunasi (.env — maxfiy, gitignore)
├── setup.sh              # asosiy o'rnatuvchi (root)
├── config/
│   ├── postfix/          # main.cf, master.cf qo'shimchasi
│   ├── dovecot/          # dovecot.conf shabloni
│   ├── opendkim/         # opendkim.conf, TrustedHosts
│   ├── nginx/            # webmail vhost (mail.protocoldmc.com)
│   └── roundcube/        # config.inc.php.example
└── scripts/
    ├── gen-dkim.sh       # DKIM kaliti yaratish
    ├── add-mailbox.sh    # yangi pochta qutisi
    ├── show-dns.sh       # kerakli DNS yozuvlari
    ├── setup-relay.sh    # Postfix'ni SMTP relay'ga ulash
    └── test-send.mjs     # test xat (Nodemailer)
```

> Saytdagi yuborish integratsiyasi: loyiha ildizidagi `lib/mailer.ts`.
