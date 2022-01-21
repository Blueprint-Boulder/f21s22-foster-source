import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityGridComponent } from './availability-grid.component';

describe('AvailabilityGridComponent', () => {
  let component: AvailabilityGridComponent;
  let fixture: ComponentFixture<AvailabilityGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
