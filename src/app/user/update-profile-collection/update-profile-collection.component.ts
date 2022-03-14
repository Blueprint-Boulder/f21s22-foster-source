import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullProfileRes } from '../../models/get-profile-by-id.models';

@Component({
  selector: 'app-update-profile-collection',
  templateUrl: './update-profile-collection.component.html',
  styleUrls: ['./update-profile-collection.component.scss'],
})
export class UpdateProfileCollectionComponent implements OnInit {
  public currentProfile: FullProfileRes;

  constructor(private profileService: ProfileService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      this.currentProfile = profile;
    }, this.toastService.httpError);
  }
}
