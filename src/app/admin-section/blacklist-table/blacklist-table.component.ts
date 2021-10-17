import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import { BlacklistedUser } from '../../models/blacklisted-user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-blacklist-table',
  templateUrl: './blacklist-table.component.html',
  styleUrls: ['./blacklist-table.component.scss'],
  providers: [databaseServiceProvider],
})
export class BlacklistTableComponent implements OnInit {
  public blacklist: BlacklistedUser[] = [];

  constructor(
    private dbService: DatabaseService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.dbService.getBlacklist().subscribe(
      (blacklistedUsers: BlacklistedUser[]) => {
        this.blacklist = blacklistedUsers;
      },
      (error: HttpErrorResponse) => {
        this.toastService.show({
          body: 'Something went wrong when trying to fetch the blacklist.',
        });
      }
    );
  }
}
