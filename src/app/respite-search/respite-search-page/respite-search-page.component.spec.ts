import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespiteSearchPageComponent } from './respite-search-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RespiteSearchPageComponent', () => {
  let component: RespiteSearchPageComponent;
  let fixture: ComponentFixture<RespiteSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespiteSearchPageComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespiteSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
