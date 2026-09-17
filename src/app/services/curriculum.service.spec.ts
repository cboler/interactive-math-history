import { TestBed } from '@angular/core/testing';
import { CurriculumService } from './curriculum.service';

describe('CurriculumService', () => {
  let service: CurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumService);
  });

  it('should be created and default to unit 01', () => {
    expect(service).toBeTruthy();
    expect(service.activeLessonIndex()).toBe(0);
    const lesson = service.currentLesson();
    expect(lesson.id).toBe('unit-01-ishango-addition');
    expect(lesson.title).toContain('The Origin of Combining');
    expect(lesson.interactiveConfig.visualizer).toBe('number-line-vector');
  });

  it('should prevent setting invalid lesson index', () => {
    service.setLessonIndex(-1);
    expect(service.activeLessonIndex()).toBe(0);
    service.setLessonIndex(999);
    expect(service.activeLessonIndex()).toBe(0);
  });
});
