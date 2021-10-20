import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database-service/database.service';
import { databaseServiceProvider } from '../../services/database-service/database.service.provider';
import { ToastService } from '../../services/toast-service/toast.service';
import {
  BlacklistedUser,
  RemoveFromBlacklistRequest,
  RemoveFromBlacklistResponse,
} from '../../models/blacklisted-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Applicant } from '../../models/applicant.model';
import { ToastPresets } from '../../models/toast.model';

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

  public removeFromBlacklist(index: number): void {
    if (
      !confirm(`Are you sure you want to unban ${this.blacklist[index].name}?`)
    ) {
      return;
    }

    const toRemove: BlacklistedUser =
      this.getAndRemoveBlacklistedByIndex(index);
    const params: RemoveFromBlacklistRequest = {
      email: toRemove.email,
      phone: toRemove.phone,
    };

    this.dbService.removeFromBlacklist(params).subscribe(
      (res: RemoveFromBlacklistResponse) => {
        if (res.error) {
          this.toastService.show({
            body: 'Something went wrong trying to unban the user.',
            preset: ToastPresets.ERROR,
          });
        } else {
          this.toastService.show({
            body: `Successfully unbanned user ${toRemove.name}.`,
            preset: ToastPresets.SUCCESS,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.toastService.show({
          body: 'Something went wrong trying to unban the user.',
          preset: ToastPresets.ERROR,
        });
      }
    );
  }

  public getFormattedDateForUser(index: number): string {
    return formatDate(this.blacklist[index].banDate, 'dd/MM/yyyy', 'en-US');
  }

  private getAndRemoveBlacklistedByIndex(index: number): BlacklistedUser {
    const toGet: BlacklistedUser = this.blacklist[index];
    this.blacklist.splice(index, 1);
    return toGet;
  }
}
