import {
  Component,
  inject,
  signal,
  computed,
  effect,
  viewChild,
  ElementRef,
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
import { ProgressService } from '../../core/services/progress.service';
import { AdditionGameService } from '../../core/services/addition-game.service';
import { AdditionGameComponent } from '../addition-game/addition-game.component';
import {
  ArtifactPlate,
  EpistemicStatus,
  MathLesson,
  PracticeChallenge,
} from '../../core/models/lesson.model';
import {
  NumberLineComponent,
  OperationType,
} from '../../shared/visualizers/number-line/number-line.component';
import { BalanceScaleComponent } from '../../shared/visualizers/balance-scale/balance-scale.component';
import { GridArrayComponent } from '../../shared/visualizers/grid-array/grid-array.component';
import { BreadSlicerComponent } from '../../shared/visualizers/bread-slicer/bread-slicer.component';
import { LogicCircuitComponent } from '../../shared/visualizers/logic-circuit/logic-circuit.component';
import { GeometricCompassComponent } from '../../shared/visualizers/geometric-compass/geometric-compass.component';
import { SharingDistributorComponent } from '../../shared/visualizers/sharing-distributor/sharing-distributor.component';
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
    SharingDistributorComponent,
    LogicCircuitComponent,
    GeometricCompassComponent,
    IconComponent,
    MathDirective,
    MathTextPipe,
    AdditionGameComponent,
  ],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent implements OnInit, OnDestroy {
  readonly curriculum = inject(CurriculumService);
  private readonly feedback = inject(FeedbackService);
  private readonly progress = inject(ProgressService);
  private readonly additionGame = inject(AdditionGameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private paramSub?: Subscription;

  private readonly circuit = viewChild(LogicCircuitComponent);
  private readonly compass = viewChild(GeometricCompassComponent);
  private readonly slicer = viewChild(BreadSlicerComponent);
  private readonly labOutlet = viewChild<ElementRef<HTMLElement>>('labOutlet');

  readonly lesson = this.curriculum.currentLesson;
  readonly allLessons = this.curriculum.allLessons;
  readonly activeIndex = this.curriculum.activeLessonIndex;
  readonly totalLessons = this.curriculum.totalLessons;
  readonly hasPrev = this.curriculum.hasPrev;
  readonly hasNext = this.curriculum.hasNext;
  readonly priorDiscoveries = this.curriculum.priorDiscoveries;
  readonly nextDiscoveries = this.curriculum.nextDiscoveries;

  readonly consensusLabels: Record<EpistemicStatus['consensusLevel'], string> = {
    established: 'Historians agree',
    probable: 'Probably true',
    contested: 'Still debated',
    speculative: 'A best guess',
  };

  readonly isDrawerOpen = this.curriculum.isDrawerOpen;

  readonly selectedStrand = signal<string>('all');
  readonly strands = computed(() => [...new Set(this.allLessons().map((l) => l.strand))]);
  readonly filteredLessons = computed(() => {
    const strand = this.selectedStrand();
    const lessons = this.allLessons();
    return strand === 'all' ? lessons : lessons.filter((l) => l.strand === strand);
  });

  readonly lessonProgress = computed(
    () =>
      new Map(
        this.allLessons().map((l): [string, { done: number; total: number }] => {
          if (l.interactiveConfig.visualizer === 'addition-game') {
            return [
              l.id,
              { done: this.additionGame.completed(), total: this.additionGame.questions().length },
            ];
          }
          const ids = (l.practiceChallenges ?? []).map((m) => m.id);
          return [l.id, { done: this.progress.countCompleted(ids), total: ids.length }];
        }),
      ),
  );

  readonly inputA = signal<number>(4);
  readonly inputB = signal<number>(3);
  readonly operation = signal<OperationType>('add');

  readonly sliderALabel = computed(() => {
    const curr = this.lesson();
    const viz = curr?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Left Pan (A)';
    if (viz === 'grid-array') return 'Rows (A)';
    if (viz === 'sharing-distributor') return 'Total Items (A)';
    if (curr?.id === 'unit-01-gathering-addition') return 'First Notches (A)';
    if (curr?.id === 'unit-02-taking-away-subtraction') return 'Starting Tally (A)';
    return 'Quantity A';
  });

  readonly sliderBLabel = computed(() => {
    const curr = this.lesson();
    const viz = curr?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Right Pan (B)';
    if (viz === 'grid-array') return 'Columns (B)';
    if (viz === 'sharing-distributor') return 'Number of Baskets (B)';
    if (curr?.id === 'unit-01-gathering-addition') return 'Additional Notches (B)';
    if (curr?.id === 'unit-02-taking-away-subtraction') return 'Notches Taken Away (B)';
    return 'Quantity B';
  });

  readonly missionButtonLabel = computed(() => {
    const curr = this.lesson();
    const viz = curr?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Balance This on the Scale';
    if (viz === 'grid-array') return 'Plant This Grid';
    if (viz === 'sharing-distributor') return 'Share Into Baskets';
    if (viz === 'partition-slicer') return 'Go to the Bread Bench';
    if (viz === 'logic-circuit') return 'Try This on the Circuit';
    if (viz === 'geometric-compass') return 'Show This Step';
    return 'Try This on the Number Line';
  });

  // The visualizers announce their own changes; this region introduces the lesson itself.
  readonly srNarration = computed(() => {
    const curr = this.lesson();
    if (!curr) return '';
    return curr.srNarration || curr.title;
  });

  // What the lab currently shows, in the vocabulary of PracticeChallenge.targetState.
  // Null while the lesson's visualizer is still being mounted.
  readonly labState = computed<Record<string, unknown> | null>(() => {
    switch (this.lesson().interactiveConfig.visualizer) {
      case 'addition-game':
        return null;
      case 'logic-circuit':
        return this.circuit()?.labState() ?? null;
      case 'geometric-compass':
        return this.compass()?.labState() ?? null;
      case 'partition-slicer':
        return this.slicer()?.labState() ?? null;
      default:
        return { a: this.inputA(), b: this.inputB() };
    }
  });

  readonly completedMissions = this.progress.completedMissions;
  readonly lessonMissionIds = computed(() =>
    (this.lesson().practiceChallenges ?? []).map((m) => m.id),
  );
  readonly completedInLesson = computed(() =>
    this.progress.countCompleted(this.lessonMissionIds()),
  );

  // Most recent success, shown beside the lab where the learner is looking
  private readonly celebration = signal<{ lessonId: string; message: string } | null>(null);
  readonly celebrationMessage = computed(() => {
    const latest = this.celebration();
    return latest?.lessonId === this.lesson().id ? latest.message : '';
  });

  // Missions only count once the learner has changed something in the lab, so a
  // mission that matches the lab's starting state is not ticked off on page load.
  private readonly touchedLessonId = signal<string | null>(null);
  private labBaseline: { lessonId: string; key: string } | null = null;

  constructor() {
    effect(() => {
      const lesson = this.lesson();
      const state = this.labState();
      if (!state) return;

      const key = JSON.stringify(state);
      if (this.labBaseline?.lessonId !== lesson.id) {
        this.labBaseline = { lessonId: lesson.id, key };
      }
      const touched = this.touchedLessonId() === lesson.id || key !== this.labBaseline.key;
      if (!touched) return;
      this.touchedLessonId.set(lesson.id);

      const done = this.completedMissions();
      const fresh = (lesson.practiceChallenges ?? []).filter(
        (m) => !done.has(m.id) && this.missionMatches(m, state),
      );
      if (fresh.length > 0) {
        this.progress.complete(fresh.map((m) => m.id));
        this.celebration.set({
          lessonId: lesson.id,
          message: fresh[fresh.length - 1].successMessage,
        });
        this.feedback.equilibriumChime();
        this.feedback.successPulse();
      }
    });
  }

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

  private syncLessonInputs(curr: MathLesson | undefined): void {
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

  // Sets the lab up for a mission (or, for the hands-on bread bench, just takes the learner there)
  startMission(mission: PracticeChallenge): void {
    this.touchedLessonId.set(this.lesson().id);
    const target = mission.targetState ?? {};

    switch (this.lesson().interactiveConfig.visualizer) {
      case 'logic-circuit':
        this.circuit()?.applyState(
          target['gate'] === 'OR' ? 'OR' : 'AND',
          target['switchP'] === true,
          target['switchQ'] === true,
        );
        break;
      case 'geometric-compass':
        if (typeof target['step'] === 'number') {
          this.compass()?.setStep(target['step']);
        }
        break;
      case 'partition-slicer':
        this.feedback.tick();
        break;
      default:
        this.setMissionValues(mission.targetA, mission.targetB);
    }

    const lab = this.labOutlet()?.nativeElement;
    if (lab && typeof lab.scrollIntoView === 'function') {
      lab.scrollIntoView({ block: 'center' });
    }
  }

  resetMissions(): void {
    this.progress.reset(this.lessonMissionIds());
    this.celebration.set(null);
    this.touchedLessonId.set(null);
    const state = this.labState();
    this.labBaseline = state ? { lessonId: this.lesson().id, key: JSON.stringify(state) } : null;
    this.feedback.tick();
  }

  private missionMatches(mission: PracticeChallenge, state: Record<string, unknown>): boolean {
    const target = mission.targetState ?? { a: mission.targetA, b: mission.targetB };
    return Object.entries(target).every(([key, value]) => state[key] === value);
  }

  onArtifactImageError(event: Event, plate?: ArtifactPlate): void {
    const imgElement = event.target as HTMLImageElement;
    if (!imgElement) return;
    imgElement.onerror = null; // Prevent infinite loop
    const title = plate?.title ?? 'Artifact';
    // Replace with a clean local SVG or styling placeholder
    imgElement.src =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300" fill="%23f4f1ea"><rect width="600" height="300"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="%2378716c">Artifact Plate: ' +
      encodeURIComponent(title) +
      '</text><text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="%23a8a29e">Click source link below to inspect on Wikimedia Commons</text></svg>';
  }
}
