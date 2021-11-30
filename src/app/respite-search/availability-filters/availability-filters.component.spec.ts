import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityFiltersComponent } from './availability-filters.component';

describe('AvailabilityFiltersComponent', () => {
  let component: AvailabilityFiltersComponent;
  let fixture: ComponentFixture<AvailabilityFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
