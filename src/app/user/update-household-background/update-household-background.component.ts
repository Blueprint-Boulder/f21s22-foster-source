import { HouseholdBackground, UpdateHouseholdBackground } from '../../models/profile.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastPresets } from '../../models/toast.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-household-background',
  templateUrl: './update-household-background.component.html',
  styleUrls: ['./update-household-background.component.scss'],
})
export class UpdateHouseholdBackgroundComponent implements OnInit {
  public currentHouseholdBackground: HouseholdBackground;
  public updateHouseholdBackgroundForm: FormGroup;
  public submittingForm = false;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router
  ) {
    this.updateHouseholdBackgroundForm = this.formBuilder.group({
      parentalUnitSize: [null],
      householdSize: [null],
      childrenInHousehold: [null],
      childrenInfo: [null],
      vehicleAccess: [null],
      lgbtCareExperience: [null],
      caredForPhysDisabled: [null],
      caredForIntelDisabled: [null],
      caredForMedicallyFragile: [null],
      ownsFirearm: [null],
      petInfo: [null],
      additionalDetails: [null],
    });
  }

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      this.currentHouseholdBackground = profile.householdBackground;
    });
  }

  onSubmit(): void {
    if (this.updateHouseholdBackgroundForm.invalid) {
      this.updateHouseholdBackgroundForm.markAllAsTouched();
    } else {
      this.submittingForm = true;

      const req: UpdateHouseholdBackground = {
        parentalUnitSize:
          this.updateHouseholdBackgroundForm.get('parentalUnitSize')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('parentalUnitSize')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('parentalUnitSize')!.value,
        householdSize:
          this.updateHouseholdBackgroundForm.get('householdSize')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('householdSize')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('householdSize')!.value,
        childrenInHousehold:
          this.updateHouseholdBackgroundForm.get('childrenInHousehold')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('childrenInHousehold')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('childrenInHousehold')!.value,
        childrenInfo:
          this.updateHouseholdBackgroundForm.get('childrenInfo')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('childrenInfo')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('childrenInfo')!.value,
        vehicleAccess:
          this.updateHouseholdBackgroundForm.get('vehicleAccess')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('vehicleAccess')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('vehicleAccess')!.value,
        lgbtCareExperience:
          this.updateHouseholdBackgroundForm.get('lgbtCareExperience')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('lgbtCareExperience')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('lgbtCareExperience')!.value,
        caredForPhysDisabled:
          this.updateHouseholdBackgroundForm.get('caredForPhysDisabled')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('caredForPhysDisabled')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('caredForPhysDisabled')!.value,
        caredForIntelDisabled:
          this.updateHouseholdBackgroundForm.get('caredForIntelDisabled')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('caredForIntelDisabled')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('caredForIntelDisabled')!.value,
        caredForMedicallyFragile:
          this.updateHouseholdBackgroundForm.get('caredForMedicallyFragile')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('caredForMedicallyFragile')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('caredForMedicallyFragile')!.value,
        ownsFirearm:
          this.updateHouseholdBackgroundForm.get('ownsFirearm')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('ownsFirearm')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('ownsFirearm')!.value,
        petInfo:
          this.updateHouseholdBackgroundForm.get('petInfo')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('petInfo')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('petInfo')!.value,
        additionalDetails:
          this.updateHouseholdBackgroundForm.get('additionalDetails')!.value === '' ||
          this.updateHouseholdBackgroundForm.get('additionalDetails')!.value === null
            ? undefined
            : this.updateHouseholdBackgroundForm.get('additionalDetails')!.value,
      };

      this.profileService.updateHouseholdBackground(req).subscribe(
        (res) => {
          this.toastService.show({
            body: 'Successfully updated household background',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate([`/user/${res.id}`]);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}
