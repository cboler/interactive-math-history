import { Injectable, signal, computed } from '@angular/core';
import { MathLesson } from '../core/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  private readonly lessons = signal<MathLesson[]>([
    {
      id: 'unit-01-ishango-addition',
      slug: 'origins-of-addition',
      level: 'foundations',
      order: 1,
      title: 'The Origin of Combining: Physical Accumulation',
      subtitle: 'From Baboon Fibulae to Directional Number Lines',
      mathematicalStatement: 'a + b = c',
      narrative: {
        hook: 'Before numbers were symbols written in ink, they were physical notches carved into bone to survive the changing seasons.',
        historicalContext: {
          story:
            'Discovered near the headwaters of the Nile, the Ishango Bone dates back over 20,000 years. Early humans carved sequential notches into baboon bones, grouping tallies to record lunar cycles and seasonal food supplies. In Latin, the smooth stones used on early counting boards were called calculi—the direct ancestor of modern calculus.',
          civilizationOrOrigin: 'Upper Paleolithic Central Africa (Modern-day DRC)',
          approximateDate: 'c. 20,000 BCE',
          sources: [
            {
              title: 'A History of Mathematics',
              author: 'Carl B. Boyer and Uta C. Merzbach',
              citationSnippet: 'Chapter 1: The Origins of Counting.',
            },
            {
              title: 'The Crest of the Peacock: Non-European Roots of Mathematics',
              author: 'George Gheverghese Joseph',
              citationSnippet: 'Chapter 2: Rivers of Life.',
            },
          ],
          wikipedia: {
            pageTitle: 'Ishango bone',
            summary:
              'A bone tool dated to the Upper Paleolithic era, featuring carved notches often considered an early tally or mathematical device.',
            url: 'https://en.wikipedia.org/wiki/Ishango_bone',
          },
        },
        conceptualExplanation: [
          'Addition is the physical act of combining distinct collections or moving forward across a distance.',
          'When represented as a vector, a number is not a static position—it is a magnitude and a direction of travel.',
          'Subtracting is simply reversing direction along the exact same path.',
        ],
        realWorldApplication:
          'Vector addition is the foundation of aircraft navigation, game engine physics, and structural load analysis.',
      },
      interactiveConfig: {
        visualizer: 'number-line-vector',
        minA: 0,
        maxA: 10,
        defaultA: 4,
        minB: 0,
        maxB: 10,
        defaultB: 3,
      },
    },
    {
      id: 'unit-02-euclid-equality',
      slug: 'euclid-common-notions',
      level: 'foundations',
      order: 2,
      title: "The Bridge of Reason: Euclid's Common Notions",
      subtitle: 'Balancing Scales and the Transitive Law of Equality',
      mathematicalStatement: 'If A = B and B = C, then A = C',
      narrative: {
        hook: "Before modern algebra had an equals sign, equality was a physical equilibrium verified on a merchant's scale.",
        historicalContext: {
          story:
            'In Hellenistic Alexandria c. 300 BCE, Greek scholars synthesized centuries of practical Egyptian land surveys into rigorous axiomatic geometry. In Book I of the Elements, Euclid set forth his Common Notions—principles so intuitive they required no proof. The first stated that things equal to the same thing are also equal to one another. Just as a balance beam rests horizontal when equal weights sit on either side, mathematical deduction demands that identical relationships transfer unchanged across intermediate steps.',
          civilizationOrOrigin: 'Hellenistic Alexandria (Egypt)',
          approximateDate: 'c. 300 BCE',
          sources: [
            {
              title: 'The Thirteen Books of the Elements, Vol. 1',
              author: 'Euclid (trans. Sir Thomas L. Heath)',
              citationSnippet: 'Book I: Common Notions and Postulates.',
            },
            {
              title: 'Journey Through Genius: The Great Theorems of Mathematics',
              author: 'William Dunham',
              citationSnippet: "Chapter 2: Euclid's Proof of the Pythagorean Theorem.",
            },
          ],
          wikipedia: {
            pageTitle: 'Common notions',
            summary:
              "The foundational axioms in Euclid's Elements asserting that things equal to the same thing are also equal to one another.",
            url: 'https://en.wikipedia.org/wiki/Euclid%27s_Elements#Common_notions',
          },
        },
        conceptualExplanation: [
          'Equality is an equivalence relation possessing reflexivity (A = A), symmetry (if A = B then B = A), and transitivity (if A = B and B = C then A = C).',
          'If two separate quantities balance against the exact same third benchmark, they must balance each other perfectly.',
          'Adding or subtracting identical quantities from both sides of an equality preserves the equilibrium.',
        ],
        realWorldApplication:
          'Transitive equivalence underpins database relational joins, cryptographic zero-knowledge proofs, and automated formal verification compilers.',
      },
      interactiveConfig: {
        visualizer: 'number-line-vector',
        minA: 1,
        maxA: 10,
        defaultA: 5,
        minB: 1,
        maxB: 10,
        defaultB: 5,
      },
    },
    {
      id: 'unit-03-commutative-multiplication',
      slug: 'spatial-invariance-multiplication',
      level: 'arithmetic',
      order: 3,
      title: 'Spatial Invariance: The Commutative Law',
      subtitle: 'Why 3 × 5 Always Equals 5 × 3 Across Ancient Farmlands',
      mathematicalStatement: 'A × B = B × A',
      narrative: {
        hook: 'Turn a field by ninety degrees, and the crop yield remains unchanged: the birth of the area model.',
        historicalContext: {
          story:
            'Across the alluvial floodplains of the Nile and the Tigris-Euphrates valleys, tax assessors and scribes calculated crop quotas based on rectangular plots of land. Egyptian rope-stretchers (harpedonaptai) divided fields into orthogonal grids. Whether counting 3 rows of 5 irrigation plots or rotating their vantage point by 90 degrees to see 5 columns of 3 plots, the total area was invariant. Ancient Babylonian cuneiform tablets demonstrate that this spatial conservation became the bedrock of multiplication.',
          civilizationOrOrigin: 'Old Kingdom Egypt & Ancient Mesopotamia',
          approximateDate: 'c. 1800 BCE',
          sources: [
            {
              title: 'A History of Mathematics',
              author: 'Carl B. Boyer and Uta C. Merzbach',
              citationSnippet: 'Chapter 2: Egypt and Chapter 3: Mesopotamia.',
            },
            {
              title: 'The Crest of the Peacock: Non-European Roots of Mathematics',
              author: 'George Gheverghese Joseph',
              citationSnippet: 'Chapter 4: The Geometry of Agriculture.',
            },
          ],
          wikipedia: {
            pageTitle: 'Commutative property',
            summary:
              'A binary operation is commutative if changing the order of the operands does not change the result.',
            url: 'https://en.wikipedia.org/wiki/Commutative_property',
          },
        },
        conceptualExplanation: [
          'Multiplication is repeated addition along an orthogonal grid of rows and columns.',
          'Rotating a two-dimensional rectangular array swaps rows and columns without adding or removing any elements.',
          'Physical area is invariant under rigid Euclidean transformations, establishing the fundamental law of commutativity.',
        ],
        realWorldApplication:
          'Matrix operations in graphics shader pipelines, convolutional neural networks, and digital audio signal filtering.',
      },
      interactiveConfig: {
        visualizer: 'number-line-vector',
        minA: 1,
        maxA: 10,
        defaultA: 3,
        minB: 1,
        maxB: 10,
        defaultB: 5,
      },
    },
  ]);

  readonly activeLessonIndex = signal<number>(0);
  readonly currentLesson = computed(() => this.lessons()[this.activeLessonIndex()]);
  readonly allLessons = computed(() => this.lessons());
  readonly totalLessons = computed(() => this.lessons().length);

  readonly hasPrev = computed(() => this.activeLessonIndex() > 0);
  readonly hasNext = computed(() => this.activeLessonIndex() < this.lessons().length - 1);

  setLessonIndex(index: number): void {
    if (index >= 0 && index < this.lessons().length) {
      this.activeLessonIndex.set(index);
    }
  }

  nextLesson(): void {
    if (this.hasNext()) {
      this.activeLessonIndex.update((i) => i + 1);
    }
  }

  prevLesson(): void {
    if (this.hasPrev()) {
      this.activeLessonIndex.update((i) => i - 1);
    }
  }
}
