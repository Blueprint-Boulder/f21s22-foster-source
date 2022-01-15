import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAvailabilityInputComponent, DayModel } from './day-availability-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DayAvailabilityInputComponent', () => {
  let component: DayAvailabilityInputComponent;
  let fixture: ComponentFixture<DayAvailabilityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayAvailabilityInputComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAvailabilityInputComponent);
    component = fixture.componentInstance;

    component.dayModel = {
      name: 'Testday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('checking morning box should change morning in daymodel', () => {
    const morningCheckControl: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      `#morningCheck${component.dayModel.name}`
    );
    expect(component.dayModel.morning).toBeFalse();
    morningCheckControl.click();
    expect(component.dayModel.morning).toBeTrue();
  });
  it('checking afternoon box should change afternoon in daymodel', () => {
    const afternoonCheckControl: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      `#afternoonCheck${component.dayModel.name}`
    );
    expect(component.dayModel.afternoon).toBeFalse();
    afternoonCheckControl.click();
    expect(component.dayModel.afternoon).toBeTrue();
  });
  it('checking evening box should change evening in daymodel', () => {
    const eveningCheckControl: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      `#eveningCheck${component.dayModel.name}`
    );
    expect(component.dayModel.evening).toBeFalse();
    eveningCheckControl.click();
    expect(component.dayModel.evening).toBeTrue();
  });
  it('checking overnight box should change overnight in daymodel', () => {
    const overnightCheckControl: HTMLInputElement = fixture.debugElement.nativeElement.querySelector(
      `#overnightCheck${component.dayModel.name}`
    );
    expect(component.dayModel.overnight).toBeFalse();
    overnightCheckControl.click();
    expect(component.dayModel.overnight).toBeTrue();
  });
});
