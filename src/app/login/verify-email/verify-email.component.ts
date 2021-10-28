import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  public email: string | null;
  public countdown = 61;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email');
    timer(0, 1000).subscribe((_) => {
      if (this.countdown > 0) {
        this.countdown = this.countdown - 1;
      }
    });
  }

  public resendEmail(): void {
    return;
  }
}
