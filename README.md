# NeoNode Web Solution

Official production website for **NeoNode Web Solution** — a premium web development agency.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form + Zod
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Pages

- `/` — Homepage with all marketing sections
- `/about` — About the agency
- `/services` — Full services listing
- `/portfolio` — Project showcase with filters
- `/portfolio/[slug]` — Project detail
- `/process` — Development process
- `/pricing` — Pricing packages
- `/faq` — Frequently asked questions
- `/contact` — Contact form
- `/blog` — Blog listing
- `/blog/[slug]` — Blog article
- `/privacy` — Privacy policy
- `/terms` — Terms of service

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/
│   ├── animations/   # Framer Motion primitives
│   ├── layout/       # Header, Footer, global UI
│   ├── sections/     # Page sections (Hero, FAQ, etc.)
│   └── ui/           # Reusable UI components
├── config/           # Site configuration
├── data/             # Static content data
├── hooks/            # Custom React hooks
├── lib/              # Utilities, metadata, structured data
├── schema/           # Zod validation schemas
└── types/            # TypeScript types
```

## Configuration

Update site details in `src/config/site.ts` (URL, email, phone, social links).

## License

Private — NeoNode Web Solution. All rights reserved.
