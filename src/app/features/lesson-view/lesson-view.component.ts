import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurriculumService } from '../../services/curriculum.service';
import {
  NumberLineComponent,
  OperationType,
} from '../../shared/visualizers/number-line/number-line.component';
import { ThreeViewportComponent } from '../../shared/visualizers/three-viewport/three-viewport.component';

@Component({
  selector: 'app-lesson-view',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberLineComponent, ThreeViewportComponent],
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent {
  readonly curriculum = inject(CurriculumService);
  readonly lesson = this.curriculum.currentLesson;

  readonly inputA = signal<number>(4);
  readonly inputB = signal<number>(3);
  readonly operation = signal<OperationType>('add');

  setOp(op: OperationType): void {
    this.operation.set(op);
  }
}
