# Community Forum — Backend

## Day 1 setup

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

If that works, Day 1 is done: DB connects, models sync, server runs.

## What's already here

- `config/database.js` — Sequelize connection (works locally now, and will also
  work on a host like Railway/PlanetScale/Aiven later since it reads
  `DATABASE_URL` if that's set instead).
- `models/` — User, Post, Comment, Vote, with associations wired up in `models/index.js`.
- `middleware/auth.js` — JWT verification middleware.
- `server.js` — health check + all routes mounted.
- `routes/auth.js` — signup and login.
- `routes/posts.js`, `routes/comments.js`, `routes/votes.js` — full CRUD + vote toggle logic.

## Progress

- **Day 1 ✅** — project structure, models, server skeleton, health check confirmed.
- **Day 2 ✅** — `routes/auth.js` built. Signup and login tested via Thunder Client,
  confirmed working with real credentials end to end.
- **Day 3 ✅** — `routes/posts.js`, `routes/comments.js`, `routes/votes.js` built.
  All CRUD operations and the vote toggle logic (create/remove/switch) tested
  and confirmed via Thunder Client.
