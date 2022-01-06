import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import {HttpClientModule} from "@angular/common/http";
import {TOAST_CONFIG, ToastrModule, ToastrService} from "ngx-toastr";
import { AnnouncementService } from "../../services/announcement-service/announcement.service";
import { AnnouncementMockService } from "../../services/announcement-service/announcement.mock.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  let announcementService: AnnouncementService = new AnnouncementMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: AnnouncementService, useValue: announcementService}]
    })
    .compileComponents();
    announcementService = TestBed.inject(AnnouncementService);
    spyOn(announcementService, 'getLatestAnnouncement').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show recent announcement on page load if one exists', () => {
    expect(announcementService.getLatestAnnouncement).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement.querySelector('.announcement-row')).toBeTruthy();
  });
  it('should not show recent announcement if none shown', () => {
    //@ts-ignore
    component.latestAnnouncement = undefined;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.querySelector('.announcement-row')).toBeFalsy();
    });
  });
});
