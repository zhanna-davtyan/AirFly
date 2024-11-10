import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../common/components/base/base.component";
import {BookingService} from "../../booking/booking.service";
import {TranslateModule} from "@ngx-translate/core";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {toNumber} from "lodash";

@Component({
  selector: 'app-travel-insurance-select',
  standalone: true,
  imports: [
    TranslateModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    ButtonDirective
  ],
  templateUrl: './travel-insurance-select.component.html',
  styleUrl: './travel-insurance-select.component.css'
})
export class TravelInsuranceSelectComponent extends BaseComponent implements OnInit{

  travelInsurance!: boolean;
  currentStep!: number;
  numberOfSteps!: number;

  constructor(private bookingService: BookingService) {
    super();
  }

  ngOnInit(): void {

    this.currentStep = toNumber(localStorage.getItem('current_step')!);
    if (localStorage.getItem('return_flight_time')) {
      this.numberOfSteps = 5;
    } else {
      this.numberOfSteps = 4;
    }

    if (localStorage.getItem('travel_insurance')) {
      this.travelInsurance = Boolean(localStorage.getItem('travel_insurance'));
    } else {
      this.travelInsurance = false;
    }
  }


  goBack() {
    this.currentStep--;
    this.bookingService.updateCurrentStep(this.currentStep);
    this.bookingService.updateCurrentStepDescription('passengers')
  }

  goForward() {
    this.currentStep++;
    this.bookingService.updateCurrentStep(this.currentStep);
    this.bookingService.updateCurrentStepDescription('checkout')
    localStorage.setItem('travel_insurance', String(this.travelInsurance));
    this.bookingService.travelInsurance = this.travelInsurance;
  }

  isContinueButtonDisabled(): boolean {
    return false;
  }

}
