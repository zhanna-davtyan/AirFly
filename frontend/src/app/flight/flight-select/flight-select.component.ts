import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {toNumber} from "lodash";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AvatarModule} from "primeng/avatar";
import {TabViewModule} from "primeng/tabview";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {FlightSearchComponent} from "../flight-search/flight-search.component";
import {FlightService} from "../flight.service";
import {FlightSearchWithDate} from "../flight-search-with-date.model";
import {Flight} from "../flight.model";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {TimelineModule} from "primeng/timeline";
import {CarouselModule} from "primeng/carousel";
import {CategoryService} from "../../category/category.service";
import {Category} from "../../category/category.model";
import {ButtonDirective} from "primeng/button";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-flight-select',
  standalone: true,
  imports: [
    TranslateModule,
    AvatarModule,
    TabViewModule,
    NgForOf,
    AccordionModule,
    FlightSearchComponent,
    CardModule,
    DividerModule,
    TimelineModule,
    DatePipe,
    CurrencyPipe,
    CarouselModule,
    ButtonDirective
  ],
  templateUrl: './flight-select.component.html',
  styleUrl: './flight-select.component.css'
})
export class FlightSelectComponent implements OnInit {
  departureAirportId!: number;
  arrivalAirportId!: number;
  outwardFlightTime!: Date;
  returnFlightTime!: Date;
  adults!: number;
  children!: number;
  babies!: number;
  currentStep!: number;
  currentStepDescription!: string;
  numberOfSteps!: number;
  outwardFlights: Flight[] = [];
  returnFlights: Flight[] = [];
  categories: Category[] = [];
  selectedDepartureFlightId!: number;
  selectedDepartureCategoryId!: number;
  selectedReturnFlightId!: number;
  selectedReturnCategoryId!: number;
  passengersForm!: FormGroup;

  constructor(
    private router: Router,
    protected flightService: FlightService,
    protected categoryService: CategoryService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    const requiredFields = [
      'departure_airport_id',
      'arrival_airport_id',
      'outward_flight_time',
      'adults',
      'children',
      'babies',
      'current_step',
      'current_step_description'
    ];



    const missingField = requiredFields.find(field => !localStorage.getItem(field));
    if (missingField) {
      this.router.navigate(['/']);
      return;
    }

    this.departureAirportId = toNumber(localStorage.getItem('departure_airport_id')!);
    this.arrivalAirportId = toNumber(localStorage.getItem('arrival_airport_id')!);
    this.outwardFlightTime = new Date(toNumber(localStorage.getItem('outward_flight_time'))!);
    if (localStorage.getItem('return_flight_time')) {
      this.returnFlightTime = new Date(toNumber(localStorage.getItem('return_flight_time'))!);
      this.numberOfSteps = 5;
    } else {
      this.numberOfSteps = 4;
    }
    this.adults = toNumber(localStorage.getItem('adults')!);
    this.children = toNumber(localStorage.getItem('children')!);
    this.babies = toNumber(localStorage.getItem('babies')!);
    this.currentStep = toNumber(localStorage.getItem('current_step')!);
    this.currentStepDescription = localStorage.getItem('current_step_description')!;
    if (localStorage.getItem('departure_flight_id')) {
      this.selectedDepartureFlightId = toNumber(localStorage.getItem('departure_flight_id'));
    }
    if (localStorage.getItem('departure_category_id')) {
      this.selectedDepartureCategoryId = toNumber(localStorage.getItem('departure_category_id'));
    }

    this.flightService.getByFlightSearchWithDate(
      new FlightSearchWithDate(
        this.departureAirportId,
        this.arrivalAirportId,
        this.adults + this.children,
        this.outwardFlightTime
      )
    ).subscribe((response) => {
      this.outwardFlights = response;
    })

    if (this.returnFlightTime) {
      this.flightService.getByFlightSearchWithDate(
        new FlightSearchWithDate(
          this.arrivalAirportId,
          this.departureAirportId,
          this.adults + this.children,
          this.returnFlightTime
        )
      ).subscribe((response) => {
        this.returnFlights = response;
      });
    }

    this.categoryService.getAll().subscribe((response: Category[]) => {
      this.categories = response;
    })
  }

  getTimeDifference(departureTime: any, arrivalTime: any): string {
    // Convert to Date if not already a Date object
    const depTime = departureTime instanceof Date ? departureTime : new Date(departureTime);
    const arrTime = arrivalTime instanceof Date ? arrivalTime : new Date(arrivalTime);

    // Check if both depTime and arrTime are valid dates
    if (isNaN(depTime.getTime()) || isNaN(arrTime.getTime())) {
      return 'Invalid Date';
    }

    // Calculate the difference in milliseconds
    const diffMs = Math.abs(depTime.getTime() - arrTime.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  onDepartureFlightSelection(flightId: number, categoryId: number) {
    this.selectedDepartureFlightId = flightId;
    this.selectedDepartureCategoryId = categoryId;
    localStorage.setItem('departure_flight_id', String(flightId));
    localStorage.setItem('departure_category_id', String(categoryId));
  }

  onReturnFlightSelection(flightId: number, categoryId: number) {
    this.selectedReturnFlightId = flightId;
    this.selectedReturnCategoryId = categoryId;
    localStorage.setItem('return_flight_id', String(flightId));
    localStorage.setItem('return_category_id', String(categoryId));
  }

  submit() {
    if (this.currentStep === 1) {
      this.currentStep = 2;
      localStorage.setItem('current_step', '2');
      if (this.numberOfSteps === 5) {
        localStorage.setItem('current_step_description', 'return-flight');
        this.currentStepDescription = 'return-flight';
      } else {
        localStorage.setItem('current_step_description', 'passengers');
        this.currentStepDescription = 'passengers';
      }
    } else if (this.currentStep === 2) {
      this.currentStep = 3;
      localStorage.setItem('current_step', '3');
      if (this.numberOfSteps === 5) {
        localStorage.setItem('current_step_description', 'passengers');
        this.currentStepDescription = 'passengers';
      } else {
        localStorage.setItem('current_step_description', 'travel-insurance');
        this.currentStepDescription = 'travel-insurance';
      }
    } else if (this.currentStep === 3) {
      this.currentStep = 4;
      localStorage.setItem('current_step', '4');
      if (this.numberOfSteps === 5) {
        localStorage.setItem('current_step_description', 'travel-insurance');
        this.currentStepDescription = 'travel-insurance';
      } else {
        localStorage.setItem('current_step_description', 'payment');
        this.currentStepDescription = 'payment';
      }
    } else if (this.currentStep === 4) {
      this.currentStep = 5;
      localStorage.setItem('current_step', '5');
      localStorage.setItem('current_step_description', 'payment');
      this.currentStepDescription = 'payment';
    }
    this.changeDetectorRef.detectChanges();
  }

  isContinueButtonDisabled(): boolean {
    if (this.currentStep === 1) {
      // Step 1
      return !this.selectedDepartureFlightId || !this.selectedDepartureCategoryId;
    } else if (this.currentStep === 2) {
      if (this.numberOfSteps === 5) {
        // Step 2, 5 steps total
        return !this.selectedReturnFlightId || !this.selectedReturnCategoryId;
      } else if (this.numberOfSteps === 4) {
        // Step 2, 4 steps total
        return !this.passengersForm.valid;
      }
    } else if (this.currentStep === 3) {
      if (this.numberOfSteps === 5) {
        // Step 3, 5 steps total
        return !this.passengersForm.valid;
      } else if (this.numberOfSteps === 4) {
        // Step 3, 4 steps total: no disabling
        return false;
      }
    } else if (this.currentStep === 4) {
      if (this.numberOfSteps === 5) {
        // Step 4, 5 steps total: no disabling
        return false;
      }
    }
    return false;
  }
}
