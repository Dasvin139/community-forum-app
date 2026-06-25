# Community Forum — Frontend

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
