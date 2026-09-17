import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private static readonly SOUND_STORAGE_KEY = 'imx_sound_enabled';
  private static readonly HAPTICS_STORAGE_KEY = 'imx_haptics_enabled';

  private audioCtx: AudioContext | null = null;
  private unlockHandler?: () => void;

  readonly soundEnabled = signal<boolean>(
    this.loadStorageBoolean(FeedbackService.SOUND_STORAGE_KEY, true),
  );
  readonly hapticsEnabled = signal<boolean>(
    this.loadStorageBoolean(FeedbackService.HAPTICS_STORAGE_KEY, true),
  );

  readonly feedbackEnabled = computed(() => this.soundEnabled() || this.hapticsEnabled());

  constructor() {
    // Synchronize signal changes to localStorage
    effect(() => {
      this.saveStorageBoolean(FeedbackService.SOUND_STORAGE_KEY, this.soundEnabled());
    });

    effect(() => {
      this.saveStorageBoolean(FeedbackService.HAPTICS_STORAGE_KEY, this.hapticsEnabled());
    });

    this.registerUnlockListeners();
  }

  // --- Global State Controls ---

  toggleFeedback(): void {
    const next = !this.feedbackEnabled();
    this.soundEnabled.set(next);
    this.hapticsEnabled.set(next);
  }

  toggleSound(): void {
    this.soundEnabled.update((v) => !v);
  }

  toggleHaptics(): void {
    this.hapticsEnabled.update((v) => !v);
  }

  // --- Web Audio API Presets ---

  /**
   * Short decaying sine burst (800 Hz -> 200 Hz over 25 ms, peak gain 0.12)
   * for discrete slider steps and number line tick crossing.
   */
  tick(): void {
    if (!this.soundEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.025);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.028);
    } catch {
      // Intentional simplification: Ignore Web Audio node creation exceptions on restricted platforms.
    }
  }

  /**
   * Ascending two-tone harmonic (C5 523.25 Hz -> G5 783.99 Hz with exponential decay over 350 ms)
   * triggered when A = B in the balance scale.
   */
  equilibriumChime(): void {
    if (!this.soundEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Note 1: C5 (523.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.12, now + 0.008);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.36);

      // Note 2: G5 (783.99 Hz) ascending harmonic offset by 65 ms
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const t2 = now + 0.065;
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(783.99, t2);
      gain2.gain.setValueAtTime(0.001, t2);
      gain2.gain.linearRampToValueAtTime(0.14, t2 + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(t2);
      osc2.stop(now + 0.36);
    } catch {
      // Intentional simplification: Ignore Web Audio node errors
    }
  }

  /**
   * Low mechanical triangle thump (110 Hz -> 45 Hz over 60 ms)
   * when the balance scale reaches maximum tilt (+/- 15 degrees).
   */
  tiltThud(): void {
    if (!this.soundEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.06);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.2, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch {
      // Intentional simplification: Ignore Web Audio node errors
    }
  }

  /**
   * Quick pitch-up ramp (300 Hz -> 600 Hz over 80 ms)
   * triggered during grid transposition.
   */
  snapWhoosh(): void {
    if (!this.soundEnabled()) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.085);
    } catch {
      // Intentional simplification: Ignore Web Audio node errors
    }
  }

  // --- Web Vibration API Presets ---

  /**
   * Light tap haptic for incremental steps: navigator.vibrate(8)
   */
  lightTap(): void {
    this.vibrate(8);
  }

  /**
   * Success pulse haptic for achieving balance: navigator.vibrate([15, 40, 25])
   */
  successPulse(): void {
    this.vibrate([15, 40, 25]);
  }

  /**
   * Medium snap haptic for grid orientation toggles: navigator.vibrate(20)
   */
  mediumSnap(): void {
    this.vibrate(20);
  }

  // --- Internal Utilities ---

  private vibrate(pattern: number | number[]): void {
    if (!this.hapticsEnabled()) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Graceful no-op on platforms restricting or disabling vibration
      }
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;

      try {
        this.audioCtx = new AudioCtxClass();
      } catch {
        return null;
      }
    }

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {
        // Ignore audio resume failure before gesture
      });
    }

    return this.audioCtx;
  }

  private registerUnlockListeners(): void {
    if (typeof window === 'undefined') return;

    this.unlockHandler = () => {
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {
          // Ignore audio resume failure
        });
      }
      this.removeUnlockListeners();
    };

    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    for (const evt of events) {
      window.addEventListener(evt, this.unlockHandler, { passive: true, once: true });
    }
  }

  private removeUnlockListeners(): void {
    if (typeof window === 'undefined' || !this.unlockHandler) return;
    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    for (const evt of events) {
      window.removeEventListener(evt, this.unlockHandler);
    }
    this.unlockHandler = undefined;
  }

  private loadStorageBoolean(key: string, defaultValue: boolean): boolean {
    if (typeof window === 'undefined') return defaultValue;
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        const val = window.localStorage.getItem(key);
        return val !== null ? val === 'true' : defaultValue;
      }
    } catch {
      // Ignore security or storage quota errors
    }
    return defaultValue;
  }

  private saveStorageBoolean(key: string, value: boolean): void {
    if (typeof window === 'undefined') return;
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        window.localStorage.setItem(key, String(value));
      }
    } catch {
      // Ignore quota or security errors in test/sandbox
    }
  }
}
