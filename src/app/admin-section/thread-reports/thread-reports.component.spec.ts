import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadReportsComponent } from './thread-reports.component';

describe('ThreadReportsComponent', () => {
  let component: ThreadReportsComponent;
  let fixture: ComponentFixture<ThreadReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
