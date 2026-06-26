# Community Forum App

⚠️ Note: This project is currently under active development.

A full-stack, Reddit-style community forum where users can sign up, create
posts under categories, comment, and upvote/downvote — built with a React
frontend and a Node/Express + MySQL backend with JWT authentication.

**Stack:** React (Vite) + Tailwind + shadcn-style components · Node/Express ·
Sequelize · PostgreSQL · JWT auth

## Feature scope (deliberately minimal)

- Signup / login (JWT + bcrypt)
- Create posts under a category, list + filter by category
- View a post with comments, add a comment
- Upvote / downvote posts

Explicitly **not** in scope this week: real-time updates, image uploads,
nested comments. Add these later once the core app is live and on your resume.

## Day-by-day plan

| Day | Task                                                                                                               |
| --- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | ✅ Project structure, Express server, Sequelize models, frontend skeleton — done, this is what you're looking at. |
| 2   | ✅ Backend:`routes/auth.js` — signup, login, JWT issue/verify. Tested via Thunder Client.                      |
| 3   | ✅ Backend:`routes/posts.js`, `routes/comments.js`, `routes/votes.js` — tested via Thunder Client.         |
| 4   | ✅ Frontend: Login/Signup pages, finish`AuthContext`, protected routes.                                         |
| 5   | ✅ Frontend: Home feed with category filter, create-post form, post detail + comments.                            |
| 6   | Frontend: wire up voting, loading/error states, responsive pass.                                                   |
| 7   | Deploy backend to Render (with Postgres), frontend to Vercel, write final README with screenshots.                 |

## Getting started

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in your local Postgres credentials
npm run dev

# Frontend (separate terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

Backend health check: `http://localhost:5000/api/health`
Frontend: `http://localhost:5173`

## Getting this onto GitHub

```bash
git init
git add .
git commit -m "Day 1: project scaffold, models, frontend skeleton"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
