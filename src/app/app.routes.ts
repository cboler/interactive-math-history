import { inject } from '@angular/core';
import { Routes, CanActivateFn, Router } from '@angular/router';
import { LessonViewComponent } from './features/lesson-view/lesson-view.component';
import { CurriculumService } from './services/curriculum.service';

export const lessonGuard: CanActivateFn = (route) => {
  const level = route.paramMap.get('level');
  const unit = route.paramMap.get('unit');
  const curriculum = inject(CurriculumService);
  const router = inject(Router);

  if (level && unit && curriculum.findLessonIndex(level, unit) !== -1) {
    return true;
  }
  return router.parseUrl('/foundations/origins-of-addition');
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'foundations/origins-of-addition',
  },
  {
    path: ':level/:unit',
    component: LessonViewComponent,
    canActivate: [lessonGuard],
  },
  {
    path: '**',
    redirectTo: 'foundations/origins-of-addition',
  },
];
