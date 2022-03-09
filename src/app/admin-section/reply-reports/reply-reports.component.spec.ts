import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyReportsComponent } from './reply-reports.component';

describe('ReplyReportsComponent', () => {
  let component: ReplyReportsComponent;
  let fixture: ComponentFixture<ReplyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
