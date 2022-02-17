import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { FiltersReq, HouseholdBackgroundRadioFilters } from '../../models/filters.model';
import { AvailabilityFilters, DayAvailability } from '../../models/availability.model';

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
      return value === 18 ? 'No Max' : value === 0 ? 'No Min' : '' + value;
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
    medicallyFragileExperience: null,
    vehicleAccess: null,
  };

  @Input() hidden = true;
  @Input() resetEmitter: EventEmitter<void>;
  @Input() initialValues: FiltersReq | undefined;
  @Output() closePanel: EventEmitter<void> = new EventEmitter<void>();
  @Output() filterResults: EventEmitter<FiltersReq> = new EventEmitter<FiltersReq>();
  @Output() resetRequestEmitter: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.resetEmitter.subscribe(() => {
      this.reset();
    });

    if (this.initialValues) {
      if (this.initialValues.distance) {
        this.distanceValue = this.initialValues.distance;
      }
      if (this.initialValues.ageRange) {
        this.minAgeValue = this.initialValues.ageRange[0];
        this.maxAgeValue = this.initialValues.ageRange[1];
      }
      if (this.initialValues.maxKids) {
        this.maxKids = this.initialValues.maxKids;
      }
      if (this.initialValues.availabilities) {
        this.availabilityModel = this.initialValues.availabilities;
      }
      if (this.initialValues.vehicleAccess !== undefined) {
        this.householdRadios.vehicleAccess = this.initialValues.vehicleAccess;
      }
      if (this.initialValues.lgbtExperience !== undefined) {
        this.householdRadios.lgbtExperience = this.initialValues.lgbtExperience;
      }
      if (this.initialValues.physicalDisabilityExperience !== undefined) {
        this.householdRadios.physicalDisabilityExperience = this.initialValues.physicalDisabilityExperience;
      }
      if (this.initialValues.intellectualDisabilityExperience !== undefined) {
        this.householdRadios.intellectualDisabilityExperience = this.initialValues.intellectualDisabilityExperience;
      }
      if (this.initialValues.medicallyFragileExperience !== undefined) {
        this.householdRadios.medicallyFragileExperience = this.initialValues.medicallyFragileExperience;
      }
      if (this.initialValues.ownFirearm !== undefined) {
        this.householdRadios.ownFirearm = this.initialValues.ownFirearm;
      }
    }
  }

  filterSubmit() {
    const filters: FiltersReq = {
      distance: this.distanceValue === 0 || this.distanceValue === 100 ? undefined : this.distanceValue,
      ageRange: this.buildAgeRange(),
      maxKids: this.maxKids === null || this.maxKids < 1 ? undefined : this.maxKids,
      availabilities: this.buildAvailabilitiesReq(),
      vehicleAccess: this.householdRadios.vehicleAccess === null ? undefined : this.householdRadios.vehicleAccess,
      lgbtExperience: this.householdRadios.lgbtExperience === null ? undefined : this.householdRadios.lgbtExperience,
      physicalDisabilityExperience:
        this.householdRadios.physicalDisabilityExperience === null
          ? undefined
          : this.householdRadios.physicalDisabilityExperience,
      intellectualDisabilityExperience:
        this.householdRadios.intellectualDisabilityExperience === null
          ? undefined
          : this.householdRadios.intellectualDisabilityExperience,
      medicallyFragileExperience:
        this.householdRadios.medicallyFragileExperience === null
          ? undefined
          : this.householdRadios.medicallyFragileExperience,
      ownFirearm: this.householdRadios.ownFirearm === null ? undefined : this.householdRadios.ownFirearm,
    };

    this.filterResults.emit(filters);
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

  private reset(): void {
    this.distanceValue = 0;
    this.minAgeValue = 0;
    this.maxAgeValue = 18;
    this.maxKids = 0;
    this.availabilityModel = {
      monday: [false, false, false, false],
      tuesday: [false, false, false, false],
      wednesday: [false, false, false, false],
      thursday: [false, false, false, false],
      friday: [false, false, false, false],
      saturday: [false, false, false, false],
      sunday: [false, false, false, false],
    };
    this.householdRadios = {
      intellectualDisabilityExperience: null,
      lgbtExperience: null,
      ownFirearm: null,
      physicalDisabilityExperience: null,
      medicallyFragileExperience: null,
      vehicleAccess: null,
    };
  }
}
