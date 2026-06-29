# Community Forum — Backend

## Local setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your local MySQL credentials, then create the database:

```bash
mysql -u root -p -e "CREATE DATABASE community_forum;"
```

Run the server:

```bash
npm run dev
```

Visit `http://localhost:5000/api/health` — you should see:

```json
{ "status": "ok", "message": "Community Forum API is running" }
```

## Deployed

Live on Railway: https://your-actual-railway-url.up.railway.app/api/health

`config/database.js` reads `DATABASE_URL` automatically when it's set, which
is how this runs unmodified on Railway with its managed MySQL instance.

## What's here

- `config/database.js` — Sequelize connection, supports both local env vars
  and a single `DATABASE_URL` (used in production).
- `models/` — User, Post, Comment, Vote, with associations wired up in `models/index.js`.
- `middleware/auth.js` — JWT verification middleware.
- `server.js` — health check + all routes mounted.
- `routes/auth.js` — signup and login.
- `routes/posts.js`, `routes/comments.js`, `routes/votes.js` — full CRUD + vote toggle logic.

## Build progress

- **Day 1 ✅** — project structure, models, server skeleton, health check confirmed.
- **Day 2 ✅** — `routes/auth.js` built. Signup and login tested via Thunder Client.
- **Day 3 ✅** — `routes/posts.js`, `routes/comments.js`, `routes/votes.js` built and tested.
- **Day 7 ✅** — deployed to Railway with managed MySQL.

