# Community Forum — Backend

## Day 1 setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your local Postgres credentials, then create the database:

```bash
createdb community_forum
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
  work on Render later since it reads `DATABASE_URL` if that's set instead).
- `models/` — User, Post, Comment, Vote, with associations wired up in `models/index.js`.
- `middleware/auth.js` — JWT verification middleware, ready for Day 2.
- `server.js` — health check route only. Routes get added as you build them.

## What's next (Day 2 onward)

1. **Day 2:** `routes/auth.js` — signup (hash password with bcrypt, create User)
   and login (compare password, sign JWT). Mount in `server.js`.
2. **Day 3:** `routes/posts.js`, `routes/comments.js`, `routes/votes.js` — CRUD +
   the vote toggle logic (check `models/Vote.js`'s unique index for why you
   look up an existing vote before creating one).
