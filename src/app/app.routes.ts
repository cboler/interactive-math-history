import { Routes } from '@angular/router';
import { LessonViewComponent } from './features/lesson-view/lesson-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LessonViewComponent,
    title: 'Unit 01: Origins of Addition • Interactive Math & History',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
