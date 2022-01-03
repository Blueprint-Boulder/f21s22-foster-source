import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddressComponent } from './update-address.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from "@angular/forms";

describe('UpdateAddressComponent', () => {
  let component: UpdateAddressComponent;
  let fixture: ComponentFixture<UpdateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAddressComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch the users address on page load');
  it('should be invalid if missing any required fields');
  it('should be valid if required fields filled out');
  it('should be valid if optional fields are also filled out');
  it('should mark fields as invalid if submit invalid');
  it('should update address and navigate to account page if valid');
  it('should enable button if backend call fails, dont navigate');

});
