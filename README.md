# EgoGamingCo.com

Static marketing site for **EgoGamingCo**, served by GitHub Pages at
[egogamingco.com](https://egogamingco.com) (custom domain set in `CNAME`).

## Layout

```
.
├── index.html               # the whole site — one page
├── CNAME                    # custom domain for GitHub Pages
├── favicon.ico              # multi-size (16→256) ICO built from the mark
├── .nojekyll                # serve files as-is; skip Jekyll processing
└── assets/
    ├── css/site.css         # all styles, incl. the light/dark token sets
    ├── js/site.js           # colour-mode toggle + scroll reveal
    └── img/
        ├── egogaming-lockup.png       # worded logo (2048×342) — used ≥620px
        ├── egogaming-mark-1024.png    # mark only — hero art
        ├── egogaming-mark-512.png     # mark only — compact header, footer
        ├── favicon-16.png / -32.png
        ├── apple-touch-icon.png       # 180×180, white backdrop baked in
        ├── icon-192.png / icon-512.png
        └── og-cover.png               # 1200×630 social preview card
```

## Colour mode

Light is the default palette. Dark comes from `@media (prefers-color-scheme: dark)`,
so the site respects the OS setting **with JavaScript disabled**. The lightbulb button
in the header writes `data-theme="light" | "dark"` onto `<html>` and remembers the
choice in `localStorage` under `egc-theme`; those attribute rules override the media
query in both directions. An inline script in `<head>` applies the saved value before
first paint so there is no flash of the wrong mode.

Removing the `egc-theme` key returns the site to following the OS.

## Regenerating icons

`favicon.ico`, the PNG icons and `og-cover.png` are all derived from
`assets/img/egogaming-mark-1024.png` and `assets/img/egogaming-lockup.png`. If the
logo changes, re-run the generator script (kept out of the repo) or rebuild them with
any image tool at the sizes listed above.

## Local preview

```powershell
python -m http.server 8080
# or
npx serve .
```

Then open <http://localhost:8080>.

## Deploying

GitHub Pages serves the default branch from the repository root. Push to the default
branch and Pages will publish; `CNAME` keeps the custom domain bound.
