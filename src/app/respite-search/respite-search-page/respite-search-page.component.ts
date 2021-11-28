import { Component, OnInit, ViewChild } from '@angular/core';
import { GetProfilesRes, Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { profileServiceProvider } from '../../services/profile-service/profile.service.provider';

@Component({
  selector: 'app-respite-search-page',
  templateUrl: './respite-search-page.component.html',
  styleUrls: ['./respite-search-page.component.scss'],
  providers: [profileServiceProvider],
})
export class RespiteSearchPageComponent implements OnInit {
  public results: Profile[];
  public hidden = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getProfiles(20, 0).subscribe((res: GetProfilesRes) => {
      this.results = res.profiles;
    });
  }

  searchForTerm(term: string): void {
    return;
  }

  closeNav() {
    this.hidden = true;
  }

  openNav() {
    this.hidden = false;
  }
}
