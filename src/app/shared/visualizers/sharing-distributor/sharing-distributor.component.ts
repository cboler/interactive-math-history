import { Component, Input, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-sharing-distributor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sharing-distributor.component.html',
  styleUrls: ['./sharing-distributor.component.css'],
})
export class SharingDistributorComponent {
  private readonly feedback = inject(FeedbackService, { optional: true });

  @Input() set total(val: number) {
    const safe = Math.max(0, val ?? 0);
    this.totalCount.set(safe);
    this.feedback?.tick();
  }
  @Input() set groups(val: number) {
    const safe = Math.max(1, val ?? 1);
    this.groupCount.set(safe);
    this.feedback?.tick();
  }

  readonly totalCount = signal<number>(12);
  readonly groupCount = signal<number>(3);

  readonly itemsPerGroup = computed(() => Math.floor(this.totalCount() / this.groupCount()));
  readonly remainder = computed(() => this.totalCount() % this.groupCount());
  readonly isEquitable = computed(() => this.remainder() === 0);

  readonly groupIndices = computed(() => Array.from({ length: this.groupCount() }, (_, i) => i));
  readonly distributedItems = computed(() =>
    Array.from({ length: this.itemsPerGroup() }, (_, i) => i),
  );
  readonly remainderItems = computed(() => Array.from({ length: this.remainder() }, (_, i) => i));

  readonly speechSummary = computed(
    () =>
      `${this.totalCount()} shared among ${this.groupCount()} gives ${this.itemsPerGroup()} each` +
      (this.remainder() > 0 ? ` with ${this.remainder()} left over.` : ` equally.`),
  );
}
