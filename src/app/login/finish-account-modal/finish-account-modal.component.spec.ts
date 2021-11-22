import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAccountModalComponent } from './finish-account-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('FinishAccountModalComponent', () => {
  let component: FinishAccountModalComponent;
  let fixture: ComponentFixture<FinishAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishAccountModalComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
