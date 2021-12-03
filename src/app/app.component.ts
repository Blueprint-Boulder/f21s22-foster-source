import { Component } from '@angular/core';
import { ProfileService } from './services/profile-service/profile.service';
import { profileServiceProvider } from './services/profile-service/profile.service.provider';
import { FullProfileRes } from './models/get-profile-by-id.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'f21s22-foster-source';
}
