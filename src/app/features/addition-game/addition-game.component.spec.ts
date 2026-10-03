import { TestBed } from '@angular/core/testing';
import { AdditionGameComponent } from './addition-game.component';

describe('AdditionGameComponent', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', { getItem: () => null, setItem: () => undefined });
    TestBed.configureTestingModule({ imports: [AdditionGameComponent] });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('checks actual typed answers instead of awarding stars from calculator changes', () => {
    const component = TestBed.createComponent(AdditionGameComponent).componentInstance;
    const q = component.game.current();
    component.setNumber('a', q.a);
    component.setNumber('b', q.b);
    expect(component.game.completed()).toBe(0);
    component.check('');
    component.check('2x');
    component.check('0');
    expect(component.game.completed()).toBe(0);
    component.answer.set(String(q.a + q.b));
    component.check();
    expect(component.game.completed()).toBe(1);
  });

  it('answers by tapping the calculator total, then clears it in both directions', async () => {
    const fixture = TestBed.createComponent(AdditionGameComponent);
    const component = fixture.componentInstance;
    const q = component.game.current();
    component.setNumber('a', q.a);
    component.setNumber('b', q.b);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('.calculator-total') as HTMLButtonElement).click();
    expect(component.game.completed()).toBe(1);
    component.move(1);
    expect([component.a(), component.b(), component.answer(), component.message()]).toEqual([
      0,
      0,
      '',
      '',
    ]);
    component.setNumber('a', 7);
    component.move(-1);
    expect(component.total()).toBe(0);
    expect(component.game.current().correct).toBe(true);
    component.replay();
    expect(component.total()).toBe(0);
    expect(component.game.completed()).toBe(0);
  });
});
