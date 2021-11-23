import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { accounts } from '../../mock/database-entities';
// import { Account } from 'src/app/models/account.model'; not implemented yet

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.css'],
})
export class PublicUserPageComponentComponent implements OnInit {
  Account = accounts; // list of mock accounts
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    return;
  }
}
