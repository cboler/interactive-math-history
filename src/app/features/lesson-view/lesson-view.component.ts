import {
  Component,
  inject,
  signal,
  computed,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../../services/curriculum.service';
import { FeedbackService } from '../../core/services/feedback.service';
import {
  NumberLineComponent,
  OperationType,
} from '../../shared/visualizers/number-line/number-line.component';
import { BalanceScaleComponent } from '../../shared/visualizers/balance-scale/balance-scale.component';
import { GridArrayComponent } from '../../shared/visualizers/grid-array/grid-array.component';
import { BreadSlicerComponent } from '../../shared/visualizers/bread-slicer/bread-slicer.component';
import { LogicCircuitComponent } from '../../shared/visualizers/logic-circuit/logic-circuit.component';
import { GeometricCompassComponent } from '../../shared/visualizers/geometric-compass/geometric-compass.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { MathDirective } from '../../shared/directives/math.directive';
import { MathTextPipe } from '../../shared/pipes/math-text.pipe';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NumberLineComponent,
    BalanceScaleComponent,
    GridArrayComponent,
    BreadSlicerComponent,
    LogicCircuitComponent,
    GeometricCompassComponent,
    IconComponent,
    MathDirective,
    MathTextPipe,
  ],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent implements OnInit, OnDestroy {
  readonly curriculum = inject(CurriculumService);
  private readonly feedback = inject(FeedbackService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private paramSub?: Subscription;

  readonly lesson = this.curriculum.currentLesson;
  readonly allLessons = this.curriculum.allLessons;
  readonly activeIndex = this.curriculum.activeLessonIndex;
  readonly totalLessons = this.curriculum.totalLessons;
  readonly hasPrev = this.curriculum.hasPrev;
  readonly hasNext = this.curriculum.hasNext;

  readonly isDrawerOpen = this.curriculum.isDrawerOpen;

  readonly selectedStrand = signal<string>('all');
  readonly filteredLessons = computed(() => {
    const strand = this.selectedStrand();
    const lessons = this.allLessons();
    return strand === 'all' ? lessons : lessons.filter((l) => l.strand === strand);
  });

  readonly inputA = signal<number>(4);
  readonly inputB = signal<number>(3);
  readonly operation = signal<OperationType>('add');

  readonly sliderALabel = computed(() => {
    const curr = this.lesson();
    const viz = curr?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Left Pan (A)';
    if (viz === 'grid-array') return 'Rows (A)';
    if (curr?.id === 'unit-01-gathering-addition') return 'First Notches (A)';
    if (curr?.id === 'unit-02-taking-away-subtraction') return 'Starting Tally (A)';
    return 'Quantity A';
  });

  readonly sliderBLabel = computed(() => {
    const curr = this.lesson();
    const viz = curr?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Right Pan (B)';
    if (viz === 'grid-array') return 'Columns (B)';
    if (curr?.id === 'unit-01-gathering-addition') return 'Additional Notches (B)';
    if (curr?.id === 'unit-02-taking-away-subtraction') return 'Notches Taken Away (B)';
    return 'Quantity B';
  });

  readonly srNarration = computed(() => {
    const curr = this.lesson();
    if (!curr) return '';
    if (curr.interactiveConfig.visualizer === 'number-line-vector') {
      const verb = this.operation() === 'add' ? 'plus' : 'minus';
      const res =
        this.operation() === 'add'
          ? this.inputA() + this.inputB()
          : Math.max(0, this.inputA() - this.inputB());
      return `${this.inputA()} ${verb} ${this.inputB()} equals ${res}.`;
    }
    return curr.srNarration || curr.title;
  });

  ngOnInit(): void {
    // Initial sync
    this.syncLessonInputs(this.curriculum.currentLesson());

    this.paramSub = this.route.paramMap.subscribe((params) => {
      const level = params.get('level');
      const unit = params.get('unit');
      if (level && unit) {
        this.curriculum.navigateToLesson(level, unit);
        const curr = this.curriculum.currentLesson();
        this.syncLessonInputs(curr);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  private syncLessonInputs(
    curr: import('../../core/models/lesson.model').MathLesson | undefined,
  ): void {
    if (!curr) return;
    if (curr.interactiveConfig.defaultA !== undefined) {
      this.inputA.set(curr.interactiveConfig.defaultA);
    }
    if (curr.interactiveConfig.defaultB !== undefined) {
      this.inputB.set(curr.interactiveConfig.defaultB);
    }
    if (curr.interactiveConfig.lockedOperation) {
      this.operation.set(curr.interactiveConfig.lockedOperation);
    } else if (curr.interactiveConfig.initialState?.['op']) {
      this.operation.set(curr.interactiveConfig.initialState['op'] as OperationType);
    }
  }

  @HostListener('window:keydown.escape')
  handleEscape(): void {
    if (this.isDrawerOpen()) {
      this.toggleDrawer(false);
    }
  }

  toggleDrawer(open?: boolean): void {
    this.curriculum.toggleDrawer(open);
    this.feedback.tick();
    this.feedback.lightTap();
  }

  setStrand(strand: string): void {
    this.selectedStrand.set(strand);
  }

  setStrandFilter(strand: string): void {
    this.setStrand(strand);
  }

  selectLessonById(id: string): void {
    const idx = this.allLessons().findIndex((l) => l.id === id);
    if (idx !== -1) {
      this.selectLesson(idx);
    }
  }

  selectLesson(index: number): void {
    const target = this.allLessons()[index];
    if (target) {
      this.curriculum.setLessonIndex(index);
      this.syncLessonInputs(target);
      const stageOrLevel = target.stage || target.level || 'foundations';
      this.router.navigate(['/', stageOrLevel, target.slug]);
    }
    this.curriculum.toggleDrawer(false);
  }

  goToNext(): void {
    if (this.hasNext()) {
      this.curriculum.nextLesson();
      const curr = this.curriculum.currentLesson();
      if (curr) {
        this.syncLessonInputs(curr);
        const stageOrLevel = curr.stage || curr.level || 'foundations';
        this.router.navigate(['/', stageOrLevel, curr.slug]);
      }
    }
  }

  goToPrev(): void {
    if (this.hasPrev()) {
      this.curriculum.prevLesson();
      const curr = this.curriculum.currentLesson();
      if (curr) {
        this.syncLessonInputs(curr);
        const stageOrLevel = curr.stage || curr.level || 'foundations';
        this.router.navigate(['/', stageOrLevel, curr.slug]);
      }
    }
  }

  setOp(op: OperationType): void {
    this.operation.set(op);
  }

  setMissionValues(targetA: number, targetB: number): void {
    this.inputA.set(targetA);
    this.inputB.set(targetB);
    this.feedback.tick();
    this.feedback.lightTap();
  }
}
