import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicUserPageComponentComponent } from './public-user-page-component.component';

describe('PublicUserPageComponentComponent', () => {
  let component: PublicUserPageComponentComponent;
  let fixture: ComponentFixture<PublicUserPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicUserPageComponentComponent ]
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
