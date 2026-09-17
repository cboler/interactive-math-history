# Interactive Math & History

An interactive, accessible curriculum connecting mathematics with human history, computational visualizers, and reader-first accessibility.

Live application: **[https://cboler.github.io/interactive-math-history/](https://cboler.github.io/interactive-math-history/)**

---

## Overview

Before numbers were symbols written in ink, they were physical notches carved into bone to survive the changing seasons. **Interactive Math & History** bridges mathematical rigor with human origin stories:

- **Semantic Reader Mode**: Prose-first articles structured with semantic `<article>`, `<header>`, `<section>`, `<aside>`, and `<footer>` tags, designed for browser text-to-speech ("Listen to this page") and distraction-free reader modes.
- **Dynamic 2D Vector Visualizers**: SVG-based coordinate axes powered by Angular Signals, computing vector displacement in real-time with polite `aria-live` screen-reader narration.
- **On-Demand 3D Viewports**: WebGL Three.js visualizer scenes lazy-loaded via Angular `@defer` blocks to keep the initial page bundle featherweight.
- **PWA & Offline First**: Configured with Angular Service Worker (`ngsw-config.json`) and Web App Manifest for offline study and installation on mobile and desktop devices.
- **Automated GitHub Pages CI/CD**: Fully automated GitHub Actions workflow with Playwright multi-viewport smoke tests, linting, formatting, and SPA 404 routing fallback.

---

## Curriculum Structure

| Unit        | Mathematical Concept                  | Historical Context                                        | Primary Visualizer    |
| :---------- | :------------------------------------ | :-------------------------------------------------------- | :-------------------- |
| **Unit 01** | The Origin of Combining ($a + b = c$) | Ishango Bone & Paleolithic Central Africa (c. 20,000 BCE) | 2D Vector Number Line |

---

## Local Development

### Prerequisites

- Node.js 22+ (tested with Node.js 24)
- npm 10+

### Setup

```bash
git clone https://github.com/cboler/interactive-math-history.git
cd interactive-math-history
npm install
```

### Run Locally

```bash
npm start
```

Open `http://localhost:4200/` in your browser.

---

## Quality Gates & Verification

| Command                | Description                                                               |
| :--------------------- | :------------------------------------------------------------------------ |
| `npm run build`        | Builds production bundle with budget validation and lazy chunk generation |
| `npm test`             | Runs unit tests via Vitest (`ng test --watch=false`)                      |
| `npm run lint`         | Enforces Angular and TypeScript coding standards (`ng lint`)              |
| `npm run format:check` | Verifies Prettier code formatting                                         |
| `npm run e2e`          | Runs Playwright responsive smoke tests                                    |
| `npm run build:pages`  | Compiles app and generates GitHub Pages `404.html` SPA fallback           |

---

## License

[MIT](LICENSE)
