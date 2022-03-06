import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTextFieldComponent } from './basic-text-field.component';

describe('BasicTextFieldComponent', () => {
  let component: BasicTextFieldComponent;
  let fixture: ComponentFixture<BasicTextFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicTextFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
