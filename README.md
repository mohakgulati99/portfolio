# mohakgulati.com

Personal portfolio site for Mohak Gulati, product designer at Microsoft.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [MDX](https://mdxjs.com). Deployed to [GitHub Pages](https://pages.github.com) via GitHub Actions.

## Development

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:4321
npm run build     # production build → ./dist
npm run preview   # preview production build locally
```

## Adding a case study

1. Create `src/content/work/<slug>.mdx`
2. Fill frontmatter per the schema in `src/content/config.ts`
3. Add images to `public/assets/projects/<slug>/`
4. Push to `main` — deploys automatically in ~2 min

## Deployment

Push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`).

**One-time setup required after first push:**
1. Go to repo **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Set custom domain to `www.mohakgulati.com`
4. Add DNS records at your registrar:
   - `CNAME www → mohakgulati99.github.io`
   - `A @ → 185.199.108.153`
   - `A @ → 185.199.109.153`
   - `A @ → 185.199.110.153`
   - `A @ → 185.199.111.153`
5. Enable **Enforce HTTPS** after DNS propagates

## Stack

- **Astro 6** — static site generator
- **Tailwind CSS v4** — utility-first styling via `@tailwindcss/vite`
- **MDX** — case studies via `@astrojs/mdx`
- **Sitemap** — `@astrojs/sitemap`
- **Node 20+**
