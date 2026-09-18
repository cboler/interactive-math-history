import { Injectable, signal, computed } from '@angular/core';
import { MathLesson } from '../core/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class CurriculumService {
  readonly isDrawerOpen = signal<boolean>(false);
  readonly activeLessonIndex = signal<number>(0);

  readonly lessons = signal<MathLesson[]>([
    // ==========================================
    // UNIT 01: Physical Accumulation
    // ==========================================
    {
      id: 'unit-01-ishango-addition',
      slug: 'origins-of-addition',
      shortTitle: 'Unit 01: Addition',
      title: 'The Origin of Combining: Physical Accumulation',
      subtitle: 'From Baboon Fibulae to Directional Number Lines',
      stage: 'foundations',
      strand: 'numeracy',
      order: 1,
      prerequisites: [],
      civilization: 'Upper Paleolithic Central Africa (Congo Basin)',
      historicalEra: 'c. 20,000 BCE',
      mathematicalStatement: 'a + b = c',
      discoveryHook: {
        prompt:
          'If you walk 4 paces east, and then 3 more paces east, how many total paces have you journeyed from your hearth?',
        targetAxiom: 'Addition as continuous displacement along a 1D vector line.',
        successCondition: 'Set Quantity A to 4 and Quantity B to 3 in additive mode.',
        guidanceTip:
          'Notice that the resulting arrow is not a static point; it is the compound length of two joined travels.',
      },
      narrative: {
        hook: 'Before numbers were symbols written in ink, they were physical notches carved into bone to survive the changing seasons.',
        historicalContext: {
          story:
            'Unearthed in 1950 by Belgian geologist Jean de Heinzelin at Ishango near Lake Edward, this 10-centimeter baboon fibula bears quartz-tool score marks arranged in distinct columns. While long romanticized as humanity’s first arithmetic calculator, archaeological consensus recognizes it as physical tallying—grouping quantities to bridge memory over time. In Latin, the smooth counting stones used for similar tallies were known as calculi: the literal etymological ancestor of modern calculus.',
          civilizationOrOrigin: 'Upper Paleolithic Central Africa (Modern-day DRC)',
          approximateDate: 'c. 20,000 BCE',
          epistemicStatus: {
            consensusLevel: 'contested',
            summary:
              'Scholars debate whether the markings represent intentional prime-number arithmetic, a 6-month lunar calendar, or merely functional grip-notches.',
            competingHypotheses: [
              {
                claim: 'Lunar Calendrical Device',
                proponentsOrSources: 'Alexander Marshack (1972)',
                evidenceSummary:
                  'Analyzed micro-wear on notches and correlated column tallies (11, 13, 17, 19) to lunar synodic phases.',
              },
              {
                claim: 'Mathematical Game or Arithmetic Table',
                proponentsOrSources: 'Jean de Heinzelin (1957); Claudia Zaslavsky',
                evidenceSummary:
                  'Grouping of numbers suggests deliberate duplication, addition, and early awareness of prime sequences.',
              },
              {
                claim: 'Skeptical View: Non-Mathematical Markings',
                proponentsOrSources: 'Olivier Keller (2010)',
                evidenceSummary:
                  'Argues grouping patterns are arbitrary artifacts of carving technique and grip rather than symbolic number theory.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Addition represents the physical accumulation of discrete objects or displacement across continuous space.',
          'On a coordinate axis, numbers are vectors possessing both length (magnitude) and direction.',
          'Subtraction does not destroy quantity; it simply reverses the spatial vector direction along the line.',
        ],
        realWorldApplication:
          '1D vector addition is the physical underpinning of inertial flight computers, kinematic game physics, and structural load distribution.',
      },
      artifactPlate: {
        title: 'The Ishango Bone (Royal Belgian Institute of Natural Sciences)',
        credit: 'Photo by Ben2 (Wikimedia Commons / RBINS)',
        license: 'CC BY-SA 3.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ishango_bone.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Ishango_bone.jpg/640px-Ishango_bone.jpg',
        altText: 'The fossilized Ishango bone displaying carved notches in three columns.',
        caption:
          'The Ishango bone, found near the Congolese border, bearing three columns of grouped incision marks.',
      },
      exploreGraph: [
        {
          label: 'Ishango Bone',
          category: 'artifact',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Ishango_bone',
        },
        {
          label: 'Lebombo Bone',
          category: 'artifact',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Lebombo_bone',
        },
        {
          label: 'Tally Sticks & Markings',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Tally_mark',
        },
        {
          label: 'History of Central Africa',
          category: 'civilization',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Pre-colonial_African_history',
        },
      ],
      academicSources: [
        {
          author: 'Carl B. Boyer and Uta C. Merzbach',
          title: 'A History of Mathematics',
          citationSnippet: 'Chapter 1: The Origins of Counting and Prehistoric Records.',
          publicationYear: 2011,
        },
        {
          author: 'George Gheverghese Joseph',
          title: 'The Crest of the Peacock: Non-European Roots of Mathematics',
          citationSnippet: 'Chapter 2: Rivers of Life: Prehistoric Mathematics in Africa.',
          publicationYear: 2010,
        },
      ],
      interactiveConfig: {
        visualizer: 'number-line-vector',
        initialState: { a: 4, b: 3, op: 'add' },
        minA: 0,
        maxA: 10,
        defaultA: 4,
        minB: 0,
        maxB: 10,
        defaultB: 3,
      },
      level: 'foundations',
    },

    // ==========================================
    // UNIT 02: Axioms of Equality
    // ==========================================
    {
      id: 'unit-02-euclid-equality',
      slug: 'euclids-common-notions',
      shortTitle: 'Unit 02: Equality',
      title: "The Bridge of Reason: Euclid's Common Notions",
      subtitle: 'Balancing Scales and the Transitive Law of Equality',
      stage: 'foundations',
      strand: 'logic',
      order: 2,
      prerequisites: ['unit-01-ishango-addition'],
      civilization: 'Ptolemaic Alexandria (Hellenistic Greece)',
      historicalEra: 'c. 300 BCE',
      mathematicalStatement: '\\text{If } A = B \\text{ and } B = C \\text{, then } A = C',
      discoveryHook: {
        prompt:
          'Place 5 weights on the left pan. How many weights must you place on the right pan to eliminate beam deflection?',
        targetAxiom: 'Common Notion 1: Things which equal the same thing also equal one another.',
        successCondition: 'Bring both Left and Right pans to equal quantities.',
        guidanceTip:
          'Watch the center equilibrium pointer align with the zero-degree vertical plumb line.',
      },
      narrative: {
        hook: 'Before the modern equals sign was invented in 1557, equality was not a mark on paper: it was physical balance verified upon an honest merchant’s scale.',
        historicalContext: {
          story:
            'In Ptolemaic Alexandria, Greek geometer Euclid cataloged the logical bedrock of geometry in the Elements. Rather than treating equality as self-evident intuition, he codified his "Common Notions"—foundational axioms establishing that things equal to the same thing are equal to each other, and that equals added to equals result in whole equals. These axioms governed land taxation and boundary disputes after the annual flooding of the Nile River.',
          civilizationOrOrigin: 'Alexandria, Egypt (Hellenistic Greek World)',
          approximateDate: 'c. 300 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Euclid’s Common Notions are universally acknowledged as the historical birth of rigorous deductive axiomatic proof.',
            competingHypotheses: [
              {
                claim: 'Did Euclid Author All Axioms?',
                proponentsOrSources: 'Thomas L. Heath (1908 Commentary)',
                evidenceSummary:
                  'Manuscript analysis indicates later Byzantine commentators may have expanded Euclid’s original five Common Notions to nine.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Equality ($=$) is an equivalence relation possessing reflexivity, symmetry, and transitivity.',
          'An algebraic equation represents an equilibrium: whatever transformation is performed on one pan must be mirrored on the other.',
          'Deductive mathematics requires unproven foundational postulates from which all theorems must logically derive.',
        ],
        realWorldApplication:
          'Transitive equality is the foundation of relational database query compilers, type inference engines in programming languages, and electronic scale calibrators.',
      },
      artifactPlate: {
        title: "Papyrus Oxyrhynchus 29 (Euclid's Elements Book II)",
        credit: 'University of Pennsylvania Museum / Wikimedia Commons',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:P._Oxy._I_29.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/P._Oxy._I_29.jpg/640px-P._Oxy._I_29.jpg',
        altText:
          'Ancient papyrus fragment with Greek text and a geometric diagram of Euclid Elements.',
        caption:
          "One of the oldest surviving fragments of Euclid's Elements (c. 75–125 CE), excavated at Oxyrhynchus.",
      },
      exploreGraph: [
        {
          label: "Euclid's Elements",
          category: 'primary-text',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Euclid%27s_Elements',
        },
        {
          label: 'Euclid of Alexandria',
          category: 'person',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Euclid',
        },
        {
          label: 'Axiomatic System',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Axiomatic_system',
        },
        {
          label: 'Balance Scale Metaphor',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Balance_puzzle',
        },
      ],
      academicSources: [
        {
          author: 'Euclid (Trans. Thomas L. Heath)',
          title: 'The Thirteen Books of The Elements (Vol. 1)',
          citationSnippet: 'The Common Notions and Historical Commentary, Book I.',
          publicationYear: 1956,
        },
        {
          author: 'William Dunham',
          title: 'Journey Through Genius: The Great Theorems of Mathematics',
          citationSnippet: "Chapter 2: Euclid's Proof of the Pythagorean Theorem.",
          publicationYear: 1990,
        },
      ],
      interactiveConfig: {
        visualizer: 'balance-scale',
        initialState: { a: 5, b: 5 },
        minA: 1,
        maxA: 10,
        defaultA: 5,
        minB: 1,
        maxB: 10,
        defaultB: 5,
      },
      level: 'foundations',
    },

    // ==========================================
    // UNIT 03: Spatial Invariance (Commutativity)
    // ==========================================
    {
      id: 'unit-03-commutative-multiplication',
      slug: 'spatial-invariance-multiplication',
      shortTitle: 'Unit 03: Multiplication',
      title: 'Spatial Invariance: The Commutative Law',
      subtitle: 'Why 3 × 5 Always Equals 5 × 3 Across Ancient Farmlands',
      stage: 'elementary',
      strand: 'arithmetic',
      order: 3,
      prerequisites: ['unit-01-ishango-addition'],
      civilization: 'Ancient Mesopotamia and Old Kingdom Egypt',
      historicalEra: 'c. 1800 BCE',
      mathematicalStatement: 'a \\times b = b \\times a',
      discoveryHook: {
        prompt:
          'Arrange a farm parcel into 3 rows of 5 crops. Now rotate the field 90 degrees. Did the total crop count change?',
        targetAxiom: 'Commutativity: Multiplicative area is invariant under planar rotation.',
        successCondition:
          'Press the Transpose button and verify the total dot count remains exactly 15.',
        guidanceTip:
          'Observe how rows transform into columns, yet the total area enclosed is completely conserved.',
      },
      narrative: {
        hook: 'Turn a field by ninety degrees, and the grain yield remains identical: the birth of the geometric area model.',
        historicalContext: {
          story:
            'In the fertile floodplains between the Tigris and Euphrates rivers, Babylonian scribes managed agricultural deeds using cuneiform clay tablets. When assessing crop yields or grain storage, they recognized that an orchard arranged in 3 rows of 5 date palms produced the exact same harvest as 5 rows of 3 palms. Multiplication ceased to be merely repeated addition—it became an invariant measurement of planar area.',
          civilizationOrOrigin: 'Mesopotamia (Babylonia) & Nile Valley Egypt',
          approximateDate: 'c. 1800 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'The geometric interpretation of multiplication as rectangular area is historically universal across Egyptian, Babylonian, and Vedic sources.',
            competingHypotheses: [
              {
                claim: 'Discrete vs Continuous Priority',
                proponentsOrSources: 'Reviel Netz (The Shaping of Deduction in Greek Mathematics)',
                evidenceSummary:
                  'Debates whether early civilizations viewed multiplication primarily as discrete dot-counting or continuous rectangular land surface area.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Multiplication maps two orthogonal linear dimensions ($A$ and $B$) to a 2D scalar area ($A \\times B$).',
          'The Commutative Property states that order of operations does not affect the resulting scalar product.',
          'Transposition of an $M \\times N$ matrix into an $N \\times M$ matrix preserves the trace, determinant, and total cardinality.',
        ],
        realWorldApplication:
          'Matrix transpose symmetry is central to image rotation algorithms, quantum state bra-ket commutators, and relational database cross-joins.',
      },
      artifactPlate: {
        title: 'Babylonian Clay Tablet YBC 7289',
        credit: 'Yale Babylonian Collection / Wikimedia Commons',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ybc7289-diagonal.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Ybc7289-diagonal.jpg/640px-Ybc7289-diagonal.jpg',
        altText:
          'Ancient Babylonian clay tablet depicting a square with intersecting diagonals and sexagesimal markings.',
        caption:
          'Tablet YBC 7289 (c. 1800–1600 BCE), demonstrating sophisticated Babylonian geometric calculation of square diagonals.',
      },
      exploreGraph: [
        {
          label: 'Commutative Property',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Commutative_property',
        },
        {
          label: 'Babylonian Mathematics',
          category: 'civilization',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Babylonian_mathematics',
        },
        {
          label: 'Area Model of Multiplication',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Multiplication_algorithm',
        },
      ],
      academicSources: [
        {
          author: 'Carl B. Boyer and Uta C. Merzbach',
          title: 'A History of Mathematics',
          citationSnippet: 'Chapter 3: Mesopotamia and Cuneiform Clay Deeds.',
          publicationYear: 2011,
        },
        {
          author: 'Eleanor Robson',
          title: 'Mathematics in Ancient Iraq: A Social History',
          citationSnippet: 'Scribal training and agricultural land surveying in Ur and Babylon.',
          publicationYear: 2008,
        },
      ],
      interactiveConfig: {
        visualizer: 'grid-array',
        initialState: { rows: 3, cols: 5, isTransposed: false },
        minA: 1,
        maxA: 8,
        defaultA: 3,
        minB: 1,
        maxB: 8,
        defaultB: 5,
      },
      level: 'arithmetic',
    },

    // ==========================================
    // UNIT 04: Unit Fractions & Slicing
    // ==========================================
    {
      id: 'unit-04-egyptian-fractions',
      slug: 'egyptian-unit-fractions-rhind',
      shortTitle: 'Unit 04: Fractions',
      title: 'The Bread Partition: Unit Fractions & Ahmes',
      subtitle: 'Decomposing Quantities into Non-Repeating Unit Shares',
      stage: 'elementary',
      strand: 'arithmetic',
      order: 4,
      prerequisites: ['unit-01-ishango-addition', 'unit-03-commutative-multiplication'],
      civilization: 'Middle Kingdom Egypt (Thebes)',
      historicalEra: 'c. 1550 BCE',
      mathematicalStatement: '\\frac{3}{5} = \\frac{1}{2} + \\frac{1}{10}',
      discoveryHook: {
        prompt:
          'You have 3 loaves of bread to distribute equally among 5 workers. Egyptian law forbids repeating fractions (like 1/5 + 1/5 + 1/5). Can you slice and distribute the loaves so every worker receives identical unit-fraction portions?',
        targetAxiom:
          'Every rational fraction can be expressed as a sum of distinct unit fractions: m/n = 1/x + 1/y.',
        successCondition:
          'Give each of the 5 worker baskets exactly 1/2 and 1/10 of a loaf (Total: 3/5).',
        guidanceTip:
          'Slice 2 loaves into halves (yielding 4 halves) and 1 loaf into tenths... then distribute them fairly!',
      },
      narrative: {
        hook: 'If you give five laborers each three-fifths of a loaf, disputes erupt over who received the ragged crust. Ancient Egyptian scribes resolved this by requiring identical, perfect unit slices.',
        historicalContext: {
          story:
            'In the Second Intermediate Period, a royal scribe named Ahmes transcribed what is now known as the Rhind Mathematical Papyrus (British Museum EA 10057). Rather than working with arbitrary fractions with changing numerators (such as 3/5 or 4/7), Egyptian accounting exclusively recognized unit fractions—quantities with a numerator of 1 (represented by the hieroglyph of an open mouth, "r", signifying a portion or mouth to feed). To divide 3 loaves among 5 men, Ahmes did not hand out 3 small fifth-slices. He gave each man 1/2 of a loaf plus 1/10 of a loaf. The sum is identical (1/2 + 1/10 = 5/10 + 1/10 = 6/10 = 3/5), but every laborer received the exact same set of physical cuts, eliminating social envy and accounting fraud.',
          civilizationOrOrigin: 'Thebes, Ancient Egypt (15th Dynasty)',
          approximateDate: 'c. 1550 BCE',
          epistemicStatus: {
            consensusLevel: 'probable',
            summary:
              'Historians agree on how the Egyptian algorithms worked, but debate WHY Egyptians refused to write repeating unit fractions like 1/3 + 1/3.',
            competingHypotheses: [
              {
                claim: 'Practical Physical Equity',
                proponentsOrSources:
                  'Richard J. Gillings (Mathematics in the Time of the Pharaohs)',
                evidenceSummary:
                  'Cutting bread or beer rations into distinct large and small slices made physical measurement and distribution verification trivial.',
              },
              {
                claim: 'Scribal Elite Aesthetic & Canon',
                proponentsOrSources:
                  'Annette Imhausen (Mathematics in Ancient Egypt: A Contextual History)',
                evidenceSummary:
                  'Suggests the unit-fraction canon was a formal, conservative scribal tradition taught in administrative schools rather than purely spontaneous arithmetic necessity.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'A unit fraction has the form $\\frac{1}{n}$, where $n$ is a positive natural integer.',
          'The Egyptian fraction expansion theorem guarantees that every positive rational number $\\frac{p}{q} < 1$ can be expressed as a finite sum of distinct unit fractions.',
          'Sylvester’s greedy algorithm provides one modern technique to decompose fractions, but ancient Egyptian scribes frequently chose more elegant, physically measurable denominators.',
        ],
        realWorldApplication:
          'Unit fraction decompositions are applied today in fair-division cake-cutting algorithms, packet scheduling in telecommunications networks, and heliostat mirror spacing.',
      },
      artifactPlate: {
        title: 'The Rhind Mathematical Papyrus (British Museum EA 10057)',
        credit: 'Trustees of the British Museum / Wikimedia Commons',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rhind_Mathematical_Papyrus.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rhind_Mathematical_Papyrus.jpg/640px-Rhind_Mathematical_Papyrus.jpg',
        altText:
          'Ancient Egyptian papyrus scroll filled with hieratic red and black mathematical script.',
        caption:
          'The Rhind Papyrus (c. 1550 BCE), copied by scribe Ahmes, containing the famous 2/n table and bread partition problems.',
      },
      exploreGraph: [
        {
          label: 'Rhind Mathematical Papyrus',
          category: 'primary-text',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Rhind_Mathematical_Papyrus',
        },
        {
          label: 'Scribe Ahmes',
          category: 'person',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Ahmes',
        },
        {
          label: 'Egyptian Fractions',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Egyptian_fraction',
        },
        {
          label: 'Eye of Horus Fractions',
          category: 'artifact',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Eye_of_Horus#As_fractions',
        },
      ],
      academicSources: [
        {
          author: 'Richard J. Gillings',
          title: 'Mathematics in the Time of the Pharaohs',
          citationSnippet:
            'Chapter 4: The 2/n Table of the Rhind Papyrus and the Division of Bread.',
          publicationYear: 1982,
        },
        {
          author: 'Annette Imhausen',
          title: 'Mathematics in Ancient Egypt: A Contextual History',
          citationSnippet: 'Administrative mathematics and table design in the Middle Kingdom.',
          publicationYear: 2016,
        },
      ],
      interactiveConfig: {
        visualizer: 'partition-slicer',
        initialState: { loaves: 3, workers: 5 },
      },
      level: 'elementary',
    },

    // ==========================================
    // UNIT 05: The Logic of Athens
    // ==========================================
    {
      id: 'unit-05-aristotle-logic',
      slug: 'aristotelian-logic-circuits',
      shortTitle: 'Unit 05: Logic',
      title: "The Architecture of Reason: Aristotle's Syllogism",
      subtitle: 'Propositional Connectives, Truth Tables, and Physical Circuits',
      stage: 'foundations',
      strand: 'logic',
      order: 5,
      prerequisites: ['unit-02-euclid-equality'],
      civilization: 'Classical Athens (Lyceum)',
      historicalEra: 'c. 350 BCE',
      mathematicalStatement: 'P \\land Q \\implies R',
      discoveryHook: {
        prompt:
          'To illuminate the Athenian Lyceum lantern, two premises must both be true (P AND Q). Wire the switches in series. What happens if you switch to an alternative premise (P OR Q)?',
        targetAxiom:
          'Conjunction requires simultaneous truth (series); disjunction requires at least one true path (parallel).',
        successCondition:
          'Configure the circuit to successfully illuminate the lamp under both AND and OR configurations.',
        guidanceTip:
          'Notice how electric current mirrors the flow of deductive validity: a broken switch invalidates the conclusion.',
      },
      narrative: {
        hook: 'Before logic was silicon chips and binary code, it was Aristotle pacing the Lyceum gardens, determining which arguments could never be refuted.',
        historicalContext: {
          story:
            'In 4th-century BCE Athens, democratic assemblies and courtroom trials demanded a reliable standard to separate genuine truth from sophistry. In the Prior Analytics, Aristotle established formal syllogistic deduction: if All humans are mortal (P) and Socrates is human (Q), then Socrates is mortal (R). Centuries later, Claude Shannon realized that these exact Boolean connectives could be physically manifested through electrical switches: closed switches represent True, open switches represent False, series wiring represents AND, and parallel wiring represents OR.',
          civilizationOrOrigin: 'Athens, Ancient Greece',
          approximateDate: 'c. 350 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Aristotle is recognized as the founder of formal logic, but historians debate the completeness of his term logic compared to later Stoic propositional logic.',
            competingHypotheses: [
              {
                claim: 'Term Logic Priority',
                proponentsOrSources: 'Aristotle (Organon / Prior Analytics)',
                evidenceSummary:
                  'Focused entirely on category inclusion (All A is B) rather than conditional statements (If P, then Q).',
              },
              {
                claim: 'Stoic Propositional Foundations',
                proponentsOrSources: 'Chrysippus of Soli (c. 280–206 BCE)',
                evidenceSummary:
                  'Developed true propositional calculus and five fundamental inference rules (including Modus Ponens) independent of Aristotle.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'A proposition is a declarative statement that is either strictly True ($1$) or False ($0$).',
          'Conjunction ($P \\land Q$) requires both inputs to be True, modeled physically by two switches wired in series.',
          'Disjunction ($P \\lor Q$) requires at least one input to be True, modeled physically by switches wired in parallel.',
          'Deductive validity ensures that if all premises are True, the conclusion cannot be False.',
        ],
        realWorldApplication:
          'Boolean algebra and propositional logic form the physical foundation of every digital microchip, logic gate (ALU), search engine query parser, and cryptographic proof.',
      },
      artifactPlate: {
        title: 'Bust of Aristotle (Roman copy after Greek original)',
        credit: 'Ludovisi Collection / National Roman Museum / Wikimedia Commons',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/640px-Aristotle_Altemps_Inv8575.jpg',
        altText: 'Marble bust of philosopher Aristotle with curly hair and beard.',
        caption:
          'Aristotle, whose Prior Analytics and Organon established the deductive syllogism as the bedrock of Western philosophy.',
      },
      exploreGraph: [
        {
          label: 'Aristotelian Logic',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Term_logic',
        },
        {
          label: 'Organon & Prior Analytics',
          category: 'primary-text',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Organon',
        },
        {
          label: 'Boolean Algebra',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Boolean_algebra',
        },
        {
          label: 'Claude Shannon & Circuits',
          category: 'person',
          wikipediaUrl:
            'https://en.wikipedia.org/wiki/A_Symbolic_Analysis_of_Relay_and_Switching_Circuits',
        },
      ],
      academicSources: [
        {
          author: 'William & Martha Kneale',
          title: 'The Development of Logic',
          citationSnippet: "Chapters 2–3: Aristotle's Syllogistic and the Megarian-Stoic School.",
          publicationYear: 1962,
        },
        {
          author: 'Claude E. Shannon',
          title: 'A Symbolic Analysis of Relay and Switching Circuits',
          citationSnippet:
            "Master's Thesis, MIT: Translating Boolean propositional logic into physical switching circuits.",
          publicationYear: 1938,
        },
      ],
      interactiveConfig: {
        visualizer: 'logic-circuit',
        initialState: { gate: 'AND', switchP: true, switchQ: false },
      },
      level: 'foundations',
    },
    // ==========================================
    // UNIT 06: Geometric Construction
    // ==========================================
    {
      id: 'unit-06-euclid-equilateral',
      slug: 'euclids-first-construction-equilateral',
      shortTitle: 'Unit 06: Geometry',
      title: 'The First Construction: The Equilateral Triangle',
      subtitle: "Straightedge, Rigid Compass, and Euclid's Elements Book I, Proposition 1",
      stage: 'foundations',
      strand: 'geometry',
      order: 6,
      prerequisites: ['unit-02-euclid-equality'],
      civilization: 'Ptolemaic Alexandria (Hellenistic Greece)',
      historicalEra: 'c. 300 BCE',
      mathematicalStatement: '\\triangle ABC \\implies AB = BC = CA',
      discoveryHook: {
        prompt:
          'Given only an unmarked straightedge and a collapsible compass, draw a segment AB. How can sweeping two identical circles pinpoint a third vertex C that is guaranteed to form an equilateral triangle?',
        targetAxiom:
          'Postulates 1 & 3: A straight line joins any two points, and a circle can be swept with any center and radius. By Common Notion 1, radii of equal circles are equal.',
        successCondition:
          'Complete the three geometric construction steps: Sweep Circle A, Sweep Circle B, and connect Vertex C.',
        guidanceTip:
          'Notice that segment AB acts simultaneously as the radius of Circle A and Circle B. Point C lies on the circumference of both.',
      },
      narrative: {
        hook: 'Geometry did not begin with measurements and rulers; it began with the pure intersection of two expanding circles.',
        historicalContext: {
          story:
            'Opening Book I of the Elements, Euclid did not start with an abstract definition of a triangle. He started with an imperative challenge: "On a given finite straight line, to construct an equilateral triangle." Using only two ideal instruments—an unmarked straightedge to connect points and a compass that snapped shut the moment it lifted from the papyrus—Euclid proved that purely synthetic, deductive operations could generate perfect physical symmetry without taking a single numeric measurement.',
          civilizationOrOrigin: 'Alexandria, Hellenistic Egypt',
          approximateDate: 'c. 300 BCE',
          epistemicStatus: {
            consensusLevel: 'contested',
            summary:
              "While Euclid's Proposition 1 is historically immortal, modern mathematical logicians identified a subtle flaw: Euclid assumed the two circles intersect without proving the continuum.",
            competingHypotheses: [
              {
                claim: 'The Hidden Continuity Assumption',
                proponentsOrSources:
                  'Moritz Pasch (1882); David Hilbert (Foundations of Geometry, 1899)',
                evidenceSummary:
                  "Euclid's postulates never state that continuous lines or circles must intersect if they cross. Hilbert introduced explicit axioms of continuity and order to make Proposition 1 strictly airtight.",
              },
              {
                claim: 'Diagrammatic Visual Rigor',
                proponentsOrSources: 'Kenneth Manders (2008); Reviel Netz',
                evidenceSummary:
                  'Argues that classical Greek mathematical practice treated stable topological features of lettered diagrams as legitimate inferential steps rather than deductive oversights.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Postulate 1 permits drawing a unique straight line segment between points $A$ and $B$.',
          'Postulate 3 permits describing circle $\\mathcal{C}_A$ centered at $A$ with radius $AB$, and circle $\\mathcal{C}_B$ centered at $B$ with radius $BA$.',
          'Since $C$ lies on circle $\\mathcal{C}_A$, distance $AC = AB$. Since $C$ lies on circle $\\mathcal{C}_B$, distance $BC = AB$.',
          'By Common Notion 1 ("Things equal to the same thing are equal to each other"), $AC = BC = AB$, proving $\\triangle ABC$ is equilateral.',
        ],
        realWorldApplication:
          'Synthetic straightedge-and-compass geometry forms the algorithmic basis of modern CAD spline curves, CNC toolpath interpolation, and planar triangulation meshes in computer graphics.',
      },
      artifactPlate: {
        title: "Euclid's Elements Book I, Proposition 1 (MS D'Orville 301)",
        credit: 'Bodleian Library, University of Oxford / Wikimedia Commons',
        license: 'Public Domain',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Euclid_Proposition_1_MS_D%27Orville_301.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Byzantine_Euclid.png/640px-Byzantine_Euclid.png',
        altText:
          'Byzantine manuscript page from 888 CE showing Greek text and Euclid Book I Proposition 1 diagram with two intersecting circles.',
        caption:
          "Manuscript MS D'Orville 301 (copied in 888 CE by Stephen the Clerk), displaying the canonical intersecting circles diagram for Proposition 1.",
      },
      exploreGraph: [
        {
          label: "Euclid's Elements Book I",
          category: 'primary-text',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Euclid%27s_Elements',
        },
        {
          label: 'Straightedge and Compass',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Compass-and-straightedge_construction',
        },
        {
          label: "Hilbert's Axioms",
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Hilbert%27s_axioms',
        },
        {
          label: 'Equilateral Triangle',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Equilateral_triangle',
        },
      ],
      academicSources: [
        {
          author: 'Euclid (Trans. Thomas L. Heath)',
          title: "The Thirteen Books of Euclid's Elements (Vol. 1)",
          citationSnippet:
            'Book I, Proposition 1: Historical commentary on the intersection of circles.',
          publicationYear: 1956,
        },
        {
          author: 'David Hilbert',
          title: 'Foundations of Geometry (Grundlagen der Geometrie)',
          citationSnippet:
            "Axioms of Order and Continuity resolving Euclid's diagrammatic omissions.",
          publicationYear: 1899,
        },
      ],
      interactiveConfig: {
        visualizer: 'geometric-compass',
        initialState: { step: 1, baseLength: 160 },
      },
      level: 'foundations',
    },
  ]);

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

  toggleDrawer(open?: boolean): void {
    if (typeof open === 'boolean') {
      this.isDrawerOpen.set(open);
    } else {
      this.isDrawerOpen.update((v) => !v);
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

  findLessonIndex(levelOrStage: string, unit: string): number {
    const norm = levelOrStage.toLowerCase().trim();
    const normUnit = unit.toLowerCase().trim();

    return this.lessons().findIndex((lesson) => {
      const matchStageOrLevel =
        lesson.stage.toLowerCase() === norm ||
        lesson.strand.toLowerCase() === norm ||
        (lesson.level && lesson.level.toLowerCase() === norm);
      if (!matchStageOrLevel) {
        return false;
      }

      const cleanUnit = normUnit.replace(/-/g, '');
      const cleanSlug = lesson.slug.toLowerCase().replace(/-/g, '');

      return (
        lesson.slug.toLowerCase() === normUnit ||
        cleanSlug === cleanUnit ||
        (lesson.slug === 'euclids-common-notions' && normUnit === 'euclid-common-notions') ||
        lesson.id.toLowerCase() === normUnit ||
        lesson.order.toString() === normUnit ||
        `unit-${lesson.order}` === normUnit ||
        `unit-0${lesson.order}` === normUnit
      );
    });
  }

  navigateToLesson(levelOrStage: string, unit: string): boolean {
    const idx = this.findLessonIndex(levelOrStage, unit);
    if (idx !== -1) {
      this.setLessonIndex(idx);
      return true;
    }
    return false;
  }
}
