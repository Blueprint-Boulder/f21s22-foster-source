import { Component, EventEmitter, OnInit } from '@angular/core';
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
  public resultsPerPage = 15;
  public filtersHidden = true;
  public filtersReq: FiltersReq | undefined;
  public searchTerm = '';
  public searching = true;
  public filterResetEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private profileService: ProfileService, private toastService: ToastService) {}

  ngOnInit(): void {
    const storedFilters = localStorage.getItem('filters');
    if (storedFilters !== null) {
      this.setFilters(JSON.parse(storedFilters));
    } else {
      this.getSearchResults();
    }
  }

  getSearchResults(): void {
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

  closeNav(): void {
    this.filtersHidden = true;
  }

  openNav(): void {
    this.filtersHidden = false;
  }

  changePage(newPage: number): void {
    this.scrollToTop();
    this.resultPage = newPage;
    this.getSearchResults();
  }

  setFilters(filters: FiltersReq): void {
    let isFilter = false;
    Object.keys(filters).forEach((k) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (filters[k] !== undefined) {
        isFilter = true;
      }
    });

    this.filtersHidden = true;

    if (!isFilter) {
      this.filtersReq = undefined;
      localStorage.removeItem('filters');
    } else {
      this.filtersReq = filters;
      localStorage.setItem('filters', JSON.stringify(this.filtersReq));
    }
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

  clearFilters(): void {
    this.filtersReq = undefined;
    this.filtersHidden = true;
    this.filterResetEmitter.emit();
    localStorage.removeItem('filters');
    this.getSearchResults();
  }
}
