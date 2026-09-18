import { TestBed } from '@angular/core/testing';
import { MathTextPipe } from './math-text.pipe';

describe('MathTextPipe', () => {
  let pipe: MathTextPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    pipe = TestBed.runInInjectionContext(() => new MathTextPipe());
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should render inline math within prose', () => {
    const input = 'Multiplication maps dimensions ($A$ and $B$) to scalar area.';
    const result = pipe.transform(input);
    const htmlString = (result as { changingThisBreaksApplicationSecurity: string })
      .changingThisBreaksApplicationSecurity;
    expect(htmlString).toContain('katex');
  });

  it('should return empty string for null or empty input', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null)).toBe('');
  });

  it('should leave strings without math untouched', () => {
    const input = 'A simple sentence without any math.';
    const result = pipe.transform(input);
    const htmlString = (result as { changingThisBreaksApplicationSecurity: string })
      .changingThisBreaksApplicationSecurity;
    expect(htmlString).toBe(input);
  });
});
