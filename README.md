# Kapil Jangid — Portfolio

Production portfolio for Kapil Jangid, an AI driven full stack developer. Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide.

## Production checks

```bash
npm run build
npm start
```

The site includes six focused routes: Home, About, Projects, Journey, Services, and Contact. The résumé is served at `/resume/kapil-jangid-resume.pdf`; the contact form provides a production-safe email-client fallback.

## Content and assets

- Portfolio content: `data/portfolio.ts`
- Original hero portrait: `public/profile/kapil-hero-2026.png`
- Project visuals: `public/projects/`
- Résumé: `public/resume/kapil-jangid-resume.pdf`

## Deployment

Deploy on any platform that supports Next.js 16. Before publishing, set `siteConfig.canonicalUrl` in `data/portfolio.ts` to the final public domain.

## Licence

Private portfolio project for Kapil Jangid.
