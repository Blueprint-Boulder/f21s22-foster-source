import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
})
export class CreateAccountModalComponent implements OnInit {
  public createAccountForm = this.formBuilder.group({
    fname: '',
    lname: '',
    email: '',
    confirmEmail: '',
    primaryPhone: '',
    primaryType: '',
    secondaryPhone: '',
    secondaryType: '',
    address: '',
    address2: '',
    city: '',
    zip: '',
    state: '',
    country: '',
    caseworkerfname: '',
    caseworkerlname: '',
    caseworkeremail: '',
    caseworkerphone: '',
    user: '',
    password: '',
    confirmpassword: '',
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    return;
  }
  public createAccountSubmit(): void {
    console.log(this.createAccountForm.value.fname);
    console.log(this.createAccountForm.value.lname);
  }
}
