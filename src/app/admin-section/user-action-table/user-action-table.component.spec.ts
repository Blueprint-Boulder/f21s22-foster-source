import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionTableComponent } from './user-action-table.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('UserActionTableComponent', () => {
  let component: UserActionTableComponent;
  let fixture: ComponentFixture<UserActionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionTableComponent ],
      imports: [HttpClientModule, ReactiveFormsModule, NgbCollapseModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
