import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdBackgroundFiltersComponent } from './household-background-filters.component';

describe('HouseholdBackgroundFiltersComponent', () => {
  let component: HouseholdBackgroundFiltersComponent;
  let fixture: ComponentFixture<HouseholdBackgroundFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseholdBackgroundFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdBackgroundFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
