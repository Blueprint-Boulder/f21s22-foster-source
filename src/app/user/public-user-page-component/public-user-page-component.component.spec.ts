import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserPageComponentComponent } from './public-user-page-component.component';
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";

describe('PublicUserPageComponentComponent', () => {
  let component: PublicUserPageComponentComponent;
  let fixture: ComponentFixture<PublicUserPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicUserPageComponentComponent ],
      imports: [ HttpClientTestingModule,ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicUserPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
