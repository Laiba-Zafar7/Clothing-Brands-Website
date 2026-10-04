# CLAUDE.md — KAIRO

The design and engineering rulebook for this project. Read it before touching code. When a rule here conflicts with a personal design instinct, this file wins. When this file is silent, the reference website/video wins.

---

## 1. Project goal

A premium, editorial fashion e-commerce site for the (fictional) house **KAIRO** — womenswear, menswear and accessories — that reproduces the *experience* of the reference site as closely as possible: its layout, rhythm, typography, stacked/sticky scrolling, split edit panels, a cinematic video hero and quiet product presentation. All copy is original. All imagery comes from the provided local assets.

## 2. Reference website

`https://feadvaita.framer.website/` (Framer). Findings from its markup:

- Fonts: **Playfair Display** (display serif) + **General Sans** (UI/body sans).
- Palette: `rgb(241,241,241)` page grey, `#000` black, `rgb(25,25,25)` card panel, `rgb(153,153,153)` muted text, `rgb(209,209,209)` hairline.
- Uppercase micro-type with generous tracking (`0.14em`) for labels; tight negative tracking (`-0.02em` … `-0.04em`) on large serif headings, `line-height ≈ 1–1.1`.

## 3. Reference video

`referance-video.mp4` (1:55, 1896×884, desktop). Frames reviewed every 2 s plus full-res keyframes. Observed, in order:

| t | What happens |
|---|---|
| 0–2s | Hero: full-bleed still of two models, transparent header on top. Big two-line Playfair headline bottom-left ("Considered design, effortless presence."). Centre: thin large **“+”** cross, 3 white **hotspot dots** with a soft translucent halo, a small uppercase paragraph under the cross. |
| 2s | **Ethos** split: left 60% light-grey text panel (label “ETHOS” right-aligned over a hairline, small eyebrow, large serif statement, hairline, small uppercase paragraph); right 40% full-height photo of a clothes rack. |
| 4–12s | **Women’s Edit** split. Left half: *sticky* full-height video (red dress + umbrella), darkened, serif title top-centre, uppercase caption bottom. Right half: black column — “+”, serif “Just Landed”, “WOMEN’S 2025 – 2026”, then a single vertical column of product cards (~47% of the half width, centred, big vertical gaps). Cards: image + dark `#191919` caption (NAME / $PRICE uppercase). Hover: a **bookmark square + “QUICK SHOP ⟶ cart” bar** slides up over the image bottom. Column ends with “VIEW THE FULL EDIT”. |
| 10–38s | **Men’s Edit** mirrors it: black product column left (“+ / New This Season / MEN’S 2025 – 2026”), sticky dark video right. |
| 30s | Sections **stack**: the next panel slides *over* the previous sticky panel (Ethos is covered by the Women’s Edit). |
| 14–24s | Category page (Women): full-viewport video hero, centred serif “Women”, uppercase copy, outlined **“SCROLL TO DISCOVER ↓”** pill. Then grey listing: “ALL PIECES … WOMENSWEAR” row, hairline, filter bar (“FILTERS +” left, sub-category tabs with superscript counts centre, “N PIECES” right), hairline, grid. Grid = 4 columns; **first card spans 2×2**. Tab change filters instantly; active tab underlined. |
| 26s, 68s | Footer: black. Brand, one-line description, cities; columns SHOP / COMPANY / GET IN TOUCH; a **giant bold sans wordmark** spanning the width; hairline; © and TERMS / PRIVACY / SHIPPING. |
| 54–58s | **Latest Trends**: “Discover the / Latest Trends” in huge serif, second line indented with a small “LATEST ARRIVALS” label to its left, uppercase paragraph bottom-right. Then a **pinned horizontal scroll** of white product cards; every other card offset lower. |
| 60–64s | **Testimonials**: centred label, “What they say.”, uppercase subline; a slowly drifting row of quote columns (hairline, stars, serif quote, round avatar, “NAME, CITY”). |
| 64s | **Capsule**: split — black text half (“CAPSULE”, serif “Monochrome”, uppercase line), B&W portrait half. |
| 66–70s | **Newsletter**: “First look, every season.” huge centred serif, uppercase subline, underlined email input + black **JOIN** button, small reassurance line. |
| 72–78s | About: split image/text “Small runs, finished by hand.”, “02 / Our Craftsmanship / +” with image, stacked images, “Join Our Newsletter” split. |
| 80–84s | Journal: “JOURNAL”, “Notes from the workroom.” with **scroll-driven word reveal (grey → black)**, 2-column article grid (image, “CATEGORY · N MIN”, serif title, uppercase excerpt). |
| 88–90s | Contact: left “Get in touch!” / “Let’s Talk” / details; right dark image with dark form fields and white “SEND MESSAGE”. |
| 94–96s | FAQ: left sticky dark image with serif “FAQ”; right numbered accordion “(01) Question +”. |
| 100–114s | Accessories page; **filter drawer** slides from the left (ON SALE ONLY, PRICE chips, COLOUR swatches with counts, SIZE squares, CLEAR ALL / black VIEW N PIECES). |

Header throughout: logo left (bold sans caps), MEN / WOMEN / ACCESSORIES next to it, HOME / ABOUT / JOURNAL / CONTACT / FAQ centred (active item underlined), search + bookmark + bag icons right with tiny round count badges. Transparent, with a soft top gradient; text colour follows the section beneath.

## 4. Asset usage rules

- Source folder: `../clothing-gallery` (46 images, 10 videos). Processed copies live in `public/` — **never** reference the source folder at runtime.
- Assets were renamed semantically, resized (≤2000 px long edge, progressive JPEG q84) and videos transcoded (H.264, CRF 27, no audio, ≤14 s, `+faststart`, 720–1600 px wide) by a one-off pipeline. Total media ≈ 16 MB (from ≈ 200 MB).
- Asset map:

| Use | File |
|---|---|
| Hero video diptych | `videos/hero-left.mp4` (from `10139117-hd_2048_1080_25fps.mp4`: men in long coats on a seaside rock, 14 s, 1600 px) + `hero-left-poster.jpg`; `videos/hero-right.mp4` (from `hero1.mp4`: two women before stacked logs, portrait, 14 s, 960 px) + `hero-right-poster.jpg` |
| Ethos | `images/editorial/rack.jpg` |
| Women’s Edit / Women hero | `videos/women-edit.mp4` + `women-edit-poster.jpg` |
| Men’s Edit | `videos/men-edit.mp4` + poster |
| Men hero | `videos/men-hero.mp4` + poster |
| Accessories hero | `accessories-a/b/c.jpg` triptych |
| Capsule | `videos/capsule.mp4` (rendered grayscale) |
| About | `videos/atelier.mp4`, `studio.jpg`, `linen.jpg`, `folded.jpg`, `rack.jpg` |
| FAQ | `videos/faq.mp4` |
| Contact | `studio.jpg` |
| Journal | `field`, `street`, `forest`, `autumn`, `runway`, `linen`, `folded`, `studio` |
| Footer | `videos/footer.mp4` (from `111.mp4`: woman in a white dress in a meadow, 13 s, 960 px) + `footer-poster.jpg` — small centred 16:9 frame above the wordmark, arched top (`rounded-t-full`, a client-requested exception to the hard-edge rule) |
| Testimonials | `images/avatars/avatar-1…6.jpg` |
| Products | `images/products/<slug>.jpg` + `<slug>-detail.jpg` |

- Never add stock imagery, gradients or placeholders where a local asset exists.
- Don’t duplicate media: the same video file is reused (e.g. women-edit on Home and /women) so it is cached once.

### Hero decision

The reference hero carries product hotspots over a still. Our hero is a two-video diptych (`10139117-hd_2048_1080_25fps.mp4` + `hero1.mp4`, per the client). The garments in those films are not in the catalogue, so hotspots were removed rather than pointing at the wrong pieces. Re-add them only over footage whose garments exist as products.

## 5. Design direction

Quiet luxury, editorial, calm, image-first. Hard edges (no radius except avatars/badges). Contrast of **huge serif** vs **tiny tracked uppercase sans**. Black and light-grey planes alternate; photography carries all colour. Hairlines instead of boxes. Nothing glows, bounces, or floats.

## 6. Typography

- `--font-display`: Playfair Display 400 (italic allowed sparingly). Used for every heading and product names on PDP, quotes, accordion questions.
- `--font-sans`: General Sans 400/500/600 (self-hosted in `app/fonts`). Used for UI, labels, body.
- Scale (all `clamp()`):
  - `display-xl` hero: `clamp(3rem, 7.2vw, 7.5rem)`, lh 1, tracking -0.03em
  - `display-lg` section: `clamp(2.5rem, 5.6vw, 5.6rem)`, lh 1.02
  - `display-md`: `clamp(2rem, 3.6vw, 3.5rem)`, lh 1.08
  - `display-sm`: `clamp(1.375rem, 1.9vw, 1.75rem)`, lh 1.2
  - `label` (eyebrow/meta): 11–12px, uppercase, `0.14em` tracking (`.eyebrow`)
  - `meta` (product name/price, nav): 12–13px uppercase, 0.02em
  - Body copy: uppercase 12–13px lh 1.55 in editorial blocks (as reference); sentence-case 15px for long reading (journal articles, legal).
- Weights: never above 600. Wordmarks are the only 600.

## 7. Color system

CSS variables in `app/globals.css`, exposed to Tailwind via `@theme`:

```
--background #f1f1f1   page grey
--foreground #0a0a0a   ink
--surface    #ffffff   product card panel (light)
--surface-dark #191919 product card panel (dark)
--muted      #999999   secondary text
--border     #d1d1d1   hairlines on light
--border-dark #2a2a2a  hairlines on black
--accent     #000000   buttons
```

No other hues in UI chrome.

## 8. Spacing system

- Page gutter `--gutter: clamp(1rem, 2.5vw, 2.5rem)`; listing content is inset `5vw` like the reference.
- Section vertical rhythm `--section-y: clamp(5rem, 12vw, 10rem)`.
- Header height `--header-h: 72px` desktop / 60px mobile.
- 4-px based Tailwind spacing; avoid arbitrary px values — add a token if a value repeats.

## 9. Responsive rules

Breakpoints tested: 1440, 1280, 1024, 768, 430, 390, 375.

- `lg` (≥1024) is the full desktop layout (split panels, centred nav, 4-col grid).
- `<1024`: header collapses to logo + search + bag + menu; split panels stack (video panel becomes a 70svh block above the product list, which becomes a 2-col grid); horizontal scroll becomes native swipe (`overflow-x: auto`, scroll-snap) instead of pinned.
- Listing grid: 4 cols ≥1024 (first card 2×2), 3 cols ≥768 (first card 2×2), 2 cols mobile (first card spans 2 cols).
- Hero diptych shows only the right video on mobile; `object-position` keeps the models inside each portrait half (left 44% 50%; right 50% 50%).
- `svh` units for viewport heights (mobile toolbars). No horizontal overflow at any width (`overflow-x: clip` on body as a guard, never as a fix).

## 10. Animation rules

- Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`; durations 300 ms (hover), 700–1100 ms (reveals).
- Allowed: fade + 24 px rise, line/word reveals from a clipping mask, image clip-path reveal, slow image scale (1.08 → 1), sticky stacking, pinned horizontal scroll, scroll-scrubbed word colour reveal, drawer slides.
- GSAP + ScrollTrigger **only** for: pinned horizontal scroll, scrubbed text reveal, parallax. Everything else is CSS transitions + a tiny IntersectionObserver `Reveal`.
- All GSAP code lives inside `useGSAP`-style effects with `gsap.context()` cleanup, registered once, and is skipped when `prefers-reduced-motion: reduce`.
- Reduced motion: no pin, no parallax, no marquee drift, reveals show instantly; videos don’t autoplay (poster shown).

## 11. Component architecture

```
app/                     routes (App Router), globals.css (tokens + utilities), fonts/, icon.svg, not-found
components/
  layout/   Header (section-theme probe via [data-header]), MobileNav, Footer, Overlays
  hero/     Hero (two BackgroundVideo halves, veil + bottom fade for legible white type)
  products/ ProductCard, QuickShop, ProductGrid, ProductGallery, ProductInfo
  sections/ Ethos, EditSplit, LatestTrends, Testimonials, Capsule, Newsletter, CategoryHero,
            PageIntro, WordReveal, ArticleCard, ContactForm, FaqList, LegalPage
  shop/     Listing, FilterBar, FilterDrawer, CategoryPage, SearchOverlay, CartDrawer, WishlistDrawer
  ui/       Button (+ ButtonLink, Cross), Drawer, Reveal (+ RevealLines), BackgroundVideo
lib/        store (bag, saved, open panel), products (queries/search/sort), filters, motion (reduced-motion + lazy GSAP), format, cn
data/       products, site (nav, categories, copy), journal, faq, testimonials, legal
```

- Every section sets `data-header="light" | "dark"`; the header reads the section beneath it to pick its colour.
- Sticky stacking: Hero (all sizes) and Ethos (≥lg) are `sticky top-0`; later sections are `relative z-10` with opaque backgrounds so they slide over.

- Data never lives in components. Components receive typed props.
- Server Components by default; `"use client"` only where there is state, effects or GSAP.

## 12. Page structure

Home: Header → Hero (video diptych) → Ethos → Women’s Edit (split, video left) → Men’s Edit (split, video right) → Latest Trends (pinned horizontal) → Testimonials → Capsule → Newsletter → Footer.
Routes: `/`, `/men`, `/women`, `/accessories`, `/shop`, `/product/[slug]`, `/about`, `/journal`, `/journal/[slug]`, `/contact`, `/faq`, `/privacy`, `/terms`, `/shipping`, custom 404.

## 13. Product UI rules

- Card = image (4:5, `object-cover`) + caption panel (white on light pages, `#191919` on black). Name uppercase 12–13px, price below. No borders, no radius, no shadows, no badges except a quiet “NEW”/“SALE” text label.
- Hover (pointer devices): image scales to 1.04 over 900 ms; Quick-shop bar (bookmark square + “QUICK SHOP” + bag icon) rises from the image bottom. On touch, the bar is always visible in a compact form on the PDP only; cards link straight through.
- Quick shop opens a size picker in place; one-size items add directly.
- Prices in GBP, formatted with `Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })` (London house).
- Wishlist (bookmark) and bag state persist in `localStorage`; header badges show real counts (hidden at 0).

## 14. Image / video handling

- Always `next/image` with explicit `sizes`. `priority` only on the hero images. Everything else lazy.
- Videos: `BackgroundVideo` component — `muted playsInline loop preload="none"`, poster image, **plays only while in view** (IntersectionObserver), pauses when out of view, never autoplays under reduced motion.
- Image focal points via `object-position`, set per breakpoint where the crop matters.

## 15. Performance rules

- No video loads before it approaches the viewport.
- Only hero images preload.
- GSAP is imported only by the client components that need it.
- No UI libraries beyond `gsap` and `lucide-react`.
- Fonts self-hosted/`next/font` with `display: swap`.

## 16. Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, ordered headings.
- Drawers/overlays: `role="dialog"`, `aria-modal`, labelled, focus moved in and restored on close, `Esc` closes, body scroll locked, focus trapped.
- Visible `:focus-visible` outline (1px solid currentColor, 3px offset).
- Decorative crosses and videos are `aria-hidden`; all product/editorial images have descriptive alt text.
- Header text colour switches with the section theme to keep contrast (improves on the reference, which washes out on grey).

## 17. Code quality

- Strict TypeScript, no `any`. Named exports for components, default exports only for route files.
- Small components; no file over ~250 lines.
- Tokens over magic numbers. Tailwind utilities first; component CSS only for things Tailwind can’t express cleanly (marquee and entrance keyframes).
- No TODOs, dead code, unused imports, console logs, fake loaders or broken links.

## 18. Things to avoid

Purple/neon, gradients as decoration (the only gradients allowed are the header legibility fade and video scrims), glassmorphism, glows, blobs, 3D, bouncing, big rotations, drop shadows, rounded containers, large buttons, heavy borders, generic 3-card SaaS grids, stock photos, emoji, copying the reference’s text.

## 19. Final QA checklist

- [x] Home section order and split/sticky behaviour matches video
- [x] Hero videos lazy-start, fall back to posters under reduced motion, models stay in frame at all widths
- [x] Header theme switches over light/dark sections; mobile menu works
- [x] Listing filters, counts, filter drawer, sort all work
- [x] PDP add-to-bag → drawer shows item; quantity/remove/subtotal correct
- [x] Search finds by name, category, tag
- [x] Every route renders; 404 renders; no broken links
- [x] No console errors, no broken images, `next build` passes, `tsc` clean
- [x] 1440/1280/1024/768/430/390/375 checked, no horizontal overflow
- [x] Reduced motion honoured (no pin/marquee/autoplay)
- [x] Videos lazy and pause off-screen

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
