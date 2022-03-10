import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRecoveryChangeComponent } from './password-recovery-change.component';

describe('PasswordRecoveryChangeComponent', () => {
  let component: PasswordRecoveryChangeComponent;
  let fixture: ComponentFixture<PasswordRecoveryChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordRecoveryChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRecoveryChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
