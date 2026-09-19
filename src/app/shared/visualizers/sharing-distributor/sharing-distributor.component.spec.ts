import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { SharingDistributorComponent } from './sharing-distributor.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('SharingDistributorComponent', () => {
  let component: SharingDistributorComponent;
  let componentRef: ComponentRef<SharingDistributorComponent>;
  let fixture: ComponentFixture<SharingDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharingDistributorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharingDistributorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create with default total=12 and groups=3', () => {
    expect(component).toBeTruthy();
    expect(component.totalCount()).toBe(12);
    expect(component.groupCount()).toBe(3);
    expect(component.itemsPerGroup()).toBe(4);
    expect(component.remainder()).toBe(0);
    expect(component.isEquitable()).toBe(true);
    expect(component.groupIndices().length).toBe(3);
    expect(component.distributedItems().length).toBe(4);
    expect(component.remainderItems().length).toBe(0);
    expect(component.speechSummary()).toContain('12 shared among 3 gives 4 each equally.');
  });

  it('should render correct number of basket cards and distributed tokens', () => {
    const el = fixture.nativeElement as HTMLElement;
    const baskets = el.querySelectorAll('.basket-card');
    expect(baskets.length).toBe(3);

    const firstBasketTokens = baskets[0].querySelectorAll('.token');
    expect(firstBasketTokens.length).toBe(4);

    expect(el.querySelector('.remainder-pool')).toBeFalsy();
    expect(el.querySelector('.status-banner')?.classList.contains('success')).toBe(true);
  });

  it('should handle non-equitable division with remainder', () => {
    componentRef.setInput('total', 14);
    componentRef.setInput('groups', 3);
    fixture.detectChanges();

    expect(component.itemsPerGroup()).toBe(4);
    expect(component.remainder()).toBe(2);
    expect(component.isEquitable()).toBe(false);
    expect(component.remainderItems().length).toBe(2);
    expect(component.speechSummary()).toContain('14 shared among 3 gives 4 each with 2 left over.');

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.status-banner')?.classList.contains('warning')).toBe(true);
    const remainderPool = el.querySelector('.remainder-pool');
    expect(remainderPool).toBeTruthy();
    const remainderTokens = remainderPool?.querySelectorAll('.leftover-token');
    expect(remainderTokens?.length).toBe(2);
  });

  it('should safely guard against zero or negative group counts', () => {
    componentRef.setInput('groups', 0);
    fixture.detectChanges();
    expect(component.groupCount()).toBe(1);
    expect(component.itemsPerGroup()).toBe(12);
    expect(component.remainder()).toBe(0);
  });

  it('should trigger feedback when total or groups are modified', async () => {
    const feedback = fixture.debugElement.injector.get(FeedbackService);
    const tickSpy = vi.spyOn(feedback, 'tick');

    componentRef.setInput('total', 15);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(tickSpy).toHaveBeenCalled();
  });
});
