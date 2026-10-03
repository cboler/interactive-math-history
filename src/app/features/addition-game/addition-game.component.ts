import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdditionGameService } from '../../core/services/addition-game.service';
import { FeedbackService } from '../../core/services/feedback.service';

@Component({
  selector: 'app-addition-game',
  imports: [FormsModule],
  templateUrl: './addition-game.component.html',
  styleUrl: './addition-game.component.css',
})
export class AdditionGameComponent {
  readonly game = inject(AdditionGameService);
  private readonly feedback = inject(FeedbackService);
  readonly a = signal(0);
  readonly b = signal(0);
  readonly answer = signal('');
  readonly message = signal('');
  readonly total = computed(() => this.a() + this.b());
  readonly marksA = computed(() => Array.from({ length: this.a() }));
  readonly marksB = computed(() => Array.from({ length: this.b() }));

  setNumber(side: 'a' | 'b', value: string | number): void {
    const number = Number(value);
    this[side].set(Number.isFinite(number) ? Math.max(0, Math.min(9, Math.trunc(number))) : 0);
  }

  check(value = this.answer()): void {
    if (this.game.current().correct) return;
    if (!/^\d+$/.test(value)) {
      this.message.set('Try a number');
      return;
    }
    if (this.game.answer(Number(value))) {
      this.answer.set(value);
      this.message.set('Great!');
      this.feedback.equilibriumChime();
      this.feedback.successPulse();
    } else {
      this.message.set('Try again');
    }
  }

  move(offset: number): void {
    const before = this.game.index();
    this.game.move(offset);
    if (before !== this.game.index()) this.clear();
  }

  replay(): void {
    this.game.replay();
    this.clear();
  }

  private clear(): void {
    this.a.set(0);
    this.b.set(0);
    this.answer.set('');
    this.message.set('');
  }
}
