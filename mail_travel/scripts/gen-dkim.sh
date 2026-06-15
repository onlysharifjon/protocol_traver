#!/usr/bin/env bash
# DKIM kalitini yaratadi va OpenDKIM jadvallarini sozlaydi.
# Foydalanish: sudo ./scripts/gen-dkim.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[ -f "$HERE/.env" ] || { echo "Xato: $HERE/.env topilmadi (.env.example dan nusxa oling)"; exit 1; }
set -a; . "$HERE/.env"; set +a

KEYDIR="/etc/opendkim/keys/${MAIL_DOMAIN}"
mkdir -p "$KEYDIR"

if [ -f "$KEYDIR/${DKIM_SELECTOR}.private" ]; then
  echo "DKIM kaliti allaqachon mavjud: $KEYDIR/${DKIM_SELECTOR}.private"
else
  echo "DKIM kaliti yaratilmoqda (${DKIM_SELECTOR} for ${MAIL_DOMAIN})..."
  opendkim-genkey -b 2048 -d "$MAIL_DOMAIN" -s "$DKIM_SELECTOR" -D "$KEYDIR"
  chown -R opendkim:opendkim /etc/opendkim/keys
  chmod 600 "$KEYDIR/${DKIM_SELECTOR}.private"
fi

# KeyTable va SigningTable
echo "${DKIM_SELECTOR}._domainkey.${MAIL_DOMAIN} ${MAIL_DOMAIN}:${DKIM_SELECTOR}:${KEYDIR}/${DKIM_SELECTOR}.private" > /etc/opendkim/KeyTable
echo "*@${MAIL_DOMAIN} ${DKIM_SELECTOR}._domainkey.${MAIL_DOMAIN}" > /etc/opendkim/SigningTable

echo ""
echo "Tayyor. DNS uchun DKIM yozuvi (show-dns.sh ham ko'rsatadi):"
echo "----------------------------------------------------------"
cat "$KEYDIR/${DKIM_SELECTOR}.txt"
