import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-action-table',
  templateUrl: './user-action-table.component.html',
  styleUrls: ['./user-action-table.component.css'],
})
export class UserActionTableComponent implements OnInit {
  public users: number[] = [1, 2, 3, 4];

  // constructor() {}

  ngOnInit(): void {
    return;
  }
}
