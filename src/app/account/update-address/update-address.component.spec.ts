import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAddressComponent } from './update-address.component';

describe('UpdateAddressComponent', () => {
  let component: UpdateAddressComponent;
  let fixture: ComponentFixture<UpdateAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
