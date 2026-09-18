import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/services/feedback.service';

export interface Slice {
  id: string;
  fraction: number; // e.g., 0.5, 0.1
  label: string; // '1/2', '1/10'
  color: string;
}

export interface WorkerBasket {
  id: number;
  slices: Slice[];
}

@Component({
  selector: 'app-bread-slicer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bread-slicer.component.html',
  styleUrls: ['./bread-slicer.component.css'],
})
export class BreadSlicerComponent {
  private readonly feedback = inject(FeedbackService);

  readonly totalLoaves = 3;
  readonly totalWorkers = 5;
  readonly targetShare = 3 / 5; // 0.6

  // Available unsliced whole loaves
  readonly unslicedLoaves = signal<number>(3);

  // Pool of available cut slices awaiting distribution
  readonly availableSlices = signal<Slice[]>([]);

  // 5 worker baskets
  readonly baskets = signal<WorkerBasket[]>([
    { id: 1, slices: [] },
    { id: 2, slices: [] },
    { id: 3, slices: [] },
    { id: 4, slices: [] },
    { id: 5, slices: [] },
  ]);

  // Track next slice ID
  private sliceCounter = 0;

  // Selected slice cut preset
  readonly cutOptions = [
    { denom: 2, label: 'Cut into Halves (1/2)', color: '#2563eb' },
    { denom: 3, label: 'Cut into Thirds (1/3)', color: '#7c3aed' },
    { denom: 5, label: 'Cut into Fifths (1/5)', color: '#d97706' },
    { denom: 10, label: 'Cut into Tenths (1/10)', color: '#059669' },
  ];

  readonly basketSums = computed(() => {
    return this.baskets().map((b) => {
      const sum = b.slices.reduce((acc, s) => acc + s.fraction, 0);
      const isExact = Math.abs(sum - this.targetShare) < 0.001;
      // Egyptian rule: No duplicate fraction types in the same basket!
      const fractions = b.slices.map((s) => s.label);
      const hasDuplicates = new Set(fractions).size !== fractions.length;
      return { id: b.id, sum, isExact, hasDuplicates, valid: isExact && !hasDuplicates };
    });
  });

  readonly isSolved = computed(() => {
    return (
      this.unslicedLoaves() === 0 &&
      this.availableSlices().length === 0 &&
      this.basketSums().every((b) => b.valid)
    );
  });

  cutLoaf(denom: number, color: string): void {
    if (this.unslicedLoaves() <= 0) return;

    this.unslicedLoaves.update((v) => v - 1);
    const newSlices: Slice[] = [];
    for (let i = 0; i < denom; i++) {
      newSlices.push({
        id: `slice-${++this.sliceCounter}`,
        fraction: 1 / denom,
        label: `1/${denom}`,
        color,
      });
    }

    this.availableSlices.update((prev) => [...prev, ...newSlices]);
    this.feedback.snapWhoosh();
    this.feedback.mediumSnap();
  }

  subdivideHalf(sliceId: string): void {
    const idx = this.availableSlices().findIndex((s) => s.id === sliceId && s.label === '1/2');
    if (idx === -1) return;

    const newTenths: Slice[] = [];
    for (let i = 0; i < 5; i++) {
      newTenths.push({
        id: `slice-${++this.sliceCounter}`,
        fraction: 1 / 10,
        label: '1/10',
        color: '#059669',
      });
    }

    this.availableSlices.update((prev) => [
      ...prev.slice(0, idx),
      ...newTenths,
      ...prev.slice(idx + 1),
    ]);
    this.feedback.snapWhoosh();
    this.feedback.lightTap();

    if (this.isSolved()) {
      this.feedback.equilibriumChime();
      this.feedback.successPulse();
    }
  }

  giveSliceToWorker(sliceId: string, workerId: number): void {
    const sliceIndex = this.availableSlices().findIndex((s) => s.id === sliceId);
    if (sliceIndex === -1) return;

    const slice = this.availableSlices()[sliceIndex];
    this.availableSlices.update((arr) => arr.filter((s) => s.id !== sliceId));

    this.baskets.update((baskets) =>
      baskets.map((b) => (b.id === workerId ? { ...b, slices: [...b.slices, slice] } : b)),
    );

    this.feedback.tick();
    this.feedback.lightTap();

    if (this.isSolved()) {
      this.feedback.equilibriumChime();
      this.feedback.successPulse();
    }
  }

  returnSlice(slice: Slice, workerId: number): void {
    this.baskets.update((baskets) =>
      baskets.map((b) =>
        b.id === workerId ? { ...b, slices: b.slices.filter((s) => s.id !== slice.id) } : b,
      ),
    );
    this.availableSlices.update((prev) => [...prev, slice]);
    this.feedback.tick();
  }

  autoSolveAhmes(): void {
    this.reset();
    this.unslicedLoaves.set(0);

    const slices: Slice[] = [];
    for (let i = 0; i < 5; i++) {
      slices.push({
        id: `slice-${++this.sliceCounter}`,
        fraction: 1 / 2,
        label: '1/2',
        color: '#2563eb',
      });
      slices.push({
        id: `slice-${++this.sliceCounter}`,
        fraction: 1 / 10,
        label: '1/10',
        color: '#059669',
      });
    }

    this.baskets.set([
      { id: 1, slices: [slices[0], slices[1]] },
      { id: 2, slices: [slices[2], slices[3]] },
      { id: 3, slices: [slices[4], slices[5]] },
      { id: 4, slices: [slices[6], slices[7]] },
      { id: 5, slices: [slices[8], slices[9]] },
    ]);
    this.availableSlices.set([]);
    this.feedback.equilibriumChime();
    this.feedback.successPulse();
  }

  reset(): void {
    this.unslicedLoaves.set(3);
    this.availableSlices.set([]);
    this.baskets.set([
      { id: 1, slices: [] },
      { id: 2, slices: [] },
      { id: 3, slices: [] },
      { id: 4, slices: [] },
      { id: 5, slices: [] },
    ]);
    this.feedback.tick();
  }
}
