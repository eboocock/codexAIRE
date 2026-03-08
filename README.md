# codexAIRE v3

AIRE is an AI Transaction Concierge starter app for real estate. It is designed as a launchable wedge instead of a giant all-in-one brokerage replacement.

This version adds:
- Supabase auth + persistence
- Stripe Checkout + webhook scaffolding
- OpenAI structured report generation
- 2 MCP-style transaction tools:
  - follow-up drafting
  - document chase plan generation
- beginner-friendly deployment docs

## Fastest path

If you are not a developer, start here:
1. Read `docs/DEPLOYMENT_GUIDE.md`
2. Create a Supabase project
3. Create a Vercel account and import this repo
4. Add environment variables from `.env.example`
5. Deploy in demo mode first
6. Add Stripe and OpenAI after the basic site is live

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Main pages
- `/` landing page
- `/intake` AI seller/buyer readiness report
- `/pricing` plan selection
- `/login` email magic link sign-in
- `/dashboard` deal workspace
- `/success` checkout success page

## Main API routes
- `POST /api/intake`
- `POST /api/checkout`
- `POST /api/stripe/webhook`
- `POST /api/mcp/followup`
- `POST /api/mcp/document-chase`

## Deployment docs
See `docs/DEPLOYMENT_GUIDE.md` for the step-by-step path.
