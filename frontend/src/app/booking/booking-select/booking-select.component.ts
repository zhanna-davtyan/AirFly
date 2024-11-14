import {Component, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TabViewModule} from "primeng/tabview";
import {TranslateModule} from "@ngx-translate/core";
import {takeUntil} from "rxjs";
import {BookingService} from "../booking.service";
import {BaseComponent} from "../../common/components/base/base.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SidebarModule} from "primeng/sidebar";
import {FlightSelectComponent} from "../../flight/flight-select/flight-select.component";
import {PassengerSelectComponent} from "../../passenger/passenger-select/passenger-select.component";
import {
  TravelInsuranceSelectComponent
} from "../../travel-insurance/travel-insurance-select/travel-insurance-select.component";
import {FieldsetModule} from "primeng/fieldset";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {PaginatorModule} from "primeng/paginator";
import {ButtonDirective} from "primeng/button";
import {toNumber} from "lodash";
import {BookingDetailsComponent} from "../booking-details/booking-details.component";
import {MenuComponent} from "../../menu/menu.component";
import {BookingSelectDetailsComponent} from "../booking-select-details/booking-select-details.component";

@Component({
  selector: 'app-booking-select',
  standalone: true,
  imports: [
    AvatarModule,
    NgForOf,
    RouterLink,
    TabViewModule,
    TranslateModule,
    SidebarModule,
    FlightSelectComponent,
    PassengerSelectComponent,
    TravelInsuranceSelectComponent,
    FieldsetModule,
    FloatLabelModule,
    ChipsModule,
    ReactiveFormsModule,
    NgIf,
    PaginatorModule,
    ButtonDirective,
    BookingDetailsComponent,
    NgStyle,
    MenuComponent,
    BookingSelectDetailsComponent
  ],
  templateUrl: './booking-select.component.html',
  styleUrl: './booking-select.component.css'
})
export class BookingSelectComponent extends BaseComponent implements OnInit {

  currentStep: number = 0;
  numberOfSteps!: number;
  currentStepDescription: string = "";
  billingAddressForm!: FormGroup;
  bookingId!: number;

  billingFirstname!: string;
  billingLastname!: string;
  billingPostcode!: string;
  billingCity!: string;
  billingStreet!: string;
  billingHousenumber!: string;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder, private router: Router) {
    super()
  }


  ngOnInit() {

    this.bookingService.currentStep
      .pipe(takeUntil(this.garbageCollector))
      .subscribe(currentStep => {
        this.currentStep = currentStep;
      });

    this.bookingService.numberOfSteps
      .pipe(takeUntil(this.garbageCollector))
      .subscribe(numberOfSteps => {
        this.numberOfSteps = numberOfSteps;
      });

    this.bookingService.currentStepDescription
      .pipe(takeUntil(this.garbageCollector))
      .subscribe(currentStepDescription => {
        this.currentStepDescription = currentStepDescription;
      });

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
    }

    if (localStorage.getItem('return_flight_time')) {
      this.bookingService.numberOfSteps.next(5);
    } else {
      this.bookingService.numberOfSteps.next(4);
    }
    this.bookingService.updateCurrentStep(toNumber(localStorage.getItem('current_step')!));
    this.bookingService.updateCurrentStepDescription(localStorage.getItem('current_step_description')!);

    if(localStorage.getItem('billing_firstname')) {
      this.billingFirstname = localStorage.getItem('billing_firstname')!;
    }
    if(localStorage.getItem('billing_lastname')) {
      this.billingLastname = localStorage.getItem('billing_lastname')!;
    }
    if(localStorage.getItem('billing_postcode')) {
      this.billingPostcode = localStorage.getItem('billing_postcode')!;
    }
    if(localStorage.getItem('billing_city')) {
      this.billingCity = localStorage.getItem('billing_city')!;
    }
    if(localStorage.getItem('billing_street')) {
      this.billingStreet = localStorage.getItem('billing_street')!;
    }
    if(localStorage.getItem('billing_housenumber')) {
      this.billingHousenumber = localStorage.getItem('billing_housenumber')!;
    }

    this.billingAddressForm = this.formBuilder.group({
      billingFirstname: [this.billingFirstname ? this.billingFirstname : null, Validators.required],
      billingLastname: [this.billingLastname ? this.billingLastname : null, Validators.required],
      billingPostcode: [this.billingPostcode ? this.billingPostcode : null, Validators.required],
      billingCity: [this.billingCity ? this.billingCity : null, Validators.required],
      billingStreet: [this.billingCity ? this.billingCity : null, Validators.required],
      billingHousenumber: [this.billingHousenumber ? this.billingHousenumber : null, Validators.required],
    })
  }

  goBack() {
    this.currentStep--;
    this.bookingService.updateCurrentStep(this.currentStep);
    this.bookingService.updateCurrentStepDescription('travel-insurance');
  }

  isContinueButtonDisabled(): boolean {
    return true;
  }

  submitOrder() {
    localStorage.setItem('billing_firstname', this.billingAddressForm.get('billingFirstname')?.value);
    localStorage.setItem('billing_lastname', this.billingAddressForm.get('billingLastname')?.value);
    localStorage.setItem('billing_postcode', this.billingAddressForm.get('billingPostcode')?.value);
    localStorage.setItem('billing_city', this.billingAddressForm.get('billingCity')?.value);
    localStorage.setItem('billing_street', this.billingAddressForm.get('billingStreet')?.value);
    localStorage.setItem('billing_housenumber', this.billingAddressForm.get('billingHousenumber')?.value);
    this.bookingService.submitOrder().subscribe({
      next: (bookingId: number) => {
        this.bookingId = bookingId;
        this.currentStepDescription = "";
        this.currentStep = 0;
      },
      error: () => {
        this.router.navigate(['/error'])
      }
    });
  }
}
