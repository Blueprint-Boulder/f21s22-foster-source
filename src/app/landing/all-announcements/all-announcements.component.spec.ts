import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnnouncementsComponent } from './all-announcements.component';

describe('AllAnnouncementsComponent', () => {
  let component: AllAnnouncementsComponent;
  let fixture: ComponentFixture<AllAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAnnouncementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
