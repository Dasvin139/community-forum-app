Backend health check: [community-forum-app-production.up.railway.app/api/health](https://community-forum-app-production.up.railway.app/api/health)
Frontend: [community-forum-app-gamma.vercel.app](https://community-forum-app-gamma.vercel.app/)

# Community Forum App

A full-stack, Reddit-style community forum where users can sign up, create
posts under categories, comment, and upvote/downvote — built with a React
frontend and a Node/Express + MySQL backend with JWT authentication.

**Stack:** React (Vite) + Tailwind + shadcn-style components · Node/Express ·
Sequelize · MySQL · JWT auth

## Live Demo

- **App:** https://your-actual-vercel-url.vercel.app
- **Backend health check:** https://your-actual-railway-url.up.railway.app/api/health

## Features

- Signup / login (JWT + bcrypt)
- Create posts under a category, list + filter by category
- View a post with comments, add a comment
- Upvote / downvote posts

## Build progress

| Day | Task                                                                                                      |
| --- | --------------------------------------------------------------------------------------------------------- |
| 1   | ✅ Project structure, Express server, Sequelize models, frontend skeleton                                 |
| 2   | ✅ Backend:`routes/auth.js` — signup, login, JWT issue/verify. Tested via Thunder Client.              |
| 3   | ✅ Backend:`routes/posts.js`, `routes/comments.js`, `routes/votes.js` — tested via Thunder Client. |
| 4   | ✅ Frontend: Login/Signup pages, AuthContext wired to backend, reactive navbar.                           |
| 5   | ✅ Frontend: Home feed with category filter, create-post form, post detail + comments.                    |
| 6   | ✅ Frontend: wired up voting, confirmed loading/error states, responsive pass.                            |
| 7   | ✅ Deployed backend + MySQL to Railway, frontend to Vercel, fixed SPA routing.                            |

## Getting started locally

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your local MySQL credentials
npm run dev

# Frontend (separate terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

