import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeometricCompassComponent } from './geometric-compass.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('GeometricCompassComponent', () => {
  let component: GeometricCompassComponent;
  let fixture: ComponentFixture<GeometricCompassComponent>;
  let feedbackSpy: {
    tick: ReturnType<typeof vi.fn>;
    snapWhoosh: ReturnType<typeof vi.fn>;
    lightTap: ReturnType<typeof vi.fn>;
    equilibriumChime: ReturnType<typeof vi.fn>;
    successPulse: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    feedbackSpy = {
      tick: vi.fn(),
      snapWhoosh: vi.fn(),
      lightTap: vi.fn(),
      equilibriumChime: vi.fn(),
      successPulse: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [GeometricCompassComponent],
      providers: [{ provide: FeedbackService, useValue: feedbackSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(GeometricCompassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize with step 1 and default baseLength 160', () => {
    expect(component).toBeTruthy();
    expect(component.step()).toBe(1);
    expect(component.baseLength()).toBe(160);
    expect(component.liveAnnouncement()).toBe('Baseline segment AB established with length 160.');
  });

  it('should accurately calculate equilateral altitude and apex coordinates Cx, Cy', () => {
    // With baseLength = 160:
    // Ax = 300 - 80 = 220, Ay = 240
    // Bx = 300 + 80 = 380, By = 240
    // height h = 160 * (sqrt(3) / 2) = 80 * sqrt(3) ~ 138.564
    // Cx = 300, Cy = 240 - h ~ 101.436
    const expectedHeight = 160 * (Math.sqrt(3) / 2);
    expect(component.ax()).toBe(220);
    expect(component.ay()).toBe(240);
    expect(component.bx()).toBe(380);
    expect(component.by()).toBe(240);
    expect(component.height()).toBeCloseTo(expectedHeight, 5);
    expect(component.cx()).toBe(300);
    expect(component.cy()).toBeCloseTo(240 - expectedHeight, 5);
  });

  it('should step sequence cleanly from 1 to 4 and trigger expected feedback', () => {
    expect(component.step()).toBe(1);

    // Advance to Step 2 (Sweep Circle A)
    component.nextStep();
    fixture.detectChanges();
    expect(component.step()).toBe(2);
    expect(feedbackSpy.snapWhoosh).toHaveBeenCalledTimes(1);
    expect(feedbackSpy.lightTap).toHaveBeenCalledTimes(1);
    expect(component.liveAnnouncement()).toBe('Circle A swept around point A with radius AB.');

    // Advance to Step 3 (Sweep Circle B)
    component.nextStep();
    fixture.detectChanges();
    expect(component.step()).toBe(3);
    expect(feedbackSpy.snapWhoosh).toHaveBeenCalledTimes(2);
    expect(component.liveAnnouncement()).toBe('Circle B swept around point B with radius BA.');

    // Advance to Step 4 (Complete Equilateral Triangle)
    component.nextStep();
    fixture.detectChanges();
    expect(component.step()).toBe(4);
    expect(feedbackSpy.equilibriumChime).toHaveBeenCalledTimes(1);
    expect(feedbackSpy.successPulse).toHaveBeenCalledTimes(1);
    expect(component.liveAnnouncement()).toBe(
      'Intersection C plotted. Equilateral triangle ABC constructed with equal sides AB, BC, and CA.',
    );

    // Should not exceed step 4
    component.nextStep();
    expect(component.step()).toBe(4);
  });

  it('should allow stepping backward cleanly', () => {
    component.setStep(4);
    expect(component.step()).toBe(4);

    component.prevStep();
    expect(component.step()).toBe(3);
    expect(feedbackSpy.tick).toHaveBeenCalled();

    component.prevStep();
    expect(component.step()).toBe(2);

    component.prevStep();
    expect(component.step()).toBe(1);

    // Should not drop below 1
    component.prevStep();
    expect(component.step()).toBe(1);
  });

  it('should reset construction to step 1 when reset is invoked', () => {
    component.setStep(4);
    expect(component.step()).toBe(4);

    component.reset();
    fixture.detectChanges();
    expect(component.step()).toBe(1);
    expect(component.liveAnnouncement()).toBe('Baseline segment AB established with length 160.');
    expect(feedbackSpy.tick).toHaveBeenCalled();
  });

  it('should dynamically update baseLength and recalculate geometry on slider change', () => {
    component.setBaseLength(200);
    fixture.detectChanges();

    expect(component.baseLength()).toBe(200);
    const expectedHeight = 200 * (Math.sqrt(3) / 2);
    expect(component.ax()).toBe(200);
    expect(component.bx()).toBe(400);
    expect(component.height()).toBeCloseTo(expectedHeight, 5);
    expect(component.cy()).toBeCloseTo(240 - expectedHeight, 5);
    expect(feedbackSpy.tick).toHaveBeenCalled();
  });

  it('should clamp baseLength within [100, 220] bounds', () => {
    component.setBaseLength(50);
    expect(component.baseLength()).toBe(100);

    component.setBaseLength(350);
    expect(component.baseLength()).toBe(220);
  });

  it('should render corresponding SVG elements based on active step', () => {
    const el = fixture.nativeElement as HTMLElement;

    // Step 1: Baseline only, no circles, no triangle
    expect(el.querySelector('.baseline-ab')).toBeTruthy();
    expect(el.querySelector('.circle-a')).toBeFalsy();
    expect(el.querySelector('.circle-b')).toBeFalsy();
    expect(el.querySelector('.equilateral-fill')).toBeFalsy();
    expect(el.querySelector('.vertex-c')).toBeFalsy();

    // Step 2: Circle A appears
    component.setStep(2);
    fixture.detectChanges();
    expect(el.querySelector('.circle-a')).toBeTruthy();
    expect(el.querySelector('.circle-b')).toBeFalsy();
    expect(el.querySelector('.equilateral-fill')).toBeFalsy();

    // Step 3: Circle B appears
    component.setStep(3);
    fixture.detectChanges();
    expect(el.querySelector('.circle-a')).toBeTruthy();
    expect(el.querySelector('.circle-b')).toBeTruthy();
    expect(el.querySelector('.equilateral-fill')).toBeFalsy();

    // Step 4: Full triangle, side lines, and apex C appear
    component.setStep(4);
    fixture.detectChanges();
    expect(el.querySelector('.circle-a')).toBeTruthy();
    expect(el.querySelector('.circle-b')).toBeTruthy();
    expect(el.querySelector('.equilateral-fill')).toBeTruthy();
    expect(el.querySelector('.side-ac')).toBeTruthy();
    expect(el.querySelector('.side-bc')).toBeTruthy();
    expect(el.querySelector('.vertex-c')).toBeTruthy();
    expect(el.querySelector('.qed-badge')).toBeTruthy();
  });
});
