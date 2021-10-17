import { Component, OnInit } from '@angular/core';
import { ApprovalTableUser } from '../../models/approval-table-user.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-action-table',
  templateUrl: './user-action-table.component.html',
  styleUrls: ['./user-action-table.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class UserActionTableComponent implements OnInit {
  public users: ApprovalTableUser[] = [
    { isCollapsed: false },
    { isCollapsed: true },
    { isCollapsed: true },
    { isCollapsed: true },
    { isCollapsed: true },
    { isCollapsed: true },
  ];
  // constructor() {}

  ngOnInit(): void {
    return;
  }
}
