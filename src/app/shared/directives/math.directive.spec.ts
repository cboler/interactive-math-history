import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MathDirective } from './math.directive';

@Component({
  standalone: true,
  imports: [MathDirective],
  template: ` <div id="math-test" [appMath]="formula()" [displayMode]="display()"></div> `,
})
class TestHostComponent {
  readonly formula = signal<string>('a + b = c');
  readonly display = signal<boolean>(false);
}

describe('MathDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render KaTeX html into the target element', () => {
    const el = fixture.nativeElement.querySelector('#math-test');
    expect(el.querySelector('.katex')).toBeTruthy();
  });

  it('should update rendered math when input changes', () => {
    component.formula.set('\\frac{3}{5} = \\frac{1}{2} + \\frac{1}{10}');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#math-test');
    expect(el.querySelector('.katex-html')).toBeTruthy();
  });

  it('should handle empty input gracefully', () => {
    component.formula.set('');
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('#math-test');
    expect(el.textContent).toBe('');
  });
});
