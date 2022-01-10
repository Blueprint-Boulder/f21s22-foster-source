import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { SmallProfile } from '../../models/small-profile.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  @Input() profiles: SmallProfile[];
  @Input() searching: boolean;
  ngOnInit(): void {
    return;
  }
}
