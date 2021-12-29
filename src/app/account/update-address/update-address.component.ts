import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../../services/address-service/address.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service/toast.service';
import { addressServiceProvider } from '../../services/address-service/address.service.provider';
import { AddressRes, SimpleAddressReq } from '../../models/adress.model';
import { ToastPresets } from '../../models/toast.model';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss'],
  providers: [addressServiceProvider],
})
export class UpdateAddressComponent implements OnInit {
  public readonly STATES = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Federated States of Micronesia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Marshall Islands',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Palau',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virgin Island',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  public updateAddressForm: FormGroup;
  public submittingForm = false;
  public currentAddress: AddressRes;

  constructor(
    private formBuilder: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private toastService: ToastService
  ) {}

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
    } else {
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
          this.toastService.show({
            body: 'Successfully updated address.',
            preset: ToastPresets.SUCCESS,
          });
          this.router.navigate(['/account']);
        },
        (err) => {
          this.toastService.httpError(err);
          this.submittingForm = false;
        }
      );
    }
  }
}
