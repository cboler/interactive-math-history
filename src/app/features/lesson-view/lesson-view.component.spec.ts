import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LessonViewComponent } from './lesson-view.component';
import { CurriculumService } from '../../services/curriculum.service';
import { routes } from '../../app.routes';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonViewComponent],
      providers: [CurriculumService, provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create and render semantic article container', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    const article = compiled.querySelector('article.reader-article');
    expect(article).toBeTruthy();
    expect(article?.getAttribute('role')).toBe('article');
  });

  it('should render mathematical statement and unit heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.formula-badge .katex')).toBeTruthy();
    expect(compiled.querySelector('.formula-badge')?.textContent).toContain('a');
    expect(compiled.querySelector('h1')?.textContent).toContain('The Origin of Combining');
    expect(compiled.querySelector('.unit-level-badge')?.textContent).toContain('Unit 1 of 4');
  });

  it('should cycle through units via next and previous buttons', () => {
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-02-euclid-equality');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      "Euclid's Common Notions",
    );

    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-03-commutative-multiplication');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Spatial Invariance');

    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-04-egyptian-fractions');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('The Bread Partition');

    component.goToPrev();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-03-commutative-multiplication');
  });

  it('should open and close curriculum outline drawer', () => {
    expect(component.isDrawerOpen()).toBe(false);
    component.toggleDrawer();
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(true);

    const drawer = fixture.nativeElement.querySelector('#curriculum-drawer');
    expect(drawer).toBeTruthy();

    component.selectLesson(2);
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(false);
    expect(component.curriculum.activeLessonIndex()).toBe(2);
  });

  it('should update operation when toggled', () => {
    expect(component.operation()).toBe('add');
    component.setOp('subtract');
    expect(component.operation()).toBe('subtract');
  });

  it('should dynamically mount correct visualizers and adapt control labels', () => {
    const el = fixture.nativeElement as HTMLElement;

    // Unit 01: number-line-vector
    expect(el.querySelector('app-number-line')).toBeTruthy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain('Quantity A:');
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain('Quantity B:');
    expect(el.querySelector('.btn-group')).toBeTruthy();

    // Unit 02: balance-scale
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeTruthy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain(
      'Left Pan (A):',
    );
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Right Pan (B):',
    );
    expect(el.querySelector('.btn-group')).toBeFalsy(); // Operation toggle hidden

    // Unit 03: grid-array
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeTruthy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain('Rows (A):');
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Columns (B):',
    );
    expect(el.querySelector('.btn-group')).toBeFalsy(); // Operation toggle hidden

    // Unit 04: partition-slicer
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeTruthy();
    expect(el.querySelector('.controls-panel')).toBeFalsy(); // Slider controls hidden
  });

  it('should sync active lesson when navigating to route directly', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/arithmetic/spatial-invariance-multiplication',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe(
      'unit-03-commutative-multiplication',
    );
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Spatial Invariance',
    );
    expect(harness.routeNativeElement?.querySelector('app-grid-array')).toBeTruthy();
  });

  it('should render discovery hook, artifact plate, and epistemic card for Unit 04', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/elementary/egyptian-unit-fractions-rhind',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-04-egyptian-fractions');
    const el = harness.routeNativeElement;
    expect(el?.querySelector('.discovery-card')).toBeTruthy();
    expect(el?.querySelector('.artifact-plate img')?.getAttribute('src')).toContain(
      'Rhind_Mathematical_Papyrus.jpg',
    );
    expect(el?.querySelector('.epistemic-card')).toBeTruthy();
    expect(el?.querySelector('app-bread-slicer')).toBeTruthy();
  });

  it('should resolve flexible unit aliases like unit-02', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/foundations/unit-02',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-02-euclid-equality');
    expect(harness.routeNativeElement?.querySelector('app-balance-scale')).toBeTruthy();
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/foundations/unit-02');
  });

  it('should redirect unknown routes to canonical origins-of-addition', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/nonexistent/unknown',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-01-ishango-addition');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/foundations/origins-of-addition');
  });
});
