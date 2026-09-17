export interface HistoricalSource {
  title: string;
  author: string;
  publicationYear?: number | string;
  citationSnippet: string;
  sourceUrl?: string;
}

export interface WikipediaReference {
  pageTitle: string;
  summary: string;
  url: string;
}

export type VisualizerMode = 'number-line-vector' | 'discrete-counters' | 'three-geometry';

export interface MathLesson {
  id: string;
  slug: string;
  level: 'foundations' | 'arithmetic' | 'algebra' | 'geometry' | 'calculus' | 'logic';
  order: number;
  title: string;
  subtitle: string;
  mathematicalStatement: string; // e.g. "a + b = c"

  // Semantic Reader Mode content (read aloud by browser TTS engines)
  narrative: {
    hook: string;
    historicalContext: {
      story: string;
      civilizationOrOrigin: string;
      approximateDate: string;
      sources: HistoricalSource[];
      wikipedia: WikipediaReference;
    };
    conceptualExplanation: string[];
    realWorldApplication: string;
  };

  // Interactive sandbox configuration
  interactiveConfig: {
    visualizer: VisualizerMode;
    minA: number;
    maxA: number;
    defaultA: number;
    minB: number;
    maxB: number;
    defaultB: number;
  };
}
