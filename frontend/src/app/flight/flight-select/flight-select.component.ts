import {Component, OnInit} from '@angular/core';
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
    CarouselModule
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
  categories: Category[] = [];
  selectedDepartureFlightId!: number;
  selectedDepartureCategoryId!: number;

  constructor(
    private router: Router,
    protected flightService: FlightService,
    protected categoryService: CategoryService
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

    // Check for missing values in localStorage
    const missingField = requiredFields.find(field => !localStorage.getItem(field));
    if (missingField) {
      this.router.navigate(['/']); // Redirect to root if any field is missing
      return;
    }

    this.departureAirportId = toNumber(localStorage.getItem('departure_airport_id')!);
    this.arrivalAirportId = toNumber(localStorage.getItem('arrival_airport_id')!);
    this.outwardFlightTime = new Date(toNumber(localStorage.getItem('outward_flight_time'))!);
    if (localStorage.getItem('return_flight_time')) {
      this.returnFlightTime = new Date(toNumber(localStorage.getItem('return_flight_time'))!);
      this.numberOfSteps = 5;
    }
    else{
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
    ).subscribe((response) =>{
      this.outwardFlights = response;
    })

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

  onSelection(flightId: number, categoryId: number) {
    this.selectedDepartureFlightId = flightId;
    this.selectedDepartureCategoryId = categoryId;
    localStorage.setItem('departure_flight_id', String(flightId))
    localStorage.setItem('departure_category_id', String(categoryId))
  }
}
