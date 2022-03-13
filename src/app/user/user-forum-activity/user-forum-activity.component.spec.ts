import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumActivityComponent } from './user-forum-activity.component';

describe('UserForumActivityComponent', () => {
  let component: UserForumActivityComponent;
  let fixture: ComponentFixture<UserForumActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserForumActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
