# Rafayet Hossain — Portfolio

Business System Analyst · IT Project Manager · SQA Engineer · Lean Six Sigma Black Belt
TechnoVista Limited, Dhaka, Bangladesh

Live: **[rafayethossain.github.io/portfolio](https://rafayethossain.github.io/portfolio/)**

---

## What this is

A handcrafted, single-page portfolio. No framework, no build step, no template — plain HTML, CSS and vanilla JavaScript, deployable as-is to GitHub Pages.

The page is built as one argument: eight years spent in the handoff between what a business needs and what the engineering team builds. Everything is drawn from real work — Vista.Q, Eco-Tourism Sundarbans (live), Integrated Online Application System (CARE Bangladesh), Tottho Apa MIS, Broadcast Management System — with no invented testimonials or client names beyond what clients have approved.

## Tech

- Semantic HTML5 with Open Graph, Twitter Card and JSON-LD (`Person`) metadata
- CSS design system (custom properties): Fraunces + Inter + JetBrains Mono
  - Deep lavender (`#412F6B` / `#2A2237`) on warm sand (`#FBF8F1`), copper accents
- Vanilla JavaScript (IntersectionObserver-based reveals, counters, custom cursor, magnetic buttons, video lightbox over the YouTube embed)
- `prefers-reduced-motion` respected throughout; closed mobile menu hidden from keyboard focus
- Lighthouse: Accessibility **100** · Best Practices **100**

## Structure

```
.
├── index.html            # The page
├── 404.html              # On-brand not-found page
├── robots.txt            # Allow all
└── assets/
    ├── css/style.css     # Design system + all section styles
    ├── js/main.js        # Motion, navigation, lightbox
    └── img/              # Portraits, project shots, brand assets
```

Legacy build configuration (`package.json`, `tailwind.config.js`, `postcss.config.js`, `src/`) is retained from the earlier version and is unused by the current site.

## Run locally

```bash
python -m http.server 8125 --bind 127.0.0.1
# open http://127.0.0.1:8125
```

Any static file server works. The site has no build step and no external dependencies beyond Google Fonts.

## Publishing

The repository is served directly via GitHub Pages from `main` (root). After committing and pushing, Pages rebuilds in a minute or two. A hard refresh (Ctrl+Shift+R) may be needed to bypass the CDN cache.

## Contact

- Email: [rafayet14@gmail.com](mailto:rafayet14@gmail.com)
- WhatsApp: [+880 1710 493613](https://wa.me/8801710493613)
- LinkedIn: [linkedin.com/in/rafayethossain](https://www.linkedin.com/in/rafayethossain/)
- Writing: [Medium](https://rafayethossain.medium.com/) · [YouTube](https://www.youtube.com/channel/UCsTNdhx0etbm-571LVTCW2g/featured)
- GitHub: [@rafayethossain](https://github.com/rafayethossain)
