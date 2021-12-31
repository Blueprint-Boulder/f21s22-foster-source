import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseWorkerComponent } from './update-case-worker.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ReactiveFormsModule } from "@angular/forms";

describe('UpdateCaseWorkerComponent', () => {
  let component: UpdateCaseWorkerComponent;
  let fixture: ComponentFixture<UpdateCaseWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaseWorkerComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCaseWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
