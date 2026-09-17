import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type OperationType = 'add' | 'subtract';

@Component({
  selector: 'app-number-line',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-line.component.html',
  styleUrls: ['./number-line.component.css'],
})
export class NumberLineComponent {
  readonly valA = signal<number>(4);
  readonly valB = signal<number>(3);
  readonly operation = signal<OperationType>('add');

  @Input() set a(v: number) {
    this.valA.set(Math.max(0, v));
  }
  @Input() set b(v: number) {
    this.valB.set(Math.max(0, v));
  }
  @Input() set op(v: OperationType) {
    this.operation.set(v);
  }

  readonly svgWidth = 800;
  readonly svgHeight = 220;
  readonly paddingX = 50;
  readonly axisY = 160;
  readonly maxUnits = 20;

  readonly unitWidth = computed(() => (this.svgWidth - this.paddingX * 2) / this.maxUnits);

  readonly result = computed(() => {
    return this.operation() === 'add'
      ? this.valA() + this.valB()
      : Math.max(0, this.valA() - this.valB());
  });

  readonly ticks = computed(() => {
    return Array.from({ length: this.maxUnits + 1 }, (_, i) => ({
      value: i,
      x: this.paddingX + i * this.unitWidth(),
      y: this.axisY,
    }));
  });

  readonly vectorA = computed(() => {
    const startX = this.paddingX;
    const endX = this.paddingX + this.valA() * this.unitWidth();
    return { startX, endX, y: this.axisY - 40 };
  });

  readonly vectorB = computed(() => {
    const startX = this.paddingX + this.valA() * this.unitWidth();
    const endX = this.paddingX + this.result() * this.unitWidth();
    return {
      startX,
      endX,
      y: this.axisY - 80,
      isForward: this.operation() === 'add',
    };
  });

  readonly speechSummary = computed(() => {
    const verb = this.operation() === 'add' ? 'plus' : 'minus';
    return `Vector number line illustrating ${this.valA()} ${verb} ${this.valB()} equals ${this.result()}.`;
  });
}
