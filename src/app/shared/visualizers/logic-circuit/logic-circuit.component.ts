import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/services/feedback.service';

export type LogicGateType = 'AND' | 'OR';

export interface TruthTableRow {
  p: boolean;
  q: boolean;
  output: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-logic-circuit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logic-circuit.component.html',
  styleUrls: ['./logic-circuit.component.css'],
})
export class LogicCircuitComponent {
  private readonly feedback = inject(FeedbackService);

  readonly gateType = signal<LogicGateType>('AND');
  readonly switchP = signal<boolean>(true);
  readonly switchQ = signal<boolean>(false);

  readonly isLit = computed(() => {
    return this.gateType() === 'AND'
      ? this.switchP() && this.switchQ()
      : this.switchP() || this.switchQ();
  });

  readonly truthTableRows = computed<TruthTableRow[]>(() => {
    const pVal = this.switchP();
    const qVal = this.switchQ();
    const gate = this.gateType();

    const combinations = [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false },
    ];

    return combinations.map((combo) => {
      const output = gate === 'AND' ? combo.p && combo.q : combo.p || combo.q;
      const isActive = combo.p === pVal && combo.q === qVal;
      return {
        p: combo.p,
        q: combo.q,
        output,
        isActive,
      };
    });
  });

  readonly liveAnnouncement = computed(() => {
    const pStr = this.switchP() ? 'True' : 'False';
    const qStr = this.switchQ() ? 'True' : 'False';
    const gateStr = this.gateType();
    const lampStr = this.isLit() ? 'Lit' : 'Extinguished';
    return `Statement P is ${pStr}, Statement Q is ${qStr}. Gate ${gateStr}. Lamp is ${lampStr}.`;
  });

  setGateType(gate: LogicGateType): void {
    if (this.gateType() === gate) return;
    const wasLit = this.isLit();
    this.gateType.set(gate);
    this.feedback.snapWhoosh();
    this.checkLitTransition(wasLit);
  }

  toggleSwitchP(): void {
    const wasLit = this.isLit();
    this.switchP.update((v) => !v);
    this.feedback.tick();
    this.feedback.lightTap();
    this.checkLitTransition(wasLit);
  }

  toggleSwitchQ(): void {
    const wasLit = this.isLit();
    this.switchQ.update((v) => !v);
    this.feedback.tick();
    this.feedback.lightTap();
    this.checkLitTransition(wasLit);
  }

  private checkLitTransition(wasLit: boolean): void {
    if (!wasLit && this.isLit()) {
      this.feedback.equilibriumChime();
      this.feedback.successPulse();
    }
  }
}
