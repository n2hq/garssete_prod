#!/bin/bash
set -e

echo "🔄 Switching to garssete test: comcercssm repo..."

git remote remove origin || true
git remote add origin https://github.com/n2hq/comcercssm.git

git fetch origin
git checkout -B main origin/main
git pull origin main

echo "✅ Now on garssete test: comcercssm"

nginx -t && systemctl reload nginx

pm2 restart pm2.config.cjs
