import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAccountModalComponent } from './finish-account-modal.component';

describe('FinishAccountModalComponent', () => {
  let component: FinishAccountModalComponent;
  let fixture: ComponentFixture<FinishAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishAccountModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
