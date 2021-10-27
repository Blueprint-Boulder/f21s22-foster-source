import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPageComponent } from './create-account-page.component';

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
