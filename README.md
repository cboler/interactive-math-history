# Interactive Math & History

An interactive, accessible curriculum for kids that connects each mathematical idea to the people who first needed it, the ideas it was built on, and the reasons it still matters.

Live application: **[https://cboler.github.io/interactive-math-history/](https://cboler.github.io/interactive-math-history/)**

---

## Overview

Before numbers were symbols written in ink, they were physical notches carved into bone to survive the changing seasons. **Interactive Math & History** bridges mathematical rigor with human origin stories:

- **History first**: Every lesson opens with the human story, a photograph of a real artifact, and a "How Do We Know?" card that says plainly how sure historians are and where they disagree.
- **Ideas build on ideas**: Each lesson shows what it builds on (with a one-sentence reason for every link) and where the idea leads next.
- **Hands-on labs**: Seven SVG visualizers driven by Angular Signals (number line, balance scale, grid, sharing baskets, bread slicer, logic circuit, compass and straightedge), each with polite `aria-live` narration.
- **Practice missions**: Short challenges completed in the lab. Progress is saved in the browser (`localStorage`) and can be reset per lesson.
- **Unit 1 addition game**: Six randomized questions, one at a time, with single-digit numbers and totals. Type an answer or tap the calculator total. Correct answers earn saved stars; previous/next arrows clear the calculator, and Play again starts a new set. The game session is stored separately from other lessons' mission progress.
- **Semantic Reader Mode**: Prose-first articles structured with semantic `<article>`, `<header>`, `<section>`, `<aside>`, and `<footer>` tags, designed for browser text-to-speech ("Listen to this page") and distraction-free reader modes.
- **Installable PWA**: Configured with Angular Service Worker (`ngsw-config.json`) and Web App Manifest. The app shell and illustrations work offline; artifact photographs are loaded from Wikimedia Commons and need a connection.
- **Automated GitHub Pages CI/CD**: Fully automated GitHub Actions workflow with Playwright multi-viewport smoke tests, linting, formatting, and SPA 404 routing fallback.

---

## Curriculum Structure

| Unit   | Stage        | Idea                                       | Historical Context                               | Lab                      | Builds on |
| :----- | :----------- | :----------------------------------------- | :----------------------------------------------- | :----------------------- | :-------- |
| **01** | Foundations  | Addition ($a + b = c$)                     | Ishango Bone, Central Africa (c. 20,000 BCE)     | Addition game            | —         |
| **02** | Foundations  | Subtraction ($a - b = c$)                  | Lebombo Bone, Southern Africa (c. 41,000 BCE)    | Number line              | 01        |
| **03** | Foundations  | Equality (if $A = B$ and $B = C$, $A = C$) | Euclid's Common Notions, Alexandria (c. 300 BCE) | Balance scale            | 01, 02    |
| **04** | Elementary   | Multiplication ($a \times b = b \times a$) | Babylonian multiplication tables (c. 1800 BCE)   | Grid array               | 01        |
| **05** | Elementary   | Division ($a \div b = c$)                  | Grain rations at Shuruppak, Sumer (c. 2600 BCE)  | Sharing baskets          | 02, 04    |
| **06** | Elementary   | Unit fractions ($3/5 = 1/2 + 1/10$)        | Rhind Papyrus, Egypt (c. 1550 BCE)               | Bread slicer             | 04, 05    |
| **07** | Intermediate | Logic (AND / OR)                           | Aristotle, then Boole and Shannon (c. 350 BCE)   | Logic circuit            | 03        |
| **08** | Intermediate | The first proof: an equilateral triangle   | Euclid's Elements I.1, Alexandria (c. 300 BCE)   | Compass and straightedge | 03, 07    |

The order is a teaching order, not a timeline: the oldest artifact (Unit 02) is not the first lesson, and Aristotle (Unit 07) lived before Euclid (Unit 03).

### Adding or editing a lesson

All lesson content lives in `src/app/services/curriculum.service.ts` and follows the `MathLesson` model in `src/app/core/models/lesson.model.ts`.

1. Add the lesson object with the next `order`, a unique `id` and `slug`, and a `stage` that is not easier than the lesson before it.
2. List earlier lessons in `prerequisites`, and give each one a sentence in `buildsOn` saying what is borrowed from it.
3. Write for children: short sentences, concrete examples, and no claim stated as fact unless the sources support it. Put uncertainty in `epistemicStatus`.
4. Pick an `interactiveConfig.visualizer`. Missions on slider labs use `targetA` / `targetB`; missions on the other labs need a `targetState` the lab can reach.
5. Add story and diagram images (SVG or PNG) to `public/assets/illustrations/`, and an `artifactPlate` whose image, credit, and license come from a Wikimedia Commons file page.
6. Run the quality gates below. The unit tests check prerequisites, mission reachability, and image sources for every lesson.

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
