import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistTableComponent } from './blacklist-table.component';
import {HttpClientModule} from "@angular/common/http";

describe('BlacklistTableComponent', () => {
  let component: BlacklistTableComponent;
  let fixture: ComponentFixture<BlacklistTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlacklistTableComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
