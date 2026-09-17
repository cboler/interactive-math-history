import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { App } from './app';
import { routes } from './app.routes';
import { CurriculumService } from './services/curriculum.service';

describe('Interactive Math & History Shell Tests', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  describe('App Shell', () => {
    it('should create the root shell', () => {
      const fixture = TestBed.createComponent(App);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

    it('should render the brand title and math symbol', async () => {
      const fixture = TestBed.createComponent(App);
      await fixture.whenStable();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.brand-title')?.textContent).toContain(
        'Interactive Math & History',
      );
      expect(compiled.querySelector('.brand-logo')?.textContent?.trim()).toBe('∑');
    });

    it('should render and dynamically update navigation link and title for active curriculum unit', async () => {
      const fixture = TestBed.createComponent(App);
      const curriculum = fixture.debugElement.injector.get(CurriculumService);
      const titleService = fixture.debugElement.injector.get(Title);
      await fixture.whenStable();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const navLink = compiled.querySelector('#nav-link-curriculum');
      expect(navLink?.textContent?.trim()).toBe('Unit 01: Addition');
      expect(titleService.getTitle()).toContain('Unit 01: Addition');

      // Navigate to Unit 02
      curriculum.nextLesson();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(navLink?.textContent?.trim()).toBe('Unit 02: Equality');
      expect(titleService.getTitle()).toContain('Unit 02: Equality');

      // Navigate to Unit 03
      curriculum.nextLesson();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(navLink?.textContent?.trim()).toBe('Unit 03: Multiplication');
      expect(titleService.getTitle()).toContain('Unit 03: Multiplication');
    });

    it('should render skip link for accessibility', async () => {
      const fixture = TestBed.createComponent(App);
      await fixture.whenStable();
      const compiled = fixture.nativeElement as HTMLElement;
      const skipLink = compiled.querySelector('.skip-link');
      expect(skipLink).toBeTruthy();
      expect(skipLink?.getAttribute('href')).toBe('#main-content');
    });

    it('should render network status badge', async () => {
      const fixture = TestBed.createComponent(App);
      await fixture.whenStable();
      const compiled = fixture.nativeElement as HTMLElement;
      const badge = compiled.querySelector('.network-badge');
      expect(badge).toBeTruthy();
    });

    it('should render and toggle feedback button with accessible aria attributes', async () => {
      const fixture = TestBed.createComponent(App);
      await fixture.whenStable();
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const btn = compiled.querySelector('#feedback-toggle-btn') as HTMLButtonElement;

      expect(btn).toBeTruthy();
      expect(btn.getAttribute('aria-label')).toBe('Toggle audio and tactile feedback');
      expect(btn.getAttribute('aria-pressed')).toBe('true');

      btn.click();
      fixture.detectChanges();
      expect(btn.getAttribute('aria-pressed')).toBe('false');

      btn.click();
      fixture.detectChanges();
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });
  });
});
