import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCheckFieldComponent } from './basic-check-field.component';

describe('BasicCheckFieldComponent', () => {
  let component: BasicCheckFieldComponent;
  let fixture: ComponentFixture<BasicCheckFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicCheckFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCheckFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
