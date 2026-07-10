#!/usr/bin/env bash
# Daily SQLite backup with 14-day retention. Uses sqlite3 .backup (safe with
# WAL / live writes). Installed in root's crontab: 03:30 every day.
set -euo pipefail

DB=/var/www/protocol_traver/data/protocol.db
OUT_DIR=/var/backups/protocol-db
KEEP_DAYS=14

mkdir -p "$OUT_DIR"
STAMP=$(date +%Y%m%d-%H%M%S)
sqlite3 "$DB" ".backup '$OUT_DIR/protocol-$STAMP.db'"
gzip "$OUT_DIR/protocol-$STAMP.db"
find "$OUT_DIR" -name 'protocol-*.db.gz' -mtime +"$KEEP_DAYS" -delete
