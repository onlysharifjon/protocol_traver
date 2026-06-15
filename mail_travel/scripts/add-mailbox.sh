#!/usr/bin/env bash
# Yangi virtual mailbox (pochta qutisi) yaratadi.
# Foydalanish: sudo ./scripts/add-mailbox.sh user[@domen] [parol]
#   Parol berilmasa, tasodifiy parol yaratiladi va ekranga chiqariladi.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
[ -f "$HERE/.env" ] || { echo "Xato: $HERE/.env topilmadi"; exit 1; }
set -a; . "$HERE/.env"; set +a

ADDR="${1:-}"
[ -n "$ADDR" ] || { echo "Foydalanish: $0 user[@${MAIL_DOMAIN}] [parol]"; exit 1; }
# Domen qo'shilmagan bo'lsa, asosiy domenni qo'shamiz
[[ "$ADDR" == *@* ]] || ADDR="${ADDR}@${MAIL_DOMAIN}"
LOCAL="${ADDR%@*}"
DOMAIN="${ADDR#*@}"

PASS="${2:-$(openssl rand -base64 18)}"
USERS_FILE="/etc/dovecot/users"
MAILBOX_MAP="/etc/postfix/vmail_mailbox"

mkdir -p "$VMAIL_DIR"
touch "$USERS_FILE"
# Dovecot auth jarayoni (dovecot guruhi) o'qiy olishi uchun
chown root:dovecot "$USERS_FILE" 2>/dev/null || true
chmod 640 "$USERS_FILE"

# Allaqachon bormi?
if grep -q "^${ADDR}:" "$USERS_FILE" 2>/dev/null; then
  echo "Xato: ${ADDR} allaqachon mavjud. Parolni o'zgartirish uchun avval o'chiring."
  exit 1
fi

# Dovecot passwd-file yozuvi (ARGON2ID hash)
HASH="$(doveadm pw -s ARGON2ID -p "$PASS")"
echo "${ADDR}:${HASH}::::" >> "$USERS_FILE"

# Postfix mailbox map
touch "$MAILBOX_MAP"
grep -q "^${ADDR}" "$MAILBOX_MAP" 2>/dev/null || echo "${ADDR} ${DOMAIN}/${LOCAL}/" >> "$MAILBOX_MAP"
postmap "$MAILBOX_MAP"

# Maildir tayyorlash
install -d -o vmail -g vmail "${VMAIL_DIR}/${DOMAIN}/${LOCAL}/Maildir"

systemctl reload postfix dovecot 2>/dev/null || true

echo "Mailbox yaratildi:"
echo "  Manzil: ${ADDR}"
echo "  Parol:  ${PASS}"
echo ""
echo "IMAP: ${MAIL_HOSTNAME}:993 (SSL)  |  SMTP: ${MAIL_HOSTNAME}:587 (STARTTLS)"
echo "Login = to'liq manzil (${ADDR})"
