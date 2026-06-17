#!/usr/bin/env bash
# protocoldmc.com uchun kerakli barcha DNS yozuvlarini ko'rsatadi.
# Foydalanish: ./scripts/show-dns.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[ -f "$HERE/.env" ] || { echo "Xato: $HERE/.env topilmadi"; exit 1; }
set -a; . "$HERE/.env"; set +a

# Server tashqi IP manzili
IP4="$(curl -s4 https://ifconfig.me 2>/dev/null || echo 'SERVER_IP')"

cat <<EOF
============================================================
 ${MAIL_DOMAIN} uchun DNS yozuvlari
 (domen DNS panelida qo'shing)
============================================================

1) A — pochta hostini IP ga bog'lash
   ${MAIL_HOSTNAME}.   A   ${IP4}

2) MX — pochtani qabul qilish
   ${MAIL_DOMAIN}.   MX   10   ${MAIL_HOSTNAME}.

3) SPF — kim yuborishi mumkinligi (TXT)
   # Chiquvchi xatlar Brevo relay orqali ketadi, shuning uchun Brevo IP'lari
   # ham ruxsat etilishi shart: include:spf.brevo.com
   ${MAIL_DOMAIN}.   TXT   "v=spf1 mx a:${MAIL_HOSTNAME} include:spf.brevo.com -all"

4) DMARC — siyosat (TXT)
   # Relay (Brevo) orqali yuborishda relaxed alignment (r) xavfsizroq —
   # DKIM yoki SPF'dan biri mos kelsa yetarli.
   _dmarc.${MAIL_DOMAIN}.   TXT   "v=DMARC1; p=quarantine; rua=mailto:postmaster@${MAIL_DOMAIN}; adkim=r; aspf=r"

5) DKIM — imzo kaliti (TXT)
EOF

DKIM_TXT="/etc/opendkim/keys/${MAIL_DOMAIN}/${DKIM_SELECTOR}.txt"
if [ -f "$DKIM_TXT" ]; then
  echo "   ${DKIM_SELECTOR}._domainkey.${MAIL_DOMAIN}. ->"
  cat "$DKIM_TXT"
else
  echo "   (DKIM kaliti hali yaratilmagan — avval gen-dkim.sh ni ishga tushiring)"
fi

cat <<EOF

6) PTR (reverse DNS) — MUHIM, ko'p serverlar buni talab qiladi.
   IP ${IP4} -> ${MAIL_HOSTNAME}
   Buni hosting/VDS provayder paneli orqali sozlaysiz (DNS panelda emas).

============================================================
 Eslatma: ko'p provayderlar 25-portni (SMTP) bloklaydi.
 Tashqariga xat ketmasa, provayderdan 25-portni ochishni so'rang.
============================================================
EOF
