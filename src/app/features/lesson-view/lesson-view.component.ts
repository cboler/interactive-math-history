import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurriculumService } from '../../services/curriculum.service';
import {
  NumberLineComponent,
  OperationType,
} from '../../shared/visualizers/number-line/number-line.component';
import { BalanceScaleComponent } from '../../shared/visualizers/balance-scale/balance-scale.component';
import { GridArrayComponent } from '../../shared/visualizers/grid-array/grid-array.component';
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
    IconComponent,
  ],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent {
  readonly curriculum = inject(CurriculumService);
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

  toggleDrawer(): void {
    this.curriculum.toggleDrawer();
  }

  selectLesson(index: number): void {
    this.curriculum.setLessonIndex(index);
    const curr = this.curriculum.currentLesson();
    if (curr) {
      this.inputA.set(curr.interactiveConfig.defaultA);
      this.inputB.set(curr.interactiveConfig.defaultB);
    }
    this.curriculum.toggleDrawer(false);
  }

  goToNext(): void {
    this.curriculum.nextLesson();
    const curr = this.curriculum.currentLesson();
    if (curr) {
      this.inputA.set(curr.interactiveConfig.defaultA);
      this.inputB.set(curr.interactiveConfig.defaultB);
    }
  }

  goToPrev(): void {
    this.curriculum.prevLesson();
    const curr = this.curriculum.currentLesson();
    if (curr) {
      this.inputA.set(curr.interactiveConfig.defaultA);
      this.inputB.set(curr.interactiveConfig.defaultB);
    }
  }

  setOp(op: OperationType): void {
    this.operation.set(op);
  }
}
