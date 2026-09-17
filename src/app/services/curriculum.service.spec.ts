import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  let service: CurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
  });

  it('should initialize with 3 units and default to Unit 01', () => {
    expect(service).toBeTruthy();
    expect(service.totalLessons()).toBe(3);
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
    expect(service.currentLesson().mathematicalStatement).toBe('If A = B and B = C, then A = C');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(true);

    service.nextLesson();
    expect(service.activeLessonIndex()).toBe(2);
    expect(service.currentLesson().id).toBe('unit-03-commutative-multiplication');
    expect(service.currentLesson().mathematicalStatement).toBe('A × B = B × A');
    expect(service.hasPrev()).toBe(true);
    expect(service.hasNext()).toBe(false);

    // Should not advance past end
    service.nextLesson();
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
    service.setLessonIndex(2);
    expect(service.activeLessonIndex()).toBe(2);
  });
});
