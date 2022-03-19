import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullProfileRes } from '../../models/get-profile-by-id.models';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile-photo',
  templateUrl: './update-profile-photo.component.html',
  styleUrls: ['./update-profile-photo.component.scss'],
})
export class UpdateProfilePhotoComponent implements OnInit {
  public profileImgSrc = 'assets/images/blank-profile-photo.jpg';
  public currentProfile: FullProfileRes;
  public imgKey: string;

  constructor(private profileService: ProfileService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe(
      (res) => {
        this.currentProfile = res;
        this.profileImgSrc = this.getProfileSrc();
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  getProfileSrc(): string {
    return ImageUtils.buildS3Url(this.currentProfile.profileLargeAwsKey);
  }

  onImgError(event: any): void {
    this.profileImgSrc = 'assets/images/blank-profile-photo.jpg';
  }

  imageUploaded(event: string): void {
    this.imgKey = event;
    this.profileService.updateProfileImgKey(event).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Successfully updated your profile photo.', '/user');
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }
}
