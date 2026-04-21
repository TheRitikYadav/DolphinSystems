# DolphinSystems.net — Copilot Instructions

## Deployment

After any code change, deploy to production with:

```bash
npm run deploy
```

This builds the Next.js app, syncs it to a Raspberry Pi via SSH, and restarts the server. The site is live at https://dolphinsystems.net.

## Key Constraints

- `next.config.ts` must keep `output: "standalone"` — required for deployment.
- The Pi is at `pi@ritik.local`. Files live at `/var/www/dolphinsystems/`.
- Cloudflare Tunnel handles public access + SSL. No port forwarding.
- PM2 manages the Node.js process. nginx is the reverse proxy.

## Stack

- Next.js 16 (App Router, standalone output)
- Tailwind CSS v4
- Supabase (env vars in `.env.local`)
- Framer Motion for animations
- Hosted on Raspberry Pi via Cloudflare Tunnel

## Troubleshooting

```bash
ssh pi@ritik.local
pm2 logs dolphinsystems          # app logs
sudo systemctl status cloudflared  # tunnel status
sudo systemctl status nginx        # proxy status
```
