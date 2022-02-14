import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullProfileRes, RespiteProviderInfoRes } from 'src/app/models/get-profile-by-id.models';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { SimpleAvailability } from '../../models/availability.model';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { FormUtils } from '../../common/utils/FormUtils';
import { ProfileUtils } from '../../common/utils/ProfileUtils';
import { AvailabilityService } from '../../services/availability-service/availability.service';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.scss'],
})
export class PublicUserPageComponentComponent implements OnInit {
  public selectedProfile: FullProfileRes;
  public availability: SimpleAvailability;
  public isOwnProfile = false;
  public profileImgSrc = 'assets/images/blank-profile-photo.jpg';

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private toastService: ToastService,
    private config: NgbAccordionConfig,
    private availabilityService: AvailabilityService
  ) {
    config.closeOthers = true;
    config.type = 'light';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.profileService.getCurrentProfile().subscribe(
          (p) => {
            this.selectedProfile = p;
            this.isOwnProfile = true;
            this.profileImgSrc = this.getProfileSrc();
            this.getAvailability();
          },
          (err) => {
            this.toastService.httpError(err);
          }
        );
      } else {
        this.profileService.getProfileById(id).subscribe(
          (p: FullProfileRes) => {
            this.selectedProfile = p;
            this.getAvailability();
            this.profileImgSrc = this.getProfileSrc();
          },
          (err) => {
            this.toastService.httpError(err);
          }
        );
      }
    });
  }

  public getAge(): number {
    const now = new Date().getFullYear();
    return now - this.selectedProfile.dob.getFullYear();
  }

  private getAvailability(): void {
    const avail = ProfileUtils.getAvailabilities(this.selectedProfile, this.availabilityService);
    if (!avail) {
      return;
    }
    this.availability = avail;
  }

  openPrimaryContactModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'modal-background',
    });
  }

  getProfileSrc(): string {
    console.log('getting');
    return ImageUtils.buildS3Url(this.selectedProfile.profileLargeAwsKey);
  }

  onImgError(event: any): void {
    console.log('wtf');
    this.profileImgSrc = 'assets/images/blank-profile-photo.jpg';
  }

  formatPhoneNumber(pn: string): string {
    return FormUtils.prettifyValidPhoneNumber(pn);
  }
}
