import { SmallProfile } from '../../models/small-profile.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  @Input() profiles: SmallProfile[];
  @Input() searching: boolean;
}
