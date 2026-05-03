# Subscription Tracker

A lightweight personal subscription tracker with a 31-day calendar view and a sidebar for managing subscriptions. Click a subscription, then click a day to assign it.

## Tools Used
- Astro (server-rendered UI)
- SQLite (via `better-sqlite3`)
- Node.js (Astro Node adapter)
- Docker

## Setup & Run (Local)
```bash
cd projects/subscription-tracker
npm install
npm run dev
```
Then open `http://localhost:4321`.

## Build & Preview
```bash
npm run build
npm run preview
```

## Docker
```bash
docker build -t subscription-tracker .
docker run -p 4321:4321 \
  -e DB_PATH=/data/subscriptions.sqlite \
  -v $(pwd)/data:/data \
  subscription-tracker
```

## Environment
- `DB_PATH` (default: `./data/subscriptions.sqlite`)
- `HOST` (default: `0.0.0.0`)
- `PORT` (default: `4321`)
