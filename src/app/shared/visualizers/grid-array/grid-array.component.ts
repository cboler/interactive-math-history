import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../components/icon/icon.component';

export interface GridDot {
  id: string;
  row: number;
  col: number;
  x: number;
  y: number;
  index: number;
}

@Component({
  selector: 'app-grid-array',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './grid-array.component.html',
  styleUrls: ['./grid-array.component.css'],
})
export class GridArrayComponent {
  readonly rows = input<number>(3);
  readonly cols = input<number>(5);

  readonly isTransposed = signal<boolean>(false);

  readonly svgWidth = 640;
  readonly svgHeight = 420;
  readonly cellSpacing = 44;

  readonly effectiveRows = computed(() => {
    return this.isTransposed() ? this.cols() : this.rows();
  });

  readonly effectiveCols = computed(() => {
    return this.isTransposed() ? this.rows() : this.cols();
  });

  readonly totalDots = computed(() => {
    return this.rows() * this.cols();
  });

  readonly gridWidth = computed(() => (this.effectiveCols() - 1) * this.cellSpacing);
  readonly gridHeight = computed(() => (this.effectiveRows() - 1) * this.cellSpacing);

  readonly startX = computed(() => 320 - this.gridWidth() / 2);
  readonly startY = computed(() => 195 - this.gridHeight() / 2);

  readonly dots = computed<GridDot[]>(() => {
    const r = this.effectiveRows();
    const c = this.effectiveCols();
    const sx = this.startX();
    const sy = this.startY();
    const list: GridDot[] = [];

    let count = 1;
    for (let row = 0; row < r; row++) {
      for (let col = 0; col < c; col++) {
        list.push({
          id: `dot-${row}-${col}`,
          row,
          col,
          x: sx + col * this.cellSpacing,
          y: sy + row * this.cellSpacing,
          index: count++,
        });
      }
    }
    return list;
  });

  readonly speechSummary = computed(() => {
    return `Grid displaying ${this.effectiveRows()} rows of ${this.effectiveCols()} dots, totaling ${this.totalDots()} items.`;
  });

  toggleTranspose(): void {
    this.isTransposed.update((v) => !v);
  }
}
