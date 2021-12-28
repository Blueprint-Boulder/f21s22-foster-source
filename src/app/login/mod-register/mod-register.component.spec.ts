import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRegisterComponent } from './mod-register.component';

describe('ModRegisterComponent', () => {
  let component: ModRegisterComponent;
  let fixture: ComponentFixture<ModRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
