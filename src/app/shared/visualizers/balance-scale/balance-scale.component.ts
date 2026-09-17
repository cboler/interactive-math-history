import { Component, computed, input, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-balance-scale',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-scale.component.html',
  styleUrls: ['./balance-scale.component.css'],
})
export class BalanceScaleComponent {
  private readonly feedback = inject(FeedbackService);

  readonly a = input<number>(5);
  readonly b = input<number>(5);

  readonly svgWidth = 700;
  readonly svgHeight = 330;
  readonly cx = 350;
  readonly cy = 110;

  constructor() {
    let initialized = false;
    let prevA = this.a();
    let prevB = this.b();
    let prevBalanced = this.a() === this.b();
    let prevTilt = 0;

    effect(() => {
      const currentA = this.a();
      const currentB = this.b();
      const currentBalanced = this.isBalanced();
      const currentTilt = this.tilt();

      if (!initialized) {
        initialized = true;
        prevA = currentA;
        prevB = currentB;
        prevBalanced = currentBalanced;
        prevTilt = currentTilt;
        return;
      }

      if (currentA !== prevA || currentB !== prevB) {
        if (!prevBalanced && currentBalanced) {
          this.feedback.equilibriumChime();
          this.feedback.successPulse();
        } else if (Math.abs(currentTilt) === 15 && Math.abs(prevTilt) < 15) {
          this.feedback.tiltThud();
          this.feedback.lightTap();
        } else {
          this.feedback.tick();
        }

        prevA = currentA;
        prevB = currentB;
        prevBalanced = currentBalanced;
        prevTilt = currentTilt;
      }
    });
  }

  readonly tilt = computed(() => {
    return Math.max(-15, Math.min(15, (this.b() - this.a()) * 3));
  });

  readonly isBalanced = computed(() => this.a() === this.b());

  readonly leftTokens = computed(() => {
    const count = Math.max(0, this.a());
    return Array.from({ length: count }, (_, i) => {
      const col = i < 5 ? 0 : 1;
      const row = i % 5;
      const x = col === 0 ? 118 : 142;
      const y = 205 - row * 15;
      return { id: `token-a-${i}`, x, y, num: i + 1 };
    });
  });

  readonly rightTokens = computed(() => {
    const count = Math.max(0, this.b());
    return Array.from({ length: count }, (_, i) => {
      const col = i < 5 ? 0 : 1;
      const row = i % 5;
      const x = col === 0 ? 558 : 582;
      const y = 205 - row * 15;
      return { id: `token-b-${i}`, x, y, num: i + 1 };
    });
  });

  readonly speechSummary = computed(() => {
    if (this.isBalanced()) {
      return `Balance scale in equilibrium: left pan with ${this.a()} units balances right pan with ${this.b()} units.`;
    } else if (this.a() > this.b()) {
      return `Balance scale tipped toward left pan: left pan has ${this.a()} units, heavier than right pan with ${this.b()} units.`;
    } else {
      return `Balance scale tipped toward right pan: right pan has ${this.b()} units, heavier than left pan with ${this.a()} units.`;
    }
  });
}
