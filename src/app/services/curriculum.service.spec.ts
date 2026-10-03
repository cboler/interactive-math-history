import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  let service: CurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
  });

  it('should initialize with 8 units and default to Unit 01', () => {
    expect(service).toBeTruthy();
    expect(service.totalLessons()).toBe(8);
    expect(service.activeLessonIndex()).toBe(0);
    expect(service.hasPrev()).toBe(false);
    expect(service.hasNext()).toBe(true);

    const unit1 = service.currentLesson();
    expect(unit1.id).toBe('unit-01-gathering-addition');
    expect(unit1.title).toContain('Putting Things Together');
    expect(unit1.storyIllustration).toBeTruthy();
    expect(unit1.mathDiagram).toBeTruthy();
    expect(unit1.practiceChallenges?.length).toBe(3);
  });

  it('should navigate through lessons sequentially across all 8 units', () => {
    // Unit 01 -> Unit 02 (Subtraction)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(1);
    expect(service.currentLesson().id).toBe('unit-02-taking-away-subtraction');
    expect(service.currentLesson().title).toContain('Taking Things Away');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 02 -> Unit 03 (Equality)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(2);
    expect(service.currentLesson().id).toBe('unit-03-euclid-equality');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 03 -> Unit 04 (Multiplication)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(3);
    expect(service.currentLesson().id).toBe('unit-04-commutative-multiplication');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 04 -> Unit 05 (Division)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(4);
    expect(service.currentLesson().id).toBe('unit-05-fair-share-division');
    expect(service.currentLesson().title).toContain('Sharing the Harvest');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 05 -> Unit 06 (Fractions)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(5);
    expect(service.currentLesson().id).toBe('unit-06-egyptian-fractions');
    expect(service.currentLesson().title).toContain('Slicing the Loaf');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 06 -> Unit 07 (Logic)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(6);
    expect(service.currentLesson().id).toBe('unit-07-aristotle-logic');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 07 -> Unit 08 (Geometry)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(7);
    expect(service.currentLesson().id).toBe('unit-08-euclid-equilateral');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(false);

    // Should not advance past end
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(7);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(6);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(5);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(4);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(3);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(2);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(1);

    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(0);

    // Should not step past start
    service.prevLesson();
    expect(service.activeLessonIndex()).toBe(0);
  });

  it('should prevent setting invalid lesson index', () => {
    service.setLessonIndex(-1);
    expect(service.activeLessonIndex()).toBe(0);
    service.setLessonIndex(999);
    expect(service.activeLessonIndex()).toBe(0);
    service.setLessonIndex(7);
    expect(service.activeLessonIndex()).toBe(7);
  });

  it('should find lesson index by level/stage and flexible unit descriptors', () => {
    // By canonical slug
    expect(service.findLessonIndex('foundations', 'origins-of-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'origins-of-subtraction')).toBe(1);
    expect(service.findLessonIndex('foundations', 'euclids-common-notions')).toBe(2);
    expect(service.findLessonIndex('foundations', 'euclid-common-notions')).toBe(2);
    expect(service.findLessonIndex('elementary', 'spatial-invariance-multiplication')).toBe(3);
    expect(service.findLessonIndex('elementary', 'sharing-the-harvest')).toBe(4);
    expect(service.findLessonIndex('elementary', 'fair-share-division')).toBe(4);
    expect(service.findLessonIndex('elementary', 'egyptian-unit-fractions-rhind')).toBe(5);
    expect(service.findLessonIndex('foundations', 'aristotelian-logic-circuits')).toBe(6);
    expect(service.findLessonIndex('geometry', 'euclids-first-construction-equilateral')).toBe(7);

    // By ID
    expect(service.findLessonIndex('foundations', 'unit-01-gathering-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02-taking-away-subtraction')).toBe(1);
    expect(service.findLessonIndex('foundations', 'unit-03-euclid-equality')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-04-commutative-multiplication')).toBe(3);
    expect(service.findLessonIndex('elementary', 'unit-05-fair-share-division')).toBe(4);
    expect(service.findLessonIndex('elementary', 'unit-06-egyptian-fractions')).toBe(5);
    expect(service.findLessonIndex('foundations', 'unit-07-aristotle-logic')).toBe(6);
    expect(service.findLessonIndex('geometry', 'unit-08-euclid-equilateral')).toBe(7);

    // Legacy ID support
    expect(service.findLessonIndex('foundations', 'unit-01-ishango-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02-euclid-equality')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-05-egyptian-fractions')).toBe(5);

    // By order number and unit prefixes
    expect(service.findLessonIndex('foundations', '1')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-01')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02')).toBe(1);
    expect(service.findLessonIndex('foundations', 'unit-03')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-04')).toBe(3);
    expect(service.findLessonIndex('elementary', 'unit-05')).toBe(4);
    expect(service.findLessonIndex('elementary', 'unit-06')).toBe(5);
    expect(service.findLessonIndex('foundations', 'unit-07')).toBe(6);
    expect(service.findLessonIndex('geometry', 'unit-08')).toBe(7);
    expect(service.findLessonIndex('geometry', '8')).toBe(7);

    // Case insensitivity
    expect(service.findLessonIndex('FOUNDATIONS', 'ORIGINS-OF-SUBTRACTION')).toBe(1);
    expect(service.findLessonIndex('FOUNDATIONS', 'EUCLID-COMMON-NOTIONS')).toBe(2);
    expect(service.findLessonIndex('ELEMENTARY', 'SHARING-THE-HARVEST')).toBe(4);
    expect(service.findLessonIndex('LOGIC', 'ARISTOTELIAN-LOGIC-CIRCUITS')).toBe(6);
    expect(service.findLessonIndex('GEOMETRY', 'EUCLIDS-FIRST-CONSTRUCTION-EQUILATERAL')).toBe(7);

    // Invalid combinations
    expect(service.findLessonIndex('geometry', 'origins-of-addition')).toBe(-1);
    expect(service.findLessonIndex('foundations', 'non-existent')).toBe(-1);
  });

  it('should navigate to lesson directly and update active index', () => {
    const success3 = service.navigateToLesson('elementary', 'spatial-invariance-multiplication');
    expect(success3).toBe(true);
    expect(service.activeLessonIndex()).toBe(3);
    expect(service.currentLesson().shortTitle).toBe('Unit 04: Multiplication');

    const success4 = service.navigateToLesson('elementary', 'sharing-the-harvest');
    expect(success4).toBe(true);
    expect(service.activeLessonIndex()).toBe(4);
    expect(service.currentLesson().shortTitle).toBe('Unit 05: Division');

    const success5 = service.navigateToLesson('elementary', 'egyptian-unit-fractions-rhind');
    expect(success5).toBe(true);
    expect(service.activeLessonIndex()).toBe(5);
    expect(service.currentLesson().shortTitle).toBe('Unit 06: Fractions');

    const success6 = service.navigateToLesson('foundations', 'aristotelian-logic-circuits');
    expect(success6).toBe(true);
    expect(service.activeLessonIndex()).toBe(6);
    expect(service.currentLesson().shortTitle).toBe('Unit 07: Logic');

    const success7 = service.navigateToLesson('geometry', 'euclids-first-construction-equilateral');
    expect(success7).toBe(true);
    expect(service.activeLessonIndex()).toBe(7);
    expect(service.currentLesson().shortTitle).toBe('Unit 08: Geometry');

    const fail = service.navigateToLesson('invalid', 'unit');
    expect(fail).toBe(false);
    expect(service.activeLessonIndex()).toBe(7);
  });

  it('should resolve lessons by their current stage as well as legacy level routes', () => {
    // Units 07 and 08 moved from "foundations" to "intermediate"; old links must keep working
    expect(service.currentLesson().stage).toBe('foundations');
    expect(service.findLessonIndex('intermediate', 'aristotelian-logic-circuits')).toBe(6);
    expect(service.findLessonIndex('foundations', 'aristotelian-logic-circuits')).toBe(6);
    expect(service.findLessonIndex('intermediate', 'euclids-first-construction-equilateral')).toBe(
      7,
    );
    expect(service.findLessonIndex('foundations', 'unit-08')).toBe(7);
  });

  it('should order lessons so difficulty never steps backwards', () => {
    const stageRank = { foundations: 0, elementary: 1, intermediate: 2, advanced: 3 };
    const ranks = service.lessons().map((l) => stageRank[l.stage]);
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(service.lessons().map((l) => l.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('should only build on lessons that come earlier, and explain every link', () => {
    const lessons = service.lessons();
    const orderById = new Map(lessons.map((l) => [l.id, l.order]));

    for (const lesson of lessons) {
      for (const prerequisite of lesson.prerequisites) {
        expect(orderById.has(prerequisite), `${lesson.id} -> ${prerequisite}`).toBe(true);
        expect(orderById.get(prerequisite)!).toBeLessThan(lesson.order);
      }
      // Exactly one plain-language connection per prerequisite
      expect((lesson.buildsOn ?? []).map((link) => link.lessonId).sort()).toEqual(
        [...lesson.prerequisites].sort(),
      );
      for (const link of lesson.buildsOn ?? []) {
        expect(link.connection.length).toBeGreaterThan(20);
      }
    }
  });

  it('should expose what the current lesson builds on and where it leads', () => {
    // Unit 01: nothing before it, three lessons reuse it
    expect(service.priorDiscoveries()).toEqual([]);
    expect(service.nextDiscoveries().map((d) => d.lesson.id)).toEqual([
      'unit-02-taking-away-subtraction',
      'unit-03-euclid-equality',
      'unit-04-commutative-multiplication',
    ]);
    expect(service.nextDiscoveries()[0].connection).toContain('Taking away undoes adding');

    // Unit 08: stands on equality and logic, nothing after it yet
    service.setLessonIndex(7);
    expect(service.priorDiscoveries().map((d) => d.lesson.id)).toEqual([
      'unit-03-euclid-equality',
      'unit-07-aristotle-logic',
    ]);
    expect(service.priorDiscoveries()[0].connection).toContain('Common Notion 1');
    expect(service.nextDiscoveries()).toEqual([]);
  });

  it('should give every mission a unique id and a lab state it can reach', () => {
    const sliderLabs = ['number-line-vector', 'balance-scale', 'grid-array', 'sharing-distributor'];
    const ids = new Set<string>();

    for (const lesson of service.lessons()) {
      const config = lesson.interactiveConfig;
      for (const mission of lesson.practiceChallenges ?? []) {
        expect(ids.has(mission.id), `duplicate mission id ${mission.id}`).toBe(false);
        ids.add(mission.id);

        if (sliderLabs.includes(config.visualizer)) {
          // Slider missions must sit inside the slider ranges, or they could never be completed
          expect(mission.targetA).toBeGreaterThanOrEqual(config.minA!);
          expect(mission.targetA).toBeLessThanOrEqual(config.maxA!);
          expect(mission.targetB).toBeGreaterThanOrEqual(config.minB!);
          expect(mission.targetB).toBeLessThanOrEqual(config.maxB!);
        } else {
          expect(mission.targetState, `${mission.id} needs a targetState`).toBeDefined();
        }
      }
    }
  });

  it('should source every artifact photograph from Wikimedia Commons over https', () => {
    for (const lesson of service.lessons()) {
      const plate = lesson.artifactPlate;
      expect(plate, `${lesson.id} artifact plate`).toBeDefined();
      expect(plate!.imageUrl).toMatch(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\//);
      expect(plate!.sourceUrl).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
      expect(plate!.license).toBeTruthy();
      expect(plate!.credit).toBeTruthy();
      expect(plate!.altText.length).toBeGreaterThan(20);
    }
  });

  it('should provide story illustrations, math diagrams, and practice challenges for all 8 units', () => {
    const lessons = service.lessons();
    expect(lessons.length).toBe(8);

    for (const lesson of lessons) {
      expect(lesson.storyIllustration).toBeDefined();
      expect(lesson.storyIllustration?.imageUrl).toMatch(
        /^assets\/illustrations\/unit-0\d-story\.svg$/,
      );
      expect(lesson.storyIllustration?.title).toBeTruthy();

      expect(lesson.mathDiagram).toBeDefined();
      expect(lesson.mathDiagram?.imageUrl).toMatch(
        /^assets\/illustrations\/unit-0\d-diagram\.svg$/,
      );
      expect(lesson.mathDiagram?.title).toBeTruthy();

      expect(lesson.practiceChallenges).toBeDefined();
      expect(lesson.practiceChallenges!.length).toBeGreaterThanOrEqual(2);
      for (const challenge of lesson.practiceChallenges!) {
        expect(challenge.id).toBeTruthy();
        expect(challenge.question).toBeTruthy();
        expect(challenge.hint).toBeTruthy();
        expect(challenge.successMessage).toBeTruthy();
      }
    }
  });
});
