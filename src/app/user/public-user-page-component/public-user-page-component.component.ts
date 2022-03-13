import { AvailabilityService } from '../../services/availability-service/availability.service';
import { BlacklistService } from '../../services/blacklist-service/blacklist.service';
import { Availability, SimpleAvailability } from '../../models/availability.model';
import { ProfileService } from 'src/app/services/profile-service/profile.service';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service/toast.service';
import { FullProfileRes } from 'src/app/models/get-profile-by-id.models';
import { AuthService } from '../../services/auth-service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileUtils } from '../../common/utils/ProfileUtils';
import { ImageUtils } from '../../common/utils/ImageUtils';
import { FormUtils } from '../../common/utils/FormUtils';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.scss'],
})
export class PublicUserPageComponentComponent implements OnInit {
  public selectedProfile: FullProfileRes;
  public availability: SimpleAvailability;
  public isOwnProfile = false;
  public isAvailable = false;
  public profileImgSrc = 'assets/images/blank-profile-photo.jpg';

  // TODO: FOR TREVOR
  public reportDescription: string; // SHOULD BE ASSIGNED TO THE MODAL'S [(ngModel)]
  public submittingReport = false; // Used to disable the button when developing

  // TODO: FOR TAHIRA
  public banForm: FormGroup; // SET AS FORM GROUP (note that the names are different than in the thread-reply example!)
  public shouldShowSuspendForm = false; // When the user chooses to suspend, another text field pops up that asks how long they'd like to suspend for
  public submittingBan = false; // Used for disabling the button when waiting on the network call to ban the user
  public isMod = false;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private toastService: ToastService,
    private config: NgbAccordionConfig,
    private availabilityService: AvailabilityService,
    private blacklistService: BlacklistService,
    private formBuilder: FormBuilder,
    private authService: AuthService
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
            console.log(p);
            this.selectedProfile = p;
            this.isOwnProfile = true;
            this.profileImgSrc = this.getProfileSrc();
            this.getAvailability();
            this.isMod = this.authService.isAtLeastMod();
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

    this.checkIsAvailable(avail);
  }

  private checkIsAvailable(avail: Availability): void {
    this.isAvailable =
      avail.monday.includes(true) ||
      avail.tuesday.includes(true) ||
      avail.wednesday.includes(true) ||
      avail.thursday.includes(true) ||
      avail.friday.includes(true) ||
      avail.saturday.includes(true) ||
      avail.sunday.includes(true);
  }

  openPrimaryContactModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdropClass: 'modal-background',
    });
  }

  getProfileSrc(): string {
    return ImageUtils.buildS3Url(this.selectedProfile.profileLargeAwsKey);
  }

  onImgError(event: any): void {
    this.profileImgSrc = 'assets/images/blank-profile-photo.jpg';
  }

  formatPhoneNumber(pn: string): string {
    return FormUtils.prettifyValidPhoneNumber(pn);
  }

  // TODO: FOR BOTH: the openModal and form reset functions have been provided!

  // TODO: TREVOR
  reportProfile(): void {
    // thread-reply.component.ts line 182
    // Utilize this.profileService.reportProfile
    // on success, use toast service to say successful, then close modal
  }

  // TODO: TAHIRA
  // TODO: Look at the resetForm function: your form is instantiated there.
  moderateProfile(): void {
    // check if form is invalid
    // if valid
    // determine if they've chosen to blacklist
    // if they want to blacklist, confirm! thread-reply.component.ts line 237
    // if they confirm, utilize this.blacklistService.blacklistUserByAccountId
    // if they want to suspend, utilize this.blacklistService.suspendUserReq
    // On success of either, show a toastService success message and navigate to /respite
  }

  openModal(modal: any): void {
    this.modalService.open(modal, {
      backdropClass: 'modal-background',
    });
    this.resetForms();
  }

  resetForms(): void {
    this.reportDescription = '';

    this.banForm = this.formBuilder.group({
      reason: [null, Validators.required],
      adminAction: [null, Validators.required],
      suspendForDays: [null, Validators.min(1)],
    });

    this.banForm.get('adminAction')?.valueChanges.subscribe((value) => {
      if (value === 'suspend') {
        this.banForm.get('suspendForDays')?.addValidators(Validators.required);
        this.shouldShowSuspendForm = true;
      } else {
        this.banForm.get('suspendForDays')?.removeValidators(Validators.required);
        this.shouldShowSuspendForm = false;
      }
      this.banForm.get('suspendForDays')?.updateValueAndValidity();
    });
  }

  getLastActiveDate(): string {
    return formatDate(this.selectedProfile.account.lastLogin, 'MM/dd/yyyy', 'en-US');
  }
}
