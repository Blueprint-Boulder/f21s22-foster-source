import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementComponent } from './announcement.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { AnnouncementMockService } from '../../services/announcement-service/announcement.mock.service';
import { announcements } from '../../mock/database-entities';
import { AuthService } from '../../services/auth-service/auth.service';
import { Cookie } from '../../models/account.model';

describe('AnnouncementComponent', () => {
  let component: AnnouncementComponent;
  let fixture: ComponentFixture<AnnouncementComponent>;

  let announcementService: AnnouncementService = new AnnouncementMockService();
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AnnouncementService, useValue: announcementService }],
    }).compileComponents();
    announcementService = TestBed.inject(AnnouncementService);
    authService = TestBed.inject(AuthService);
    const mockCookie: Cookie = {
      exp: 99999999,
      iat: 0,
      id: 0,
      privilegeLevel: 2,
    };
    spyOn(authService, 'getToken').and.returnValue(mockCookie);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementComponent);
    component = fixture.componentInstance;
    component.announcement = announcements[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the announcement if available', () => {
    expect(fixture.debugElement.nativeElement.querySelector('.display-announcement')).toBeTruthy();
  });
  it('if >= mod, display edit and delete buttons', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.edit-footer')).toBeTruthy();
    });
  });
  it('clicking delete should call backend and clear current announcement', () => {
    spyOn(announcementService, 'deleteAnnouncement').and.callThrough();
    component.deleteAnnouncement();
    expect(announcementService.deleteAnnouncement).toHaveBeenCalled();
    expect(component.announcement).toBeUndefined();
  });
  it('clicking edit should display edit forms', () => {
    component.editMode = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.edit-announcement')).toBeTruthy();
    });
  });
  it('clicking save should call update announcement', () => {
    spyOn(announcementService, 'updateAnnouncement').and.callThrough();
    component.editMode = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.edit-announcement')).toBeTruthy();
      component.updateAnnouncement();
      expect(announcementService.updateAnnouncement).toHaveBeenCalled();
    });
  });
  it('clicking cancel should restore the previous values', () => {
    spyOn(announcementService, 'updateAnnouncement').and.callThrough();
    component.editMode = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.edit-announcement')).toBeTruthy();
      component.announcement!.title = 'test';
      component.cancelEditMode();
      expect(component.announcement!.title).toEqual(announcements[0].title);
    });
  });
});
