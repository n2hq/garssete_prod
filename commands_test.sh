#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e


echo "🌿  Renaming branch to main..."
git branch -M main


echo "🔁 Setting remote to TEST repo..."
git remote set-url origin https://github.com/n2hq/comcercssm.git



echo "🧪 Switching to 'main' branch..."
git checkout main || git checkout -b main


echo "🔄 Pulling latest changes..."
#git pull origin main


echo "Deleting build folder..."
rm -rf build/

echo "🛠  Building TEST..."
npm run build:test
#npm run build:prod

echo "📦  Staging changes..."
git add .


echo "✅  Committing changes..."
git commit -m "Test: update commit" || echo "⚠️ No changes to commit."

echo "🌿  Renaming branch to main..."
git branch -M main

echo "🚀  Pushing to origin/main..."
git push -u origin main

echo "🎉  Done!"


