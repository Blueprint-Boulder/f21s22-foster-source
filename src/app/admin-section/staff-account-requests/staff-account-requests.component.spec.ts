import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAccountRequestsComponent } from './staff-account-requests.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from "@angular/forms";

describe('StaffAccountRequestsComponent', () => {
  let component: StaffAccountRequestsComponent;
  let fixture: ComponentFixture<StaffAccountRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffAccountRequestsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
