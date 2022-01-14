import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportModalComponent } from './bug-report-modal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('BugReportModalComponent', () => {
  let component: BugReportModalComponent;
  let fixture: ComponentFixture<BugReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportModalComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
