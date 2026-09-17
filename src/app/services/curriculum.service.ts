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
  ]);

  readonly activeLessonIndex = signal<number>(0);
  readonly currentLesson = computed(() => this.lessons()[this.activeLessonIndex()]);

  setLessonIndex(index: number): void {
    if (index >= 0 && index < this.lessons().length) {
      this.activeLessonIndex.set(index);
    }
  }
}
