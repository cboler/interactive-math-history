import { Component, signal, inject, effect, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CurriculumService } from './services/curriculum.service';
import { FeedbackService } from './core/services/feedback.service';
import { IconComponent } from './shared/components/icon/icon.component';

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
  protected readonly title = signal('Interactive Math & History');
  protected readonly canInstall = signal(false);
  protected readonly showBackToTop = signal(false);
  protected readonly curriculum = inject(CurriculumService);
  protected readonly feedback = inject(FeedbackService);
  private readonly titleService = inject(Title);

  constructor() {
    effect(() => {
      const current = this.curriculum.currentLesson();
      if (current) {
        this.titleService.setTitle(
          `${current.shortTitle}: ${current.title} • Interactive Math & History`,
        );
      }
    });
  }

  private deferredPrompt: BeforeInstallPromptEvent | null = null;
  private scrollListener?: () => void;
  private installPromptListener?: (e: Event) => void;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
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
