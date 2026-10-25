# Mohamed Fayez — Portfolio

Personal portfolio of **Mohamed Fayez**, a Front-End Developer and Computer Science student at Arish University (Faculty of Computers and Information), North Sinai, Egypt.

The site presents my background, skills, and four independent projects — Sinai Guide, Wesal, PlayStation Management System, and Personal Expense Tracker — and includes a downloadable CV and a contact form.


**Contact:** [aboriash99@gmail.com](mailto:aboriash99@gmail.com) · [LinkedIn](https://www.linkedin.com/in/mo7med-fayez/) · [GitHub](https://github.com/mohamed-riash)

## Sections

- **Hero** — name, introduction, rotating roles, and links to projects, contact, and the CV.
- **About** — biography and background timeline.
- **Services** — front-end development, mobile app development with Flutter, and UI implementation.
- **Tech stack** — filterable skills grouped into Front-End, Mobile, Languages & Concepts, and Tools & Design.
- **Selected works** — project list with hover previews; each project has a statically generated detail page at `/projects/[slug]`.
- **Contact** — validated contact form plus direct email, phone, and location.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) and [React 19](https://react.dev/), written in TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP 3](https://gsap.com/) with ScrollTrigger and SplitText, and [Lenis](https://lenis.darkroom.engineering/) smooth scrolling
- [next-transition-router](https://github.com/madebyconor/next-transition-router) for page transitions
- HTML5 canvas backgrounds (`AmbientGeometry`, `FlowField`)
- Contact delivery through [Resend](https://resend.com/) or Gmail SMTP via [Nodemailer](https://nodemailer.com/)
- [Vercel Analytics](https://vercel.com/analytics) and optional Google Analytics

Animations respect `prefers-reduced-motion`.

## Getting started

Requirements: Node.js 20 or newer, and npm.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

No environment variables are required for local development. To configure optional features, copy the example file and fill in only what you need:

```bash
cp .env.example .env.local
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build (also type-checks and lints) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint and apply automatic fixes |
| `npm run format` | Format files with Prettier |
| `npm test` | Run the end-to-end tests against the production build |

Type-check without building: `npx tsc --noEmit`.

## Tests

The end-to-end tests in `tests/e2e/` use Node's built-in test runner (no extra dependencies). `npm test` starts the production build on a free port, runs the tests against it, and stops the server, so build first:

```bash
npm run build
npm test
```

They cover the home page and every project page (titles and live demo and GitHub links, including that the Flutter project has no demo or APK link), the not-found page, the sitemap, the CV download, broken images, and contact API validation and rate limiting. The contact tests never submit a fully valid message, so no email is sent even when email credentials are configured.

## Environment variables

All variables are optional. Leave a value empty to keep that feature disabled.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Server | Sends contact form messages through Resend. |
| `GMAIL_APP_PASSWORD` | Server | Fallback delivery through Gmail SMTP, authenticated as the recipient address. |
| `CONTACT_EMAIL` | Server | Recipient address. Defaults to the email in `src/lib/site.ts`. |
| `NEXT_PUBLIC_SITE_URL` | Public | Site URL for metadata, sitemap, and robots. On Vercel the production URL is detected automatically. |
| `NEXT_PUBLIC_GA_ID` | Public | Google Analytics measurement ID. Analytics is skipped when empty. |

Without `RESEND_API_KEY` or `GMAIL_APP_PASSWORD`, the contact form saves submissions to a local `messages.txt` in development (ignored by Git) and returns an error in production.

The contact API validates input, rejects common disposable email domains, limits field lengths, and rate-limits each IP address in memory.

## Deployment

The project is set up for [Vercel](https://vercel.com/): import the repository, keep the default Next.js settings, and add the contact form variables in the project settings. Vercel Analytics only loads on Vercel deployments.

## Project structure

```text
public/
├── Projects/<slug>/    # Project cover images
├── Services/           # Skill icons
└── files/              # Downloadable CV
src/
├── app/                # Routes, layout, metadata, sitemap, robots, manifest, contact API
├── components/         # Sections, shared layout, canvas effects, UI primitives
├── lib/                # Site config (site.ts), project data (projects.ts), GSAP setup, helpers
├── types/              # Ambient type declarations
└── utils/              # Storage helpers
tests/e2e/              # End-to-end tests and runner
```

Personal details live in `src/lib/site.ts`, and project content lives in `src/lib/projects.ts`.
