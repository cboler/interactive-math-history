import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { BalanceScaleComponent } from './balance-scale.component';

describe('BalanceScaleComponent', () => {
  let component: BalanceScaleComponent;
  let componentRef: ComponentRef<BalanceScaleComponent>;
  let fixture: ComponentFixture<BalanceScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BalanceScaleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceScaleComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create and default to balanced 5 = 5', () => {
    expect(component).toBeTruthy();
    expect(component.a()).toBe(5);
    expect(component.b()).toBe(5);
    expect(component.tilt()).toBe(0);
    expect(component.isBalanced()).toBe(true);
    expect(component.speechSummary()).toContain('equilibrium');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.equilibrium-badge')).toBeTruthy();
  });

  it('should compute tilt correctly and clamp at +/- 15 degrees', () => {
    componentRef.setInput('a', 3);
    componentRef.setInput('b', 7);
    fixture.detectChanges();
    // (7 - 3) * 3 = 12
    expect(component.tilt()).toBe(12);
    expect(component.isBalanced()).toBe(false);

    // Clamping test: right heavier
    componentRef.setInput('a', 1);
    componentRef.setInput('b', 10);
    fixture.detectChanges();
    expect(component.tilt()).toBe(15);
    expect(component.speechSummary()).toContain('tipped toward right pan');

    // Clamping test: left heavier
    componentRef.setInput('a', 10);
    componentRef.setInput('b', 1);
    fixture.detectChanges();
    expect(component.tilt()).toBe(-15);
    expect(component.speechSummary()).toContain('tipped toward left pan');
  });

  it('should generate token arrays matching input counts', () => {
    componentRef.setInput('a', 4);
    componentRef.setInput('b', 6);
    fixture.detectChanges();

    expect(component.leftTokens().length).toBe(4);
    expect(component.rightTokens().length).toBe(6);
  });
});
