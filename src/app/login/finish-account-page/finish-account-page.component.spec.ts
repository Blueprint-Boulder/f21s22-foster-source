import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAccountPageComponent } from './finish-account-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FinishAccountPageComponent', () => {
  let component: FinishAccountPageComponent;
  let fixture: ComponentFixture<FinishAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishAccountPageComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
