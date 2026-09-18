import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../core/services/feedback.service';

export interface ConstructionStepInfo {
  step: number;
  label: string;
  sublabel: string;
  axiom: string;
}

@Component({
  selector: 'app-geometric-compass',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './geometric-compass.component.html',
  styleUrls: ['./geometric-compass.component.css'],
})
export class GeometricCompassComponent {
  private readonly feedback = inject(FeedbackService);

  readonly step = signal<number>(1);
  readonly baseLength = signal<number>(160);

  readonly minBaseLength = 100;
  readonly maxBaseLength = 220;

  // Viewbox coordinates
  readonly viewBoxWidth = 600;
  readonly viewBoxHeight = 360;

  // Geometry computation
  readonly ax = computed(() => 300 - this.baseLength() / 2);
  readonly ay = computed(() => 240);

  readonly bx = computed(() => 300 + this.baseLength() / 2);
  readonly by = computed(() => 240);

  readonly height = computed(() => this.baseLength() * (Math.sqrt(3) / 2));

  readonly cx = computed(() => 300);
  readonly cy = computed(() => 240 - this.height());

  readonly radius = computed(() => this.baseLength());

  readonly trianglePoints = computed(
    () => `${this.ax()},${this.ay()} ${this.bx()},${this.by()} ${this.cx()},${this.cy()}`,
  );

  readonly steps: ConstructionStepInfo[] = [
    {
      step: 1,
      label: 'Segment AB',
      sublabel: 'Baseline',
      axiom: 'Postulate 1: A straight line segment joins points A and B.',
    },
    {
      step: 2,
      label: 'Circle A (𝒞_A)',
      sublabel: 'Center A, Radius AB',
      axiom: 'Postulate 3: Describe circle 𝒞_A with center A and radius AB.',
    },
    {
      step: 3,
      label: 'Circle B (𝒞_B)',
      sublabel: 'Center B, Radius BA',
      axiom: 'Postulate 3: Describe circle 𝒞_B with center B and radius BA.',
    },
    {
      step: 4,
      label: 'Equilateral △ABC',
      sublabel: 'Intersection & Sides',
      axiom: 'Common Notion 1: AC = AB and BC = AB, thus AB = BC = CA.',
    },
  ];

  readonly currentStepInfo = computed(() => this.steps[this.step() - 1]);

  readonly liveAnnouncement = computed(() => {
    switch (this.step()) {
      case 1:
        return `Baseline segment AB established with length ${this.baseLength()}.`;
      case 2:
        return 'Circle A swept around point A with radius AB.';
      case 3:
        return 'Circle B swept around point B with radius BA.';
      case 4:
        return 'Intersection C plotted. Equilateral triangle ABC constructed with equal sides AB, BC, and CA.';
      default:
        return '';
    }
  });

  nextStep(): void {
    if (this.step() < 4) {
      const next = this.step() + 1;
      this.step.set(next);
      this.feedback.snapWhoosh();
      this.feedback.lightTap();

      if (next === 4) {
        this.feedback.equilibriumChime();
        this.feedback.successPulse();
      }
    }
  }

  prevStep(): void {
    if (this.step() > 1) {
      this.step.update((s) => s - 1);
      this.feedback.tick();
      this.feedback.lightTap();
    }
  }

  setStep(targetStep: number): void {
    if (targetStep < 1 || targetStep > 4 || targetStep === this.step()) return;
    const wasStep = this.step();
    this.step.set(targetStep);

    if (targetStep === 4 && wasStep !== 4) {
      this.feedback.equilibriumChime();
      this.feedback.successPulse();
    } else {
      this.feedback.snapWhoosh();
      this.feedback.lightTap();
    }
  }

  reset(): void {
    this.step.set(1);
    this.feedback.tick();
    this.feedback.lightTap();
  }

  onBaseLengthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = Number(input.value);
    if (!isNaN(val)) {
      const clamped = Math.max(this.minBaseLength, Math.min(this.maxBaseLength, val));
      this.baseLength.set(clamped);
      this.feedback.tick();
    }
  }

  setBaseLength(val: number): void {
    const clamped = Math.max(this.minBaseLength, Math.min(this.maxBaseLength, val));
    this.baseLength.set(clamped);
    this.feedback.tick();
  }
}
