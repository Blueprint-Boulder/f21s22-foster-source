import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionTableComponent } from './user-action-table.component';

describe('UserActionTableComponent', () => {
  let component: UserActionTableComponent;
  let fixture: ComponentFixture<UserActionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionTableComponent ]
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
