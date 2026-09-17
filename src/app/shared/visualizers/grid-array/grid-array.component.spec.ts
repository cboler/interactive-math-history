import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { GridArrayComponent } from './grid-array.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('GridArrayComponent', () => {
  let component: GridArrayComponent;
  let componentRef: ComponentRef<GridArrayComponent>;
  let fixture: ComponentFixture<GridArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridArrayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridArrayComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create with default rows=3 and cols=5', () => {
    expect(component).toBeTruthy();
    expect(component.rows()).toBe(3);
    expect(component.cols()).toBe(5);
    expect(component.effectiveRows()).toBe(3);
    expect(component.effectiveCols()).toBe(5);
    expect(component.totalDots()).toBe(15);
    expect(component.isTransposed()).toBe(false);
    expect(component.dots().length).toBe(15);
    expect(component.speechSummary()).toContain('3 rows of 5 dots, totaling 15 items');
  });

  it('should toggle transposition and flip dimensions', () => {
    component.toggleTranspose();
    fixture.detectChanges();

    expect(component.isTransposed()).toBe(true);
    expect(component.effectiveRows()).toBe(5);
    expect(component.effectiveCols()).toBe(3);
    expect(component.totalDots()).toBe(15);
    expect(component.dots().length).toBe(15);
    expect(component.speechSummary()).toContain('5 rows of 3 dots, totaling 15 items');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.formula-expression')?.textContent).toContain('5 × 3 = 15 dots');

    // Toggle back
    component.toggleTranspose();
    fixture.detectChanges();
    expect(component.isTransposed()).toBe(false);
    expect(component.effectiveRows()).toBe(3);
    expect(component.effectiveCols()).toBe(5);
  });

  it('should react to input changes for rows and cols', () => {
    componentRef.setInput('rows', 4);
    componentRef.setInput('cols', 6);
    fixture.detectChanges();

    expect(component.totalDots()).toBe(24);
    expect(component.dots().length).toBe(24);
    expect(component.speechSummary()).toContain('4 rows of 6 dots, totaling 24 items');
  });

  it('should trigger feedback on transposition and dimension adjustments', async () => {
    const feedback = fixture.debugElement.injector.get(FeedbackService);
    const snapSpy = vi.spyOn(feedback, 'snapWhoosh');
    const medSnapSpy = vi.spyOn(feedback, 'mediumSnap');
    const tickSpy = vi.spyOn(feedback, 'tick');
    const tapSpy = vi.spyOn(feedback, 'lightTap');

    component.toggleTranspose();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(snapSpy).toHaveBeenCalled();
    expect(medSnapSpy).toHaveBeenCalled();

    // Test dimension change
    componentRef.setInput('rows', 5);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tickSpy).toHaveBeenCalled();
    expect(tapSpy).toHaveBeenCalled();
  });
});
