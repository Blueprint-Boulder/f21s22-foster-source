import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-user-page-component',
  templateUrl: './public-user-page-component.component.html',
  styleUrls: ['./public-user-page-component.component.css'],
})
export class PublicUserPageComponentComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    return;
  }
}