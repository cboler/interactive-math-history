import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogicCircuitComponent } from './logic-circuit.component';
import { FeedbackService } from '../../../core/services/feedback.service';

describe('LogicCircuitComponent', () => {
  let component: LogicCircuitComponent;
  let fixture: ComponentFixture<LogicCircuitComponent>;
  let feedbackService: FeedbackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogicCircuitComponent],
      providers: [FeedbackService],
    }).compileComponents();

    fixture = TestBed.createComponent(LogicCircuitComponent);
    component = fixture.componentInstance;
    feedbackService = TestBed.inject(FeedbackService);
    fixture.detectChanges();
  });

  it('should initialize with AND gate, P=true, Q=false, and lamp extinguished', () => {
    expect(component).toBeTruthy();
    expect(component.gateType()).toBe('AND');
    expect(component.switchP()).toBe(true);
    expect(component.switchQ()).toBe(false);
    expect(component.isLit()).toBe(false);
  });

  it('should only illuminate lamp in AND mode when both switches are true', () => {
    component.setGateType('AND');

    // Case 1: T / F -> False
    component.switchP.set(true);
    component.switchQ.set(false);
    expect(component.isLit()).toBe(false);

    // Case 2: F / T -> False
    component.switchP.set(false);
    component.switchQ.set(true);
    expect(component.isLit()).toBe(false);

    // Case 3: F / F -> False
    component.switchP.set(false);
    component.switchQ.set(false);
    expect(component.isLit()).toBe(false);

    // Case 4: T / T -> True
    component.switchP.set(true);
    component.switchQ.set(true);
    expect(component.isLit()).toBe(true);
  });

  it('should illuminate lamp in OR mode when either switch is true', () => {
    component.setGateType('OR');

    // Case 1: F / F -> False
    component.switchP.set(false);
    component.switchQ.set(false);
    expect(component.isLit()).toBe(false);

    // Case 2: T / F -> True
    component.switchP.set(true);
    component.switchQ.set(false);
    expect(component.isLit()).toBe(true);

    // Case 3: F / T -> True
    component.switchP.set(false);
    component.switchQ.set(true);
    expect(component.isLit()).toBe(true);

    // Case 4: T / T -> True
    component.switchP.set(true);
    component.switchQ.set(true);
    expect(component.isLit()).toBe(true);
  });

  it('should correctly compute truth table rows and mark active row', () => {
    component.setGateType('AND');
    component.switchP.set(true);
    component.switchQ.set(false);

    let rows = component.truthTableRows();
    expect(rows.length).toBe(4);

    // Row 1: T / T -> Output: T, isActive: false
    expect(rows[0]).toEqual({ p: true, q: true, output: true, isActive: false });
    // Row 2: T / F -> Output: F, isActive: true
    expect(rows[1]).toEqual({ p: true, q: false, output: false, isActive: true });
    // Row 3: F / T -> Output: F, isActive: false
    expect(rows[2]).toEqual({ p: false, q: true, output: false, isActive: false });
    // Row 4: F / F -> Output: F, isActive: false
    expect(rows[3]).toEqual({ p: false, q: false, output: false, isActive: false });

    // Switch to OR
    component.setGateType('OR');
    rows = component.truthTableRows();
    // In OR mode, Row 2 (T / F) output should now be true
    expect(rows[1]).toEqual({ p: true, q: false, output: true, isActive: true });
  });

  it('should trigger audio and haptic feedback on switch toggle and lit transition', () => {
    const tickSpy = vi.spyOn(feedbackService, 'tick');
    const lightTapSpy = vi.spyOn(feedbackService, 'lightTap');
    const chimeSpy = vi.spyOn(feedbackService, 'equilibriumChime');
    const pulseSpy = vi.spyOn(feedbackService, 'successPulse');

    // Current state: P=true, Q=false, AND gate. Lamp is NOT lit.
    expect(component.isLit()).toBe(false);

    // Toggling Q from false to true should close AND circuit and illuminate lamp
    component.toggleSwitchQ();
    expect(component.switchQ()).toBe(true);
    expect(component.isLit()).toBe(true);

    expect(tickSpy).toHaveBeenCalled();
    expect(lightTapSpy).toHaveBeenCalled();
    expect(chimeSpy).toHaveBeenCalled();
    expect(pulseSpy).toHaveBeenCalled();
  });

  it('should trigger snapWhoosh on gate type change', () => {
    const whooshSpy = vi.spyOn(feedbackService, 'snapWhoosh');
    component.setGateType('OR');
    expect(component.gateType()).toBe('OR');
    expect(whooshSpy).toHaveBeenCalled();
  });

  it('should generate accurate live announcement for screen readers', () => {
    component.setGateType('AND');
    component.switchP.set(true);
    component.switchQ.set(false);

    expect(component.liveAnnouncement()).toBe(
      'Statement P is True, Statement Q is False. Gate AND. Lamp is Extinguished.',
    );

    component.switchQ.set(true);
    expect(component.liveAnnouncement()).toBe(
      'Statement P is True, Statement Q is True. Gate AND. Lamp is Lit.',
    );
  });
});
