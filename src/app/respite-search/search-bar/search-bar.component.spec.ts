import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the searched string on submit', () => {
    spyOn(component.searchEvent, 'emit').and.callThrough();
    component.searchTerm = 'test';
    component.search();
    expect(component.searchEvent.emit).toHaveBeenCalledWith('test');
  });
  it('should call search on enter', async () => {
    spyOn(component, 'search');
    const input: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('input');
    input.dispatchEvent(
      new KeyboardEvent('keyup', {
        key: 'Enter',
      })
    );
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.search).toHaveBeenCalled();
    })
  });
});
