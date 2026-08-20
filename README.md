# Kapil Jangid — Portfolio

A route-based personal portfolio for Kapil Jangid, an AI-driven full-stack developer. The interface uses a restrained dark editorial system with a compact identity header, accessible left navigation drawer, and responsive natural-scrolling layouts.

## Stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 and project CSS tokens
- Framer Motion
- Lucide icons

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Welcome, About Me, Skills, and compact contact footer |
| `/certifications` | Certificate archive and verified digital badges |
| `/projects` | Project showcase |
| `/blogs` | Published technical writing |
| `/achievements` | Verified milestones and recognition |
| `/social` | Verified profile directory |
| `/assistant` | GokuBot, the grounded portfolio assistant |
| `/extras` | Learning, tools, gaming, setup, and website notes |

Legacy `/about`, `/journey`, `/services`, and `/contact` URLs redirect to their relevant Home section. `/open-source` redirects to Projects.

## Content and assets

Portfolio facts are centralised in [`data/portfolio.ts`](data/portfolio.ts). Update this source before changing route components.

- `projects`, `education`, `experience`, and skills data contain verified portfolio content.
    - `socialProfiles` drives the `/social` grid. GitHub, LinkedIn, Instagram, Credly, Reddit, Kaggle, Medium, HackerRank, PlayStation, and Email use supplied profile links.
- [`data/assistantKnowledge.ts`](data/assistantKnowledge.ts) derives GokuBot’s grounded records from centralised portfolio data.
- The original portrait is stored in `public/profile/kapil-portrait.jpg`.
- The downloadable résumé is `public/resume/kapil-jangid-resume.pdf`.

## GokuBot

GokuBot is an AI portfolio assistant, not an impersonation of Kapil. It answers supported questions using verified local portfolio records and keeps conversation history in the visitor’s browser session only.

`GET /api/assistant` reports a sanitised capability state:

- `ONLINE`: a configured provider is reachable and verified retrieval is available.
- `LIMITED MODE`: verified local retrieval is available.
- `OFFLINE`: neither capability is available.

No provider credentials are sent to the browser. If `GEMINI_API_KEY` is configured, the health check performs a short server-side reachability check; without it, the assistant remains in verified local retrieval mode.

## Local development

### Prerequisites

- Node.js 20 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Use the local address printed by Next.js after the server starts.

### Validate and build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```

There is currently no automated `test` script in `package.json`.

## Environment configuration

Copy `.env.example` to `.env.local` when configuring optional services.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Optional contact form endpoint. Without it, the contact flow uses a `mailto:` link. |
| `GEMINI_API_KEY` | Optional server-only provider key used by the assistant health check. Never expose this value with a `NEXT_PUBLIC_` prefix. |

## Accessibility and responsive behaviour

- Keyboard-accessible desktop navigation and touch-safe mobile navigation
- Visible focus indicators and reduced-motion support
- Responsive grids and safe-area spacing
- GokuBot supports Enter to send, Shift + Enter for a new line, and Escape to stop a request
- The mobile composer accounts for dynamic viewports and virtual keyboards where the browser exposes the Visual Viewport API

## Deployment

Deploy to any platform that supports Next.js 16. For Vercel, import the repository and use the default Next.js build settings.

Before going live:

1. Set `siteConfig.canonicalUrl` in `data/portfolio.ts` to the production domain.
2. Replace every social demo link with Kapil’s verified profile URL, or remove it.
3. Confirm résumé access, project links, contact flow, and every route.
4. Run linting, TypeScript validation, and the production build.

## Licence

Private portfolio project for Kapil Jangid.
