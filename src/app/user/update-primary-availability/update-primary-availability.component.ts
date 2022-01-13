import { Component, OnInit } from '@angular/core';
import { AvailabilityType, SimpleAvailability } from '../../models/availability.model';
import { ProfileService } from '../../services/profile-service/profile.service';
import { ToastService } from '../../services/toast-service/toast.service';
import { Router } from '@angular/router';
import { DayModel } from '../../common-components/day-availability-input/day-availability-input.component';
import { FormUtils } from '../../common/utils/FormUtils';

@Component({
  selector: 'app-update-primary-availability',
  templateUrl: './update-primary-availability.component.html',
  styleUrls: ['./update-primary-availability.component.scss'],
})
export class UpdatePrimaryAvailabilityComponent implements OnInit {
  public dayModels: DayModel[];
  public submittingForm = false;

  constructor(private profileService: ProfileService, private toastService: ToastService, private router: Router) {}

  ngOnInit(): void {
    this.profileService.getCurrentProfile().subscribe((profile) => {
      if (profile.respiteBackground.respiteProviderInfo) {
        const primaryAvailability = profile.respiteBackground.respiteProviderInfo.availabilities.find(
          (a) => a.type === 'PRIMARY'
        );
        if (!primaryAvailability) {
          this.dayModels = [
            {
              name: 'Monday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Tuesday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Wednesday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Thursday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Friday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Saturday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
            {
              name: 'Sunday',
              morning: false,
              afternoon: false,
              evening: false,
              overnight: false,
            },
          ];
        } else {
          this.dayModels = [
            {
              name: 'Monday',
              morning: primaryAvailability.monday[0],
              afternoon: primaryAvailability.monday[1],
              evening: primaryAvailability.monday[2],
              overnight: primaryAvailability.monday[3],
            },
            {
              name: 'Tuesday',
              morning: primaryAvailability.tuesday[0],
              afternoon: primaryAvailability.tuesday[1],
              evening: primaryAvailability.tuesday[2],
              overnight: primaryAvailability.tuesday[3],
            },
            {
              name: 'Wednesday',
              morning: primaryAvailability.wednesday[0],
              afternoon: primaryAvailability.wednesday[1],
              evening: primaryAvailability.wednesday[2],
              overnight: primaryAvailability.wednesday[3],
            },
            {
              name: 'Thursday',
              morning: primaryAvailability.thursday[0],
              afternoon: primaryAvailability.thursday[1],
              evening: primaryAvailability.thursday[2],
              overnight: primaryAvailability.thursday[3],
            },
            {
              name: 'Friday',
              morning: primaryAvailability.friday[0],
              afternoon: primaryAvailability.friday[1],
              evening: primaryAvailability.friday[2],
              overnight: primaryAvailability.friday[3],
            },
            {
              name: 'Saturday',
              morning: primaryAvailability.saturday[0],
              afternoon: primaryAvailability.saturday[1],
              evening: primaryAvailability.saturday[2],
              overnight: primaryAvailability.saturday[3],
            },
            {
              name: 'Sunday',
              morning: primaryAvailability.sunday[0],
              afternoon: primaryAvailability.sunday[1],
              evening: primaryAvailability.sunday[2],
              overnight: primaryAvailability.sunday[3],
            },
          ];
        }
      } else {
        this.toastService.error('You must first add respite provider information to update your availability.');
        this.router.navigate(['/user/create/respite-provider-info']);
      }
    });
  }

  onSubmit(): void {
    if (!FormUtils.hasAvailability(this.dayModels)) {
      const shouldProceed = confirm(
        'You have indicated that you have no availability to provide respite. Is this correct?'
      );
      if (!shouldProceed) {
        return;
      }
    }
    this.submittingForm = true;

    const req: SimpleAvailability = this.generateAvailability();

    this.profileService.updatePrimaryAvailability(req).subscribe(
      (profile) => {
        this.toastService.success('Successfully updated primary availability');
        this.router.navigate([`/user/${profile.id}`]);
      },
      (err) => {
        this.toastService.httpError(err);
        this.submittingForm = false;
      }
    );
  }

  private generateAvailability(): SimpleAvailability {
    const m: DayModel = this.dayModels.find((dm) => dm.name === 'Monday') as DayModel;
    const t: DayModel = this.dayModels.find((dm) => dm.name === 'Tuesday') as DayModel;
    const w: DayModel = this.dayModels.find((dm) => dm.name === 'Wednesday') as DayModel;
    const th: DayModel = this.dayModels.find((dm) => dm.name === 'Thursday') as DayModel;
    const f: DayModel = this.dayModels.find((dm) => dm.name === 'Friday') as DayModel;
    const sa: DayModel = this.dayModels.find((dm) => dm.name === 'Saturday') as DayModel;
    const su: DayModel = this.dayModels.find((dm) => dm.name === 'Sunday') as DayModel;

    return {
      type: AvailabilityType.PRIMARY,
      monday: [m.morning, m.afternoon, m.evening, m.overnight],
      tuesday: [t.morning, t.afternoon, t.evening, t.overnight],
      wednesday: [w.morning, w.afternoon, w.evening, w.overnight],
      thursday: [th.morning, th.afternoon, th.evening, th.overnight],
      friday: [f.morning, f.afternoon, f.evening, f.overnight],
      saturday: [sa.morning, sa.afternoon, sa.evening, sa.overnight],
      sunday: [su.morning, su.afternoon, su.evening, su.overnight],
    };
  }
}
