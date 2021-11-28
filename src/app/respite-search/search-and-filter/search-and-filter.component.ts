import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { profileServiceProvider } from '../../services/profile-service/profile.service.provider';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-and-filter',
  templateUrl: './search-and-filter.component.html',
  styleUrls: ['./search-and-filter.component.scss'],
  providers: [profileServiceProvider],
})
export class SearchAndFilterComponent implements OnInit {
  public searchForm = this.formBuilder.group({
    search: [''],
  });

  @Output() searchedTerm: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchedTerm.emit(this.searchForm.get('search')!.value);
  }

  search(): void {
    this.searchedTerm;
  }
}
