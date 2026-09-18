import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Pipe({
  name: 'mathText',
  standalone: true,
})
export class MathTextPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (!value) {
      return '';
    }

    // Replace $...$ segments with KaTeX rendered HTML strings
    const rendered = value.replace(/\$([^$]+)\$/g, (_, mathExpr) => {
      try {
        return katex.renderToString(mathExpr, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return mathExpr;
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml(rendered);
  }
}
