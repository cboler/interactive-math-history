import { TestBed } from '@angular/core/testing';
import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  let service: FeedbackService;
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
      providers: [FeedbackService],
    });
    service = TestBed.inject(FeedbackService);
  });

  it('should be created with sound and haptics enabled by default', () => {
    expect(service).toBeTruthy();
    expect(service.soundEnabled()).toBe(true);
    expect(service.hapticsEnabled()).toBe(true);
    expect(service.feedbackEnabled()).toBe(true);
  });

  it('should toggle feedback state collectively', () => {
    expect(service.feedbackEnabled()).toBe(true);

    service.toggleFeedback();
    expect(service.soundEnabled()).toBe(false);
    expect(service.hapticsEnabled()).toBe(false);
    expect(service.feedbackEnabled()).toBe(false);

    service.toggleFeedback();
    expect(service.soundEnabled()).toBe(true);
    expect(service.hapticsEnabled()).toBe(true);
    expect(service.feedbackEnabled()).toBe(true);
  });

  it('should toggle individual sound and haptic states', () => {
    service.toggleSound();
    expect(service.soundEnabled()).toBe(false);
    expect(service.hapticsEnabled()).toBe(true);
    expect(service.feedbackEnabled()).toBe(true);

    service.toggleHaptics();
    expect(service.hapticsEnabled()).toBe(false);
    expect(service.feedbackEnabled()).toBe(false);
  });

  it('should safely no-op audio presets when Web Audio is unavailable or sound is disabled', () => {
    service.soundEnabled.set(false);
    expect(() => {
      service.tick();
      service.equilibriumChime();
      service.tiltThud();
      service.snapWhoosh();
    }).not.toThrow();
  });

  it('should invoke navigator.vibrate with correct patterns for haptic presets', () => {
    const vibrateSpy = vi.fn();
    const originalNavigator = window.navigator;

    Object.defineProperty(window, 'navigator', {
      value: { ...originalNavigator, vibrate: vibrateSpy },
      configurable: true,
      writable: true,
    });

    try {
      service.lightTap();
      expect(vibrateSpy).toHaveBeenCalledWith(8);

      service.successPulse();
      expect(vibrateSpy).toHaveBeenCalledWith([15, 40, 25]);

      service.mediumSnap();
      expect(vibrateSpy).toHaveBeenCalledWith(20);

      // Disabled haptics should not trigger vibrate
      service.hapticsEnabled.set(false);
      vibrateSpy.mockClear();
      service.lightTap();
      expect(vibrateSpy).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'navigator', {
        value: originalNavigator,
        configurable: true,
        writable: true,
      });
    }
  });

  it('should synthesize audio when AudioContext is present and sound is enabled', () => {
    const mockOsc = {
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    const mockGain = {
      gain: {
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };

    class MockAudioContext {
      currentTime = 10;
      state = 'running';
      createOscillator = vi.fn().mockReturnValue(mockOsc);
      createGain = vi.fn().mockReturnValue(mockGain);
      destination = {};
      resume = vi.fn().mockResolvedValue(undefined);
    }

    (window as unknown as { AudioContext?: unknown }).AudioContext = MockAudioContext;

    try {
      // Create new instance with mock audio context in injection context
      const freshService = TestBed.runInInjectionContext(() => new FeedbackService());

      freshService.tick();
      expect(mockOsc.frequency.setValueAtTime).toHaveBeenCalledWith(800, 10);
      expect(mockOsc.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(200, 10.025);

      freshService.tiltThud();
      expect(mockOsc.type).toBe('triangle');

      freshService.snapWhoosh();
      expect(mockOsc.type).toBe('sine');

      freshService.equilibriumChime();
      expect(mockOsc.frequency.setValueAtTime).toHaveBeenCalledWith(523.25, 10);
    } finally {
      delete (window as unknown as { AudioContext?: unknown }).AudioContext;
    }
  });
});
