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
    MenuComponent
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

    this.billingAddressForm = this.formBuilder.group({
      billingFirstname: [null, Validators.required],
      billingLastname: [null, Validators.required],
      billingPostcode: [null, Validators.required],
      billingCity: [null, Validators.required],
      billingStreet: [null, Validators.required],
      billingHousenumber: [null, Validators.required],
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
    this.bookingService.submitOrder(this.billingAddressForm).subscribe({
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
