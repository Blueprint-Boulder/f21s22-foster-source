import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumStatsComponent } from './user-forum-stats.component';

describe('UserForumStatsComponent', () => {
  let component: UserForumStatsComponent;
  let fixture: ComponentFixture<UserForumStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserForumStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserForumStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
