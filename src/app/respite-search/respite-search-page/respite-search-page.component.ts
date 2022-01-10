import { Component, OnInit } from '@angular/core';
import { GetProfilesRes } from '../../models/profile.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { FiltersReq } from '../../models/filters.model';
import { SmallProfile } from '../../models/small-profile.model';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-respite-search-page',
  templateUrl: './respite-search-page.component.html',
  styleUrls: ['./respite-search-page.component.scss'],
})
export class RespiteSearchPageComponent implements OnInit {
  public results: SmallProfile[];
  public totalResults: number;
  public resultPage = 1;
  public resultsPerPage = 25;
  public filtersHidden = true;
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
    this.filtersHidden = true;
  }

  openNav() {
    this.filtersHidden = false;
  }

  changePage(newPage: number): void {
    this.scrollToTop();
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

  private scrollToTop(): void {
    (function smoothScroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0, currentScroll - currentScroll / 8);
      }
    })();
  }
}
