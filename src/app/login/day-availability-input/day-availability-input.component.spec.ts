import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAvailabilityInputComponent } from './day-availability-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('DayAvailabilityInputComponent', () => {
  let component: DayAvailabilityInputComponent;
  let fixture: ComponentFixture<DayAvailabilityInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAvailabilityInputComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAvailabilityInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
