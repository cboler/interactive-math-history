import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadSlicerComponent } from './bread-slicer.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('BreadSlicerComponent', () => {
  let component: BreadSlicerComponent;
  let fixture: ComponentFixture<BreadSlicerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadSlicerComponent],
      providers: [FeedbackService],
    }).compileComponents();

    fixture = TestBed.createComponent(BreadSlicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with initial state of 3 loaves and 5 empty baskets', () => {
    expect(component).toBeTruthy();
    expect(component.unslicedLoaves()).toBe(3);
    expect(component.availableSlices().length).toBe(0);
    expect(component.baskets().length).toBe(5);
    expect(component.isSolved()).toBe(false);
  });

  it('should cut a loaf into slices and decrement unsliced count', () => {
    component.cutLoaf(2, '#2563eb');
    expect(component.unslicedLoaves()).toBe(2);
    expect(component.availableSlices().length).toBe(2);
    expect(component.availableSlices()[0].label).toBe('1/2');
    expect(component.availableSlices()[0].fraction).toBe(0.5);
  });

  it('should dispatch slice to worker and allow returning it', () => {
    component.cutLoaf(2, '#2563eb');
    const slice = component.availableSlices()[0];

    component.giveSliceToWorker(slice.id, 1);
    expect(component.availableSlices().length).toBe(1);
    expect(component.baskets()[0].slices.length).toBe(1);
    expect(component.baskets()[0].slices[0].id).toBe(slice.id);

    component.returnSlice(slice, 1);
    expect(component.baskets()[0].slices.length).toBe(0);
    expect(component.availableSlices().length).toBe(2);
  });

  it('should detect duplicate fractions in a worker basket', () => {
    component.cutLoaf(10, '#059669');
    const slice1 = component.availableSlices()[0];
    const slice2 = component.availableSlices()[1];

    component.giveSliceToWorker(slice1.id, 1);
    component.giveSliceToWorker(slice2.id, 1);

    const worker1Summary = component.basketSums()[0];
    expect(worker1Summary.hasDuplicates).toBe(true);
    expect(worker1Summary.valid).toBe(false);
  });

  it('should subdivide a half slice into five tenths', () => {
    component.cutLoaf(2, '#2563eb');
    const halfSlice = component.availableSlices()[0];

    component.subdivideHalf(halfSlice.id);
    expect(component.availableSlices().length).toBe(6); // 1 half + 5 tenths
    const tenths = component.availableSlices().filter((s) => s.label === '1/10');
    expect(tenths.length).toBe(5);
  });

  it('should achieve solved equilibrium with Ahmes distribution', () => {
    component.autoSolveAhmes();
    fixture.detectChanges();

    expect(component.isSolved()).toBe(true);
    expect(component.unslicedLoaves()).toBe(0);
    expect(component.availableSlices().length).toBe(0);

    const sums = component.basketSums();
    for (const b of sums) {
      expect(b.valid).toBe(true);
      expect(b.isExact).toBe(true);
      expect(b.hasDuplicates).toBe(false);
    }

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.solved-banner')).toBeTruthy();
  });

  it('should reset pantry and worker baskets to initial state', () => {
    component.autoSolveAhmes();
    expect(component.isSolved()).toBe(true);

    component.reset();
    expect(component.unslicedLoaves()).toBe(3);
    expect(component.availableSlices().length).toBe(0);
    expect(component.baskets().every((b) => b.slices.length === 0)).toBe(true);
    expect(component.isSolved()).toBe(false);
  });
});
