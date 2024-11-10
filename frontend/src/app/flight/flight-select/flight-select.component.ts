import {Component, OnInit} from '@angular/core';
import {toNumber} from "lodash";
import {Router, RouterLink} from "@angular/router";
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
import {
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {SidebarModule} from "primeng/sidebar";
import {FieldsetModule} from "primeng/fieldset";
import {InputNumberModule} from "primeng/inputnumber";
import {BookingService} from "../../booking/booking.service";
import {DropdownModule} from "primeng/dropdown";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {BaseComponent} from "../../common/components/base/base.component";

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
    ButtonDirective,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    CalendarModule,
    CheckboxModule,
    FormsModule,
    SidebarModule,
    FieldsetModule,
    InputNumberModule,
    RouterLink,
    DropdownModule,
    OverlayPanelModule
  ],
  templateUrl: './flight-select.component.html',
  styleUrl: './flight-select.component.css'
})
export class FlightSelectComponent extends BaseComponent implements OnInit {
  departureAirportId!: number;
  arrivalAirportId!: number;
  outwardFlightTime!: Date;
  returnFlightTime!: Date;

  currentStep!: number;
  numberOfSteps!: number;

  outwardFlights: Flight[] = [];
  returnFlights: Flight[] = [];
  categories: Category[] = [];
  selectedOutwardFlightId!: number;
  selectedOutwardCategoryId!: number;
  selectedReturnFlightId!: number;
  selectedReturnCategoryId!: number;
  numberOfPassengers!: number;

  constructor(
    private router: Router,
    protected flightService: FlightService,
    protected categoryService: CategoryService,
    protected bookingService: BookingService
  ) {
    super()
  }


  ngOnInit() {
    this.initializeDataFromLocalStorage();

    this.currentStep = toNumber(localStorage.getItem('current_step')!);
    if (localStorage.getItem('return_flight_time')) {
      this.numberOfSteps = 5;
    } else {
      this.numberOfSteps = 4;
    }

    this.bookingService.updateCurrentStep(toNumber(localStorage.getItem('current_step')!));
    this.bookingService.updateCurrentStepDescription(localStorage.getItem('current_step_description')!);

    this.flightService.getByFlightSearchWithDate(
      new FlightSearchWithDate(
        this.departureAirportId,
        this.arrivalAirportId,
        this.numberOfPassengers,
        this.outwardFlightTime
      )
    ).subscribe((response) => {
      if (response.length === 0) {
        this.bookingService.deleteBookingDataFromLocalStorage();
        this.router.navigate(['/flight-unavailable']);
      } else {
        this.outwardFlights = response;
      }
    })
    if (this.returnFlightTime) {
      this.flightService.getByFlightSearchWithDate(
        new FlightSearchWithDate(
          this.arrivalAirportId,
          this.departureAirportId,
          this.numberOfPassengers,
          this.returnFlightTime
        )
      ).subscribe((response) => {
        if (response.length === 0) {
          this.bookingService.deleteBookingDataFromLocalStorage();
          this.router.navigate(['/flight-unavailable']);
        } else {
          this.returnFlights = response;
        }
      });
    }
    this.categoryService.getAll().subscribe((response: Category[]) => {
      this.categories = response;
    })
  }

  initializeDataFromLocalStorage() {
    const fields = [
      {key: 'departure_airport_id', property: 'departureAirportId'},
      {key: 'arrival_airport_id', property: 'arrivalAirportId'},
      {key: 'outward_flight_time', property: 'outwardFlightTime', isDate: true},
      {key: 'return_flight_time', property: 'returnFlightTime', isDate: true},
      {key: 'outward_flight_id', property: 'selectedOutwardFlightId'},
      {key: 'outward_category_id', property: 'selectedOutwardCategoryId'},
      {key: 'return_flight_id', property: 'selectedReturnFlightId'},
      {key: 'return_category_id', property: 'selectedReturnCategoryId'}
    ];

    fields.forEach(({key, property, isDate}) => {
      const value = localStorage.getItem(key);
      if (value) {
        (this as any)[property] = isDate ? new Date(toNumber(value)) : toNumber(value);
      }
    });

    this.numberOfPassengers = 0;
    ['adults', 'children'].forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        this.numberOfPassengers += toNumber(value);
      }
    });
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

  onOutwardFlightSelection(flightId: number, categoryId: number) {
    this.selectedOutwardFlightId = flightId;
    this.selectedOutwardCategoryId = categoryId;
    localStorage.setItem('outward_flight_id', String(flightId));
    localStorage.setItem('outward_category_id', String(categoryId));
  }

  onReturnFlightSelection(flightId: number, categoryId: number) {
    this.selectedReturnFlightId = flightId;
    this.selectedReturnCategoryId = categoryId;
    localStorage.setItem('return_flight_id', String(flightId));
    localStorage.setItem('return_category_id', String(categoryId));
  }

  goBack() {
    if (this.currentStep === 2) {
      this.currentStep--;
      this.bookingService.updateCurrentStep(this.currentStep);
      this.bookingService.updateCurrentStepDescription('outgoing-flight')
    }
  }

  goForward() {
    this.bookingService.selectedOutwardFlightId = this.selectedOutwardFlightId;
    this.bookingService.selectedOutwardCategoryId = this.selectedOutwardCategoryId;
    this.bookingService.selectedReturnFlightId = this.selectedReturnFlightId;
    this.bookingService.selectedReturnCategoryId = this.selectedReturnCategoryId;
    if (this.currentStep === 1) {
      this.currentStep++;
      this.bookingService.updateCurrentStep(this.currentStep);
      if (this.numberOfSteps === 5) {
        this.bookingService.updateCurrentStepDescription('return-flight')

      } else {
        this.bookingService.updateCurrentStepDescription('passengers')

      }
    } else if (this.currentStep === 2) {
      this.currentStep++;
      this.bookingService.updateCurrentStep(this.currentStep);
      this.bookingService.updateCurrentStepDescription('passengers')
    }
  }

  isContinueButtonDisabled(): boolean {
    if (this.currentStep === 1) {
      return !this.selectedOutwardFlightId || !this.selectedOutwardCategoryId;
    } else {
      return !this.selectedReturnFlightId || !this.selectedReturnCategoryId;
    }
  }
}
