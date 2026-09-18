import { Directive, ElementRef, input, effect, inject } from '@angular/core';
import katex from 'katex';

@Directive({
  selector: '[appMath]',
  standalone: true,
})
export class MathDirective {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly appMath = input<string>('');
  readonly displayMode = input<boolean>(false);

  constructor() {
    effect(() => {
      const expression = this.appMath();
      const display = this.displayMode();
      this.render(expression, display);
    });
  }

  private render(expression: string, displayMode: boolean): void {
    const target = this.el.nativeElement;
    if (!expression) {
      target.textContent = '';
      return;
    }

    try {
      katex.render(expression, target, {
        displayMode,
        throwOnError: false,
      });
    } catch {
      target.textContent = expression;
    }
  }
}
