import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../common/components/base/base.component";
import {BookingService} from "../../booking/booking.service";
import {Passenger} from "../passenger.model";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {toNumber} from "lodash";
import {TranslateModule} from "@ngx-translate/core";
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-passenger-select',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CardModule,
    FloatLabelModule,
    CalendarModule,
    InputTextModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './passenger-select.component.html',
  styleUrl: './passenger-select.component.css'
})
export class PassengerSelectComponent extends BaseComponent implements OnInit {

  passengerDataFromLocalStorage!: Passenger[];
  passengerFormGroup!: FormGroup;
  maxBirthdayDate: Date = new Date();

  currentStep!: number;
  numberOfSteps!: number;

  adults!: number;
  children!: number;
  babies!: number;

  constructor(private bookingService: BookingService, private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.currentStep = toNumber(localStorage.getItem('current_step')!);
    if (localStorage.getItem('return_flight_time')) {
      this.numberOfSteps = 5;
    } else {
      this.numberOfSteps = 4;
    }

    this.passengerFormGroup = this.formBuilder.group({
      passengers: this.formBuilder.array([])
    });
    this.adults = toNumber(localStorage.getItem('adults')!);
    this.children = toNumber(localStorage.getItem('children')!);
    this.babies = toNumber(localStorage.getItem('babies')!);

    if (localStorage.getItem('passengers')) {
      this.passengerDataFromLocalStorage = JSON.parse(localStorage.getItem('passengers')!);
      this.passengerDataFromLocalStorage.forEach((passenger: Passenger) => {
        this.passengerFormArray.push(
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
          this.passengerFormArray.push(
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
          this.passengerFormArray.push(
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
          this.passengerFormArray.push(
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
  }

  get passengerFormArray() {
    return this.passengerFormGroup.get('passengers') as FormArray;
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


  goBack() {
    this.currentStep--;
    this.bookingService.updateCurrentStep(this.currentStep);
    if (this.numberOfSteps === 4) {
      this.bookingService.updateCurrentStepDescription('outgoing-flight')
    } else {
      this.bookingService.updateCurrentStepDescription('return-flight')
    }
  }


  goForward() {
    this.currentStep++;
    this.bookingService.updateCurrentStep(this.currentStep);
    let passengerArray: Passenger[] = [];
    this.passengerFormArray.controls.forEach((passenger) => {
      passengerArray.push(
        new Passenger(
          passenger.get('type')?.value,
          passenger.get('firstname')?.value,
          passenger.get('lastname')?.value,
          passenger.get('dateOfBirth')?.value
        )
      )
    });
    localStorage.setItem('passengers', JSON.stringify(passengerArray));
    this.bookingService.updateCurrentStepDescription('travel-insurance');
  }


  isContinueButtonDisabled(): boolean {
    return !this.passengerFormGroup.valid;
  }

}
