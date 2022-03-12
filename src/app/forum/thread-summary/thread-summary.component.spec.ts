import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSummaryComponent } from './thread-summary.component';

describe('ThreadSummaryComponent', () => {
  let component: ThreadSummaryComponent;
  let fixture: ComponentFixture<ThreadSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
