import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileCollectionComponent } from './update-profile-collection.component';

describe('UpdateProfileCollectionComponent', () => {
  let component: UpdateProfileCollectionComponent;
  let fixture: ComponentFixture<UpdateProfileCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
