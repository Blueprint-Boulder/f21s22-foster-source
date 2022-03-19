import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReportsComponent } from './profile-reports.component';

describe('ProfileReportsComponent', () => {
  let component: ProfileReportsComponent;
  let fixture: ComponentFixture<ProfileReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
