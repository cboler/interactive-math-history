import { Injectable, computed, signal } from '@angular/core';

interface AdditionQuestion {
  a: number;
  b: number;
  correct: boolean;
}

interface AdditionSession {
  version: 1;
  index: number;
  questions: AdditionQuestion[];
}

@Injectable({ providedIn: 'root' })
export class AdditionGameService {
  private readonly storageKey = 'imx_addition_game_v1';
  private readonly session = signal<AdditionSession>(this.load() ?? this.newGame());
  readonly questions = computed(() => this.session().questions);
  readonly index = computed(() => this.session().index);
  readonly current = computed(() => this.questions()[this.index()]);
  readonly completed = computed(() => this.questions().filter((q) => q.correct).length);
  readonly allDone = computed(() => this.completed() === this.questions().length);

  move(offset: number): void {
    const index = this.index() + offset;
    if (index < 0 || index >= this.questions().length) return;
    this.session.update((session) => ({ ...session, index }));
    this.save();
  }

  answer(value: number): boolean {
    const question = this.current();
    if (value !== question.a + question.b) return false;
    if (!question.correct) {
      this.session.update((session) => ({
        ...session,
        questions: session.questions.map((q, i) =>
          i === session.index ? { ...q, correct: true } : q,
        ),
      }));
      this.save();
    }
    return true;
  }

  replay(): void {
    this.session.set(this.newGame());
    this.save();
  }

  private newGame(): AdditionSession {
    // Positive single-digit operands and totals <= 9 keep this first game approachable.
    const pool: AdditionQuestion[] = [];
    for (let a = 1; a < 9; a++) {
      for (let b = 1; a + b <= 9; b++) pool.push({ a, b, correct: false });
    }
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return { version: 1, index: 0, questions: pool.slice(0, 6) };
  }

  private load(): AdditionSession | null {
    try {
      const data: unknown = JSON.parse(localStorage.getItem(this.storageKey) ?? 'null');
      if (!data || typeof data !== 'object') return null;
      const saved = data as Partial<AdditionSession>;
      if (
        saved.version !== 1 ||
        !Array.isArray(saved.questions) ||
        saved.questions.length !== 6 ||
        !Number.isInteger(saved.index) ||
        saved.index! < 0 ||
        saved.index! >= 6
      )
        return null;
      if (
        !saved.questions.every(
          (q) =>
            q &&
            Number.isInteger(q.a) &&
            Number.isInteger(q.b) &&
            q.a >= 1 &&
            q.b >= 1 &&
            q.a + q.b <= 9 &&
            typeof q.correct === 'boolean',
        )
      )
        return null;
      if (new Set(saved.questions.map((q) => `${q.a}+${q.b}`)).size !== 6) return null;
      return saved as AdditionSession;
    } catch {
      return null;
    }
  }

  private save(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.session()));
    } catch {
      // The game stays playable when browser storage is blocked or full.
    }
  }

  constructor() {
    // Save the randomized questions before the first answer so a reload keeps the same game.
    this.save();
  }
}
