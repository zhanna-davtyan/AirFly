import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../common/components/base/base.component";
import {BookingService} from "../../booking/booking.service";
import {TranslateModule} from "@ngx-translate/core";
import {CardModule} from "primeng/card";
import {CheckboxModule} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";
import {ButtonDirective} from "primeng/button";
import {toNumber} from "lodash";
import {BookingSelectDetailsComponent} from "../../booking/booking-select-details/booking-select-details.component";

@Component({
  selector: 'app-travel-insurance-select',
  standalone: true,
  imports: [
    TranslateModule,
    CardModule,
    CheckboxModule,
    FormsModule,
    ButtonDirective,
    BookingSelectDetailsComponent
  ],
  templateUrl: './travel-insurance-select.component.html',
  styleUrl: './travel-insurance-select.component.css'
})
export class TravelInsuranceSelectComponent extends BaseComponent implements OnInit{

  travelInsurance: boolean = false;
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

    if(localStorage.getItem('travel_insurance')){
      if(localStorage.getItem('travel_insurance') === "true"){
        this.travelInsurance = true;
      }
      else{
        this.travelInsurance = false;
      }
    }
  }

  onClick(event: any){
    this.bookingService.updateTravelInsuranceSubject(event.checked);
    localStorage.setItem('travel_insurance', String(this.travelInsurance));
  }


  goBack() {
    this.currentStep--;
    this.bookingService.updateCurrentStep(this.currentStep);
    this.bookingService.updateCurrentStepDescription('passengers')
    localStorage.setItem('travel_insurance', String(this.travelInsurance));
    this.bookingService.updateTravelInsuranceSubject(this.travelInsurance);
  }

  goForward() {
    this.currentStep++;
    this.bookingService.updateCurrentStep(this.currentStep);
    this.bookingService.updateCurrentStepDescription('checkout')
    localStorage.setItem('travel_insurance', String(this.travelInsurance));
    this.bookingService.updateTravelInsuranceSubject(this.travelInsurance);
  }

  isContinueButtonDisabled(): boolean {
    return false;
  }

}
