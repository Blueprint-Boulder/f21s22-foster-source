import { FullProfileRes, RespiteProviderInfoRes } from '../../models/get-profile-by-id.models';
import { Availability } from '../../models/availability.model';
import { AvailabilityService } from '../../services/availability-service/availability.service';

export class ProfileUtils {
  public static getAvailabilities(
    profile: FullProfileRes,
    availabilityService: AvailabilityService
  ): Availability | undefined {
    console.log('Getting avail');
    if (!profile.respiteBackground.respiteProviderInfo || !profile.respiteBackground.canProvideRespite) {
      return undefined;
    }

    const providerInfo: RespiteProviderInfoRes = profile.respiteBackground.respiteProviderInfo;

    if (providerInfo.availabilities.length < 1) {
      return undefined;
    }

    const tempAvail = providerInfo.availabilities.find((avail) => avail.type === 'TEMPORARY');

    if (tempAvail && tempAvail.endDate && tempAvail.endDate?.getTime() >= new Date().getTime()) {
      return tempAvail;
    } else if (tempAvail) {
      // Case where tempavail is expired.
      availabilityService.removeTemporaryAvailability().subscribe();
    }

    return providerInfo.availabilities.find((avail) => avail.type === 'PRIMARY');
  }
}
