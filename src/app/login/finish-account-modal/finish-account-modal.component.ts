import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../utils';

@Component({
  selector: 'app-finish-account-modal',
  templateUrl: './finish-account-modal.component.html',
  styleUrls: ['./finish-account-modal.component.scss'],
})
export class FinishAccountModalComponent implements OnInit {
  public finishProfileForm: FormGroup;
  public hasSecondaryAccountHolder = false;
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
    });
  }

  public secChange(event: Event) {
    if ((event.target as any).value === 'true') {
      this.hasSecondaryAccountHolder = true;
      this.makeSecFieldsRequired();
    } else {
      this.hasSecondaryAccountHolder = false;
    }
  }

  private makeSecFieldsRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm.get(fieldName)?.addValidators(Validators.required);
    });
  }

  private makeSecFieldsNotRequired() {
    this.secondaryAccountHolderFields.forEach((fieldName: string) => {
      this.finishProfileForm
        .get(fieldName)
        ?.removeValidators(Validators.required);
    });
  }
}
