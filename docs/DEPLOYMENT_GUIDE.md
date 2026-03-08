# AIRE deployment guide for non-developers

This guide is written for a beginner. Follow the steps in order.

---

## 1. What you are deploying

You are deploying a web app that includes:
- a public landing page
- a free readiness report form
- a protected dashboard
- email sign-in using Supabase
- optional AI report generation using OpenAI
- optional payments using Stripe

For the simplest first launch, deploy this in 3 passes:

### Pass 1
Get the site live on Vercel in demo mode.

### Pass 2
Connect Supabase so login and saved data work.

### Pass 3
Connect OpenAI and Stripe.

---

## 2. Accounts you need

Create these accounts before you start:
- GitHub
- Vercel
- Supabase
- Stripe
- OpenAI Platform

---

## 3. Put the code in GitHub

### Option A: easiest
1. Download the zip of this repo.
2. Unzip it on your computer.
3. Go to your GitHub repo: `https://github.com/eboocock/codexAIRE`
4. Click **Add file**.
5. Click **Upload files**.
6. Drag the unzipped files into GitHub.
7. Click **Commit changes**.

### Option B: use GitHub Desktop
1. Install GitHub Desktop.
2. Clone your repo.
3. Copy these project files into the repo folder.
4. Commit.
5. Push.

---

## 4. Deploy on Vercel first

1. Go to Vercel.
2. Click **Add New...** then **Project**.
3. Import your GitHub repo.
4. Vercel should detect **Next.js** automatically.
5. Click **Deploy**.

If the first deployment fails because environment variables are missing, do not panic. That is normal for this project. Add the variables in the next step and redeploy.

---

## 5. Add environment variables in Vercel

In Vercel:
1. Open your project.
2. Click **Settings**.
3. Click **Environment Variables**.
4. Add the variables below.

### Start with only these two

`NEXT_PUBLIC_APP_URL` = your Vercel site URL, for example `https://codexaire.vercel.app`

`MCP_MODE` = `inline`

### Optional for Pass 1 only
You can leave the rest blank at first. The app will still show the marketing page and the free report will use mock AI.

---

## 6. Create Supabase project

1. Go to Supabase.
2. Click **New project**.
3. Choose your organization.
4. Give the project a name, for example `codex-aire`.
5. Save your database password somewhere safe.
6. Wait for the project to finish provisioning.

---

## 7. Create the database tables in Supabase

1. In Supabase, open your project.
2. Click **SQL Editor**.
3. Click **New query**.
4. Open the file `supabase/schema.sql` from this repo.
5. Copy everything in that file.
6. Paste it into the SQL Editor.
7. Click **Run**.

If you see an error about policies already existing, it usually means you already ran the script once. That is okay.

---

## 8. Get your Supabase keys

In Supabase:
1. Click **Project Settings**.
2. Click **API**.
3. Copy these values:
   - Project URL
   - Publishable key
   - service_role secret key

Now go back to Vercel and add:

`NEXT_PUBLIC_SUPABASE_URL` = your Project URL

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = your Publishable key

`SUPABASE_SERVICE_ROLE_KEY` = your service role key

Save the variables.

---

## 9. Set your Supabase authentication URLs

In Supabase:
1. Click **Authentication**.
2. Click **URL Configuration**.
3. Set **Site URL** to your Vercel site, for example `https://codexaire.vercel.app`
4. Add these redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://YOUR-VERCEL-DOMAIN/auth/callback`

Replace `YOUR-VERCEL-DOMAIN` with your real site URL.

---

## 10. Add the auth redirect path variable in Vercel

Add this variable in Vercel:

`AUTH_REDIRECT_PATH` = `/auth/callback`

Then redeploy.

---

## 11. Test the app after Supabase setup

After redeploying:
1. Open your site.
2. Visit `/login`
3. Enter your email.
4. Click **Send magic link**.
5. Open the email.
6. Click the link.
7. You should land on `/dashboard`

If the login link sends you somewhere unexpected, the redirect URL is usually the issue. Re-check Step 9.

---

## 12. Add OpenAI for real AI reports

1. Go to the OpenAI Platform.
2. Create an API key.
3. In Vercel, add:

`OPENAI_API_KEY` = your OpenAI API key

`OPENAI_MODEL` = `gpt-5-mini`

4. Redeploy.

Now the readiness report should use the OpenAI API instead of the built-in mock response.

---

## 13. Add Stripe for payments

### Create your products
In Stripe:
1. Go to **Product Catalog**.
2. Create one product for **FSBO Starter**.
3. Create one product for **Agent Workspace**.
4. Create a price for each:
   - FSBO Starter: one-time payment
   - Agent Workspace: recurring monthly subscription

### Copy your values into Vercel
Add these variables:

`STRIPE_SECRET_KEY` = your Stripe secret key

`STRIPE_FSBO_PRICE_ID` = the price ID for FSBO Starter

`STRIPE_AGENT_PRICE_ID` = the price ID for Agent Workspace

---

## 14. Set up Stripe webhook

In Stripe:
1. Go to **Developers**.
2. Click **Webhooks**.
3. Click **Add destination** or **Create endpoint**.
4. Add this endpoint URL:

`https://YOUR-VERCEL-DOMAIN/api/stripe/webhook`

5. Subscribe at minimum to:
   - `checkout.session.completed`
   - `customer.subscription.deleted`

6. Stripe will show a signing secret. Copy it.

In Vercel, add:

`STRIPE_WEBHOOK_SECRET` = the Stripe signing secret

Then redeploy.

---

## 15. Test a Stripe payment

1. Open your deployed site.
2. Go to `/pricing`
3. Click a plan.
4. Stripe Checkout should open.
5. Use Stripe test mode if you are not ready for real charges.
6. After checkout, you should return to `/success`

The real payment confirmation is handled by the webhook, not just the redirect page.

---

## 16. What to do if deployment fails

### If Vercel says build failed
Check:
- all environment variable names are spelled exactly right
- your repo includes `package.json`
- your repo includes all files and folders, not just screenshots or a zip inside the repo

### If login fails
Check:
- Site URL in Supabase
- redirect URLs in Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### If payments fail
Check:
- `STRIPE_SECRET_KEY`
- `STRIPE_FSBO_PRICE_ID`
- `STRIPE_AGENT_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`

### If the readiness report looks fake
That means `OPENAI_API_KEY` is missing or invalid, so the app is falling back to mock mode.

---

## 17. Recommended launch order

### Launch now
- home page
- readiness report
- pricing page
- dashboard in demo mode

### Add next
- Supabase login
- saved reports
- Stripe checkout

### Add after first customers
- email sending
- uploaded documents
- more automated reminders
- CRM connections

---

## 18. Daily use after launch

Each time you change the code:
1. Update files in GitHub.
2. Vercel usually redeploys automatically.
3. Wait for deployment to finish.
4. Open the site and test the changed page.

---

## 19. Best beginner workflow

Use this exact order:
1. Get the site live with no keys.
2. Add Supabase.
3. Test login.
4. Add OpenAI.
5. Test report generation.
6. Add Stripe.
7. Test one payment in Stripe test mode.

That avoids trying to fix five systems at once.
