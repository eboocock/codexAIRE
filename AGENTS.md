# Agent workflow notes

## Product goal
Build an AI transaction concierge that reduces paperwork, status chasing, and coordination overhead for buyers, sellers, and small real estate teams.

## Guardrails
- Never present the app as legal advice.
- Never present the app as pricing or negotiation advice.
- Escalate legal, disclosure, pricing, and negotiation decisions to a licensed professional.
- Keep the launch wedge narrow and monetizable.

## Priority build order
1. Intake and readiness report
2. Auth and dashboard
3. Persistence
4. Billing
5. Follow-up automation
6. Document chase automation

## Definition of good
- Easy to deploy on Vercel
- Easy to connect to Supabase
- Useful even without OpenAI or Stripe configured
- Clear separation between demo mode and production mode
