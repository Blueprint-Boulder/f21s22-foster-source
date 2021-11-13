import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Utils } from '../utils';
import { DayModel } from '../day-availability-input/day-availability-input.component';

@Component({
  selector: 'app-finish-account-modal',
  templateUrl: './finish-account-modal.component.html',
  styleUrls: ['./finish-account-modal.component.scss'],
})
export class FinishAccountModalComponent implements OnInit {
  public finishProfileForm: FormGroup;
  public hasSecondaryAccountHolder = false;
  public canProvideRespiteCare = false;
  public phoneTypes: string[];

  private secondaryAccountHolderFields = [
    'secfname',
    'seclname',
    'secEmail',
    'secPhone',
    'secPhoneType',
    'secPreferredName',
    'secPronouns',
    'secGender',
    'secMaritalStatus',
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

  private provideRespitefields = ['respiteCity', 'respiteRange', 'minAge', 'maxAge', 'howManyCareFor'];

  @Input() account: Account;

  constructor(private formBuilder: FormBuilder) {
    this.phoneTypes = Utils.getPhoneTypes();
  }

  ngOnInit(): void {
    this.finishProfileForm = this.formBuilder.group({
      preferredName: ['', Validators.required],
      gender: ['', Validators.required],
      pronouns: [''],
      maritalStatus: [''],
      secfname: [''],
      seclname: [''],
      secEmail: ['', Validators.email],
      secPhone: ['', Utils.validatePhoneNumber],
      secPhoneType: [''],
      secPreferredName: [''],
      secPronouns: [''],
      secGender: [''],
      secMaritalStatus: [''],
      fosterYears: [null, Validators.compose([Validators.required])],
      totalChildren: [null, Validators.compose([Validators.required])],
      canProvideRespite: [false, Validators.required],
      lookingForRespite: [false, Validators.required],
      hasProvidedInPast: [false, Validators.required],
      respiteCity: [''],
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
      isLGBT: [null],
      caredForLGBT: [null],
      caredForPhysicallyDisabled: [null],
      caredForIntellectuallyDisabled: [null],
      careForMedicallyFragile: [null],
      ownsFirearm: [null],
      additionalInfo: [null],
      dob: [null, Validators.compose([Validators.required, FinishAccountModalComponent.validateDate])],
    });
    console.log(this.dayModels);
  }

  public secChange(event: Event) {
    if ((event.target as any).value === 'true') {
      this.hasSecondaryAccountHolder = true;
      this.makeSecFieldsRequired();
    } else {
      this.hasSecondaryAccountHolder = false;
      this.makeSecFieldsNotRequired();
    }
  }

  public respiteProvideChange(event: Event) {
    if ((event.target as any).value === 'true') {
      this.canProvideRespiteCare = true;
      this.makeRespiteFieldsRequired();
    } else {
      this.canProvideRespiteCare = false;
      this.makeRespiteFieldsNotRequired();
    }
  }

  private makeSecFieldsRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.addValidators(Validators.required);
    });
  }

  private makeSecFieldsNotRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.removeValidators(Validators.required);
    });
  }

  private makeRespiteFieldsRequired() {
    this.provideRespitefields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.addValidators(Validators.required);
    });
  }

  private makeRespiteFieldsNotRequired() {
    this.provideRespitefields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.removeValidators(Validators.required);
    });
  }

  private static validateDate(control: AbstractControl): ValidationErrors | null {
    const err = { invalidDate: 'Please enter a valid phone date.' };

    try {
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
    console.log(year, day, month);
    return new Date(year, month - 1, day);
  }
}
