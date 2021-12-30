import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseWorkerComponent } from './update-case-worker.component';

describe('UpdateCaseWorkerComponent', () => {
  let component: UpdateCaseWorkerComponent;
  let fixture: ComponentFixture<UpdateCaseWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaseWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCaseWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
