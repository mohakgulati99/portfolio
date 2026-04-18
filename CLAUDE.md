# CLAUDE.md

Persistent project context for Claude Code. Read this before making changes. Place this file at the repo root.

---

## What this is

Personal portfolio site for **Mohak Gulati**, product designer at Microsoft (M365 Copilot Agents). Hosted at **www.mohakgulati.com**. Primary audience: recruiters, hiring managers, design leads, and collaborators evaluating Mohak for design roles at product-focused companies (AI, consumer tech, enterprise SaaS — *not* e-commerce or crypto).

The site has to do two jobs well: (1) be scannable in 30 seconds for a recruiter, and (2) hold up under a deep read from a design lead.

## Tech stack

- **Astro** (static site generator) with TypeScript strict mode
- **Tailwind CSS** for styling — utility-first, no CSS modules
- **MDX** for case studies via `@astrojs/mdx`
- **Sitemap** via `@astrojs/sitemap`
- **Hosting:** GitHub Pages (public repo `mohakgulati99/portfolio`)
- **Deployment:** GitHub Actions (`withastro/action` + `actions/deploy-pages`) on push to `main`
- **Domain:** `www.mohakgulati.com` (custom domain via CNAME file in `public/`)
- **Node 20+**

Do not propose stack changes (Next.js, Gatsby, etc.) without explicit request.

## Commands

```bash
npm run dev        # local dev server, usually http://localhost:4321
npm run build      # production build → ./dist
npm run preview    # preview production build locally
```

Deployment is automatic on push to `main`. There is no manual deploy command.

## Repo structure

```
public/            # static assets served from site root
  CNAME            # DO NOT DELETE — custom domain for GitHub Pages
  resume.pdf       # downloadable resume
  assets/          # project images, OG images
src/
  components/      # shared UI components (.astro)
  content/
    config.ts      # content collection schema (Zod)
    work/          # one .mdx file per case study
  layouts/         # BaseLayout, ProjectLayout
  pages/           # file-based routing
  styles/
    global.css     # Tailwind base + CSS custom properties for tokens
.github/workflows/
  deploy.yml       # GitHub Pages deployment
astro.config.mjs
tailwind.config.cjs
```

## Content model — case studies

Each case study is an `.mdx` file in `src/content/work/`. Schema lives in `src/content/config.ts`. Required frontmatter:

- `title`, `subtitle`, `company`, `year`, `role`
- `tags: string[]`
- `heroImage: string` (path under `/public/assets/projects/`)
- `summary: string` (2–3 sentences, used in cards)
- `impact: string[]` (optional — bulleted list of outcomes)
- `featured: boolean` (shows on home page)
- `visibility: 'public' | 'password' | 'hidden'` (default `public`)
- `order: number` (lower = earlier in sort)
- `startDate: Date`, `endDate: Date?`

### Visibility modes

- **`public`** — renders normally.
- **`password`** — card listed on `/work`, detail-page body gated behind a client-side password prompt. **This is obfuscation, not real security.** It deters casual viewing of NDA-sensitive work but anyone who views page source can defeat it. For genuinely sensitive content, use `hidden` or host it off-site.
- **`hidden`** — not listed on `/work` index; only reachable via direct URL. Use for content shared privately by link.

## Adding a new case study

1. Create `src/content/work/<slug>.mdx`.
2. Fill frontmatter per the schema.
3. Write body in MDX. Import and embed custom components if needed.
4. Add images to `public/assets/projects/<slug>/`.
5. Commit and push. Live on www.mohakgulati.com within ~2 minutes (Actions + Pages deploy time).

## Adding a new section / page

1. Create `src/pages/<section>.astro` (or a directory with `index.astro` if it has sub-pages).
2. Wrap in `BaseLayout`.
3. Add nav link in `src/components/Nav.astro` if it should be top-level.
4. Update sitemap settings if you want to control inclusion/exclusion.

## Design system / tokens

Design is driven by Mohak's Figma file (not in this repo). When implementing a screen:

- Use CSS custom properties in `src/styles/global.css` for color, typography, spacing tokens.
- Tailwind config (`tailwind.config.cjs`) references those custom properties — change a token in CSS, and all Tailwind utilities using it update.
- Light/dark mode uses `[data-theme="dark"]` on `<html>`. Tokens should have both variants defined even if dark mode isn't exposed yet.
- Do not hardcode hex values, pixel spacing, or font stacks inside components. If you need a new token, add it to `global.css` and `tailwind.config.cjs`.

## Deployment details

- **Branch:** `main` is the deploy branch. Push to deploy.
- **CNAME file:** `public/CNAME` must exist and contain exactly `www.mohakgulati.com`. GitHub Pages reads this. If it's deleted, the custom domain unbinds on next deploy.
- **Pages source:** must be set to "GitHub Actions" in repo Settings → Pages (one-time, in web UI).
- **Enforce HTTPS:** enabled in Settings → Pages after DNS propagates.
- **DNS (at Mohak's registrar, not in repo):**
  - `CNAME  www  →  mohakgulati99.github.io`
  - `A      @    →  185.199.108.153 / .109.153 / .110.153 / .111.153` (apex redirect to www)

Do not modify `deploy.yml` unless the user asks. Breaking the workflow breaks launches.

## Conventions

- **TypeScript:** strict mode on. No `any` unless justified in a comment.
- **Styling:** Tailwind utilities in JSX/Astro files. No inline `<style>` unless unavoidable (e.g., dynamic values). No CSS modules.
- **HTML:** semantic. `<article>` for case studies, `<nav>` for nav, `<main>` once per page.
- **Images:** always have `alt` text. Use Astro's `<Image />` component for automatic optimization when hero/cover images are in `src/assets/` (MDX); `public/` assets ship as-is.
- **Commits:** conventional-style (`feat: add project card hover state`, `chore: bump astro`, `docs: update CLAUDE.md`).
- **File organization:** keep it flat. One level of nesting inside `components/` and `content/` only. Don't create `components/ui/buttons/primary/` — use good file names.

## Constraints & preferences

- **Ask before deleting** any file outside the repo directory.
- **Ask before adding dependencies** — the dependency tree should stay small. Each addition is a future maintenance cost.
- **Don't add analytics, pixels, or trackers** without the user's approval. If we do add analytics later, it'll be Plausible or Umami (privacy-friendly, no cookie banner needed).
- **NDA awareness:** Microsoft work is NDA-sensitive. Do not paraphrase internal details, speculate on unreleased features, or add content beyond what's in the public resume without asking first. When unsure about a case study detail, ask rather than invent.
- **No bold promises in copy.** Avoid phrases like "world-class" or "revolutionary." Mohak's preference is understated.
- **Performance:** Lighthouse scores should stay ≥ 95 across categories. Before shipping a new feature that adds significant JS, flag the trade-off.

## What's off-limits without explicit approval

- Changing the stack (Astro, Tailwind, MDX)
- Changing the domain, repo name, or deploy target
- Adding third-party services (CMS, form backends, auth providers)
- Rewriting content that's already in an `.mdx` file — edit, don't replace
- Touching the Figma file (it's not in this repo — Mohak owns design decisions)

## Useful context files outside this repo

These live in Mohak's Cowork workspace (not in the repo) and may be referenced when Mohak pastes them into a session:

- `portfolio-website-plan.md` — full architecture plan
- `setup-checklist.md` — pre-launch readiness checklist
- `claude-code-kickoff.md` — the original scaffold brief

If Mohak references "the plan" or "the brief," it's one of these.
