import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnnouncementsComponent } from './all-announcements.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { AnnouncementMockService } from '../../services/announcement-service/announcement.mock.service';

describe('AllAnnouncementsComponent', () => {
  let component: AllAnnouncementsComponent;
  let fixture: ComponentFixture<AllAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AllAnnouncementsComponent],
      providers: [{ provide: AnnouncementService, useValue: new AnnouncementMockService() }],
    }).compileComponents();
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
