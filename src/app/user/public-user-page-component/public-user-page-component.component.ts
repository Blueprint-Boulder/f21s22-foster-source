import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FullProfileRes, RespiteProviderInfoRes } from 'src/app/models/get-profile-by-id.models';
import { Profile } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { profileServiceProvider } from 'src/app/services/profile-service/profile.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.scss'],
  providers: [profileServiceProvider],
})
export class PublicUserPageComponentComponent implements OnInit {
  public selectedProfile: FullProfileRes;
  public availability: SimpleAvailability;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private toastService: ToastService,
    private config: NgbAccordionConfig
  ) {
    config.closeOthers = true;
    config.type = 'light';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        // get current profile.
        this.toastService.info('Getting current profile but its not implemented yet.');
        // TODO: Implement getting the current account!
      } else {
        this.profileService.getProfileById(id).subscribe(
          (p: FullProfileRes) => {
            this.selectedProfile = p;
            this.getAvailability();
          },
          (err) => {
            this.toastService.httpError(err);
          }
        );
      }
    });
  }

  public getDistance(): number {
    // TODO: implement real distance!
    return 12.4;
  }

  public getAge(): number {
    const now = new Date().getFullYear();
    return now - this.selectedProfile.dob.getFullYear();
  }

  private getAvailability(): void {
    if (
      !this.selectedProfile.respiteBackground.respiteProviderInfo ||
      !this.selectedProfile.respiteBackground.canProvideRespite
    ) {
      return;
    }

    const providerInfo: RespiteProviderInfoRes = this.selectedProfile.respiteBackground.respiteProviderInfo;

    if (providerInfo.availabilities.length < 1) {
      return;
    }

    const avail = providerInfo.availabilities.find((avail) => avail.type === 'TEMPORARY');

    this.availability = avail ? avail : providerInfo.availabilities[0];
  }

  returnAge(birthday: Date) {
    const now = new Date().getFullYear();
    return now - birthday.getFullYear();
  }

  open(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'modal-background',
    });
  }

  getProfileSrc(): string {
    return ImageUtils.buildS3Url(this.selectedProfile.profileLargeAwsKey);
  }

  formatPhoneNumber(pn: string): string {
    return FormUtils.prettifyValidPhoneNumber(pn);
  }
}
