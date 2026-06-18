# Deployment to Vercel

Steps to deploy this project to Vercel and required environment variables.

## Prerequisites
- Vercel account and `vercel` CLI installed locally.
- Git repository connected to Vercel (optional but recommended).
- Node 18 is required (project uses Node 18 in `package.json`).

## Environment variables (set in Vercel dashboard or via CLI)
- `SUPABASE_URL` — your Supabase project URL (https://<project>.supabase.co)
- `SUPABASE_ANON_KEY` — your Supabase anon/public key
- `NODE_ENV` — set to `production` for production deployments (Vercel sets this automatically)
- Any other third-party secrets (Firebase, SMTP credentials, API keys) used by `server.ts` or client code

## Recommended Vercel settings
1. In Project Settings > General > Framework Preset: choose `Other` or `Vite`.
2. Build Command: leave blank to use `vercel-build` script or set to `npm run vercel-build`.
3. Output Directory: leave blank (static files are produced in `dist/` and functions are built from `/api`).
4. Environment: Add the variables listed above under Production and Preview if needed.
5. Functions runtime: `nodejs18.x` (enforced by `vercel.json` under `functions`).

## Local deploy commands
```bash
# log in to Vercel
npx vercel login

# run a local vercel-like build (no auth required for local build)
npm ci
npm run vercel-build

# deploy to Vercel (interactive)
npx vercel --prod
```

## Troubleshooting
- If a build fails on Vercel, open the Build Logs in the Vercel dashboard, then paste the error here and I can diagnose it.
- If the serverless function errors at runtime, enable Vercel's function logs and verify required env vars are present.
- If `esbuild` binary errors occur during Vercel build, ensure `esbuild` is in `dependencies` (already added) and `engines.node` is set to `18.x` in `package.json`.

## Notes
- The Express `app` is exported by `server.ts` and proxied by `api/index.ts` to run as a Vercel Serverless Function.
- For heavy server workloads or long-running tasks, consider moving to a dedicated server (e.g., Vercel Serverless Functions have execution time limits).
