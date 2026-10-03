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
    // UNIT 01: Putting Things Together (Addition)
    // ==========================================
    {
      id: 'unit-01-gathering-addition',
      slug: 'origins-of-addition',
      shortTitle: 'Unit 01: Addition',
      title: 'The Origin of Combining: Putting Things Together',
      subtitle: 'A Moon-Watching Story, a Counting Game, and the Ishango Bone',
      stage: 'foundations',
      strand: 'numeracy',
      order: 1,
      prerequisites: [],
      civilization: 'Upper Paleolithic Central Africa (Congo Basin)',
      historicalEra: 'c. 20,000 BCE',
      mathematicalStatement: 'a + b = c',
      discoveryHook: {
        prompt:
          'Imagine keeping a little Moon diary. You have 3 marks for 3 nights of watching the Moon. Two more nights pass, so you add 2 marks. Can you guess how many nights your diary remembers before you count the marks?',
        targetAxiom:
          'Addition puts two groups together. Keep the first 3 marks and add 2 more to find the whole group.',
        successCondition: 'Try a question. Type your answer or use the calculator.',
        guidanceTip: 'Start with 3. Count on two more: 4, 5. Each hop stands for one more night.',
      },
      storyIllustration: {
        title: 'The Moon-Watching Game',
        imageUrl: 'assets/illustrations/unit-01-story.png',
        altText:
          'A smiling child points to marks on a small bone held by a caregiver beside a quiet lake, with a crescent Moon glowing in the evening sky.',
        caption:
          'An imagined Moon-watching game. Could marks on a bone help someone remember the nights? We do not know what the Ishango marks meant.',
      },
      mathDiagram: {
        title: 'Three Marks and Two More',
        imageUrl: 'assets/illustrations/unit-01-diagram.png',
        altText:
          'An illustrated tally bone with three blue marks and two orange marks. A bracket joins all five marks above the equation 3 + 2 = 5.',
        caption:
          'In our imagined Moon diary, 3 marks and 2 more marks remember 5 nights: 3 + 2 = 5.',
      },
      narrative: {
        hook: 'The Moon looks a little different tonight. How could you remember all the nights you have watched it?',
        historicalContext: {
          story:
            'The Ishango bone is a real old bone with groups of little marks. Nobody knows for sure what those marks meant. Some researchers think they might have tracked the Moon. Others see number patterns. Let us imagine a story inspired by those ideas. Beside a quiet lake, a child and a caregiver look up at a thin, bright Moon. They decide to remember each night with a mark on a little bone. After three nights, there are three marks. Two more nights pass, and they add two more. The caregiver covers the marks with a thumb. "Can you guess how many now?" The child starts at three and counts on: "Four, five!" They uncover the marks and check together. Three and two make five. Their Moon diary has become a counting game! This is our made-up story, not something we know the Ishango people did. It helps us explore an idea we can test ourselves: putting groups together is addition.',
          civilizationOrOrigin: 'Upper Paleolithic Central Africa (Modern-day DRC)',
          approximateDate: 'c. 20,000 BCE',
          epistemicStatus: {
            consensusLevel: 'contested',
            summary:
              'Everyone agrees the bone is real and about 20,000 years old. What the notches mean is still argued over: a number game, a Moon calendar, or just a better grip?',
            competingHypotheses: [
              {
                claim: 'A Moon Calendar',
                proponentsOrSources: 'Alexander Marshack (1972)',
                evidenceSummary:
                  'Studied the notches under a microscope and noticed the three columns add up to 60, 48, and 60: about six months of watching the Moon change shape.',
              },
              {
                claim: 'A Number Game',
                proponentsOrSources: 'Jean de Heinzelin (1957); Claudia Zaslavsky',
                evidenceSummary:
                  'Some groups look like doubling (3 then 6, 4 then 8), and one column holds 11, 13, 17, and 19. That seems too neat to be an accident.',
              },
              {
                claim: 'Maybe Just a Handle',
                proponentsOrSources: 'Olivier Keller (2010)',
                evidenceSummary:
                  'Warns that we may be seeing patterns we want to see. The notches could simply have made the tool easier to hold.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Addition puts groups together. Three marks and two more marks make five marks.',
          'You can count on instead of starting again: start at 3, then say 4, 5.',
          'The plus sign (+) tells us to combine groups and move forward.',
        ],
        realWorldApplication:
          'You can make your own Moon diary with a grown-up: draw one mark for each night you look at the sky. Or play the guessing game with buttons. Put down 3, add 2, and guess the total before counting. Addition also helps you keep score, count your coins, and work out how many days you have marked on a calendar.',
      },
      artifactPlate: {
        title: 'The Ishango Bone (Royal Belgian Institute of Natural Sciences)',
        credit: 'Photo by JhowieNitnek (Wikimedia Commons)',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ishango_bone.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Ishango_bone.jpg/960px-Ishango_bone.jpg',
        altText:
          'The slim, dark Ishango bone standing upright in a museum case, with rows of small notches cut along its side.',
        caption: 'Carved with deliberate groups of notches long before paper was invented.',
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
          wikipediaUrl: 'https://en.wikipedia.org/wiki/History_of_Central_Africa',
        },
      ],
      academicSources: [
        {
          author: 'Carl B. Boyer and Uta C. Merzbach',
          title: 'A History of Mathematics',
          citationSnippet: 'Chapter 1 ("Traces"): the earliest evidence of counting.',
          publicationYear: 2011,
        },
        {
          author: 'George Gheverghese Joseph',
          title: 'The Crest of the Peacock: Non-European Roots of Mathematics',
          citationSnippet:
            'Chapter 2: Mathematics from Bones, Strings, and Standing Stones (the Ishango bone).',
          publicationYear: 2011,
        },
      ],
      interactiveConfig: {
        visualizer: 'addition-game',
        initialState: {},
      },
      srNarration:
        'Unit 01: Putting Things Together. Imagine a Moon diary and a counting game. Three nights plus two more nights make five. The story is imagined; the Ishango bone is real.',
      level: 'foundations',
    },

    // ==========================================
    // UNIT 02: Taking Things Away (Subtraction)
    // ==========================================
    {
      id: 'unit-02-taking-away-subtraction',
      slug: 'origins-of-subtraction',
      shortTitle: 'Unit 02: Subtraction',
      title: 'The Origin of Taking Away: Taking Things Away',
      subtitle: 'The Lebombo Bone, Crossing Off Tallies, and the Minus Sign',
      stage: 'foundations',
      strand: 'numeracy',
      order: 2,
      prerequisites: ['unit-01-gathering-addition'],
      buildsOn: [
        {
          lessonId: 'unit-01-gathering-addition',
          connection:
            'Taking away undoes adding. If 4 + 3 = 7, then 7 − 3 = 4: you walk back along the very same notches.',
        },
      ],
      civilization: 'Stone Age Southern Africa (Lebombo Mountains)',
      historicalEra: 'c. 41,000 BCE',
      mathematicalStatement: 'a - b = c',
      discoveryHook: {
        prompt:
          'Imagine your band holds a notched bone tracking 7 bundles of dried smoked fish for winter. When you share 3 bundles with a neighboring family, how many bundles remain on your tally?',
        targetAxiom:
          'Subtraction is removing items from a group or stepping backward along a tally of counts.',
        successCondition:
          'Set Starting Tally (A) to 7 and Notches Taken Away (B) to 3 on the number line.',
        guidanceTip: 'Observe how the amber arrow retraces steps backward to show what remains.',
      },
      storyIllustration: {
        title: 'Consulting the Tally Stick by the Campfire',
        imageUrl: 'assets/illustrations/unit-02-story.svg',
        altText:
          'Paleolithic foragers seated around a glowing rock shelter fire, inspecting a notched tally bone as they distribute shared winter provisions.',
        caption:
          'Notched bones and tally sticks helped ancient communities track provisions and share food fairly.',
      },
      mathDiagram: {
        title: 'Tally Stick Subtraction: 7 - 3 = 4',
        imageUrl: 'assets/illustrations/unit-02-diagram.svg',
        altText:
          'A notched tally bone with 7 carved grooves, where 3 notches are crossed out with amber dashed marks, leaving 4 active notches intact.',
        caption:
          'Subtraction is starting with a tally of items, taking some away, and counting the notches that remain.',
      },
      narrative: {
        hook: 'If you have seven shared food bundles and distribute three to your kin, how do you track what remains?',
        historicalContext: {
          story:
            'About 43,000 years ago, in a cave high in the Lebombo Mountains of Southern Africa, someone cut 29 neat notches into a baboon’s leg bone. It is one of the oldest counting tools ever found: more than twice as old as the Ishango Bone! Scientists who studied the notches under a microscope found they were cut with four different tools, which suggests the marks were added on four separate occasions. Somebody was keeping track of something. We do not know what they were counting. But ancient life was not only about gathering more—it was about survival and sharing. A family with 7 bundles of dried fish who gave 3 to their neighbors needed to know how many were left for winter. Subtraction was not destruction; it was the art of sharing fairly and knowing exactly how much remained before the next hunt.',
          civilizationOrOrigin: 'Stone Age Southern Africa (Border Cave)',
          approximateDate: 'c. 41,000 BCE',
          epistemicStatus: {
            consensusLevel: 'speculative',
            summary:
              'The bone is real, and most experts think its notches are a tally. But nobody knows what was being counted, and taking away leaves no fossil. Who first subtracted, and when, is a best guess.',
            competingHypotheses: [
              {
                claim: 'A Tally That Grew Over Time',
                proponentsOrSources: "Francesco d'Errico, Lucinda Backwell, and colleagues (2012)",
                evidenceSummary:
                  'Under the microscope the 29 notches turn out to have been cut with four different tools, so the count was probably added to on four separate occasions.',
              },
              {
                claim: 'A Moon Counter',
                proponentsOrSources: 'A popular suggestion (for example David Darling, 2004)',
                evidenceSummary:
                  'There are 29 notches, close to the 29½ days from one new Moon to the next.',
              },
              {
                claim: 'Careful: the Bone Is Broken',
                proponentsOrSources: 'A caution raised by many archaeologists',
                evidenceSummary:
                  'One end of the bone has snapped off, so there may once have been more than 29 notches.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Subtraction is starting with a tally of items, taking some away, and counting what remains.',
          'On the number line, subtraction reverses direction and walks backward.',
          'The minus sign (-) tells us to separate, cross off, and take away.',
          'The signs + and − are much younger than the ideas. They first appeared in a printed book in Germany in 1489.',
        ],
        realWorldApplication:
          'How much battery is left on a tablet? How much change do you get at the shop? How many days until your birthday? Every "how much is left?" question is answered by subtraction.',
      },
      artifactPlate: {
        title: 'Border Cave, Lebombo Mountains (South Africa)',
        credit: 'Photo by Androstachys (Wikimedia Commons)',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Border_Cave00.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Border_Cave00.jpg/960px-Border_Cave00.jpg',
        altText:
          'Archaeologists at work in the wide mouth of Border Cave, seen as dark outlines against sunlit green hills.',
        caption:
          'Border Cave, where the roughly 43,000-year-old Lebombo Bone was found. No freely shareable photograph of the bone itself exists, so this is the place it came from.',
      },
      exploreGraph: [
        {
          label: 'Tally Sticks & Markings',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Tally_mark',
        },
        {
          label: 'Lebombo Bone',
          category: 'artifact',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Lebombo_bone',
        },
        {
          label: 'Hunter-Gatherer Economy',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Hunter-gatherer',
        },
        {
          label: 'Subtraction',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Subtraction',
        },
      ],
      academicSources: [
        {
          author: "Francesco d'Errico, Lucinda Backwell, and colleagues",
          title:
            'Early Evidence of San Material Culture Represented by Organic Artifacts from Border Cave, South Africa',
          citationSnippet:
            'Proceedings of the National Academy of Sciences 109(33): dating and microscope study of the notched bone.',
          publicationYear: 2012,
        },
        {
          author: 'Georges Ifrah',
          title: 'The Universal History of Numbers',
          citationSnippet: 'Notched bones and tally sticks as the first number records.',
          publicationYear: 2000,
        },
      ],
      interactiveConfig: {
        visualizer: 'number-line-vector',
        initialState: { a: 7, b: 3, op: 'subtract' },
        lockedOperation: 'subtract',
        minA: 0,
        maxA: 10,
        defaultA: 7,
        minB: 0,
        maxB: 10,
        defaultB: 3,
      },
      practiceChallenges: [
        {
          id: 'u2-m1',
          question:
            'You have a tally of 6 smoked fish bundles and share 2 with your kin. Step backward 2 notches to see how many remain.',
          hint: 'Set Starting Tally (A) to 6 and Notches Taken Away (B) to 2 on the number line.',
          targetA: 6,
          targetB: 2,
          expectedResult: 4,
          successMessage: 'Spot on! 6 - 2 = 4 bundles remaining in the cache.',
        },
        {
          id: 'u2-m2',
          question:
            'A hunter has a quiver of 8 arrows and shoots 3 during the hunt. How many arrows remain in the quiver?',
          hint: 'Start at 8 and step backward 3.',
          targetA: 8,
          targetB: 3,
          expectedResult: 5,
          successMessage: 'Terrific! 8 - 3 = 5 arrows remaining.',
        },
      ],
      srNarration:
        'Unit 02: Taking Things Away. Subtraction is starting with a tally, removing items, and stepping backward along the path.',
      level: 'foundations',
    },

    // ==========================================
    // UNIT 03: Axioms of Equality
    // ==========================================
    {
      id: 'unit-03-euclid-equality',
      slug: 'euclids-common-notions',
      shortTitle: 'Unit 03: Equality',
      title: "The Bridge of Reason: Euclid's Common Notions",
      subtitle: 'Balance Scales and the Rule That Equal Things Stay Equal',
      stage: 'foundations',
      strand: 'logic',
      order: 3,
      prerequisites: ['unit-01-gathering-addition', 'unit-02-taking-away-subtraction'],
      buildsOn: [
        {
          lessonId: 'unit-01-gathering-addition',
          connection:
            'Euclid’s second rule is about adding: add the same amount to two equal piles and they are still equal.',
        },
        {
          lessonId: 'unit-02-taking-away-subtraction',
          connection:
            'His third rule is about taking away: remove the same amount from two equal piles and they still match.',
        },
      ],
      civilization: 'Ptolemaic Alexandria (Hellenistic Greece)',
      historicalEra: 'c. 300 BCE',
      mathematicalStatement: '\\text{If } A = B \\text{ and } B = C \\text{, then } A = C',
      discoveryHook: {
        prompt:
          'A merchant puts 5 weights on the left pan of a scale. How many weights must go on the right pan to make the beam sit perfectly level?',
        targetAxiom: 'Common Notion 1: Things which equal the same thing also equal one another.',
        successCondition: 'Bring both Left and Right pans to equal quantities.',
        guidanceTip:
          'Watch the pointer at the top of the scale. When both pans hold the same amount, it points straight up.',
      },
      storyIllustration: {
        title: 'Verifying Weights in the Alexandrian Harbor Market',
        imageUrl: 'assets/illustrations/unit-03-story.svg',
        altText:
          'An Alexandrian market portico overlooking the harbor at sunset with merchants verifying trade goods on a bronze balance scale.',
        caption:
          'In ancient Alexandria, merchants verified honest exchange on an equal-arm beam scale long before mathematical symbols existed.',
      },
      mathDiagram: {
        title: 'The Axiom of Balance: A = B and B = C implies A = C',
        imageUrl: 'assets/illustrations/unit-03-diagram.svg',
        altText:
          'An equal-arm bronze balance scale demonstrating equilibrium with 5 weights on each pan and a zero-degree plumb dial.',
        caption: 'When two quantities balance the same third weight, they must balance each other.',
      },
      narrative: {
        hook: 'Before anyone drew the equals sign, "equal" was something you could see: two pans of an honest merchant’s scale hanging perfectly level.',
        historicalContext: {
          story:
            'About 2,300 years ago, in the busy Egyptian port city of Alexandria, a Greek teacher named Euclid wrote the most famous math book of all time: the Elements. Euclid wanted every idea in his book to be proven step by step, so that nobody could argue with it. But every proof has to start somewhere. So he began with a short list of rules so obvious that everybody agrees with them. He called them "common notions". The first says that things equal to the same thing are also equal to each other. The second says that if you add equal amounts to equal amounts, the totals are still equal. Merchants in the harbor market already trusted these rules every day: if one bag of spice balances a bronze weight, and a second bag balances the same weight, the two bags must weigh the same. Euclid’s big idea was to write the rules down and build all of geometry on top of them. The = sign itself came much later. A Welsh doctor named Robert Recorde invented it in 1557 because he was tired of writing "is equal to" over and over. He chose two matching lines because, he wrote, no two things can be more equal.',
          civilizationOrOrigin: 'Alexandria, Egypt (Hellenistic Greek World)',
          approximateDate: 'c. 300 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Historians agree that Euclid’s Elements is where these rules were first written down as the starting point for proofs. What they still discuss is exactly how many of the rules Euclid wrote himself.',
            competingHypotheses: [
              {
                claim: 'How Many Rules Did Euclid Write?',
                proponentsOrSources: 'Thomas L. Heath (1908 Commentary)',
                evidenceSummary:
                  'Old hand-written copies of the Elements disagree: some list five common notions and some list as many as nine. Later copyists probably added the extras.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'The equals sign ($=$) means "is the same amount as", like a scale sitting level.',
          'If $A = B$ and $B = C$, then $A = C$. You never have to weigh $A$ against $C$: you already know!',
          'Whatever you do to one pan, do the same to the other and the scale stays level. This is the secret behind solving equations.',
          'Mathematics is built like a tower: a few simple rules everyone accepts at the bottom, and everything else proven on top of them.',
        ],
        realWorldApplication:
          'Every time you swap coins for something of the same value, double a recipe, or find a missing number in an equation, you are trusting these rules. Scientists and engineers balance equations to design bridges, mix medicines, and send rockets into space.',
      },
      artifactPlate: {
        title: "Papyrus Oxyrhynchus 29 (Euclid's Elements Book II)",
        credit: 'Penn Museum, University of Pennsylvania (via Wikimedia Commons)',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:P._Oxy._I_29.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/P._Oxy._I_29.jpg/960px-P._Oxy._I_29.jpg',
        altText:
          'A torn scrap of brown papyrus with lines of Greek handwriting and a small diagram of a divided rectangle.',
        caption:
          "One of the oldest surviving pieces of Euclid's Elements (c. 75–125 CE), found in an ancient rubbish heap at Oxyrhynchus, Egypt.",
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
          label: 'Balance Scales',
          category: 'artifact',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Weighing_scale',
        },
        {
          label: 'Robert Recorde & the = Sign',
          category: 'person',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Robert_Recorde',
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
      practiceChallenges: [
        {
          id: 'u3-m1',
          question:
            'A merchant places 4 bronze weights on the left pan. How many weights must be placed on the right pan to make the scale sit perfectly level?',
          hint: 'Set Left Pan (A) to 4 and Right Pan (B) to 4.',
          targetA: 4,
          targetB: 4,
          expectedResult: 4,
          successMessage: 'Balanced! 4 = 4. The pointer stands straight up.',
        },
        {
          id: 'u3-m2',
          question:
            'You are testing a 7-drachma bundle of aromatic spices on the left pan. Balance it with honest bronze weights on the right!',
          hint: 'Place 7 weights on both pans.',
          targetA: 7,
          targetB: 7,
          expectedResult: 7,
          successMessage: 'Perfectly level! Both pans hold exactly 7.',
        },
        {
          id: 'u3-m3',
          question:
            'A trader brings 2 heavy olive oil flasks. Match them on the right pan to prove honest trading.',
          hint: 'Set both pans to 2.',
          targetA: 2,
          targetB: 2,
          expectedResult: 2,
          successMessage: 'Fair trade verified! 2 = 2 on the beam.',
        },
      ],
      level: 'foundations',
    },

    // ==========================================
    // UNIT 04: The Farm Grid (Multiplication & Commutativity)
    // ==========================================
    {
      id: 'unit-04-commutative-multiplication',
      slug: 'spatial-invariance-multiplication',
      shortTitle: 'Unit 04: Multiplication',
      title: 'The Farm Grid (Multiplication)',
      subtitle: 'Why 3 × 5 Always Equals 5 × 3 Across Ancient Farmlands',
      stage: 'elementary',
      strand: 'arithmetic',
      order: 4,
      prerequisites: ['unit-01-gathering-addition'],
      buildsOn: [
        {
          lessonId: 'unit-01-gathering-addition',
          connection:
            'Multiplying is adding the same number again and again: 3 rows of 5 is 5 + 5 + 5.',
        },
      ],
      civilization: 'Ancient Mesopotamia (Babylonia)',
      historicalEra: 'c. 1800 BCE',
      mathematicalStatement: 'a \\times b = b \\times a',
      discoveryHook: {
        prompt:
          'Turn a garden box on its side, and you still have the same number of vegetables! Multiplication is just a neat way of counting rows and columns. Arrange a farm parcel into 3 rows of 5 crops, then rotate it 90 degrees. Does the total count change?',
        targetAxiom:
          'The Commutative Property: you can swap the order of the numbers you multiply and the answer stays the same.',
        successCondition:
          'Press the Turn the Grid button and check that the total stays exactly 15.',
        guidanceTip:
          'Watch the rows become columns. Nothing is added and nothing is taken away, so the total cannot change.',
      },
      storyIllustration: {
        title: 'The Date Palm Orchard',
        imageUrl: 'assets/illustrations/unit-04-story.svg',
        altText:
          'A Babylonian scribe with a cuneiform clay tablet surveying rows of date palms by an irrigation canal near a grand ziggurat at sunset.',
        caption:
          'Babylonian farmers planted trees in neat square grids so watering and harvesting was equal and fair.',
      },
      mathDiagram: {
        title: 'Turning the Grid: 3 × 5 = 5 × 3 = 15',
        imageUrl: 'assets/illustrations/unit-04-diagram.svg',
        altText:
          'A grid of 3 rows of 5 dots turned on its side to become 5 rows of 3 dots. Both grids hold 15 dots.',
        caption: 'Whether you count 3 rows of 5 or 5 rows of 3, the total area stays exactly 15.',
      },
      narrative: {
        hook: 'Turn a garden box on its side, and you still have the same number of vegetables! Multiplication is just a neat way of counting rows and columns.',
        historicalContext: {
          story:
            'Almost 4,000 years ago, in the land between the Tigris and Euphrates rivers (today’s Iraq), Babylonian scribes kept track of fields, orchards, and grain by pressing wedge-shaped marks into soft clay. Counting every date palm one by one was far too slow, so young scribes learned multiplication tables by heart, just as you do. Hundreds of their practice tablets still survive, and some are even signed by the students who wrote them. Working with rectangular fields all day, the scribes knew that 3 rows of 5 date palms and 5 rows of 3 hold exactly the same number of trees. Multiplication was no longer just adding over and over. It had become a way to measure a whole rectangle at once. Proving that the swap always works took much longer: Euclid did it in his Elements (Book VII, Proposition 16) around 300 BCE, and the rule only got its name, "commutative", in 1814 from the French mathematician François Servois.',
          civilizationOrOrigin: 'Mesopotamia (Babylonia)',
          approximateDate: 'c. 1800 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Historians agree that Babylonian scribes used multiplication tables and worked out the areas of fields. What they debate is how the scribes pictured multiplying in their minds.',
            competingHypotheses: [
              {
                claim: 'Pictures First: Cutting and Pasting Rectangles',
                proponentsOrSources: 'Jens Høyrup (Lengths, Widths, Surfaces, 2002)',
                evidenceSummary:
                  'The words on the tablets describe moving and joining real rectangles, so scribes may have thought of multiplying as building a shape.',
              },
              {
                claim: 'Numbers First: Tables and Recipes',
                proponentsOrSources: 'Otto Neugebauer (1930s–1950s)',
                evidenceSummary:
                  'Read the same tablets as step-by-step number recipes, a little like modern algebra without the letters.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Multiplication is a fast way to count equal groups: $3 \\times 5$ means 3 rows with 5 in each row.',
          'The Commutative Property says $a \\times b = b \\times a$. Turn the grid on its side and the total never changes.',
          'The total is also the area of the rectangle: the number of unit squares that fit inside it.',
        ],
        realWorldApplication:
          'Seats in a cinema, eggs in a carton, tiles on a floor, pixels on a screen: anything arranged in rows and columns is counted by multiplying. When a tablet rotates a photo, it swaps rows and columns just like the farm grid, and not a single pixel is lost.',
      },
      artifactPlate: {
        title: 'A Student’s Multiplication Table (Ashmolean Museum, Oxford)',
        credit: 'Photo by Zunkir (Wikimedia Commons)',
        license: 'CC BY-SA 4.0',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Multiplication_tablet_Ashmolean.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Multiplication_tablet_Ashmolean.jpg/960px-Multiplication_tablet_Ashmolean.jpg',
        altText:
          'A small clay tablet covered in neat rows of wedge-shaped cuneiform numbers, held by museum clips.',
        caption:
          'A clay multiplication table from the city of Larsa (c. 1900–1600 BCE), signed by the apprentice scribe who wrote it: Suen-apil-Urim.',
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
          label: 'Multiplication Tables',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Multiplication_table',
        },
      ],
      academicSources: [
        {
          author: 'Carl B. Boyer and Uta C. Merzbach',
          title: 'A History of Mathematics',
          citationSnippet:
            'Chapter 3 ("Mesopotamia"): cuneiform numbers and multiplication tables.',
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
      practiceChallenges: [
        {
          id: 'u4-m1',
          question: 'Plant a garden with 3 rows of 4 sunflowers. How many seeds did you plant?',
          hint: 'Set Rows (A) to 3 and Columns (B) to 4.',
          targetA: 3,
          targetB: 4,
          expectedResult: 12,
          successMessage: 'Excellent! 3 rows × 4 sunflowers = 12 seeds planted.',
        },
        {
          id: 'u4-m2',
          question: 'Rotate your garden so it has 4 rows of 3. Does the total count change?',
          hint: 'Set Rows (A) to 4 and Columns (B) to 3.',
          targetA: 4,
          targetB: 3,
          expectedResult: 12,
          successMessage: 'Commutativity in action! 4 × 3 = 12 seeds, identical to 3 × 4.',
        },
        {
          id: 'u4-m3',
          question: 'Make a large orchard with 6 rows of 6 trees.',
          hint: 'Set both Rows (A) and Columns (B) to 6.',
          targetA: 6,
          targetB: 6,
          expectedResult: 36,
          successMessage: 'Master surveyor! 6 × 6 = 36 trees in the orchard.',
        },
      ],
      level: 'elementary',
    },

    // ==========================================
    // UNIT 05: Sharing the Harvest (Division)
    // ==========================================
    {
      id: 'unit-05-fair-share-division',
      slug: 'sharing-the-harvest',
      shortTitle: 'Unit 05: Division',
      title: 'Sharing the Harvest (Division)',
      subtitle: 'Distributing Baskets, Equal Portions, and Fair Shares',
      stage: 'elementary',
      strand: 'arithmetic',
      order: 5,
      prerequisites: ['unit-02-taking-away-subtraction', 'unit-04-commutative-multiplication'],
      buildsOn: [
        {
          lessonId: 'unit-02-taking-away-subtraction',
          connection:
            'Dealing out shares is taking away the same amount again and again until nothing is left.',
        },
        {
          lessonId: 'unit-04-commutative-multiplication',
          connection:
            'Division runs multiplication backwards: because 3 × 4 = 12, we know 12 ÷ 3 = 4.',
        },
      ],
      civilization: 'Early Dynastic Mesopotamia (Sumerian City of Shuruppak)',
      historicalEra: 'c. 2600 BCE',
      mathematicalStatement: 'a \\div b = c',
      discoveryHook: {
        prompt:
          'If you and your friends pick 12 sweet melons and want to share them fairly, how many does each person take home? Division is simply sharing equally without leaving anyone out! Distribute 12 melons evenly across 3 baskets.',
        targetAxiom:
          'Division is fair sharing: splitting a total quantity into equal portions across groups.',
        successCondition: 'Set Total Items (A) to 12 and Number of Baskets (B) to 3.',
        guidanceTip:
          'Observe how 12 divided across 3 baskets leaves exactly 4 melons in each basket with zero remaining.',
      },
      storyIllustration: {
        title: 'Distributing Grain at the City Gate',
        imageUrl: 'assets/illustrations/unit-05-story.svg',
        altText:
          'Sumerian scribes measuring equal grain rations into woven reed baskets at the Shuruppak city gate under a desert sunrise.',
        caption:
          'Ancient city scribes measured equal grain portions into baskets so every family received an honest share.',
      },
      mathDiagram: {
        title: 'Fair Sharing: 12 Melons Divided Into 3 Baskets',
        imageUrl: 'assets/illustrations/unit-05-diagram.svg',
        altText: '12 golden melons split evenly into 3 woven baskets, showing 4 melons per basket.',
        caption: '12 divided into 3 equal baskets leaves 4 melons in each basket.',
      },
      narrative: {
        hook: 'If you and your friends pick 12 sweet melons and want to share them fairly, how many does each person take home? Division is simply sharing equally without leaving anyone out!',
        historicalContext: {
          story:
            'In the ancient Sumerian city-state of Shuruppak (modern-day Fara, Iraq) over 4,500 years ago, city life flourished along the Euphrates river canals. As harvest season arrived, thousands of bushels of barley, emmer wheat, and dates were hauled to the central storehouses. To ensure social peace and survival, city administrators had to distribute provisions fairly to temple builders, artisans, and families. Scribes used clay tokens and stylus impressions on clay tablets to calculate rations. If a granary had 12 portions and 3 teams of workers, dividing them meant dealing them out into equal baskets until none were left over. One tablet from Shuruppak holds the oldest division problem ever found: a granary full of barley is shared out so that every worker gets 7 measures. How many workers can be fed? The scribe’s answer, 164,571 workers with 3 measures left over, is exactly right. A second tablet with the same problem gets it wrong: even 4,500 years ago, students made mistakes on their homework! Division was born not as an abstract exercise, but as the community practice of fairness, teamwork, and honest distribution.',
          civilizationOrOrigin: 'Sumer (Shuruppak / Fara Grain Accounts)',
          approximateDate: 'c. 2600 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Archaeologists have dug up hundreds of clay tablets from Shuruppak that record grain being shared out, so we are sure these scribes divided. Exactly how they worked out the answers is still discussed.',
            competingHypotheses: [
              {
                claim: 'Division Began with Sharing Food',
                proponentsOrSources: 'Eleanor Robson (Mathematics in Ancient Iraq, 2008)',
                evidenceSummary:
                  'The city’s record tablets show division growing out of a practical need: sharing grain, land, and beer rations equally.',
              },
              {
                claim: 'A Later Shortcut: Multiply Instead',
                proponentsOrSources: 'Jöran Friberg (2007)',
                evidenceSummary:
                  'Later Babylonian scribes turned division into multiplication by looking up a "reciprocal" (1 divided by the number) in a table.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'Division ($a \\div b = c$) splits a total quantity ($a$) into $b$ equal groups, resulting in $c$ items per group.',
          'When a collection cannot be split evenly into whole units, the amount left over is called the remainder ($a = b \\times c + r$).',
          'Division is the inverse operation of multiplication: if $3 \\times 4 = 12$, then $12 \\div 3 = 4$.',
        ],
        realWorldApplication:
          'Splitting a pizza, dealing cards, sharing out pocket money, working out how many buses a class trip needs: division answers every "how many each?" question. Computers use it too, to share big jobs fairly between many machines.',
      },
      artifactPlate: {
        title: 'Sumerian Account Tablet (British Museum, c. 2500 BCE)',
        credit: 'Photo by Gavin.collins (Wikimedia Commons); tablet BM 15826, British Museum',
        license: 'Public Domain',
        sourceUrl:
          'https://commons.wikimedia.org/wiki/File:Sumerian_account_of_silver_for_the_govenor_(background_removed).png',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Sumerian_account_of_silver_for_the_govenor_%28background_removed%29.png/500px-Sumerian_account_of_silver_for_the_govenor_%28background_removed%29.png',
        altText:
          'A square, cushion-shaped clay tablet divided into boxes, each filled with early cuneiform signs.',
        caption:
          'A scribe’s account tablet from Shuruppak or nearby Abu Salabikh. Tablets like this recorded who received what: the paperwork behind fair sharing.',
      },
      exploreGraph: [
        {
          label: 'Division (mathematics)',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Division_(mathematics)',
        },
        {
          label: 'Sumerian Accounting',
          category: 'civilization',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Cuneiform',
        },
        {
          label: 'Fair Division',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Fair_division',
        },
        {
          label: 'Shuruppak',
          category: 'civilization',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Shuruppak',
        },
      ],
      academicSources: [
        {
          author: 'Eleanor Robson',
          title: 'Mathematics in Ancient Iraq: A Social History',
          citationSnippet:
            'Scribal training, grain disbursements, and archaic accounting at Shuruppak and Ur.',
          publicationYear: 2008,
        },
        {
          author: 'Carl B. Boyer and Uta C. Merzbach',
          title: 'A History of Mathematics',
          citationSnippet: 'Chapter 3: Cuneiform records and sexagesimal arithmetic.',
          publicationYear: 2011,
        },
        {
          author: 'Jens Høyrup',
          title: 'Investigations of an Early Sumerian Division Problem, c. 2500 B.C.',
          citationSnippet:
            'Historia Mathematica 9: the two Shuruppak school tablets, one solved correctly and one not.',
          publicationYear: 1982,
        },
      ],
      interactiveConfig: {
        visualizer: 'sharing-distributor',
        initialState: { totalItems: 12, groupCount: 3 },
        minA: 2,
        maxA: 24,
        defaultA: 12,
        minB: 1,
        maxB: 6,
        defaultB: 3,
      },
      practiceChallenges: [
        {
          id: 'u5-m1',
          question: 'Distribute 8 apples equally between 2 baskets. How many in each?',
          hint: 'Set Total Items (A) to 8 and Number of Baskets (B) to 2.',
          targetA: 8,
          targetB: 2,
          expectedResult: 4,
          successMessage: 'Fairly shared! 8 ÷ 2 = 4 apples in each basket.',
        },
        {
          id: 'u5-m2',
          question: 'You have 15 figs to share among 3 scouts. Deal them out evenly.',
          hint: 'Set Total Items (A) to 15 and Baskets (B) to 3.',
          targetA: 15,
          targetB: 3,
          expectedResult: 5,
          successMessage: 'Spot on! 15 ÷ 3 = 5 figs for each scout.',
        },
        {
          id: 'u5-m3',
          question: 'Share 18 seeds equally across 6 planting pots.',
          hint: 'Set Total Items (A) to 18 and Baskets (B) to 6.',
          targetA: 18,
          targetB: 6,
          expectedResult: 3,
          successMessage: 'Master grower! 18 seeds ÷ 6 pots = 3 seeds per pot.',
        },
      ],
      level: 'elementary',
    },

    // ==========================================
    // UNIT 06: Slicing the Loaf (Unit Fractions)
    // ==========================================
    {
      id: 'unit-06-egyptian-fractions',
      slug: 'egyptian-unit-fractions-rhind',
      shortTitle: 'Unit 06: Fractions',
      title: 'Slicing the Loaf (Unit Fractions)',
      subtitle: 'Ahmes the Scribe and Fair Bread Partitions',
      stage: 'elementary',
      strand: 'arithmetic',
      order: 6,
      prerequisites: ['unit-04-commutative-multiplication', 'unit-05-fair-share-division'],
      buildsOn: [
        {
          lessonId: 'unit-05-fair-share-division',
          connection:
            'A fraction is a division you have not finished: 3 loaves ÷ 5 workers is written 3/5.',
        },
        {
          lessonId: 'unit-04-commutative-multiplication',
          connection:
            'To add 1/2 and 1/10 you multiply to make matching pieces: 1/2 is the same as 5/10.',
        },
      ],
      civilization: 'Ancient Egypt (Thebes)',
      historicalEra: 'c. 1550 BCE',
      mathematicalStatement: '\\frac{3}{5} = \\frac{1}{2} + \\frac{1}{10}',
      discoveryHook: {
        prompt:
          'What happens when you have 3 fresh loaves of bread, but 5 hungry builders? You cannot just give someone a broken crumb—ancient Egyptian scribes found a genius way to cut fair slices! Can you slice and distribute the loaves so every worker receives identical unit-fraction portions?',
        targetAxiom:
          'Any fraction can be built by adding different unit fractions (fractions with 1 on top), like 3/5 = 1/2 + 1/10.',
        successCondition:
          'Give each of the 5 worker baskets exactly 1/2 and 1/10 of a loaf (Total: 3/5).',
        guidanceTip:
          'Cut all 3 loaves into halves and give each worker one half. One half is left over: cut it into 5 equal pieces (tenths) and hand those out too!',
      },
      storyIllustration: {
        title: 'Breakfast Along the Nile',
        imageUrl: 'assets/illustrations/unit-06-story.svg',
        altText:
          'Scribe Ahmes with the Rhind Papyrus and a bronze knife cutting fresh loaves of bread by the Nile for stonemasons constructing the Karnak temple.',
        caption:
          'Scribe Ahmes measures clean cuts across fresh bread loaves so every builder gets the exact same portion.',
      },
      mathDiagram: {
        title: 'Egyptian Unit Fraction Decomposition: 3/5 = 1/2 + 1/10',
        imageUrl: 'assets/illustrations/unit-06-diagram.svg',
        altText:
          'Three loaves cut into six halves, with the last half cut again into five tenths, so that five workers each receive 1/2 + 1/10.',
        caption:
          'Instead of ragged crumbs, Egyptian unit fractions guarantee every worker receives the exact same set of physical slices.',
      },
      narrative: {
        hook: 'What happens when you have 3 fresh loaves of bread, but 5 hungry builders? You cannot just give someone a broken crumb—ancient Egyptian scribes found a genius way to cut fair slices!',
        historicalContext: {
          story:
            'About 3,500 years ago in Egypt, a scribe named Ahmes copied out a long scroll of math problems. He tells us he was copying an even older scroll, written a few hundred years before his time. Today it is called the Rhind Mathematical Papyrus, and it is kept in the British Museum. Egyptian scribes almost always wrote fractions with a 1 on top: "unit fractions" like 1/2, 1/3, or 1/10. In hieroglyphs they drew a mouth-shaped sign (meaning "a part") above the number. So how would they share 3 loaves among 5 workers? Not by handing out three little fifths. Problem 3 on the scroll shares 6 loaves among 10 men, which is the very same share, and it gives each man 1/2 of a loaf plus 1/10 of a loaf. Check it: 1/2 + 1/10 = 5/10 + 1/10 = 6/10 = 3/5. Every worker gets exactly the same two pieces, so anyone can see at a glance that the sharing is fair.',
          civilizationOrOrigin: 'Thebes, Ancient Egypt (Second Intermediate Period)',
          approximateDate: 'c. 1550 BCE',
          epistemicStatus: {
            consensusLevel: 'probable',
            summary:
              'Historians agree on how the Egyptian method worked. What they still wonder is WHY scribes stuck to unit fractions and never wrote the same one twice (no 1/5 + 1/5).',
            competingHypotheses: [
              {
                claim: 'Fewer, Fairer Pieces',
                proponentsOrSources:
                  'Richard J. Gillings (Mathematics in the Time of the Pharaohs)',
                evidenceSummary:
                  'Different unit fractions let loaves be cut into fewer, bigger pieces, and everyone can see that the shares match.',
              },
              {
                claim: 'It Was Simply How Fractions Were Written',
                proponentsOrSources: 'Annette Imhausen (Mathematics in Ancient Egypt)',
                evidenceSummary:
                  'Egyptian writing only had a way to say "one part out of n". Since there is only one "fifth part", any other share had to be a sum of different parts.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'A unit fraction has a $1$ on top, like $\\frac{1}{2}$ or $\\frac{1}{10}$. It means one of that many equal pieces.',
          'Any fraction can be written as a sum of different unit fractions: $\\frac{3}{5} = \\frac{1}{2} + \\frac{1}{10}$.',
          'To add fractions, first cut them into same-sized pieces: $\\frac{1}{2} = \\frac{5}{10}$, so $\\frac{5}{10} + \\frac{1}{10} = \\frac{6}{10} = \\frac{3}{5}$.',
        ],
        realWorldApplication:
          'Half a pizza, a quarter of an hour, a third of a cup of flour: fractions appear wherever something is shared or measured. Cooks, builders, and musicians use them every day, and mathematicians are still solving puzzles about Egyptian fractions right now.',
      },
      artifactPlate: {
        title: 'The Rhind Mathematical Papyrus EA 10057',
        credit: 'British Museum, EA 10057 (via Wikimedia Commons)',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Rhind_Mathematical_Papyrus.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/d/d9/Rhind_Mathematical_Papyrus.jpg',
        altText:
          'A long strip of brown papyrus covered in black and red Egyptian handwriting, with small diagrams of triangles.',
        caption:
          'Part of the Rhind Papyrus, copied by the scribe Ahmes around 1550 BCE. It is over five meters long!',
      },
      exploreGraph: [
        {
          label: 'Rhind Mathematical Papyrus',
          category: 'primary-text',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Rhind_Mathematical_Papyrus',
        },
        {
          label: 'Egyptian Fractions',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Egyptian_fraction',
        },
        {
          label: 'Ahmes the Scribe',
          category: 'person',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Ahmes',
        },
        {
          label: 'Eye of Horus Fractions',
          category: 'concept',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Eye_of_Horus#As_fractions',
        },
      ],
      academicSources: [
        {
          author: 'Richard J. Gillings',
          title: 'Mathematics in the Time of the Pharaohs',
          citationSnippet: 'The 2/n table and the bread-sharing problems of the Rhind Papyrus.',
          publicationYear: 1972,
        },
        {
          author: 'Annette Imhausen',
          title: 'Mathematics in Ancient Egypt: A Contextual History',
          citationSnippet: 'Middle Kingdom administrative arithmetic and scribal education.',
          publicationYear: 2016,
        },
      ],
      interactiveConfig: {
        visualizer: 'partition-slicer',
        initialState: { targetFraction: '3/5', loaves: 3, workers: 5 },
      },
      practiceChallenges: [
        {
          id: 'u6-m1',
          question:
            'On the Baker’s Bench, cut one whole loaf into halves. How many pieces do you get?',
          hint: '1 whole loaf split into 2 equal halves: 1/2 + 1/2 = 1.',
          targetA: 1,
          targetB: 2,
          expectedResult: 2,
          successMessage: 'Clean cut! One loaf makes 2 halves: 1/2 + 1/2 = 1 whole loaf.',
          targetState: { halvesCut: true },
        },
        {
          id: 'u6-m2',
          question:
            'Cut all 3 loaves into halves and give every worker one half. Is the sharing finished? What is left on the bench?',
          hint: '3 loaves make 6 halves. 5 workers take one each, so 6 − 5 = 1 half is left.',
          targetA: 3,
          targetB: 5,
          expectedResult: 0.5,
          successMessage:
            'Every worker has 1/2, and one half is still on the bench. Not finished yet!',
          targetState: { everyWorkerHasHalf: true },
        },
        {
          id: 'u6-m3',
          question:
            "Solve Scribe Ahmes' challenge: cut the leftover half into 5 tenths and give one to each worker!",
          hint: '1/2 + 1/10 = 5/10 + 1/10 = 6/10 = 3/5.',
          targetA: 3,
          targetB: 5,
          expectedResult: 0.6,
          successMessage: 'Brilliant scribal math! Every worker has 1/2 + 1/10 = 3/5 of a loaf.',
          targetState: { solved: true },
        },
      ],
      level: 'elementary',
    },

    // ==========================================
    // UNIT 07: The Logic of Athens
    // ==========================================
    {
      id: 'unit-07-aristotle-logic',
      slug: 'aristotelian-logic-circuits',
      shortTitle: 'Unit 07: Logic',
      title: "The Architecture of Reason: Aristotle's Syllogism",
      subtitle: 'AND, OR, True, False, and How Logic Became Electricity',
      stage: 'intermediate',
      strand: 'logic',
      order: 7,
      prerequisites: ['unit-03-euclid-equality'],
      buildsOn: [
        {
          lessonId: 'unit-03-euclid-equality',
          connection:
            'Euclid’s first rule is itself a tiny argument: IF A = B AND B = C, THEN A = C. Logic studies the "if", the "and", and the "then".',
        },
      ],
      civilization: 'Classical Athens (Lyceum)',
      historicalEra: 'c. 350 BCE',
      mathematicalStatement: 'P \\land Q \\implies R',
      discoveryHook: {
        prompt:
          'To light the lantern in Aristotle’s school, two statements must BOTH be true (P AND Q). Flip the switches and see. Then change the rule to P OR Q. What is different?',
        targetAxiom:
          'AND needs every statement to be true (switches in a row). OR needs at least one to be true (switches side by side).',
        successCondition: 'Light the lamp once with the AND circuit and once with the OR circuit.',
        guidanceTip:
          'Electricity reaching the lamp is like truth reaching a conclusion: one open switch in a row stops everything.',
      },
      storyIllustration: {
        title: 'Aristotle Lecturing at the Lyceum Colonnade',
        imageUrl: 'assets/illustrations/unit-07-story.svg',
        altText:
          'Aristotle strolling through the olive gardens and shaded marble colonnade of the Lyceum in Athens, demonstrating logical reasoning by the glow of a bronze oil lamp.',
        caption:
          'In Athens about 2,350 years ago, Aristotle walked the shaded paths of his school, the Lyceum, working out which arguments can never fail.',
      },
      mathDiagram: {
        title: 'Logic You Can Build: AND (in a Row) vs OR (Side by Side)',
        imageUrl: 'assets/illustrations/unit-07-diagram.svg',
        altText:
          'Two circuit drawings. In the first, two switches sit in a row (P AND Q). In the second, they sit side by side (P OR Q). Each has a lamp.',
        caption:
          'Truth flows like electricity: an AND circuit needs every switch closed, while an OR circuit lights up if any one path is open to it.',
      },
      narrative: {
        hook: 'Long before computer chips, logic was a man walking through a garden in Athens, asking: which arguments can never be wrong?',
        historicalContext: {
          story:
            'About 2,350 years ago in Athens, people argued all day long: in the marketplace, in the law courts, and in the city assembly. The philosopher Aristotle wanted a way to tell a good argument from a clever trick. Teaching at his school, the Lyceum, he noticed that some arguments work every single time, no matter what they are about. A famous example goes: All humans are mortal. Socrates is a human. So Socrates is mortal. If the first two statements are true, the third one MUST be true. Aristotle called this pattern a syllogism, and with it he began the study of logic. The story kept growing. In 1854 an English teacher named George Boole showed that logic can be written like arithmetic, using just two values: true and false. Then in 1937 a 21-year-old student, Claude Shannon, realized that Boole’s true and false could be built out of electric switches: closed means true, open means false, switches in a row make AND, and switches side by side make OR. Every computer, phone, and game console is made of billions of these tiny switches.',
          civilizationOrOrigin: 'Athens, Ancient Greece',
          approximateDate: 'c. 350 BCE',
          epistemicStatus: {
            consensusLevel: 'established',
            summary:
              'Historians agree that Aristotle wrote the first known books on logic. They also point out that he did not do it all: the AND / OR / IF-THEN logic in this lab comes from a rival school, the Stoics.',
            competingHypotheses: [
              {
                claim: 'Aristotle: the Logic of Groups',
                proponentsOrSources: 'Aristotle (Organon / Prior Analytics)',
                evidenceSummary:
                  'His syllogisms are about groups of things ("all A are B") rather than about joining whole statements with AND and OR.',
              },
              {
                claim: 'The Stoics: the Logic of Statements',
                proponentsOrSources: 'Chrysippus of Soli (c. 280–206 BCE)',
                evidenceSummary:
                  'Worked out rules for joining statements with "and", "or", and "if… then": much closer to the logic computers use today.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'A statement (mathematicians say "proposition") is a sentence that is either true or false, like "It is raining."',
          '$P \\land Q$ means "P AND Q". It is true only when both are true, like two switches in a row.',
          '$P \\lor Q$ means "P OR Q". It is true when at least one is true, like two switches side by side.',
          'A valid argument is one where true starting statements always lead to a true conclusion.',
        ],
        realWorldApplication:
          'Every search you type, every level of a video game, and every text message relies on billions of tiny AND and OR switches inside a chip. Logic helps outside computers too: it is how detectives, doctors, and scientists check whether a conclusion really follows from the clues.',
      },
      artifactPlate: {
        title: 'Bust of Aristotle (Roman copy after Greek original)',
        credit: 'Photo by Jastrow (Wikimedia Commons); Palazzo Altemps, National Roman Museum',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Aristotle_Altemps_Inv8575.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/960px-Aristotle_Altemps_Inv8575.jpg',
        altText: 'Marble bust of philosopher Aristotle with curly hair and beard.',
        caption:
          'Aristotle, in a Roman marble copy of a Greek bronze portrait made around 330 BCE.',
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
          label: 'George Boole',
          category: 'person',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/George_Boole',
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
      practiceChallenges: [
        {
          id: 'u7-m1',
          question:
            'In the AND circuit, both switches must be closed (true). Close P and Q to light the Lyceum lantern!',
          hint: 'Switches in a row: the electricity needs every one of them closed.',
          targetA: 1,
          targetB: 1,
          expectedResult: 1,
          successMessage: 'Circuit complete! True AND true = true. The lantern glows.',
          targetState: { gate: 'AND', switchP: true, switchQ: true },
        },
        {
          id: 'u7-m2',
          question: 'Still in the AND circuit: what happens if P is true but Q is false?',
          hint: 'One open switch in a row breaks the whole path.',
          targetA: 1,
          targetB: 0,
          expectedResult: 0,
          successMessage:
            'The lantern goes dark. True AND false = false: every statement has to hold.',
          targetState: { gate: 'AND', switchP: true, switchQ: false },
        },
        {
          id: 'u7-m3',
          question: 'Switch to the OR circuit. Does the lantern light when only P is true?',
          hint: 'Side-by-side switches give the electricity another way through.',
          targetA: 1,
          targetB: 0,
          expectedResult: 1,
          successMessage: 'The lantern glows! True OR false = true. One good path is enough.',
          targetState: { gate: 'OR', switchP: true, switchQ: false },
        },
      ],
      level: 'foundations',
    },

    // ==========================================
    // UNIT 08: Geometric Construction
    // ==========================================
    {
      id: 'unit-08-euclid-equilateral',
      slug: 'euclids-first-construction-equilateral',
      shortTitle: 'Unit 08: Geometry',
      title: 'The First Construction: The Equilateral Triangle',
      subtitle: "A Ruler With No Numbers, a Compass, and the Very First Proof in Euclid's Elements",
      stage: 'intermediate',
      strand: 'geometry',
      order: 8,
      prerequisites: ['unit-03-euclid-equality', 'unit-07-aristotle-logic'],
      buildsOn: [
        {
          lessonId: 'unit-03-euclid-equality',
          connection:
            'The proof ends with Common Notion 1: sides AC and BC both equal AB, so they must equal each other.',
        },
        {
          lessonId: 'unit-07-aristotle-logic',
          connection:
            'A proof is a chain of logic. Every step must follow from the one before it, just as Aristotle demanded.',
        },
      ],
      civilization: 'Ptolemaic Alexandria (Hellenistic Greece)',
      historicalEra: 'c. 300 BCE',
      mathematicalStatement: 'AB = BC = CA',
      discoveryHook: {
        prompt:
          'You have a straightedge with no numbers on it and a compass. Someone draws a line from A to B. Can you find a third point C so that triangle ABC has three sides of exactly the same length, without measuring anything?',
        targetAxiom:
          'Every point on a circle is the same distance from its center. Two circles of the same size can find a point that is equally far from A and from B.',
        successCondition:
          'Follow the steps: sweep a circle around A, sweep a circle around B, then join the crossing point C to A and B.',
        guidanceTip:
          'The line AB is the radius of BOTH circles. Point C sits on both circles at once.',
      },
      storyIllustration: {
        title: 'Euclid Demonstrating Proposition 1 at the Mouseion Terrace',
        imageUrl: 'assets/illustrations/unit-08-story.svg',
        altText:
          'Euclid of Alexandria demonstrating Proposition 1 on the marble terrace of the Mouseion, constructing an equilateral triangle with a compass and straightedge as morning light illuminates the Library scrolls.',
        caption:
          'At the great library of Alexandria, Euclid used a plain straightedge and a compass to build a perfect triangle by reasoning alone.',
      },
      mathDiagram: {
        title: "Euclid's Proposition 1: Constructing an Equilateral Triangle",
        imageUrl: 'assets/illustrations/unit-08-diagram.svg',
        altText:
          "Mathematical diagram of Euclid's Proposition 1 from the Elements: constructing an equilateral triangle using two intersecting circles of equal radius.",
        caption:
          'Two equal circles automatically pinpoint the third corner of a triangle whose sides are guaranteed to be equal.',
      },
      narrative: {
        hook: 'The very first thing Euclid builds in his famous book needs no numbers at all: only two circles.',
        historicalContext: {
          story:
            'Open Euclid’s Elements to its very first puzzle and you find a challenge: "On a given finite straight line, to construct an equilateral triangle", which means a triangle with three equal sides. Euclid allows himself only two tools: a straightedge for drawing lines (it has no markings, so no measuring!) and a compass for drawing circles. He draws a circle around each end of the line, each one reaching to the other end. Where the circles cross, he marks a point and joins it up. Then comes the clever part: he PROVES the three sides must be equal, using the rule about equal things from his common notions. No measuring and no guessing, just reasoning. For more than 2,000 years, students all over the world have begun geometry with this exact page.',
          civilizationOrOrigin: 'Alexandria, Hellenistic Egypt',
          approximateDate: 'c. 300 BCE',
          epistemicStatus: {
            consensusLevel: 'contested',
            summary:
              'This really is the first proposition in the Elements. But sharp-eyed mathematicians later spotted a gap: Euclid never proves that the two circles actually cross! It looks obvious in the picture, yet none of his starting rules says so.',
            competingHypotheses: [
              {
                claim: 'The Missing Rule',
                proponentsOrSources:
                  'Moritz Pasch (1882); David Hilbert (Foundations of Geometry, 1899)',
                evidenceSummary:
                  'Showed that Euclid needed extra starting rules about when lines and circles must meet, and wrote those rules down to close the gap.',
              },
              {
                claim: 'The Picture Is Part of the Proof',
                proponentsOrSources: 'Kenneth Manders (2008); Reviel Netz (1999)',
                evidenceSummary:
                  'Argue that for Greek mathematicians a careful diagram was a fair way to show that the circles meet, not a mistake.',
              },
            ],
          },
        },
        conceptualExplanation: [
          'A straightedge joins any two points with a straight line (Euclid’s Postulate 1).',
          'A compass draws a circle around any center, through any other point (Postulate 3).',
          '$C$ is on the circle around $A$, so $AC = AB$. $C$ is also on the circle around $B$, so $BC = AB$.',
          'Two things equal to the same thing are equal to each other (Common Notion 1), so $AC = BC = AB$. All three sides match!',
        ],
        realWorldApplication:
          'Builders, carpenters, and artists still use compass-and-straightedge tricks to make perfect shapes without measuring. Triangles are the strongest shape for bridges and roof beams, and every 3D video game character is built from thousands of tiny triangles. Most of all, Euclid’s habit of proving things step by step became the model for all of mathematics and science.',
      },
      artifactPlate: {
        title: 'The First Printed Edition of Euclid’s Elements (Venice, 1482)',
        credit:
          'Printed by Erhard Ratdolt; plate from C. Thomas-Stanford, Early Editions of Euclid’s Elements (1926), via Wikimedia Commons',
        license: 'Public Domain',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Thomas-Stanford_Plate01b.jpg',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Thomas-Stanford_Plate01b.jpg/960px-Thomas-Stanford_Plate01b.jpg',
        altText:
          'An ornate page printed in 1482, with a decorated border and small diagrams of lines, circles, and triangles in the margin.',
        caption:
          'The opening page of Book I in the first printed Elements. For almost 1,800 years before this, every copy had to be written out by hand.',
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
      practiceChallenges: [
        {
          id: 'u8-m1',
          question:
            'Put the compass point on A and sweep a circle that passes through B. What is the radius of this circle?',
          hint: 'The radius is the distance from the center to the edge. Here that is the line AB.',
          targetA: 2,
          targetB: 0,
          expectedResult: 2,
          successMessage: 'Spot on! Circle A has a radius equal to the line AB.',
          targetState: { step: 2 },
        },
        {
          id: 'u8-m2',
          question:
            'Now put the compass point on B and sweep a second circle through A. Where do the two equal circles cross?',
          hint: 'Look above the line AB.',
          targetA: 3,
          targetB: 0,
          expectedResult: 3,
          successMessage: 'Found it! The two circles cross at a point above the line. Call it C.',
          targetState: { step: 3 },
        },
        {
          id: 'u8-m3',
          question: 'Join C to A and to B. Why must all three sides be the same length?',
          hint: 'Things equal to the same thing are equal to each other.',
          targetA: 4,
          targetB: 0,
          expectedResult: 4,
          successMessage:
            'Q.E.D.! AC = AB and BC = AB, so all three sides are equal. Triangle ABC is perfectly equilateral.',
          targetState: { step: 4 },
        },
      ],
      level: 'foundations',
    },
  ]);

  readonly currentLesson = computed(() => this.lessons()[this.activeLessonIndex()]);
  readonly allLessons = computed(() => this.lessons());
  readonly totalLessons = computed(() => this.lessons().length);

  readonly hasPrev = computed(() => this.activeLessonIndex() > 0);
  readonly hasNext = computed(() => this.activeLessonIndex() < this.lessons().length - 1);

  // Lessons the current one stands on (in teaching order), each with the reason it matters here
  readonly priorDiscoveries = computed(() => {
    const current = this.currentLesson();
    return current.prerequisites
      .map((id) => this.lessons().find((l) => l.id === id))
      .filter((lesson): lesson is MathLesson => !!lesson)
      .map((lesson) => ({ lesson, connection: this.connectionBetween(lesson, current) }));
  });

  // Later lessons that reuse the current one
  readonly nextDiscoveries = computed(() => {
    const current = this.currentLesson();
    return this.lessons()
      .filter((l) => l.prerequisites.includes(current.id))
      .map((lesson) => ({ lesson, connection: this.connectionBetween(current, lesson) }));
  });

  private connectionBetween(earlier: MathLesson, later: MathLesson): string {
    return later.buildsOn?.find((link) => link.lessonId === earlier.id)?.connection ?? '';
  }

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

      // Check legacy unit ID and alias mapping
      const matchesLegacy =
        (lesson.id === 'unit-01-gathering-addition' &&
          (normUnit === 'unit-01-ishango-addition' || normUnit === 'origins-of-addition')) ||
        (lesson.id === 'unit-02-taking-away-subtraction' &&
          normUnit === 'origins-of-subtraction') ||
        (lesson.id === 'unit-03-euclid-equality' &&
          (normUnit === 'unit-02-euclid-equality' ||
            normUnit === 'euclids-common-notions' ||
            normUnit === 'euclid-common-notions')) ||
        (lesson.id === 'unit-04-commutative-multiplication' &&
          (normUnit === 'unit-03-commutative-multiplication' ||
            normUnit === 'spatial-invariance-multiplication')) ||
        (lesson.id === 'unit-05-fair-share-division' &&
          (normUnit === 'unit-05' ||
            normUnit === 'sharing-the-harvest' ||
            normUnit === 'fair-share-division')) ||
        (lesson.id === 'unit-06-egyptian-fractions' &&
          (normUnit === 'unit-06' ||
            normUnit === 'unit-05-egyptian-fractions' ||
            normUnit === 'unit-04-egyptian-fractions' ||
            normUnit === 'egyptian-unit-fractions-rhind')) ||
        (lesson.id === 'unit-07-aristotle-logic' &&
          (normUnit === 'unit-07' ||
            normUnit === 'unit-06-aristotle-logic' ||
            normUnit === 'unit-05-aristotle-logic' ||
            normUnit === 'aristotelian-logic-circuits')) ||
        (lesson.id === 'unit-08-euclid-equilateral' &&
          (normUnit === 'unit-08' ||
            normUnit === 'unit-07-euclid-equilateral' ||
            normUnit === 'unit-06-euclid-equilateral' ||
            normUnit === 'euclids-first-construction-equilateral'));

      return (
        matchesLegacy ||
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
