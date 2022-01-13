import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTempAvailabilityComponent } from './modify-temp-availability.component';

describe('ModifyTempAvailabilityComponent', () => {
  let component: ModifyTempAvailabilityComponent;
  let fixture: ComponentFixture<ModifyTempAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyTempAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTempAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
