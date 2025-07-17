#!/bin/bash
set -e

echo "🔄 Switching to garssete_prod repo..."

git remote remove origin || true

git remote add origin https://github.com/n2hq/garssete_prod.git

git fetch origin

git checkout -B main origin/main

git pull origin main

echo "✅ Now on garssete_prod"