import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FiltersReq } from '../../models/filters.model';

@Component({
  selector: 'app-show-filters',
  templateUrl: './show-filters.component.html',
  styleUrls: ['./show-filters.component.scss'],
})
export class ShowFiltersComponent implements OnChanges {
  public appliedFilters: string[] = [];

  @Input() filters: FiltersReq;
  @Output() clearFiltersEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.getAppliedFilters();
  }

  private getAppliedFilters(): void {
    this.appliedFilters = [];
    Object.keys(this.filters).forEach((k) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (this.filters[k] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const chipContent = this.getChipContent(k, this.filters[k]);
        if (chipContent) {
          this.appliedFilters = this.appliedFilters.concat(chipContent);
        }
      }
    });
  }

  private getChipContent(key: string, value: any): string[] | undefined {
    switch (key) {
      case 'distance':
        return [`WITHIN ${value as string} MILES`];
      case 'ageRange':
        if (value[0] === 0) {
          return [`CAN CARE FOR CHILDREN UP TO ${value[1]} YRS OLD`];
        } else if (value[1] === 18) {
          return [`CAN CARE FOR CHILDREN ${value[0]} YRS OR OLDER`];
        } else {
          return [`CAN CARE FOR ${value[0]}-${value[1]} YRS OLD`];
        }
      case 'maxKids':
        return [`CAN CARE FOR UP TO ${value} KIDS`];
      case 'availabilities':
        const availabilityChips: string[] = [];
        const times = ['MORNING', 'AFTERNOON', 'EVENING', 'OVERNIGHT'];
        Object.keys(value).forEach((k) => {
          const chipBase = `Available ${k} `;
          for (let i = 0; i < 4; i++) {
            if (value[k][i]) {
              availabilityChips.push((chipBase + times[i]).toUpperCase());
            }
          }
        });
        return availabilityChips;
      case 'vehicleAccess':
        return value ? ['ACCESS TO VEHICLE'] : undefined;
      case 'lgbtExperience':
        return value ? ['LGBTQ+ EXPERIENCE'] : undefined;
      case 'physicalDisabilityExperience':
        return value ? ['PHYS DISABILITY EXPERIENCE'] : undefined;
      case 'intellectualDisabilityExperience':
        return value ? ['MENTAL DISABILITY EXPERIENCE'] : undefined;
      case 'medicallyFragileExperience':
        return value ? ['MEDICALLY FRAGILE EXPERIENCE'] : undefined;
      case 'ownFirearm':
        return value === 'yes' ? [`HAS FIREARM`] : [`NO FIREARMS`];
      default:
        return;
    }
  }

  clearFilters(): void {
    this.clearFiltersEvent.emit();
  }
}
