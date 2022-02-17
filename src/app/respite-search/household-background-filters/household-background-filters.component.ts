import { Component, Input, OnInit } from '@angular/core';
import { HouseholdBackgroundRadioFilters } from '../../models/filters.model';

@Component({
  selector: 'app-household-background-filters',
  templateUrl: './household-background-filters.component.html',
  styleUrls: ['./household-background-filters.component.scss'],
})
export class HouseholdBackgroundFiltersComponent {
  @Input() radioModel: HouseholdBackgroundRadioFilters;

  cleanModel(): void {
    this.radioModel.vehicleAccess = this.radioModel.vehicleAccess ? true : null;
    this.radioModel.lgbtExperience = this.radioModel.lgbtExperience ? true : null;
    this.radioModel.physicalDisabilityExperience = this.radioModel.physicalDisabilityExperience ? true : null;
    this.radioModel.intellectualDisabilityExperience = this.radioModel.intellectualDisabilityExperience ? true : null;
    this.radioModel.medicallyFragileExperience = this.radioModel.medicallyFragileExperience ? true : null;
  }
}
