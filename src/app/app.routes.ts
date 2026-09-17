import { Routes } from '@angular/router';
import { LessonViewComponent } from './features/lesson-view/lesson-view.component';
import { HomeComponent } from './home/home.component';
import { StatusComponent } from './status/status.component';

export const routes: Routes = [
  {
    path: '',
    component: LessonViewComponent,
    title: 'Unit 01: Origins of Addition • Interactive Math & History',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home • Interactive Math & History',
  },
  {
    path: 'status',
    component: StatusComponent,
    title: 'Status & Diagnostics • Interactive Math & History',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
