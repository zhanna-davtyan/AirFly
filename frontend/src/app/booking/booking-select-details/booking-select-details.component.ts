import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../category/category.service";
import {FlightService} from "../../flight/flight.service";
import {Flight} from "../../flight/flight.model";
import {Category} from "../../category/category.model";
import {Passenger} from "../../passenger/passenger.model";
import {TranslateModule} from "@ngx-translate/core";
import {SidebarModule} from "primeng/sidebar";
import {AccordionModule} from "primeng/accordion";
import {FlightSearchComponent} from "../../flight/flight-search/flight-search.component";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-booking-select-details',
  standalone: true,
  imports: [
    TranslateModule,
    SidebarModule,
    AccordionModule,
    FlightSearchComponent,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './booking-select-details.component.html',
  styleUrl: './booking-select-details.component.css'
})
export class BookingSelectDetailsComponent implements OnInit {

  outwardFlight!: Flight;
  returnFlight!: Flight;

  outwardFlightCategory!: Category;
  returnFlightCategory!: Category;

  adults: number = 0;
  children: number = 0;
  babies: number = 0;

  travelInsurance!: boolean;
  flightInfoSidebar: boolean = false;

  passengers!: Passenger[];

  constructor(
    private flightService: FlightService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    if(localStorage.getItem('outward_flight_id')){
      this.flightService.getById(Number(localStorage.getItem('outward_flight_id'))).subscribe({
        next: (flight: Flight) => {
          this.outwardFlight = flight
        }
      });
    }

    if(localStorage.getItem('return_flight_id')){
      this.flightService.getById(Number(localStorage.getItem('return_flight_id'))).subscribe({
        next: (flight: Flight) => {
          this.returnFlight = flight
        }
      });
    }

    if(localStorage.getItem('outward_category_id')){
      this.categoryService.getById(Number(localStorage.getItem('outward_category_id'))).subscribe({
        next: (category: Category) => {
          this.outwardFlightCategory = category
        }
      });
    }

    if(localStorage.getItem('return_category_id')){
      this.categoryService.getById(Number(localStorage.getItem('return_category_id'))).subscribe({
        next: (category: Category) => {
          this.returnFlightCategory = category
        }
      });
    }

    if(localStorage.getItem('adults')){
      this.adults = Number(localStorage.getItem('adults')!);
    }

    if(localStorage.getItem('children')){
      this.children = Number(localStorage.getItem('children')!);
    }

    if(localStorage.getItem('babies')){
      this.babies = Number(localStorage.getItem('children')!);
    }

    if(localStorage.getItem('travel_insurance')){
      this.travelInsurance = Boolean(localStorage.getItem('travel_insurance')!);
    }

    if(localStorage.getItem('passengers')){
      this.passengers = JSON.parse(localStorage.getItem('passengers')!);
    }
  }

  calculateTotal(): number {
    let total = 0;
    if(this.outwardFlight && this.outwardFlightCategory) {
      total += (this.outwardFlight.price + this.outwardFlightCategory.price) * (this.adults + this.children);
    }
    if(this.returnFlight && this.returnFlightCategory){
      total += (this.returnFlight.price + this.returnFlightCategory.price) * (this.adults + this.children);
    }
    return total;
  }

  getTimeDifference(departureTime: any, arrivalTime: any): string {
    const depTime = departureTime instanceof Date ? departureTime : new Date(departureTime);
    const arrTime = arrivalTime instanceof Date ? arrivalTime : new Date(arrivalTime);

    if (isNaN(depTime.getTime()) || isNaN(arrTime.getTime())) {
      return 'Invalid Date';
    }

    const diffMs = Math.abs(depTime.getTime() - arrTime.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${this.padZero(hours)}:${this.padZero(minutes)}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}