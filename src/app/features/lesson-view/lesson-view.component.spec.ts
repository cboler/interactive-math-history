import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LessonViewComponent } from './lesson-view.component';
import { CurriculumService } from '../../services/curriculum.service';
import { LogicCircuitComponent } from '../../shared/visualizers/logic-circuit/logic-circuit.component';
import { GeometricCompassComponent } from '../../shared/visualizers/geometric-compass/geometric-compass.component';
import { BreadSlicerComponent } from '../../shared/visualizers/bread-slicer/bread-slicer.component';
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(async () => {
    // Mission progress is persisted; start every test with a clean slate
    try {
      window.localStorage.removeItem('imx_completed_missions');
      window.localStorage.removeItem('imx_addition_game_v1');
    } catch {
      // Storage unavailable in this environment
    }

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
    expect(compiled.querySelector('h1')?.textContent).toContain('Putting Things Together');
    expect(compiled.querySelector('.unit-level-badge')?.textContent).toContain('Unit 1 of 8');
  });

  it('should render story illustration, math diagram, and practice missions for Unit 01', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.story-illustration img')).toBeTruthy();
    expect(compiled.querySelector('.story-illustration figcaption')?.textContent).toContain(
      'An imagined Moon-watching game',
    );
    expect(compiled.querySelector('.math-diagram img')).toBeTruthy();
    expect(compiled.querySelector('.math-diagram figcaption')?.textContent).toContain('3 + 2 = 5');

    expect(compiled.querySelector('app-addition-game')).toBeTruthy();
    expect(compiled.querySelectorAll('.mission-card').length).toBe(0);
    expect(compiled.querySelector('.controls-panel')).toBeFalsy();
    expect(compiled.querySelector('.discovery-card')).toBeFalsy();
  });

  it('should cycle through units via next and previous buttons', () => {
    // Unit 01 -> Unit 02 (Subtraction)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-02-taking-away-subtraction');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Taking Things Away');

    // Unit 02 -> Unit 03 (Equality)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-03-euclid-equality');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      "Euclid's Common Notions",
    );

    // Unit 03 -> Unit 04 (Multiplication)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-04-commutative-multiplication');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('The Farm Grid');

    // Unit 04 -> Unit 05 (Division)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-05-fair-share-division');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Sharing the Harvest');

    // Unit 05 -> Unit 06 (Fractions)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-06-egyptian-fractions');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Slicing the Loaf');

    // Unit 06 -> Unit 07 (Logic)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-07-aristotle-logic');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'Architecture of Reason',
    );

    // Unit 07 -> Unit 08 (Geometry)
    component.goToNext();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-08-euclid-equilateral');
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(
      'The First Construction',
    );

    // Step back
    component.goToPrev();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-07-aristotle-logic');
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

  it('should close drawer on backdrop click and on Escape key', () => {
    component.toggleDrawer(true);
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(true);

    const backdrop = fixture.nativeElement.querySelector('.drawer-backdrop') as HTMLElement;
    expect(backdrop).toBeTruthy();
    backdrop.click();
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(false);

    // Test Escape key
    component.toggleDrawer(true);
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(component.isDrawerOpen()).toBe(false);
  });

  it('should update operation when toggled', () => {
    expect(component.operation()).toBe('add');
    component.setOp('subtract');
    expect(component.operation()).toBe('subtract');
  });

  it('should dynamically mount correct visualizers and adapt control labels', () => {
    const el = fixture.nativeElement as HTMLElement;

    // Unit 01: a compact addition game, with its own calculator
    expect(el.querySelector('app-addition-game')).toBeTruthy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('app-logic-circuit')).toBeFalsy();
    expect(el.querySelector('.controls-panel')).toBeFalsy();
    expect(el.querySelector('.btn-group')).toBeFalsy(); // Operation toggle hidden due to lockedOperation: 'add'

    // Unit 02: number-line-vector (locked to subtraction)
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeTruthy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain(
      'Starting Tally (A):',
    );
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Notches Taken Away (B):',
    );
    expect(component.operation()).toBe('subtract');
    expect(el.querySelector('.btn-group')).toBeFalsy(); // Operation toggle hidden due to lockedOperation: 'subtract'

    // Unit 03: balance-scale
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeTruthy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('app-logic-circuit')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain(
      'Left Pan (A):',
    );
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Right Pan (B):',
    );

    // Unit 04: grid-array
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeTruthy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('app-logic-circuit')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain('Rows (A):');
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Columns (B):',
    );

    // Unit 05: sharing-distributor
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeTruthy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('label[for="quantity-a-input"]')?.textContent).toContain(
      'Total Items (A):',
    );
    expect(el.querySelector('label[for="quantity-b-input"]')?.textContent).toContain(
      'Number of Baskets (B):',
    );

    // Unit 06: partition-slicer
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeTruthy();
    expect(el.querySelector('app-logic-circuit')).toBeFalsy();
    expect(el.querySelector('.controls-panel')).toBeFalsy(); // Slider controls hidden

    // Unit 07: logic-circuit
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('app-logic-circuit')).toBeTruthy();
    expect(el.querySelector('app-geometric-compass')).toBeFalsy();
    expect(el.querySelector('.controls-panel')).toBeFalsy(); // Slider controls hidden

    // Unit 08: geometric-compass
    component.goToNext();
    fixture.detectChanges();
    expect(el.querySelector('app-number-line')).toBeFalsy();
    expect(el.querySelector('app-balance-scale')).toBeFalsy();
    expect(el.querySelector('app-grid-array')).toBeFalsy();
    expect(el.querySelector('app-sharing-distributor')).toBeFalsy();
    expect(el.querySelector('app-bread-slicer')).toBeFalsy();
    expect(el.querySelector('app-logic-circuit')).toBeFalsy();
    expect(el.querySelector('app-geometric-compass')).toBeTruthy();
    expect(el.querySelector('.controls-panel')).toBeFalsy(); // Slider controls hidden
  });

  it('should filter curriculum outline by mathematical strand', () => {
    component.toggleDrawer();
    fixture.detectChanges();

    // Default: 'all' -> 8 units
    expect(component.selectedStrand()).toBe('all');
    expect(component.filteredLessons().length).toBe(8);

    // Filter to 'logic' (Unit 03 and Unit 07)
    component.setStrand('logic');
    fixture.detectChanges();
    expect(component.selectedStrand()).toBe('logic');
    expect(component.filteredLessons().length).toBe(2);
    expect(component.filteredLessons().map((l) => l.id)).toEqual([
      'unit-03-euclid-equality',
      'unit-07-aristotle-logic',
    ]);

    // Active lesson index is preserved until explicit selection
    expect(component.curriculum.activeLessonIndex()).toBe(0);

    // Filter to 'numeracy' (Unit 01 and Unit 02)
    component.setStrand('numeracy');
    fixture.detectChanges();
    expect(component.filteredLessons().length).toBe(2);
    expect(component.filteredLessons().map((l) => l.id)).toEqual([
      'unit-01-gathering-addition',
      'unit-02-taking-away-subtraction',
    ]);

    // Filter to 'arithmetic' (Unit 04, Unit 05, Unit 06)
    component.setStrand('arithmetic');
    fixture.detectChanges();
    expect(component.filteredLessons().length).toBe(3);
    expect(component.filteredLessons().map((l) => l.id)).toEqual([
      'unit-04-commutative-multiplication',
      'unit-05-fair-share-division',
      'unit-06-egyptian-fractions',
    ]);

    // Filter to 'geometry' (Unit 08)
    component.setStrandFilter('geometry');
    fixture.detectChanges();
    expect(component.selectedStrand()).toBe('geometry');
    expect(component.filteredLessons().length).toBe(1);
    expect(component.filteredLessons()[0].id).toBe('unit-08-euclid-equilateral');

    // Reset to 'all'
    component.setStrand('all');
    fixture.detectChanges();
    expect(component.filteredLessons().length).toBe(8);
  });

  it('should select lesson by id from filtered list and close drawer', () => {
    component.toggleDrawer();
    fixture.detectChanges();

    component.setStrand('logic');
    fixture.detectChanges();

    component.selectLessonById('unit-07-aristotle-logic');
    fixture.detectChanges();

    expect(component.curriculum.activeLessonIndex()).toBe(6);
    expect(component.curriculum.currentLesson().id).toBe('unit-07-aristotle-logic');
    expect(component.isDrawerOpen()).toBe(false);
  });

  it('should sync active lesson when navigating to route directly', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/arithmetic/spatial-invariance-multiplication',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe(
      'unit-04-commutative-multiplication',
    );
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('The Farm Grid');
    expect(harness.routeNativeElement?.querySelector('app-grid-array')).toBeTruthy();
  });

  it('should render discovery hook, artifact plate, and epistemic card for Unit 06', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/elementary/egyptian-unit-fractions-rhind',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-06-egyptian-fractions');
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
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-02-taking-away-subtraction');
    expect(harness.routeNativeElement?.querySelector('app-number-line')).toBeTruthy();
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/foundations/unit-02');
  });

  it('should redirect unknown routes to canonical origins-of-addition', async () => {
    const harness = await RouterTestingHarness.create();
    const routedComponent = await harness.navigateByUrl(
      '/nonexistent/unknown',
      LessonViewComponent,
    );
    expect(routedComponent.curriculum.currentLesson().id).toBe('unit-01-gathering-addition');
    const router = TestBed.inject(Router);
    expect(router.url).toBe('/foundations/origins-of-addition');
  });

  it('should compute context-appropriate missionButtonLabel for each visualizer', () => {
    // Unit 02 (number-line-vector)
    component.selectLesson(1);
    expect(component.missionButtonLabel()).toBe('Try This on the Number Line');

    // Unit 03 (balance-scale)
    component.selectLesson(2);
    expect(component.missionButtonLabel()).toBe('Balance This on the Scale');

    // Unit 04 (grid-array)
    component.selectLesson(3);
    expect(component.missionButtonLabel()).toBe('Plant This Grid');

    // Unit 05 (sharing-distributor)
    component.selectLesson(4);
    expect(component.missionButtonLabel()).toBe('Share Into Baskets');

    // Unit 06 (partition-slicer)
    component.selectLesson(5);
    expect(component.missionButtonLabel()).toBe('Go to the Bread Bench');

    // Unit 07 (logic-circuit)
    component.selectLesson(6);
    expect(component.missionButtonLabel()).toBe('Try This on the Circuit');

    // Unit 08 (geometric-compass)
    component.selectLesson(7);
    expect(component.missionButtonLabel()).toBe('Show This Step');
  });

  it('should show what each lesson builds on and where it leads', () => {
    const el = fixture.nativeElement as HTMLElement;
    const sections = () => el.querySelectorAll('.lineage-card');

    // Unit 01 has no prerequisites but opens the door to later units
    expect(sections()[0].querySelector('.lineage-empty')?.textContent).toContain(
      'where the journey begins',
    );
    const leadsTo = [...sections()[1].querySelectorAll('.lineage-link')].map((b) =>
      b.textContent?.trim(),
    );
    expect(leadsTo).toEqual([
      'Unit 02: Subtraction',
      'Unit 03: Equality',
      'Unit 04: Multiplication',
    ]);

    // Unit 06 (Fractions) stands on multiplication and division, with a reason for each
    component.selectLesson(5);
    fixture.detectChanges();
    const priorLinks = sections()[0].querySelectorAll('.lineage-link');
    expect([...priorLinks].map((b) => b.textContent?.trim())).toEqual([
      'Unit 04: Multiplication',
      'Unit 05: Division',
    ]);
    const reasons = sections()[0].querySelectorAll('.lineage-connection');
    expect(reasons.length).toBe(2);
    expect(reasons[1].textContent).toContain('A fraction is a division you have not finished');

    // Following a link opens that lesson
    (priorLinks[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(component.curriculum.currentLesson().id).toBe('unit-05-fair-share-division');
  });

  it('should label historical certainty in plain language', () => {
    const el = fixture.nativeElement as HTMLElement;
    const tag = () => el.querySelector('.consensus-tag');

    expect(tag()?.getAttribute('data-level')).toBe('contested');
    expect(tag()?.textContent?.trim()).toBe('Still debated');

    component.selectLesson(1);
    fixture.detectChanges();
    expect(tag()?.textContent?.trim()).toBe('A best guess');

    component.selectLesson(2);
    fixture.detectChanges();
    expect(tag()?.textContent?.trim()).toBe('Historians agree');
  });

  it('should show the lab goal and a hint in the discovery challenge', () => {
    component.selectLesson(1);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const card = el.querySelector('.discovery-card');
    expect(card?.textContent).toContain('Set Starting Tally (A)');
    expect(card?.querySelector('details.discovery-hint summary')?.textContent).toContain(
      'Need a hint?',
    );
  });

  it('should keep lab controls reachable by assistive technology', () => {
    component.selectLesson(1);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.controls-panel')?.hasAttribute('aria-hidden')).toBe(false);
    expect(el.querySelector('.visualizer-outlet')?.hasAttribute('aria-hidden')).toBe(false);
    // The decorative drawing itself stays hidden; its text alternative is the live region
    expect(el.querySelector('app-number-line svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render curriculum outline statements as math, not raw LaTeX', () => {
    component.toggleDrawer(true);
    fixture.detectChanges();
    const statements = fixture.nativeElement.querySelectorAll('.stepper-statement');
    expect(statements.length).toBe(8);
    for (const statement of statements) {
      expect(statement.querySelector('.katex')).toBeTruthy();
    }
    expect(fixture.nativeElement.querySelector('.stepper-era')?.textContent).toContain(
      'c. 20,000 BCE',
    );
    expect(fixture.nativeElement.querySelector('.stepper-progress')?.textContent).toContain(
      '0 of 6 stars',
    );
  });

  describe('practice missions', () => {
    const cards = () =>
      [
        ...(fixture.nativeElement as HTMLElement).querySelectorAll('.mission-card'),
      ] as HTMLElement[];
    const settle = async () => {
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
    };

    it('should not tick off a mission that merely matches the starting state', async () => {
      component.selectLesson(6);
      // Unit 07 opens on AND with P=true and Q=false, matching Mission 2.
      await settle();
      expect(component.completedInLesson()).toBe(0);
      expect(cards()[0].classList.contains('done')).toBe(false);
    });

    it('should complete a mission from its button and show the success message', async () => {
      component.selectLesson(2);
      await settle();
      (cards()[0].querySelector('.load-mission-btn') as HTMLButtonElement).click();
      await settle();

      expect(component.completedInLesson()).toBe(1);
      expect(cards()[0].classList.contains('done')).toBe(true);
      expect(cards()[0].querySelector('.mission-success')?.textContent).toContain(
        'Balanced! 4 = 4',
      );
      const el = fixture.nativeElement as HTMLElement;
      expect(el.querySelector('.mission-celebration')?.textContent).toContain('Mission complete!');
      expect(el.querySelector('#missions-progress')?.textContent).toContain('1 of 3 done');
    });

    it('should complete a mission when the learner moves the sliders themselves', async () => {
      component.selectLesson(2);
      await settle();
      component.inputA.set(2);
      await settle();
      expect(component.completedInLesson()).toBe(0);

      component.inputB.set(2);
      await settle();
      expect(cards()[2].classList.contains('done')).toBe(true);
      expect(component.celebrationMessage()).toContain('2 = 2');
    });

    it('should reset the missions of the current lesson', async () => {
      component.selectLesson(2);
      await settle();
      (cards()[1].querySelector('.load-mission-btn') as HTMLButtonElement).click();
      await settle();
      expect(component.completedInLesson()).toBe(1);

      const el = fixture.nativeElement as HTMLElement;
      (el.querySelector('#reset-missions-btn') as HTMLButtonElement).click();
      await settle();
      expect(component.completedInLesson()).toBe(0);
      expect(el.querySelector('.mission-celebration')).toBeFalsy();
      expect(el.querySelector('#reset-missions-btn')).toBeFalsy();
    });

    it('should drive the logic circuit from mission buttons', async () => {
      component.selectLesson(6);
      await settle();
      // The circuit opens on AND with P true and Q false (Mission 2) but nothing is ticked yet
      expect(component.completedInLesson()).toBe(0);

      (cards()[2].querySelector('.load-mission-btn') as HTMLButtonElement).click();
      await settle();

      const circuit = fixture.debugElement.query(By.directive(LogicCircuitComponent))
        .componentInstance as LogicCircuitComponent;
      expect(circuit.gateType()).toBe('OR');
      expect(circuit.isLit()).toBe(true);
      expect(cards()[2].classList.contains('done')).toBe(true);
      expect(cards()[1].classList.contains('done')).toBe(false);
    });

    it('should follow the compass construction step by step', async () => {
      component.selectLesson(7);
      await settle();

      const compass = fixture.debugElement.query(By.directive(GeometricCompassComponent))
        .componentInstance as GeometricCompassComponent;
      compass.nextStep();
      await settle();
      expect(cards().map((c) => c.classList.contains('done'))).toEqual([true, false, false]);

      (cards()[2].querySelector('.load-mission-btn') as HTMLButtonElement).click();
      await settle();
      expect(compass.step()).toBe(4);
      expect(cards().map((c) => c.classList.contains('done'))).toEqual([true, false, true]);
    });

    it('should track hands-on progress at the bread bench', async () => {
      component.selectLesson(5);
      await settle();

      const slicer = fixture.debugElement.query(By.directive(BreadSlicerComponent))
        .componentInstance as BreadSlicerComponent;

      // The button only leads to the bench; the cutting is up to the learner
      (cards()[0].querySelector('.load-mission-btn') as HTMLButtonElement).click();
      await settle();
      expect(component.completedInLesson()).toBe(0);

      slicer.cutLoaf(2, '#2563eb');
      await settle();
      expect(cards().map((c) => c.classList.contains('done'))).toEqual([true, false, false]);

      slicer.cutLoaf(2, '#2563eb');
      slicer.cutLoaf(2, '#2563eb');
      for (const basket of slicer.baskets()) {
        slicer.giveSliceToWorker(slicer.availableSlices()[0].id, basket.id);
      }
      await settle();
      expect(cards().map((c) => c.classList.contains('done'))).toEqual([true, true, false]);

      slicer.subdivideHalf(slicer.availableSlices()[0].id);
      for (const basket of slicer.baskets()) {
        slicer.giveSliceToWorker(slicer.availableSlices()[0].id, basket.id);
      }
      await settle();
      expect(slicer.isSolved()).toBe(true);
      expect(cards().map((c) => c.classList.contains('done'))).toEqual([true, true, true]);
    });
  });

  it('should render story illustrations and math diagrams across all units', () => {
    const total = component.curriculum.totalLessons();
    expect(total).toBe(8);

    for (let i = 0; i < total; i++) {
      component.selectLesson(i);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const storyImg = compiled.querySelector('.story-illustration img') as HTMLImageElement;
      const mathImg = compiled.querySelector('.math-diagram img') as HTMLImageElement;
      expect(storyImg).toBeTruthy();
      expect(storyImg.src).toContain(
        `assets/illustrations/unit-0${i + 1}-story.${i === 0 ? 'png' : 'svg'}`,
      );
      expect(storyImg.getAttribute('referrerpolicy')).toBe('no-referrer');
      expect(mathImg).toBeTruthy();
      expect(mathImg.src).toContain(
        `assets/illustrations/unit-0${i + 1}-diagram.${i === 0 ? 'png' : 'svg'}`,
      );
      expect(mathImg.getAttribute('referrerpolicy')).toBe('no-referrer');
    }
  });

  it('should configure artifact plate with referrerpolicy and fallback on error', () => {
    component.selectLesson(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const plateImg = compiled.querySelector('.artifact-plate img') as HTMLImageElement;
    expect(plateImg).toBeTruthy();
    expect(plateImg.getAttribute('referrerpolicy')).toBe('no-referrer');
    expect(compiled.querySelector('.artifact-plate .image-wrapper')).toBeTruthy();
    const sourceLink = compiled.querySelector('.plate-credit a') as HTMLAnchorElement;
    expect(sourceLink).toBeTruthy();
    expect(sourceLink.href).toContain('commons.wikimedia.org');

    // Simulate image error event
    plateImg.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(plateImg.src).toContain('data:image/svg+xml');
    expect(plateImg.src).toContain('Ishango');
    expect(plateImg.onerror).toBeNull();
  });

  it('should render metadata badges with high-contrast badge classes', () => {
    component.selectLesson(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const stageBadge = compiled.querySelector('.stage-badge');
    const strandBadge = compiled.querySelector('.strand-badge');
    const eraBadge = compiled.querySelector('.era-badge');

    expect(stageBadge).toBeTruthy();
    expect(strandBadge).toBeTruthy();
    expect(eraBadge).toBeTruthy();
    expect(stageBadge?.textContent?.trim().toLowerCase()).toBe('foundations');
  });
});
