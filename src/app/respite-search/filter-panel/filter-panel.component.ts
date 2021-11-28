import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import {
  FiltersReq,
  HouseholdBackgroundRadioFilters,
} from '../../models/filters.model';
import {
  AvailabilityFilters,
  DayAvailability,
} from '../../models/availability.model';

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
  public distanceSliderOptions: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => {
      return value === 100 ? value + '+' : value === 0 ? 'Any' : '' + value;
    },
  };
  public distanceValue = 0;

  public ageRangeSliderOptions: Options = {
    floor: 0,
    ceil: 18,
    translate: (value: number, label: LabelType): string => {
      return value === 18 ? '17+' : value === 0 ? 'Any' : '' + value;
    },
  };
  public minAgeValue = 0;
  public maxAgeValue = 18;

  public maxKids: number;

  public availabilityModel: AvailabilityFilters = {
    monday: [false, false, false, false],
    tuesday: [false, false, false, false],
    wednesday: [false, false, false, false],
    thursday: [false, false, false, false],
    friday: [false, false, false, false],
    saturday: [false, false, false, false],
    sunday: [false, false, false, false],
  };

  public householdRadios: HouseholdBackgroundRadioFilters = {
    intellectualDisabilityExperience: null,
    lgbtExperience: null,
    ownFirearm: null,
    physicalDisabilityExperience: null,
    vehicleAccess: null,
  };

  @Input() hidden = true;
  @Output() closePanel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    return;
  }

  filterSubmit() {
    const filters: FiltersReq = {
      distance: this.distanceValue === 0 ? undefined : this.distanceValue,
      ageRange: this.buildAgeRange(),
      maxKids:
        this.maxKids === null || this.maxKids < 1 ? undefined : this.maxKids,
      availabilities: this.buildAvailabilitiesReq(),
      vehicleAccess:
        this.householdRadios.vehicleAccess === null
          ? undefined
          : this.householdRadios.vehicleAccess,
      lgbtExperience:
        this.householdRadios.lgbtExperience === null
          ? undefined
          : this.householdRadios.lgbtExperience,
      physicalDisabilityExperience:
        this.householdRadios.physicalDisabilityExperience === null
          ? undefined
          : this.householdRadios.physicalDisabilityExperience,
      intellectualDisabilityExperience:
        this.householdRadios.intellectualDisabilityExperience === null
          ? undefined
          : this.householdRadios.intellectualDisabilityExperience,
      ownFirearm:
        this.householdRadios.ownFirearm === null
          ? undefined
          : this.householdRadios.ownFirearm,
    };

    console.log(filters);
    console.log(JSON.stringify(filters));
  }

  private buildAgeRange(): [number, number] | undefined {
    if (this.minAgeValue === 0 && this.maxAgeValue === 18) {
      return undefined;
    }
    return [this.minAgeValue, this.maxAgeValue];
  }

  private buildAvailabilitiesReq(): AvailabilityFilters | undefined {
    let found = false;
    Object.values(this.availabilityModel).forEach((avail: DayAvailability) => {
      if (avail.some((x: boolean) => x)) {
        found = true;
      }
    });
    if (!found) {
      return undefined;
    }
    return this.availabilityModel;
  }
}
