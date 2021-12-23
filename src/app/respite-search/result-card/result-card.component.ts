import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../../models/profile.model';
import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { SmallProfile } from '../../models/small-profile.model';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
})
export class ResultCardComponent implements OnInit {
  @Input() profile: SmallProfile;
  ngOnInit(): void {
    return;
  }

  getPhoto() {
    return '/assets/images/blank-profile-photo.jpg';
  }

  getDistance() {
    return 20;
  }
}
