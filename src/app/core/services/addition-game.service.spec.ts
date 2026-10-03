import { TestBed } from '@angular/core/testing';
import { AdditionGameService } from './addition-game.service';

describe('AdditionGameService', () => {
  let store: Record<string, string>;
  let game: AdditionGameService;

  beforeEach(() => {
    store = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
    });
    TestBed.configureTestingModule({});
    game = TestBed.inject(AdditionGameService);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('generates six distinct single-digit addition questions with single-digit totals', () => {
    for (let round = 0; round < 20; round++) {
      const questions = game.questions();
      expect(questions).toHaveLength(6);
      expect(new Set(questions.map((q) => `${q.a}+${q.b}`)).size).toBe(6);
      for (const q of questions) {
        expect(Number.isInteger(q.a) && Number.isInteger(q.b)).toBe(true);
        expect(q.a).toBeGreaterThan(0);
        expect(q.b).toBeGreaterThan(0);
        expect(q.a + q.b).toBeLessThan(10);
      }
      game.replay();
    }
  });

  it('only awards a star for a correct answer, and awards it once', () => {
    const total = game.current().a + game.current().b;
    expect(game.answer(total - 1)).toBe(false);
    expect(game.answer(NaN)).toBe(false);
    expect(game.completed()).toBe(0);
    expect(game.answer(total)).toBe(true);
    expect(game.answer(total)).toBe(true);
    expect(game.completed()).toBe(1);
  });

  it('restores the same questions, correct answers, and position after reload', () => {
    game.answer(game.current().a + game.current().b);
    game.move(1);
    const restored = TestBed.runInInjectionContext(() => new AdditionGameService());
    expect(restored.questions()).toEqual(game.questions());
    expect(restored.index()).toBe(1);
    expect(restored.completed()).toBe(1);
    restored.move(-1);
    expect(restored.current().correct).toBe(true);
  });

  it('keeps navigation bounded and resets all progress on replay', () => {
    game.move(-1);
    expect(game.index()).toBe(0);
    for (let i = 0; i < 6; i++) {
      game.answer(game.current().a + game.current().b);
      game.move(1);
    }
    expect(game.index()).toBe(5);
    expect(game.allDone()).toBe(true);
    game.replay();
    expect(game.completed()).toBe(0);
    expect(game.index()).toBe(0);
    expect(game.allDone()).toBe(false);
    expect(
      JSON.parse(store['imx_addition_game_v1']).questions.every(
        (q: { correct: boolean }) => !q.correct,
      ),
    ).toBe(true);
  });

  it('recovers from malformed, out-of-range, and duplicate saved questions', () => {
    const valid = JSON.parse(store['imx_addition_game_v1']);
    const invalid = [
      '{broken',
      JSON.stringify({ ...valid, version: 99 }),
      JSON.stringify({ ...valid, index: 6 }),
      JSON.stringify({
        ...valid,
        questions: valid.questions.map(() => ({ a: 9, b: 9, correct: true })),
      }),
      JSON.stringify({ ...valid, questions: valid.questions.map(() => valid.questions[0]) }),
    ];
    for (const saved of invalid) {
      store['imx_addition_game_v1'] = saved;
      const recovered = TestBed.runInInjectionContext(() => new AdditionGameService());
      expect(recovered.questions()).toHaveLength(6);
      expect(recovered.completed()).toBe(0);
      expect(recovered.index()).toBe(0);
    }
  });

  it('stays playable when storage is unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('full');
      },
    });
    const local = TestBed.runInInjectionContext(() => new AdditionGameService());
    expect(local.answer(local.current().a + local.current().b)).toBe(true);
    expect(local.completed()).toBe(1);
  });
});
