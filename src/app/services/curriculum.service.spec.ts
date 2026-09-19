import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  let service: CurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
  });

  it('should initialize with 7 units and default to Unit 01', () => {
    expect(service).toBeTruthy();
    expect(service.totalLessons()).toBe(7);
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

  it('should navigate through lessons sequentially across all 7 units', () => {
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

    // Unit 04 -> Unit 05 (Fractions)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(4);
    expect(service.currentLesson().id).toBe('unit-05-egyptian-fractions');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 05 -> Unit 06 (Logic)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(5);
    expect(service.currentLesson().id).toBe('unit-06-aristotle-logic');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    // Unit 06 -> Unit 07 (Geometry)
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(6);
    expect(service.currentLesson().id).toBe('unit-07-euclid-equilateral');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(false);

    // Should not advance past end
    service.nextLesson();
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
    service.setLessonIndex(6);
    expect(service.activeLessonIndex()).toBe(6);
  });

  it('should find lesson index by level/stage and flexible unit descriptors', () => {
    // By canonical slug
    expect(service.findLessonIndex('foundations', 'origins-of-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'origins-of-subtraction')).toBe(1);
    expect(service.findLessonIndex('foundations', 'euclids-common-notions')).toBe(2);
    expect(service.findLessonIndex('foundations', 'euclid-common-notions')).toBe(2);
    expect(service.findLessonIndex('elementary', 'spatial-invariance-multiplication')).toBe(3);
    expect(service.findLessonIndex('elementary', 'egyptian-unit-fractions-rhind')).toBe(4);
    expect(service.findLessonIndex('foundations', 'aristotelian-logic-circuits')).toBe(5);
    expect(service.findLessonIndex('geometry', 'euclids-first-construction-equilateral')).toBe(6);

    // By ID
    expect(service.findLessonIndex('foundations', 'unit-01-gathering-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02-taking-away-subtraction')).toBe(1);
    expect(service.findLessonIndex('foundations', 'unit-03-euclid-equality')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-05-egyptian-fractions')).toBe(4);
    expect(service.findLessonIndex('foundations', 'unit-06-aristotle-logic')).toBe(5);
    expect(service.findLessonIndex('geometry', 'unit-07-euclid-equilateral')).toBe(6);

    // Legacy ID support
    expect(service.findLessonIndex('foundations', 'unit-01-ishango-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02-euclid-equality')).toBe(2);

    // By order number and unit prefixes
    expect(service.findLessonIndex('foundations', '1')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-01')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02')).toBe(1);
    expect(service.findLessonIndex('foundations', 'unit-03')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-04')).toBe(3);
    expect(service.findLessonIndex('elementary', 'unit-05')).toBe(4);
    expect(service.findLessonIndex('foundations', 'unit-06')).toBe(5);
    expect(service.findLessonIndex('geometry', 'unit-07')).toBe(6);
    expect(service.findLessonIndex('geometry', '7')).toBe(6);

    // Case insensitivity
    expect(service.findLessonIndex('FOUNDATIONS', 'ORIGINS-OF-SUBTRACTION')).toBe(1);
    expect(service.findLessonIndex('FOUNDATIONS', 'EUCLID-COMMON-NOTIONS')).toBe(2);
    expect(service.findLessonIndex('LOGIC', 'ARISTOTELIAN-LOGIC-CIRCUITS')).toBe(5);
    expect(service.findLessonIndex('GEOMETRY', 'EUCLIDS-FIRST-CONSTRUCTION-EQUILATERAL')).toBe(6);

    // Invalid combinations
    expect(service.findLessonIndex('geometry', 'origins-of-addition')).toBe(-1);
    expect(service.findLessonIndex('foundations', 'non-existent')).toBe(-1);
  });

  it('should navigate to lesson directly and update active index', () => {
    const success3 = service.navigateToLesson('elementary', 'spatial-invariance-multiplication');
    expect(success3).toBe(true);
    expect(service.activeLessonIndex()).toBe(3);
    expect(service.currentLesson().shortTitle).toBe('Unit 04: Multiplication');

    const success4 = service.navigateToLesson('elementary', 'egyptian-unit-fractions-rhind');
    expect(success4).toBe(true);
    expect(service.activeLessonIndex()).toBe(4);
    expect(service.currentLesson().shortTitle).toBe('Unit 05: Fractions');

    const success5 = service.navigateToLesson('foundations', 'aristotelian-logic-circuits');
    expect(success5).toBe(true);
    expect(service.activeLessonIndex()).toBe(5);
    expect(service.currentLesson().shortTitle).toBe('Unit 06: Logic');

    const success6 = service.navigateToLesson('geometry', 'euclids-first-construction-equilateral');
    expect(success6).toBe(true);
    expect(service.activeLessonIndex()).toBe(6);
    expect(service.currentLesson().shortTitle).toBe('Unit 07: Geometry');

    const fail = service.navigateToLesson('invalid', 'unit');
    expect(fail).toBe(false);
    expect(service.activeLessonIndex()).toBe(6);
  });
});
