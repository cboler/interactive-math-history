import { Component, signal, inject, effect, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CurriculumService } from './services/curriculum.service';
import { FeedbackService } from './core/services/feedback.service';
import { IconComponent } from './shared/components/icon/icon.component';

export type ThemePreference = 'system' | 'light' | 'dark';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private static readonly THEME_STORAGE_KEY = 'imx_theme_preference';

  protected readonly title = signal('Interactive Math & History');
  protected readonly canInstall = signal(false);
  protected readonly showBackToTop = signal(false);
  protected readonly curriculum = inject(CurriculumService);
  protected readonly feedback = inject(FeedbackService);
  private readonly titleService = inject(Title);

  protected readonly themePreference = signal<ThemePreference>(this.loadStorageTheme('system'));
  protected readonly isDark = signal<boolean>(false);

  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private scrollListener?: () => void;
  private installPromptListener?: (e: Event) => void;
  private mediaQueryListener?: () => void;

  constructor() {
    effect(() => {
      const current = this.curriculum.currentLesson();
      if (current) {
        this.titleService.setTitle(
          `${current.shortTitle}: ${current.title} • Interactive Math & History`,
        );
      }
    });

    effect(() => {
      const pref = this.themePreference();
      this.saveStorageTheme(pref);
      this.applyThemeAttribute(pref);
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.updateEffectiveTheme();

      if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        this.mediaQueryListener = () => {
          if (this.themePreference() === 'system') {
            this.updateEffectiveTheme();
          }
        };
        mq.addEventListener('change', this.mediaQueryListener);
      }

      this.scrollListener = () => {
        this.showBackToTop.set(window.scrollY > 300);
      };
      window.addEventListener('scroll', this.scrollListener, { passive: true });

      this.installPromptListener = (e: Event) => {
        e.preventDefault();
        this.deferredPrompt = e as BeforeInstallPromptEvent;
        this.canInstall.set(true);
      };
      window.addEventListener('beforeinstallprompt', this.installPromptListener);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
      if (this.installPromptListener) {
        window.removeEventListener('beforeinstallprompt', this.installPromptListener);
      }
      if (this.mediaQueryListener && window.matchMedia) {
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', this.mediaQueryListener);
      }
    }
  }

  protected toggleTheme(): void {
    const next: ThemePreference = this.isDark() ? 'light' : 'dark';
    this.themePreference.set(next);
    this.feedback.tick();
    this.feedback.lightTap();
  }

  private applyThemeAttribute(pref: ThemePreference): void {
    if (typeof document !== 'undefined') {
      if (pref === 'system') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', pref);
      }
    }
    this.updateEffectiveTheme();
  }

  private updateEffectiveTheme(): void {
    if (typeof window === 'undefined') return;
    const pref = this.themePreference();
    if (pref === 'dark') {
      this.isDark.set(true);
    } else if (pref === 'light') {
      this.isDark.set(false);
    } else {
      const systemDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(!!systemDark);
    }
  }

  private loadStorageTheme(defaultValue: ThemePreference): ThemePreference {
    if (typeof window === 'undefined') return defaultValue;
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        const val = window.localStorage.getItem(App.THEME_STORAGE_KEY) as ThemePreference;
        if (val === 'light' || val === 'dark' || val === 'system') {
          return val;
        }
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
    return defaultValue;
  }

  private saveStorageTheme(val: ThemePreference): void {
    if (typeof window === 'undefined') return;
    try {
      if (typeof window.localStorage !== 'undefined' && window.localStorage !== null) {
        window.localStorage.setItem(App.THEME_STORAGE_KEY, val);
      }
    } catch {
      // Ignore storage errors
    }
  }

  protected scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  protected async installApp(): Promise<void> {
    if (!this.deferredPrompt) return;
    await this.deferredPrompt.prompt();
    const choice = await this.deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      this.canInstall.set(false);
      this.deferredPrompt = null;
    }
  }
}
