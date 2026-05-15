# Synk — Product Context

## What is Synk?
Synk is a B2B automation marketplace that connects companies with verified automation specialists. Companies publish projects (RPA, AI/LLMs, integrations, BI, marketing automation), receive proposals from specialists, and manage the full project lifecycle including escrow payments.

## Target Users
- **Empresas (Companies)**: Portuguese/European SMBs and enterprises looking to automate business processes. Non-technical buyers who need vetted specialists quickly.
- **Especialistas (Specialists)**: Automation consultants and developers (RPA, Python, n8n, Make, Zapier, AI, BI) looking for project-based work.

## Brand & Tone
- **Dark theme**: deep navy/black backgrounds (`#0b0b10`, `#13131a`)
- **Primary accent**: purple (`#7c5cf6`) with lighter variant (`#a78bfa`)
- **Secondary accents**: emerald green for success, amber for warnings, red for errors
- **Typography**: Display font for headings (tight letter-spacing), clean sans-serif for body
- **Tone**: Professional, confident, modern. Not corporate-stiff. Think Linear, Vercel, Stripe.
- **Language**: Portuguese (Portugal) — all UI copy in PT-PT

## Design Principles
- Minimal, high-contrast dark UI
- Cards with subtle borders (`rgba(255,255,255,0.06)`)
- Glassmorphism accents (backdrop-blur, rgba backgrounds)
- Smooth micro-animations (Reveal component for scroll-in)
- No clutter — every element earns its place
- Mobile-responsive but desktop-first

## Tech Stack
- React 18 + Vite
- Tailwind CSS + custom CSS variables
- Supabase (auth, database, realtime, edge functions)
- Stripe (payments + escrow)
- Brevo (transactional email)
- Deployed on GitHub Pages

## Anti-References
- Avoid generic SaaS blue/white templates
- No Fiverr/Upwork aesthetic
- No cluttered dashboards with too many widgets
- No light mode defaults

## Key Pages
- `/` — Landing page (Hero, WhySynk, HowItWorks, Features, CTA)
- `/marketplace` — Browse projects + specialists
- `/dashboard` — Company and specialist dashboards
- `/projeto/:id` — Full project lifecycle management
- `/mensagens` — Real-time chat
- `/especialista/:id` — Public specialist profile
- `/admin` — Admin panel (verification, payments)
