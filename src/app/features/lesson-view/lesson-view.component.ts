import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurriculumService } from '../../services/curriculum.service';
import {
  NumberLineComponent,
  OperationType,
} from '../../shared/visualizers/number-line/number-line.component';
import { BalanceScaleComponent } from '../../shared/visualizers/balance-scale/balance-scale.component';
import { GridArrayComponent } from '../../shared/visualizers/grid-array/grid-array.component';
import { BreadSlicerComponent } from '../../shared/visualizers/bread-slicer/bread-slicer.component';
import { IconComponent } from '../../shared/components/icon/icon.component';

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
    IconComponent,
  ],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent implements OnInit, OnDestroy {
  readonly curriculum = inject(CurriculumService);
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

  readonly inputA = signal<number>(4);
  readonly inputB = signal<number>(3);
  readonly operation = signal<OperationType>('add');

  readonly sliderALabel = computed(() => {
    const viz = this.lesson()?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Left Pan (A)';
    if (viz === 'grid-array') return 'Rows (A)';
    return 'Quantity A';
  });

  readonly sliderBLabel = computed(() => {
    const viz = this.lesson()?.interactiveConfig.visualizer;
    if (viz === 'balance-scale') return 'Right Pan (B)';
    if (viz === 'grid-array') return 'Columns (B)';
    return 'Quantity B';
  });

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.subscribe((params) => {
      const level = params.get('level');
      const unit = params.get('unit');
      if (level && unit) {
        this.curriculum.navigateToLesson(level, unit);
        const curr = this.curriculum.currentLesson();
        if (curr) {
          if (curr.interactiveConfig.defaultA !== undefined) {
            this.inputA.set(curr.interactiveConfig.defaultA);
          }
          if (curr.interactiveConfig.defaultB !== undefined) {
            this.inputB.set(curr.interactiveConfig.defaultB);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  toggleDrawer(open?: boolean): void {
    this.curriculum.toggleDrawer(open);
  }

  selectLesson(index: number): void {
    const target = this.allLessons()[index];
    if (target) {
      this.curriculum.setLessonIndex(index);
      if (target.interactiveConfig.defaultA !== undefined) {
        this.inputA.set(target.interactiveConfig.defaultA);
      }
      if (target.interactiveConfig.defaultB !== undefined) {
        this.inputB.set(target.interactiveConfig.defaultB);
      }
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
        if (curr.interactiveConfig.defaultA !== undefined) {
          this.inputA.set(curr.interactiveConfig.defaultA);
        }
        if (curr.interactiveConfig.defaultB !== undefined) {
          this.inputB.set(curr.interactiveConfig.defaultB);
        }
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
        if (curr.interactiveConfig.defaultA !== undefined) {
          this.inputA.set(curr.interactiveConfig.defaultA);
        }
        if (curr.interactiveConfig.defaultB !== undefined) {
          this.inputB.set(curr.interactiveConfig.defaultB);
        }
        const stageOrLevel = curr.stage || curr.level || 'foundations';
        this.router.navigate(['/', stageOrLevel, curr.slug]);
      }
    }
  }

  setOp(op: OperationType): void {
    this.operation.set(op);
  }
}
