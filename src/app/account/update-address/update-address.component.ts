import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address-service/address.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { AddressRes, SimpleAddressReq } from '../../models/adress.model';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss'],
})
export class UpdateAddressComponent implements OnInit {
  public readonly STATES;

  public updateAddressForm: FormGroup;
  public submittingForm = false;
  public currentAddress: AddressRes;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.STATES = FormUtils.STATES;
  }

  ngOnInit(): void {
    this.updateAddressForm = this.formBuilder.group({
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/)])],
    });
    this.addressService.getCurrentAddress().subscribe(
      (add) => {
        this.currentAddress = add;
      },
      (err) => {
        this.toastService.httpError(err);
      }
    );
  }

  onSubmit(): void {
    if (this.updateAddressForm.invalid) {
      this.updateAddressForm.markAllAsTouched();
      return;
    }

    this.submittingForm = true;

    const req: SimpleAddressReq = {
      addressLine1: this.updateAddressForm.get('address')!.value,
      addressLine2: this.updateAddressForm!.get('address2')?.value
        ? this.updateAddressForm!.get('address2')!.value
        : undefined,
      city: this.updateAddressForm!.get('city')!.value,
      zipcode: this.updateAddressForm!.get('zip')!.value,
      state: this.updateAddressForm!.get('state')!.value,
    };

    this.addressService.updateAddress(req).subscribe(
      (_) => {
        this.toastService.successAndNavigate('Successfully updated address.', '/account');
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }
}
