import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadReplyComponent } from './thread-reply.component';

describe('ThreadReplyComponent', () => {
  let component: ThreadReplyComponent;
  let fixture: ComponentFixture<ThreadReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
