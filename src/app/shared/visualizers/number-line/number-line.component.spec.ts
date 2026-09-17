import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumberLineComponent } from './number-line.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('NumberLineComponent', () => {
  let component: NumberLineComponent;
  let fixture: ComponentFixture<NumberLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberLineComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create and calculate addition result correctly', () => {
    component.a = 5;
    component.b = 4;
    component.op = 'add';
    expect(component.result()).toBe(9);
    expect(component.speechSummary()).toContain(
      'Vector number line illustrating 5 plus 4 equals 9.',
    );
  });

  it('should calculate subtraction result and prevent negative results', () => {
    component.a = 3;
    component.b = 5;
    component.op = 'subtract';
    expect(component.result()).toBe(0);
    expect(component.speechSummary()).toContain(
      'Vector number line illustrating 3 minus 5 equals 0.',
    );
  });

  it('should render SVG with polite ARIA live region', async () => {
    component.a = 4;
    component.b = 3;
    component.op = 'add';
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const srOnly = element.querySelector('.sr-only');
    expect(srOnly).toBeTruthy();
    expect(srOnly?.getAttribute('aria-live')).toBe('polite');
    expect(srOnly?.textContent?.trim()).toContain(
      'Vector number line illustrating 4 plus 3 equals 7.',
    );

    const svg = element.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should orient subtraction vector from a to result using arrow-amber marker', async () => {
    component.a = 4;
    component.b = 3;
    component.op = 'subtract';
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const vectorB = element.querySelector('line.vector-b');
    expect(vectorB).toBeTruthy();

    const x1 = parseFloat(vectorB?.getAttribute('x1') ?? '0');
    const x2 = parseFloat(vectorB?.getAttribute('x2') ?? '0');
    // Vector starts at 4 and ends at 1, moving leftward
    expect(x1).toBeGreaterThan(x2);
    expect(vectorB?.getAttribute('marker-end')).toBe('url(#arrow-amber)');

    // Ensure arrow-amber marker exists with orient="auto" and positive-x arrow tip
    const marker = element.querySelector('marker#arrow-amber');
    expect(marker?.getAttribute('orient')).toBe('auto');
  });

  it('should trigger tick and lightTap feedback when a, b, or op changes', async () => {
    const feedback = fixture.debugElement.injector.get(FeedbackService);
    const tickSpy = vi.spyOn(feedback, 'tick');
    const tapSpy = vi.spyOn(feedback, 'lightTap');

    component.a = 7;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tickSpy).toHaveBeenCalled();
    expect(tapSpy).toHaveBeenCalled();

    tickSpy.mockClear();
    tapSpy.mockClear();

    component.op = 'subtract';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tickSpy).toHaveBeenCalled();
    expect(tapSpy).toHaveBeenCalled();
  });
});
