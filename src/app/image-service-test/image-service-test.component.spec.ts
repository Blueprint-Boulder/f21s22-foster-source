import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageServiceTestComponent } from './image-service-test.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ImageServiceTestComponent', () => {
  let component: ImageServiceTestComponent;
  let fixture: ComponentFixture<ImageServiceTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageServiceTestComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageServiceTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
