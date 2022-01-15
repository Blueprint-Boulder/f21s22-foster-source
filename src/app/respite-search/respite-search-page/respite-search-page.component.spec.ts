import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiteSearchPageComponent } from './respite-search-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { ProfileService } from "../../services/profile-service/profile.service";
import { ProfileMockService } from "../../services/profile-service/profile.mock.service";

describe('RespiteSearchPageComponent', () => {
  let component: RespiteSearchPageComponent;
  let fixture: ComponentFixture<RespiteSearchPageComponent>;

  let profileService: ProfileService = new ProfileMockService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiteSearchPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [{provide: ProfileService, useValue: profileService}]
    })
    .compileComponents();
    profileService = TestBed.inject(ProfileService);
    spyOn(profileService, 'getProfiles').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespiteSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get search results on load', async () => {
    expect(profileService.getProfiles).toHaveBeenCalled();
    fixture.detectChanges();
    fixture.whenStable().then(()=> {
      expect(component.results.length).toBeGreaterThan(0);
    })
  })
  it('should get new search results and scroll to top on page change', async () => {
    spyOn(component, "getSearchResults");
    component.changePage(2);
    expect(component.getSearchResults).toHaveBeenCalled();
    expect(component.resultPage).toEqual(2);
  })
});
