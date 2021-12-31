import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRegisterComponent } from './mod-register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('ModRegisterComponent', () => {
  let component: ModRegisterComponent;
  let fixture: ComponentFixture<ModRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModRegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
    }).compileComponents();
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
