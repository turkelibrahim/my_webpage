# İbrahim Türkel — Personal Portfolio V6

A Turkish/English personal portfolio with a compact editorial dashboard layout. Built using static HTML, CSS and JavaScript; no frontend package installation is required.

## Run locally (Windows)

- Extract this release into a new folder.
- Double-click `start.bat`.
- Open `http://127.0.0.1:5175`.

Or run `node scripts/serve.mjs . 5175`.

## V6 design

The oversized portrait-led hero has been replaced by a compact two-column introduction with a small landscape portrait, a three-part focus strip, and selected projects immediately below the introduction. Sections use distinct sage, blue-grey, sand and lilac surfaces. The sticky navigation highlights the active section, while the progress rail displays both scroll progress and the current section label.

## Contents

- Bilingual Home, Projects, About, Skills, Experience, Certificates, Journal and Contact sections
- Five selected public GitHub repositories
- Actual profile photo and included résumé PDF
- Eleven certificate records with credential links
- Contact form with email-draft fallback; a hosted form endpoint can be configured in `public/contact-config.js`
- Canonical URL, sitemap, robots, Open Graph and structured data retained

## Build GitHub Pages output

```bash
npm run build
npm run preview
```

The deployment output is generated into `docs/`; preview runs on `http://127.0.0.1:4176`.
