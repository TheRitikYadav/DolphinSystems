#!/bin/bash
set -e
cd ~/dolphinsystems
echo "Building..."
npm run build
echo "Deploying..."
rsync -a --delete .next/standalone/ /var/www/dolphinsystems/
rsync -a .next/static/ /var/www/dolphinsystems/.next/static/
rsync -a public/ /var/www/dolphinsystems/public/
cp .env.local /var/www/dolphinsystems/.env.local
pm2 restart dolphinsystems
echo "Live at https://dolphinsystems.net"
