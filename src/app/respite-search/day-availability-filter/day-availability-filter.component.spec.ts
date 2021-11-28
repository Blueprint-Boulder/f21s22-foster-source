import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayAvailabilityFilterComponent } from './day-availability-filter.component';

describe('DayAvailabilityFilterComponent', () => {
  let component: DayAvailabilityFilterComponent;
  let fixture: ComponentFixture<DayAvailabilityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayAvailabilityFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayAvailabilityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
