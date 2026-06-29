# Community Forum — Frontend

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`. You should see a navbar with Login / Sign up
(or your username if logged in) and a home feed of posts.

## What's here

- Vite + React + Tailwind, with the `@/` import alias and `cn()` helper
  matching shadcn/ui conventions — `npx shadcn@latest add ...` slots in
  cleanly if you add more components later.
- `src/lib/categories.js` — shared category list used by the feed filter and
  the create-post form.
- `src/context/AuthContext.jsx` — `login()`, `signup()`, `logout()` call the
  real backend and persist the session in `localStorage`.
- `src/api/axios.js` — attaches the JWT token to every request automatically.
- `src/pages/Login.jsx` / `Signup.jsx` — forms using `react-hook-form`,
  connected to `AuthContext`.
- `src/pages/Home.jsx` — fetches posts from `GET /api/posts`, with a category
  filter.
- `src/pages/CreatePost.jsx` — protected route (redirects to login if signed
  out), creates a post via `POST /api/posts`.
- `src/pages/PostDetail.jsx` — fetches one post with its comments, lets
  logged-in users add a comment and upvote/downvote.

## Adding more shadcn components later

```bash
cd frontend
npx shadcn@latest init
npx shadcn@latest add input card form
```

## Build progress

- **Day 4 ✅** — Login/Signup UI, AuthContext wired to backend, reactive navbar.
- **Day 5 ✅** — Home feed, category filter, create-post form, post detail + comments.
- **Day 6 ✅** — Upvote/downvote buttons wired up, responsive pass, error states confirmed.
- **Day 7 ✅** — Deployed to Vercel, `vercel.json` added to fix SPA routing on refresh.

