import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SmallProfile } from '../../models/small-profile.model';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
})
export class ResultCardComponent implements OnInit {
  public imageUrl = 'fka';
  public id = uuid();

  @Input() profile: SmallProfile;

  ngOnInit() {
    const element = document.getElementById(this.id);
    if (element) {
      element.addEventListener('error', () => {
        this.imageUrl = 'assets/images/blank-profile-photo.jpg';
      });
    }
    this.getPhoto();
  }

  getPhoto(): void {
    if (this.profile) {
      this.imageUrl = ImageUtils.buildS3Url(this.profile.profileLargeAwsKey);
    }
  }

  onImageErr(event: any): void {
    this.imageUrl = 'assets/images/blank-profile-photo.jpg';
  }
}
