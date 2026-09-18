import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  let service: CurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
  });

  it('should initialize with 4 units and default to Unit 01', () => {
    expect(service).toBeTruthy();
    expect(service.totalLessons()).toBe(4);
    expect(service.activeLessonIndex()).toBe(0);
    expect(service.hasPrev()).toBe(false);
    expect(service.hasNext()).toBe(true);

    const unit1 = service.currentLesson();
    expect(unit1.id).toBe('unit-01-ishango-addition');
    expect(unit1.title).toContain('The Origin of Combining');
  });

  it('should navigate through lessons sequentially', () => {
    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(1);
    expect(service.currentLesson().id).toBe('unit-02-euclid-equality');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(2);
    expect(service.currentLesson().id).toBe('unit-03-commutative-multiplication');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(3);
    expect(service.currentLesson().id).toBe('unit-04-egyptian-fractions');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(false);

    // Should not advance past end
    service.nextLesson();
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
    service.setLessonIndex(3);
    expect(service.activeLessonIndex()).toBe(3);
  });

  it('should find lesson index by level/stage and flexible unit descriptors', () => {
    // By canonical slug
    expect(service.findLessonIndex('foundations', 'origins-of-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'euclids-common-notions')).toBe(1);
    expect(service.findLessonIndex('foundations', 'euclid-common-notions')).toBe(1);
    expect(service.findLessonIndex('arithmetic', 'spatial-invariance-multiplication')).toBe(2);
    expect(service.findLessonIndex('elementary', 'egyptian-unit-fractions-rhind')).toBe(3);

    // By ID
    expect(service.findLessonIndex('foundations', 'unit-01-ishango-addition')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02-euclid-equality')).toBe(1);
    expect(service.findLessonIndex('elementary', 'unit-04-egyptian-fractions')).toBe(3);

    // By order number and unit prefixes
    expect(service.findLessonIndex('foundations', '1')).toBe(0);
    expect(service.findLessonIndex('foundations', 'unit-02')).toBe(1);
    expect(service.findLessonIndex('arithmetic', 'unit-3')).toBe(2);
    expect(service.findLessonIndex('elementary', 'unit-04')).toBe(3);

    // Case insensitivity
    expect(service.findLessonIndex('FOUNDATIONS', 'EUCLID-COMMON-NOTIONS')).toBe(1);

    // Invalid combinations
    expect(service.findLessonIndex('geometry', 'origins-of-addition')).toBe(-1);
    expect(service.findLessonIndex('foundations', 'non-existent')).toBe(-1);
  });

  it('should navigate to lesson directly and update active index', () => {
    const success = service.navigateToLesson('arithmetic', 'spatial-invariance-multiplication');
    expect(success).toBe(true);
    expect(service.activeLessonIndex()).toBe(2);
    expect(service.currentLesson().shortTitle).toBe('Unit 03: Multiplication');

    const success4 = service.navigateToLesson('elementary', 'egyptian-unit-fractions-rhind');
    expect(success4).toBe(true);
    expect(service.activeLessonIndex()).toBe(3);
    expect(service.currentLesson().shortTitle).toBe('Unit 04: Fractions');

    const fail = service.navigateToLesson('invalid', 'unit');
    expect(fail).toBe(false);
    expect(service.activeLessonIndex()).toBe(3);
  });
});
