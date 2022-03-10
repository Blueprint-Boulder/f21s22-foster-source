import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldInvalidMessageComponent } from './field-invalid-message.component';

describe('FieldInvalidMessageComponent', () => {
  let component: FieldInvalidMessageComponent;
  let fixture: ComponentFixture<FieldInvalidMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldInvalidMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldInvalidMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
