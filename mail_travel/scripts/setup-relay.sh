#!/usr/bin/env bash
# Postfix'ni tashqi SMTP relay (smarthost) orqali yuborishga sozlaydi.
# PTR berolmagan serverlar uchun: chiquvchi xat relay IP'lari orqali ketadi
# (ularda PTR + reputatsiya bor). DKIM imzomiz relay orqali ham saqlanadi.
#
# .env da kerak: RELAY_HOST, RELAY_PORT, RELAY_USER, RELAY_PASS
# Foydalanish: sudo ./scripts/setup-relay.sh
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[ "$(id -u)" -eq 0 ] || { echo "Xato: root sifatida ishga tushiring (sudo)"; exit 1; }
[ -f "$HERE/.env" ] || { echo "Xato: $HERE/.env topilmadi"; exit 1; }
set -a; . "$HERE/.env"; set +a
: "${RELAY_HOST:?RELAY_HOST .env da berilmagan}"
: "${RELAY_PORT:?RELAY_PORT .env da berilmagan}"
: "${RELAY_USER:?RELAY_USER .env da berilmagan}"
: "${RELAY_PASS:?RELAY_PASS .env da berilmagan}"

echo "==> SASL parol fayli yaratilmoqda..."
echo "[${RELAY_HOST}]:${RELAY_PORT} ${RELAY_USER}:${RELAY_PASS}" > /etc/postfix/sasl_passwd
chmod 600 /etc/postfix/sasl_passwd
postmap /etc/postfix/sasl_passwd

echo "==> Postfix relay parametrlari..."
postconf -e "relayhost = [${RELAY_HOST}]:${RELAY_PORT}"
postconf -e "smtp_sasl_auth_enable = yes"
postconf -e "smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd"
postconf -e "smtp_sasl_security_options = noanonymous"
postconf -e "smtp_sasl_tls_security_options = noanonymous"
postconf -e "smtp_tls_security_level = encrypt"

echo "==> Postfix qayta yuklanmoqda..."
systemctl reload postfix

echo ""
echo "Tayyor. Endi chiquvchi xatlar ${RELAY_HOST} orqali ketadi."
echo "Test: node $HERE/scripts/test-send.mjs ozingiz@gmail.com"
