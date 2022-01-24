import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileCollectionComponent } from './update-profile-collection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ProfileMockService } from '../../services/profile-service/profile.mock.service';

describe('UpdateProfileCollectionComponent', () => {
  let component: UpdateProfileCollectionComponent;
  let fixture: ComponentFixture<UpdateProfileCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProfileCollectionComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ProfileService, useValue: new ProfileMockService() }],
    }).compileComponents();
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
