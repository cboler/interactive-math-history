import { Routes } from '@angular/router';
import { LessonViewComponent } from './features/lesson-view/lesson-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LessonViewComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
