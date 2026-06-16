#!/usr/bin/env bash
# ============================================================
# mail_travel — Protocol DMC to'liq pochta serveri o'rnatuvchisi
# Stack: Postfix (MTA) + Dovecot (IMAP/LMTP/SASL) + OpenDKIM
# ============================================================
# DIQQAT: bu skript tizim paketlarini o'rnatadi va /etc ostidagi
# pochta konfiguratsiyasini O'ZGARTIRADI. root huquqi kerak.
#
# Foydalanish:
#   sudo ./setup.sh           # tasdiq so'raydi
#   sudo ./setup.sh --yes     # tasdiqsiz
#
# Oldindan: .env tayyor bo'lsin, MAIL_HOSTNAME uchun DNS A yozuvi
# va Let's Encrypt sertifikati (TLS_CERT/TLS_KEY) mavjud bo'lsin.
# ------------------------------------------------------------
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

# --- root tekshiruvi ---
[ "$(id -u)" -eq 0 ] || { echo "Xato: root sifatida ishga tushiring (sudo ./setup.sh)"; exit 1; }

# --- .env ---
[ -f "$HERE/.env" ] || { echo "Xato: .env topilmadi. Bajaring: cp .env.example .env va to'ldiring."; exit 1; }
set -a; . "$HERE/.env"; set +a
: "${MAIL_DOMAIN:?MAIL_DOMAIN .env da berilmagan}"
: "${MAIL_HOSTNAME:?MAIL_HOSTNAME .env da berilmagan}"
: "${VMAIL_DIR:?VMAIL_DIR .env da berilmagan}"

# --- Tasdiq ---
if [ "${1:-}" != "--yes" ]; then
  echo "Quyidagilar o'rnatiladi/o'zgartiriladi:"
  echo "  Domen:     $MAIL_DOMAIN"
  echo "  Host:      $MAIL_HOSTNAME"
  echo "  Saqlash:   $VMAIL_DIR"
  echo "  Paketlar:  postfix dovecot-core dovecot-imapd dovecot-lmtpd opendkim opendkim-tools"
  read -r -p "Davom etamizmi? [y/N] " ans
  [ "$ans" = "y" ] || [ "$ans" = "Y" ] || { echo "Bekor qilindi."; exit 0; }
fi

echo "==> 1/8 Paketlar o'rnatilmoqda..."
export DEBIAN_FRONTEND=noninteractive
# postfix interaktiv savol bermasligi uchun oldindan javob
echo "postfix postfix/main_mailer_type select Internet Site" | debconf-set-selections
echo "postfix postfix/mailname string ${MAIL_HOSTNAME}" | debconf-set-selections
apt-get update -y
apt-get install -y postfix dovecot-core dovecot-imapd dovecot-lmtpd opendkim opendkim-tools

echo "==> 2/8 vmail foydalanuvchisi..."
getent group vmail >/dev/null || groupadd -g 5000 vmail
getent passwd vmail >/dev/null || useradd -u 5000 -g vmail -s /usr/sbin/nologin -d "$VMAIL_DIR" -M vmail
mkdir -p "$VMAIL_DIR"
chown -R vmail:vmail "$VMAIL_DIR"
chmod 770 "$VMAIL_DIR"

echo "==> 3/8 Postfix konfiguratsiyasi..."
# Faqat o'z o'zgaruvchilarimizni almashtiramiz (Postfix'ning $var lari saqlanadi)
envsubst '${MAIL_HOSTNAME} ${MAIL_DOMAIN} ${TLS_CERT} ${TLS_KEY}' \
  < config/postfix/main.cf.tmpl > /etc/postfix/main.cf

# Submission/SMTPS portlarini master.cf ga qo'shamiz (agar yo'q bo'lsa)
if ! grep -qE '^submission\s+inet' /etc/postfix/master.cf; then
  cat config/postfix/master.cf.append >> /etc/postfix/master.cf
fi

# Virtual map fayllari
echo "${MAIL_DOMAIN}  OK" > /etc/postfix/vmail_domains
touch /etc/postfix/vmail_mailbox /etc/postfix/vmail_alias
# postmaster aliasi (agar yo'q bo'lsa)
grep -q "^postmaster@${MAIL_DOMAIN}" /etc/postfix/vmail_alias 2>/dev/null || \
  echo "postmaster@${MAIL_DOMAIN}  admin@${MAIL_DOMAIN}" >> /etc/postfix/vmail_alias
postmap /etc/postfix/vmail_domains
postmap /etc/postfix/vmail_mailbox
postmap /etc/postfix/vmail_alias

echo "==> 4/8 Dovecot konfiguratsiyasi..."
envsubst '${VMAIL_DIR} ${TLS_CERT} ${TLS_KEY}' \
  < config/dovecot/dovecot.conf.tmpl > /etc/dovecot/dovecot.conf
# conf.d ichidagi standart fayllar ziddiyat qilmasligi uchun ularni o'chirib qo'yamiz
if [ -d /etc/dovecot/conf.d ]; then
  mv /etc/dovecot/conf.d /etc/dovecot/conf.d.disabled.$(date +%s) 2>/dev/null || true
fi
# Virtual foydalanuvchilar fayli — dovecot auth (dovecot guruhi) o'qiy oladigan joyda
touch /etc/dovecot/users
chown root:dovecot /etc/dovecot/users
chmod 640 /etc/dovecot/users

echo "==> 5/8 OpenDKIM konfiguratsiyasi..."
mkdir -p /etc/opendkim /run/opendkim
cp config/opendkim/opendkim.conf.tmpl /etc/opendkim.conf
cp config/opendkim/TrustedHosts /etc/opendkim/TrustedHosts
chown -R opendkim:opendkim /etc/opendkim /run/opendkim 2>/dev/null || true

echo "==> 6/8 DKIM kaliti..."
bash scripts/gen-dkim.sh
chown -R opendkim:opendkim /etc/opendkim

echo "==> 7/8 Servislar yoqilmoqda..."
systemctl enable --now opendkim || true
systemctl restart opendkim
systemctl restart postfix
systemctl restart dovecot
systemctl enable postfix dovecot

echo "==> 8/8 Standart mailboxlar..."
# Saytdan yuborish uchun no-reply va asosiy admin qutilari
if [ -n "${SMTP_USER:-}" ] && [ -n "${SMTP_PASS:-}" ]; then
  bash scripts/add-mailbox.sh "${SMTP_USER}" "${SMTP_PASS}" || true
fi

echo ""
echo "============================================================"
echo " O'rnatish tugadi. Endi DNS yozuvlarini sozlang:"
echo "============================================================"
bash scripts/show-dns.sh
