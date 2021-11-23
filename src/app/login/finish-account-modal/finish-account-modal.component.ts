import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Utils } from '../utils';
import { DayModel } from '../day-availability-input/day-availability-input.component';
import { AvailabilityType, SimpleAvailability } from '../../models/availability.model';
import { AccountService } from '../../services/account-service/account.service';
import { accountServiceProvider } from '../../services/account-service/account.service.provider';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-finish-account-modal',
  templateUrl: './finish-account-modal.component.html',
  styleUrls: ['./finish-account-modal.component.scss'],
  providers: [accountServiceProvider],
})
export class FinishAccountModalComponent implements OnInit {
  public finishProfileForm: FormGroup;
  public hasSecondaryAccountHolder = false;
  public canProvideRespiteCare = false;
  public phoneTypes: string[];
  public needToUploadImgError = false;
  public submitting = false;

  private profileImgKey = '';

  private secondaryAccountHolderFields = [
    'secfname',
    'seclname',
    'secEmail',
    'secPhone',
    'secPhoneType',
    'secGender',
    'secPreferredName',
    'relationshipToPrimary',
  ];

  public dayModels: DayModel[] = [
    {
      name: 'Monday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Tuesday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Wednesday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Thursday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Friday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Saturday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
    {
      name: 'Sunday',
      morning: false,
      afternoon: false,
      evening: false,
      overnight: false,
    },
  ];

  private provideRespiteFields = ['respiteCity', 'respiteRange', 'minAge', 'maxAge', 'howManyCareFor'];

  @Input() account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.phoneTypes = Utils.getPhoneTypes();
  }

  ngOnInit(): void {
    this.finishProfileForm = this.formBuilder.group({
      preferredName: ['', Validators.required],
      gender: ['', Validators.required],
      pronouns: [null],
      maritalStatus: [null],
      secfname: [null],
      seclname: [null],
      secEmail: [null],
      secPhone: [null],
      secPhoneType: [null],
      secPreferredName: [null],
      secPronouns: [null],
      secGender: [null],
      secMaritalStatus: [null],
      relationshipToPrimary: [null],
      fosterYears: [null, Validators.compose([Validators.required])],
      totalChildren: [null, Validators.compose([Validators.required])],
      canProvideRespite: [null, Validators.required],
      lookingForRespite: [null, Validators.required],
      hasProvidedInPast: [null, Validators.required],
      respiteCity: [null],
      respiteRange: [null],
      minAge: [null],
      maxAge: [null],
      howManyCareFor: [null],
      parentalUnitSize: [null, Validators.required],
      householdSize: [null, Validators.required],
      numChildren: [null, Validators.required],
      childrenInfo: [null, Validators.required],
      petInfo: [null],
      vehicleAccess: [null],
      caredForLGBT: [null],
      caredForPhysicallyDisabled: [null],
      caredForIntellectuallyDisabled: [null],
      careForMedicallyFragile: [null],
      ownsFirearm: [null],
      additionalInfo: [null],
      dob: [null, Validators.compose([Validators.required, FinishAccountModalComponent.validateDate])],
    });
  }

  public onSubmit() {
    this.finishProfileForm.updateValueAndValidity();
    if (this.finishProfileForm.invalid) {
      this.finishProfileForm.markAllAsTouched();
      alert('Please complete all required fields (indicated with a red star).');
    } else if (this.profileImgKey.length < 1) {
      this.needToUploadImgError = true;
      alert('Please complete all required fields (indicated with a red star).');
    } else {
      if (this.finishProfileForm.get('canProvideRespite')!.value === true) {
        this.finishProfileForm.addControl('respiteAvailability', new FormControl(this.generateRespiteAvailability()));
      }

      this.finishProfileForm.addControl('photoAWSKey', new FormControl(this.profileImgKey));

      console.log(JSON.stringify(this.finishProfileForm.value));

      this.accountService.completeProfile(this.finishProfileForm.value).subscribe(
        (res) => {
          this.router.navigate([`/respite`]);
        },
        (err) => {
          this.toastService.show({
            body: 'Error encountered while trying to complete your account.',
            preset: ToastPresets.ERROR,
          });
        }
      );
    }
  }

  public imageUploaded(event: any): void {
    this.profileImgKey = event;
  }

  public secChange(event: Event): void {
    if ((event.target as any).value === 'true') {
      this.hasSecondaryAccountHolder = true;
      this.makeSecFieldsRequired();

      this.finishProfileForm.get('secPhone')!.addValidators(Utils.validatePhoneNumber);
      this.finishProfileForm.get('secEmail')!.addValidators(Validators.email);
      this.finishProfileForm.get('secPhone')!.updateValueAndValidity();
    } else {
      this.makeSecFieldsNotRequired();
      this.hasSecondaryAccountHolder = false;

      this.finishProfileForm.get('secPhone')!.removeValidators(Utils.validatePhoneNumber);
      this.finishProfileForm.get('secEmail')!.removeValidators(Validators.email);
      this.finishProfileForm.get('secPhone')!.updateValueAndValidity();
    }
    this.finishProfileForm.updateValueAndValidity();
  }

  private makeSecFieldsRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.addValidators(Validators.required);
      this.finishProfileForm.get(fieldName)?.updateValueAndValidity();
    });
  }

  private makeSecFieldsNotRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.removeValidators(Validators.required);
      this.finishProfileForm.get(fieldName)?.updateValueAndValidity();
    });
  }

  public respiteProvideChange(event: Event): void {
    if ((event.target as any).value === 'true') {
      this.canProvideRespiteCare = true;
      this.makeRespiteFieldsRequired();
    } else {
      this.makeRespiteFieldsNotRequired();
      this.canProvideRespiteCare = false;
    }
  }

  private makeRespiteFieldsRequired() {
    this.provideRespiteFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.addValidators(Validators.required);
      this.finishProfileForm.get(fieldName)?.updateValueAndValidity();
    });
    this.finishProfileForm.updateValueAndValidity();
  }

  private makeRespiteFieldsNotRequired() {
    this.provideRespiteFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.removeValidators(Validators.required);
      this.finishProfileForm.get(fieldName)?.updateValueAndValidity();
    });
  }

  private static validateDate(control: AbstractControl): ValidationErrors | null {
    const err = { invalidDate: 'Please enter a valid date.' };

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const parsed = FinishAccountModalComponent.parseDateFromInput(control.value as string);
      const validMonth = parseInt(control.value.substring(0, 2)) > 0 && parseInt(control.value.substring(0, 2)) <= 12;
      const validDay = parseInt(control.value.substring(3, 5)) > 0 && parseInt(control.value.substring(3, 5)) <= 31;
      const validYear =
        parseInt(control.value.substring(6, 10)) > new Date().getFullYear() - 100 &&
        parseInt(control.value.substring(6, 10)) <= new Date().getFullYear() - 13;
      if (!validMonth || !validDay || !validYear) {
        return err;
      } else {
        return null;
      }
    } catch (e) {
      return err;
    }
  }

  private static parseDateFromInput(dateStr: string): Date {
    const year = parseInt(dateStr.substring(6, 10));
    const day = parseInt(dateStr.substring(3, 5));
    const month = parseInt(dateStr.substring(0, 2));
    return new Date(year, month - 1, day);
  }

  private generateRespiteAvailability(): SimpleAvailability {
    const m: DayModel = this.dayModels.find((dm) => dm.name === 'Monday') as DayModel;
    const t: DayModel = this.dayModels.find((dm) => dm.name === 'Tuesday') as DayModel;
    const w: DayModel = this.dayModels.find((dm) => dm.name === 'Wednesday') as DayModel;
    const th: DayModel = this.dayModels.find((dm) => dm.name === 'Thursday') as DayModel;
    const f: DayModel = this.dayModels.find((dm) => dm.name === 'Friday') as DayModel;
    const sa: DayModel = this.dayModels.find((dm) => dm.name === 'Saturday') as DayModel;
    const su: DayModel = this.dayModels.find((dm) => dm.name === 'Sunday') as DayModel;

    return {
      type: AvailabilityType.PRIMARY,
      monday: [m.morning, m.afternoon, m.evening, m.overnight],
      tuesday: [t.morning, t.afternoon, t.evening, t.overnight],
      wednesday: [w.morning, w.afternoon, w.evening, w.overnight],
      thursday: [th.morning, th.afternoon, th.evening, th.overnight],
      friday: [f.morning, f.afternoon, f.evening, f.overnight],
      saturday: [sa.morning, sa.afternoon, sa.evening, sa.overnight],
      sunday: [su.morning, su.afternoon, su.evening, su.overnight],
    };
  }
}
