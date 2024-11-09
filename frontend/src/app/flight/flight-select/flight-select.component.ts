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
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {CalendarModule} from "primeng/calendar";
import {Passenger} from "../../passenger/passenger.model";
import {CheckboxModule} from "primeng/checkbox";
import {SidebarModule} from "primeng/sidebar";
import {FieldsetModule} from "primeng/fieldset";
import {InputNumberModule} from "primeng/inputnumber";
import {BookingForInsert} from "../../booking/booking-for-insert.model";
import {BookingService} from "../../booking/booking.service";

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
    InputNumberModule
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
  selectedOutwardFlightId!: number;
  selectedOutwardCategoryId!: number;
  selectedReturnFlightId!: number;
  selectedReturnCategoryId!: number;
  formGroup!: FormGroup;
  maxDate: Date = new Date();
  passengerArray!: Passenger[];
  travelInsurance!: boolean;
  billingAddressForm!: FormGroup;

  constructor(
    private router: Router,
    protected flightService: FlightService,
    protected categoryService: CategoryService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formBuilder: FormBuilder,
    protected bookingService: BookingService
  ) {
  }

  get passengers() {
    return this.formGroup.get('passengers') as FormArray;
  }


  submitOrder() {
    let passengerArray: Passenger[] = [];

    this.passengers.controls.forEach((passenger) => {
      passengerArray.push(
        new Passenger(
          passenger.get('type')?.value,
          passenger.get('firstname')?.value,
          passenger.get('lastname')?.value,
          passenger.get('dateOfBirth')?.value
        )
      )
    });

    let booking = new BookingForInsert(
      this.travelInsurance,
      passengerArray,
      this.selectedOutwardFlightId,
      this.selectedOutwardCategoryId,
      this.selectedReturnFlightId,
      this.selectedReturnCategoryId,
      this.billingAddressForm.get('billingFirstname')?.value,
      this.billingAddressForm.get('billingLastname')?.value,
      this.billingAddressForm.get('billingPostcode')?.value,
      this.billingAddressForm.get('billingCity')?.value,
      this.billingAddressForm.get('billingStreet')?.value,
      this.billingAddressForm.get('billingHousenumber')?.value,
    )
    this.deleteAllFromLocalStorage();
    this.bookingService.submitOrder(booking).subscribe({
      next: () => {
        this.router.navigate(['/booking-success'])
      },
      error: () => {
        this.router.navigate(['/error'])
      }
    })
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      passengers: this.formBuilder.array([])
    });

    this.billingAddressForm = this.formBuilder.group({
      billingFirstname: [null, Validators.required],
      billingLastname: [null, Validators.required],
      billingPostcode: [null, Validators.required],
      billingCity: [null, Validators.required],
      billingStreet: [null, Validators.required],
      billingHousenumber: [null, Validators.required],
    })

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
    if (localStorage.getItem('outward_flight_id')) {
      this.selectedOutwardFlightId = toNumber(localStorage.getItem('outward_flight_id'));
    }
    if (localStorage.getItem('outward_category_id')) {
      this.selectedOutwardCategoryId = toNumber(localStorage.getItem('outward_category_id'));
    }
    if (localStorage.getItem('return_flight_id')) {
      this.selectedReturnFlightId = toNumber(localStorage.getItem('return_flight_id'));
    }
    if (localStorage.getItem('return_category_id')) {
      this.selectedReturnCategoryId = toNumber(localStorage.getItem('return_category_id'));
    }
    if (localStorage.getItem('travel_insurance')) {
      this.travelInsurance = Boolean(localStorage.getItem('travel_insurance'));
    } else {
      this.travelInsurance = false;
    }
    if (localStorage.getItem('passengers')) {
      this.passengerArray = JSON.parse(localStorage.getItem('passengers')!);
      this.passengerArray.forEach((passenger: Passenger) => {
        this.passengers.push(
          this.formBuilder.group({
            type: passenger.type,
            firstname: [passenger.firstname, Validators.required],
            lastname: [passenger.lastname, Validators.required],
            dateOfBirth: [new Date(passenger.dateOfBirth), Validators.required]
          }, {validators: this.ageRangeValidator})
        )
      });
    } else {
      if (this.adults) {
        for (let i: number = 0; i < this.adults; i++) {
          this.passengers.push(
            this.formBuilder.group({
              id: 0,
              type: "adult",
              firstname: ["", Validators.required],
              lastname: ["", Validators.required],
              dateOfBirth: [null, Validators.required]
            }, {validators: this.ageRangeValidator})
          )
        }
      }
      if (this.children) {
        for (let i: number = 0; i < this.children; i++) {
          this.passengers.push(
            this.formBuilder.group({
              id: 0,
              type: "child",
              firstname: ["", Validators.required],
              lastname: ["", Validators.required],
              dateOfBirth: [null, Validators.required]
            }, {validators: this.ageRangeValidator})
          )
        }
      }
      if (this.babies) {
        for (let i: number = 0; i < this.babies; i++) {
          this.passengers.push(
            this.formBuilder.group({
              id: 0,
              type: "baby",
              firstname: ["", Validators.required],
              lastname: ["", Validators.required],
              dateOfBirth: [null, Validators.required]
            }, {validators: this.ageRangeValidator})
          )
        }
      }
    }

    this.flightService.getByFlightSearchWithDate(
      new FlightSearchWithDate(
        this.departureAirportId,
        this.arrivalAirportId,
        this.adults + this.children,
        this.outwardFlightTime
      )
    ).subscribe((response) => {
      if(response.length === 0){
        this.deleteAllFromLocalStorage();
        this.router.navigate(['/flight-unavailable']);
      }
      else{
        this.outwardFlights = response;
      }
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
        if(response.length === 0){
          this.deleteAllFromLocalStorage();
          this.router.navigate(['/flight-unavailable']);
        }
        else{
          this.returnFlights = response;
        }
      });
    }

    this.categoryService.getAll().subscribe((response: Category[]) => {
      this.categories = response;
    })
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
      localStorage.setItem('current_step', '1');
      localStorage.setItem('current_step_description', 'outgoing-flight');
      this.currentStepDescription = 'outgoing-flight';
    }
    if (this.currentStep === 3) {
      this.currentStep--;
      localStorage.setItem('current_step', '2');
      if (this.numberOfSteps === 5) {
        localStorage.setItem('current_step_description', 'return-flight');
        this.currentStepDescription = 'return-flight';
      } else {
        localStorage.setItem('current_step_description', 'passengers');
        this.currentStepDescription = 'passengers';
      }
    }
    if (this.currentStep === 4) {
      this.currentStep--;
      localStorage.setItem('current_step', '3');
      if (this.numberOfSteps === 5) {
        localStorage.setItem('current_step_description', 'passengers');
        this.currentStepDescription = 'passengers';
      } else {
        localStorage.setItem('current_step_description', 'travel-insurance');
        this.currentStepDescription = 'travel-insurance';
      }
    }
    if (this.currentStep === 5) {
      this.currentStep--;
      localStorage.setItem('current_step', '4');
      localStorage.setItem('current_step_description', 'travel-insurance');
      this.currentStepDescription = 'travel-insurance';
    }
    this.changeDetectorRef.detectChanges();
  }

  goForward() {
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
        this.passengerArray = [];
        this.passengers.controls.forEach((passenger) => {
          this.passengerArray.push(
            new Passenger(
              passenger.get('type')?.value,
              passenger.get('firstname')?.value,
              passenger.get('lastname')?.value,
              passenger.get('dateOfBirth')?.value
            )
          )
        });
        localStorage.setItem('passengers', JSON.stringify(this.passengerArray));
        localStorage.setItem('current_step_description', 'travel-insurance');
        this.currentStepDescription = 'travel-insurance';
      }
    } else if (this.currentStep === 3) {
      this.currentStep = 4;
      localStorage.setItem('current_step', '4');
      if (this.numberOfSteps === 5) {
        this.passengerArray = [];
        this.passengers.controls.forEach((passenger) => {
          this.passengerArray.push(
            new Passenger(
              passenger.get('type')?.value,
              passenger.get('firstname')?.value,
              passenger.get('lastname')?.value,
              passenger.get('dateOfBirth')?.value
            )
          )
        });
        localStorage.setItem('passengers', JSON.stringify(this.passengerArray));
        localStorage.setItem('current_step_description', 'travel-insurance');
        this.currentStepDescription = 'travel-insurance';
      } else {
        localStorage.setItem('travel_insurance', String(this.travelInsurance));
        localStorage.setItem('current_step_description', 'checkout');
        this.currentStepDescription = 'checkout';
      }
    } else if (this.currentStep === 4) {
      this.currentStep = 5;
      localStorage.setItem('current_step', '5');
      localStorage.setItem('travel_insurance', String(this.travelInsurance));
      localStorage.setItem('current_step_description', 'checkout');
      this.currentStepDescription = 'checkout';
    }
    this.changeDetectorRef.detectChanges();
  }

  isContinueButtonDisabled(): boolean {
    if (this.currentStep === 1) {
      return !this.selectedOutwardFlightId || !this.selectedOutwardCategoryId;
    } else if (this.currentStep === 2) {
      if (this.numberOfSteps === 5) {
        return !this.selectedReturnFlightId || !this.selectedReturnCategoryId;
      } else if (this.numberOfSteps === 4) {
        return !this.formGroup.valid;
      }
    } else if (this.currentStep === 3) {
      if (this.numberOfSteps === 5) {
        return !this.formGroup.valid;
      } else if (this.numberOfSteps === 4) {
        return false;
      }
    } else if (this.currentStep === 4) {
      if (this.numberOfSteps === 5) {
        return false;
      }
      if (this.numberOfSteps === 4) {
        return true;
      }
    } else if (this.currentStep === 5) {
      return true;
    }
    return false;
  }

  ageRangeValidator(control: AbstractControl): ValidationErrors | null {
    const type = control.get('type')?.value;
    const dateOfBirth = control.get('dateOfBirth')?.value;

    if (dateOfBirth) {
      const today = new Date();
      const dob = new Date(dateOfBirth);

      const ageInYears = today.getFullYear() - dob.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

      const effectiveAge = hasHadBirthdayThisYear ? ageInYears : ageInYears - 1;

      if (type === 'adult' && effectiveAge < 12) {
        return {notAdult: true};
      }

      if (type === 'child' && (effectiveAge < 2 || effectiveAge > 11)) {
        return {notChild: true};
      }

      if (type === 'baby' && (effectiveAge < 0 || effectiveAge > 1)) {
        return {notBaby: true};
      }
    }
    return null;
  }

  deleteAllFromLocalStorage(){
    localStorage.removeItem('departure_airport_id');
    localStorage.removeItem('outward_category_id');
    localStorage.removeItem('outward_flight_id');
    localStorage.removeItem('outward_flight_time');

    localStorage.removeItem('arrival_airport_id');
    localStorage.removeItem('return_category_id');
    localStorage.removeItem('return_flight_id');
    localStorage.removeItem('return_flight_time');

    localStorage.removeItem('adults');
    localStorage.removeItem('children');
    localStorage.removeItem('babies');

    localStorage.removeItem('current_step');
    localStorage.removeItem('current_step_description');
    localStorage.removeItem('passengers');
    localStorage.removeItem('travel_insurance');
  }

}
