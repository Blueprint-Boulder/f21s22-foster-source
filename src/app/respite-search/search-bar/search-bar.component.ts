import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public searchTerm: string;

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    return;
  }

  search(): void {
    this.searchEvent.emit(this.searchTerm);
  }

  searchBarKeyEvent(event: KeyboardEvent): void {
    if (event.code === 'Enter') {
      this.search();
    }
  }
}
