import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugReportsComponent } from './bug-reports.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BugService } from '../../services/bug-service/bug.service';
import { BugMockService } from '../../services/bug-service/bug.mock.service';

describe('BugReportsComponent', () => {
  let component: BugReportsComponent;
  let fixture: ComponentFixture<BugReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugReportsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: BugService, useValue: new BugMockService() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
