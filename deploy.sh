#!/bin/bash
set -e

PI="pi@ritik.local"
REMOTE_DIR="/var/www/dolphinsystems"

echo "🔨 Building Next.js..."
npm run build

echo "🚀 Deploying to Raspberry Pi..."
rsync -avz --delete .next/standalone/ "$PI:$REMOTE_DIR/"
rsync -avz .next/static/ "$PI:$REMOTE_DIR/.next/static/"
rsync -avz public/ "$PI:$REMOTE_DIR/public/"
rsync -avz .env.local "$PI:$REMOTE_DIR/.env.local"

echo "♻️  Restarting server..."
ssh "$PI" "cd $REMOTE_DIR && pm2 restart dolphinsystems"

echo "✅ Live at https://dolphinsystems.net"
