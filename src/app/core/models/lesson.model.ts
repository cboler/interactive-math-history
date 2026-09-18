export type CognitiveStage = 'foundations' | 'elementary' | 'intermediate' | 'advanced';

export type MathematicalStrand =
  'numeracy' | 'arithmetic' | 'algebra' | 'geometry' | 'number-theory' | 'logic' | 'calculus';

export type VisualizerMode =
  | 'number-line-vector'
  | 'balance-scale'
  | 'grid-array'
  | 'partition-slicer'
  | 'logic-circuit'
  | 'geometric-compass';

export interface ScholarlyInterpretation {
  claim: string;
  proponentsOrSources: string;
  evidenceSummary: string;
}

export interface EpistemicStatus {
  consensusLevel: 'established' | 'probable' | 'contested' | 'speculative';
  summary: string;
  competingHypotheses: ScholarlyInterpretation[];
}

export interface ArtifactPlate {
  title: string;
  credit: string;
  license: string;
  sourceUrl: string;
  imageUrl: string;
  altText: string;
  caption: string;
}

export interface ExploreNode {
  label: string;
  category: 'artifact' | 'person' | 'civilization' | 'concept' | 'primary-text';
  wikipediaUrl: string;
}

export interface AcademicSource {
  author: string;
  title: string;
  citationSnippet: string;
  publicationYear?: number | string;
}

export interface DiscoveryChallenge {
  prompt: string;
  targetAxiom: string;
  successCondition: string;
  guidanceTip: string;
}

export interface InteractiveConfig {
  visualizer: VisualizerMode;
  initialState: Record<string, unknown>;
  // Backwards compatibility for legacy slider components
  minA?: number;
  maxA?: number;
  defaultA?: number;
  minB?: number;
  maxB?: number;
  defaultB?: number;
}

export interface MathLesson {
  id: string;
  slug: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  stage: CognitiveStage;
  strand: MathematicalStrand;
  order: number;
  prerequisites: string[];
  civilization: string;
  historicalEra: string;
  mathematicalStatement: string; // LaTeX formatted string

  discoveryHook: DiscoveryChallenge;

  narrative: {
    hook: string;
    historicalContext: {
      story: string;
      civilizationOrOrigin: string;
      approximateDate: string;
      epistemicStatus: EpistemicStatus;
    };
    conceptualExplanation: string[];
    realWorldApplication: string;
  };

  artifactPlate?: ArtifactPlate;
  exploreGraph: ExploreNode[];
  academicSources: AcademicSource[];
  interactiveConfig: InteractiveConfig;

  // Optional legacy route/level support
  level?: string;
}
