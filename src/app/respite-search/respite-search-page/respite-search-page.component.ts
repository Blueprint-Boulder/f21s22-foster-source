import { Component, OnInit, ViewChild } from '@angular/core';
import { GetProfilesRes, Profile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { profileServiceProvider } from '../../services/profile-service/profile.service.provider';
import { FiltersReq } from '../../models/filters.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { SmallProfile } from '../../models/small-profile.model';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-respite-search-page',
  templateUrl: './respite-search-page.component.html',
  styleUrls: ['./respite-search-page.component.scss'],
  providers: [profileServiceProvider],
})
export class RespiteSearchPageComponent implements OnInit {
  public results: SmallProfile[];
  public totalResults: number;
  public resultPage = 1;
  public resultsPerPage = 25;
  public hidden = true;
  public filtersReq: FiltersReq;
  public searchTerm = '';
  public searching = true;

  constructor(private profileService: ProfileService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getSearchResults();
  }

  getSearchResults() {
    this.searching = true;
    this.profileService
      .getProfiles(this.resultsPerPage, (this.resultPage - 1) * this.resultsPerPage, this.filtersReq, this.searchTerm)
      .subscribe(
        (res: GetProfilesRes) => {
          this.results = res.profiles;
          this.totalResults = res.numResults;
          this.searching = false;
        },
        (err) => {
          this.toastService.httpError(err);
          this.searching = false;
        }
      );
  }

  closeNav() {
    this.hidden = true;
  }

  openNav() {
    this.hidden = false;
  }

  changePage(newPage: number): void {
    this.resultPage = newPage;
    this.getSearchResults();
  }

  setFilters(filters: FiltersReq): void {
    this.filtersReq = filters;
    this.getSearchResults();
  }

  searchEvent(term: any) {
    this.searchTerm = term;
    this.getSearchResults();
  }
}
