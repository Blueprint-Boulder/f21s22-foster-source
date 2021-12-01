import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast-service/toast.service';
import {
  BlacklistedUser,
  GetBlacklistedUsersRes,
  RemoveFromBlacklistRequest,
  RemoveFromBlacklistResponse,
} from '../../models/blacklisted-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Applicant } from '../../models/applicant.model';
import { ToastPresets } from '../../models/toast.model';
import { BlacklistService } from '../../services/blacklist-service/blacklist.service';
import { blacklistServiceProvider } from '../../services/blacklist-service/blacklist.service.provider';

@Component({
  selector: 'app-blacklist-table',
  templateUrl: './blacklist-table.component.html',
  styleUrls: ['./blacklist-table.component.scss'],
  providers: [blacklistServiceProvider],
})
export class BlacklistTableComponent implements OnInit {
  public blacklist: BlacklistedUser[] = [];

  constructor(private blacklistService: BlacklistService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.blacklistService.getBlacklistedUsers().subscribe(
      (res: GetBlacklistedUsersRes) => {
        this.blacklist = res.blacklist;
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
      !confirm(`Are you sure you want to unban ${this.blacklist[index].firstName} ${this.blacklist[index].lastName}?`)
    ) {
      return;
    }

    const toRemove: BlacklistedUser = this.getAndRemoveBlacklistedByIndex(index);
    const params: RemoveFromBlacklistRequest = {
      email: toRemove.email,
      phone: toRemove.phoneNumber,
    };

    this.blacklistService.deleteFromBlacklist(params.phone, params.email).subscribe(
      (res: any) => {
        this.toastService.show({
          body: `Successfully unbanned user ${toRemove.firstName} ${toRemove.lastName}.`,
          preset: ToastPresets.SUCCESS,
        });
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
    return formatDate(this.blacklist[index].date, 'dd/MM/yyyy', 'en-US');
  }

  private getAndRemoveBlacklistedByIndex(index: number): BlacklistedUser {
    const toGet: BlacklistedUser = this.blacklist[index];
    this.blacklist.splice(index, 1);
    return toGet;
  }
}
