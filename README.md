# Caraway Africa: Website (Home, About, Contact)

Next.js 16 + GSAP. Built from the Aleric theme's Business Consulting style and slimmed down to only
what these three pages need.

## Run
```bash
npm install
npm run dev          # http://localhost:3000  ->  /, /about, /contact
npm run build && npm start
```

## Project structure
```
src/
  app/
    layout.tsx            fonts (self-hosted via @fontsource: DM Sans + Playfair Display), global CSS, toasts
    globals.scss          reset + imports styles/site.scss
    (site)/layout.tsx     header, footer, preloader, cursor, smooth scroll
    (site)/template.tsx   page-transition curtain
    (site)/page.tsx       Home
    (site)/about/         About
    (site)/contact/       Contact
  components/
    layout/               Header, Menu, Footer, Preloader, PageCurtain, Cursor, SmoothScroll, Animator, HashScroll
    home/ about/ contact/ page sections
    ui/                   Button, Logo, Icons, PageHero, WideMedia, RotatingBadge, anim helpers
  data/site-data.ts       ALL text, links, contact details, numbers and image paths
  styles/site.scss        all styles; brand colours are CSS variables at the top
public/images/            photos (placeholders; replace keeping the same file names)
```

## Before launch
- Search `VERIFY` in `src/data/site-data.ts`: emails, office addresses, leadership names/photos,
  regional country counts, timeline dates and the vision/values wording need confirming with Caraway Africa.
- **Country website links:** paste the Ghana and Nigeria URLs into `marketSites` in `src/data/site-data.ts`.
  While a URL is empty, the navbar link scrolls to that country's section and its button shows "Coming soon".
  Once set, the navbar, section buttons and footer links open the country site in a new tab.
- **Logo:** a text logo is used until `brand.logo` / `brand.logoWhite` / `brand.logoMark` are set in `site-data.ts`.
- **Products:** edit the `products` list in `site-data.ts` (name, brand, category, description, image, markets).
  Product images live in `public/images/products/`.
- Photos are temporary. Swap in Caraway photography (farms, cocoa, coffee, people) with the same file names.
- Contact form: validates and animates but doesn't send yet. Hook it up at the `TODO` in
  `src/components/contact/ContactForm.tsx` (e.g. an API route or form service).

## Animations
- Preloader on first visit, curtain transition between pages
- Hero carousel: masked headline reveal, Ken Burns zoom, wipe transitions, progress tabs, scroll parallax
- Word-by-word fill on scroll, counters, line reveals, image clip reveals, parallax
- Scroll-velocity commodity marquee, pinned horizontal Businesses gallery (stacks on mobile)
- 3D annual-report book following the cursor
- About: expanding full-bleed image, stacking Purpose/Vision/Values cards, drawing timeline, map pins
- Contact: sliding region tabs, animated office cards, GSAP accordion, form success animation
- Custom cursor, magnetic buttons, rolling-text buttons, circular full-screen menu

Scroll effects are added with data attributes (`data-ag-split`, `data-ag-fade`, `data-ag-stagger`,
`data-ag-clip`, `data-ag-parallax`, `data-ag-fill`, `data-ag-count`, `data-ag-line`, `data-ag-magnetic`).
See `src/components/layout/Animator.tsx`.
