import { Component, signal, inject, effect, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
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
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('Interactive Math & History');
  protected readonly isOnline = signal(typeof navigator !== 'undefined' ? navigator.onLine : true);
  protected readonly canInstall = signal(false);
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
  private onlineListener?: () => void;
  private offlineListener?: () => void;
  private installPromptListener?: (e: Event) => void;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.onlineListener = () => this.isOnline.set(true);
      this.offlineListener = () => this.isOnline.set(false);
      window.addEventListener('online', this.onlineListener);
      window.addEventListener('offline', this.offlineListener);

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
      if (this.onlineListener) window.removeEventListener('online', this.onlineListener);
      if (this.offlineListener) window.removeEventListener('offline', this.offlineListener);
      if (this.installPromptListener) {
        window.removeEventListener('beforeinstallprompt', this.installPromptListener);
      }
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
