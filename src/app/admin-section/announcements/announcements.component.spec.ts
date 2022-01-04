import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsComponent } from './announcements.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AnnouncementService } from '../../services/announcement-service/announcement.service';
import { AnnouncementMockService } from '../../services/announcement-service/announcement.mock.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

describe('AnnouncementsComponent', () => {
  let component: AnnouncementsComponent;
  let fixture: ComponentFixture<AnnouncementsComponent>;

  let announcementService: AnnouncementService = new AnnouncementMockService();
  let router: Router;

  let titleInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementsComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [{ provide: AnnouncementService, useValue: announcementService }],
    }).compileComponents();
    announcementService = TestBed.inject(AnnouncementService);
    spyOn(announcementService, 'getAnnouncements').and.callThrough();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleInput = fixture.debugElement.nativeElement.querySelector('#announcement-title-field');
    submitButton = fixture.debugElement.nativeElement.querySelector('.submit-button');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch past announcements on page load', () => {
    expect(announcementService.getAnnouncements).toHaveBeenCalled();
    expect(component.pastAnnouncements.length).toBeGreaterThan(0);
  });
  it('when user types into box, it should show a preview announcement', () => {
    spyOn(component, 'updatePreview').and.callThrough();
    titleInput.value = 'title';
    titleInput.dispatchEvent(new Event('input'));
    expect(component.announcement).toBeTruthy();
    expect(component.updatePreview).toHaveBeenCalled();
  });
  it('should not be able to submit new announcement if over character limit.', () => {
    let s = '';
    for (let i = 0; i < component.characterLimit + 1; i++) {
      s += 'a';
    }
    component.richText = s;
    spyOn(announcementService, 'postAnnouncement').and.callThrough();
    component.title = 'Test Title';
    submitButton.click();
    expect(announcementService.postAnnouncement).toHaveBeenCalledTimes(0);
  });
  it('should refresh the page if announcement is successfully posted', () => {
    spyOn(router, 'navigateByUrl');
    spyOn(announcementService, 'postAnnouncement').and.callThrough();
    component.title = 'Title';
    component.richText = 'Rich text';
    submitButton.click();
    expect(announcementService.postAnnouncement).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalled();
  });
  it('should not refresh page if error encountered while submitting', () => {
    spyOn(router, 'navigateByUrl');
    spyOn(announcementService, 'postAnnouncement').and.returnValue(throwError(''));
    component.title = 'Title';
    component.richText = 'Rich text';
    submitButton.click();
    expect(announcementService.postAnnouncement).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
  });
  it('submit button should not be available while posting', () => {
    spyOn(component, 'reloadPage');
    spyOn(announcementService, 'postAnnouncement').and.callThrough();
    component.title = 'Title';
    component.richText = 'Rich text';
    submitButton.click();
    expect(announcementService.postAnnouncement).toHaveBeenCalled();
    expect(component.attemptingToPost).toBeTrue();
  });
  it('submit button should be available after failure', () => {
    spyOn(router, 'navigateByUrl');
    spyOn(announcementService, 'postAnnouncement').and.returnValue(throwError(''));
    component.title = 'Title';
    component.richText = 'Rich text';
    submitButton.click();
    expect(announcementService.postAnnouncement).toHaveBeenCalled();
    expect(component.attemptingToPost).toBeFalse();
  });
});
