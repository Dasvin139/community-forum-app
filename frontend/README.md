# Community Forum — Frontend

# Community Forum — Frontend

## Day 1 setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`. You should see a navbar with Login / Sign up
buttons and a home feed. That's the basic setup confirmed working.

## What's already here

- Vite + React + Tailwind, configured and working.
- The `@/` import alias (e.g. `import { Button } from "@/components/ui/button"`),
  same convention shadcn/ui uses — so if you run `npx shadcn@latest init` later
  to pull in more components, it'll slot in without conflicts.
- `src/lib/utils.js` — the `cn()` helper, also a shadcn convention.
- `src/lib/categories.js` — shared category list used by the feed filter and
  the create-post form.
- `src/components/ui/button.jsx` — one working shadcn-style component.
- `src/context/AuthContext.jsx` — fully wired: `login()`, `signup()`, and
  `logout()` call the real backend and persist the session in `localStorage`.
- `src/api/axios.js` — pre-wired to attach the JWT token to every request.
- `src/pages/Login.jsx` / `Signup.jsx` — real forms using `react-hook-form`,
  connected to `AuthContext`.
- `src/pages/Home.jsx` — fetches posts from `GET /api/posts`, with a working
  category filter.
- `src/pages/CreatePost.jsx` — protected route (redirects to login if signed
  out), creates a post via `POST /api/posts`.
- `src/pages/PostDetail.jsx` — fetches one post with its comments, lets
  logged-in users add a comment.

## Adding more shadcn components later

```bash
cd frontend
npx shadcn@latest init
npx shadcn@latest add input card form
```

Run this from inside `frontend/`. It'll detect the existing Tailwind config
and `cn()` helper rather than overwriting them.

## Progress

- **Day 4 ✅** — Login/Signup UI built, `AuthContext`'s `login()`/`signup()`
  wired to the backend, navbar reflects auth state, confirmed working.
- **Day 5 ✅** — Home feed with category filter, create-post form, post detail
  page with comments — all tested end to end against the real backend.

## What's next

- **Day 6:** Wire up actual upvote/downvote buttons in `PostDetail.jsx` /
  `Home.jsx` (currently read-only counts), polish loading/error states,
  responsive pas

## Day 1 setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173`. You should see a navbar with Login / Sign up
buttons and a "Home — coming soon" placeholder. That's Day 1 done on this side.

## What's already here

- Vite + React + Tailwind, configured and working.
- The `@/` import alias (e.g. `import { Button } from "@/components/ui/button"`),
  same convention shadcn/ui uses — so if you run `npx shadcn@latest init` later
  to pull in more components, it'll slot in without conflicts.
- `src/lib/utils.js` — the `cn()` helper, also a shadcn convention.
- `src/components/ui/button.jsx` — one working shadcn-style component as a
  reference for how the rest should look.
- `src/context/AuthContext.jsx` — stub, `login`/`logout` throw "TODO" until Day 4.
- `src/api/axios.js` — pre-wired to attach the JWT token to every request once
  you start storing one.
- `src/pages/*` — placeholder pages wired into routing in `App.jsx`, so the
  whole app already navigates even before there's real content.

## Adding more shadcn components later

```bash
npx shadcn@latest init
npx shadcn@latest add input card form
```

Run this from inside `frontend/`. It'll detect the existing Tailwind config
and `cn()` helper rather than overwriting them.

## What's next (Day 4 onward)

1. **Day 4:** Build `Login.jsx` / `Signup.jsx` with `react-hook-form`, finish
   `AuthContext`'s `login()` to call `POST /api/auth/login` and store the token.
2. **Day 5:** `Home.jsx` — fetch posts from `GET /api/posts`, category filter,
   `CreatePost.jsx` form, `PostDetail.jsx` with comments.
3. **Day 6:** Wire voting into `PostDetail.jsx` / `Home.jsx`, polish states.

**Day 4 - completed** login and signup ui build and completed AuthContext's login()
