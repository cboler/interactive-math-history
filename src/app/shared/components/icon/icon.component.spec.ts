import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create and render svg with aria-hidden="true"', () => {
    component.name = 'book';
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
  });

  it('should render chevron-left and chevron-right icons', () => {
    component.name = 'chevron-left';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg path')).toBeTruthy();

    component.name = 'chevron-right';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg path')).toBeTruthy();
  });
});
