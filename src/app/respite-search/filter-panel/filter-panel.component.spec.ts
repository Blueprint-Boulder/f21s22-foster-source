import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPanelComponent } from './filter-panel.component';
import { FiltersReq } from "../../models/filters.model";

describe('FilterPanelComponent', () => {
  let component: FilterPanelComponent;
  let fixture: ComponentFixture<FilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit undefined filters req on initial submit', () => {
    spyOn(component.filterResults, 'emit').and.callFake((filters: FiltersReq) => {
      Object.keys(filters).forEach((k) => {
        //@ts-ignore
        expect(filters[k]).toBeUndefined();
      });
    });
    component.filterSubmit();
  })
});
