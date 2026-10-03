import { TestBed } from '@angular/core/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {
  let service: ProgressService;
  let mockStore: Record<string, string> = {};

  const mockLocalStorage = {
    getItem: vi.fn((key: string) => mockStore[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      mockStore[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete mockStore[key];
    }),
    clear: vi.fn(() => {
      mockStore = {};
    }),
  };

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      configurable: true,
      writable: true,
    });
  });

  beforeEach(() => {
    mockStore = {};
    vi.clearAllMocks();
    TestBed.configureTestingModule({
      providers: [ProgressService],
    });
    service = TestBed.inject(ProgressService);
  });

  it('should start with no completed missions', () => {
    expect(service).toBeTruthy();
    expect(service.completedMissions().size).toBe(0);
    expect(service.isCompleted('u1-m1')).toBe(false);
  });

  it('should record completed missions and persist them', () => {
    service.complete(['u1-m1', 'u1-m2']);
    expect(service.isCompleted('u1-m1')).toBe(true);
    expect(service.isCompleted('u1-m2')).toBe(true);
    expect(service.countCompleted(['u1-m1', 'u1-m2', 'u1-m3'])).toBe(2);
    expect(JSON.parse(mockStore['imx_completed_missions'])).toEqual(['u1-m1', 'u1-m2']);
  });

  it('should not write to storage when nothing new is completed', () => {
    service.complete(['u1-m1']);
    mockLocalStorage.setItem.mockClear();
    service.complete(['u1-m1']);
    expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
  });

  it('should reset only the requested missions', () => {
    service.complete(['u1-m1', 'u2-m1']);
    service.reset(['u1-m1']);
    expect(service.isCompleted('u1-m1')).toBe(false);
    expect(service.isCompleted('u2-m1')).toBe(true);
    expect(JSON.parse(mockStore['imx_completed_missions'])).toEqual(['u2-m1']);
  });

  it('should restore saved progress and ignore corrupt data', () => {
    mockStore['imx_completed_missions'] = JSON.stringify(['u3-m1', 42, 'u3-m2']);
    const restored = TestBed.runInInjectionContext(() => new ProgressService());
    expect([...restored.completedMissions()]).toEqual(['u3-m1', 'u3-m2']);

    mockStore['imx_completed_missions'] = '{not json';
    const recovered = TestBed.runInInjectionContext(() => new ProgressService());
    expect(recovered.completedMissions().size).toBe(0);
  });
});
