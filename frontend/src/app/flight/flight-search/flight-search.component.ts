import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {FloatLabelModule} from "primeng/floatlabel";
import {SidebarModule} from "primeng/sidebar";
import {FlightService} from "../flight.service";
import {AirportService} from "../../airport/airport.service";
import {Airport} from "../../airport/airport.model";
import {Flight} from "../flight.model";
import {FlightSearch} from "../flight-search.model";
import {Router} from "@angular/router";
import {toNumber} from "lodash";

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CardModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    NgClass,
    CalendarModule,
    InputTextModule,
    TranslateModule,
    FloatLabelModule,
    SidebarModule,
    NgIf
],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  showPassengers: boolean = false;
  airportOptions: { label: string, value: number }[] = [];
  filteredDepartureOptions: { label: string; value: number }[] = [];
  filteredArrivalOptions: { label: string; value: number }[] = [];
  formGroup!: FormGroup;
  invalidOutwardFlightDateOptions: Date[] = [];
  invalidReturnFlightDateOptions: Date[] = [];
  minDate = new Date();
  maxDate = new Date();

  constructor(
    protected flightService: FlightService,
    protected airportService: AirportService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formBuilder: FormBuilder,
    protected translateService: TranslateService,
    protected router: Router
  ) {
  }

  onAirportClear() {
    this.formGroup.patchValue({
      outwardFlightTime: null,
      returnFlightTime: null,
      adults: 0,
      children: 0,
      babies: 0
    })
  }

  getPassengerInfo(): string {
    const adults = this.formGroup.get('adults')?.value;
    const children = this.formGroup.get('children')?.value;
    const babies = this.formGroup.get('babies')?.value;

    const parts: string[] = [];

    if (adults > 0) {
      parts.push(`${adults} ${this.translateService.instant(adults === 1 ? 'adult' : 'adults')}`);
    }
    if (children > 0) {
      parts.push(`${children} ${this.translateService.instant(children === 1 ? 'child' : 'children')}`);
    }
    if (babies > 0) {
      parts.push(`${babies} ${this.translateService.instant(babies === 1 ? 'baby' : 'babies')}`);
    }

    return parts.join(', ');
  }

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 60);
    this.minDate.setHours(0,0,0,0);
    this.formGroup = this.formBuilder.group({
      departureAirportId: [null, [Validators.required]],
      arrivalAirportId: [null, [Validators.required]],
      outwardFlightTime: [null, [Validators.required]],
      returnFlightTime: [null],
      adults: [0],
      children: [0],
      babies: [0]
    });
    this.formGroup.get('adults')?.valueChanges.subscribe(adultsCount => {
      const babiesControl = this.formGroup.get('babies');
      babiesControl?.setValidators([
        Validators.max(adultsCount)
      ]);
      babiesControl?.updateValueAndValidity(); // Refresh validation
    });
    this.airportService.getAll().subscribe({
      next: (airports: Airport[]) => {
        this.airportOptions = airports.map(airport => ({
          label: airport.code + " - " + airport.name,
          value: airport.id
        }));
        this.filteredArrivalOptions = this.airportOptions;
        this.filteredDepartureOptions = this.airportOptions;
      },
      complete: () => {
        this.formGroup.get('departureAirportId')?.valueChanges.subscribe(() => {
          this.updateFilteredOptions();
        });

        this.formGroup.get('arrivalAirportId')?.valueChanges.subscribe(() => {
          this.updateFilteredOptions();
        });
        if (this.router.url.includes('/select-flight')) {
          this.formGroup.get('departureAirportId')?.setValue(toNumber(localStorage.getItem("departure_airport_id")));
          this.formGroup.get('arrivalAirportId')?.setValue(toNumber(localStorage.getItem("arrival_airport_id")));
          this.formGroup.get('outwardFlightTime')?.setValue(new Date(toNumber(localStorage.getItem("outward_flight_time")!)));
          this.formGroup.get('returnFlightTime')?.setValue(localStorage.getItem("return_flight_time") ? new Date(toNumber(localStorage.getItem("return_flight_time"))) : null);
          this.formGroup.get('adults')?.setValue(toNumber(localStorage.getItem("adults")));
          this.formGroup.get('children')?.setValue(toNumber(localStorage.getItem("children")));
          this.formGroup.get('babies')?.setValue(toNumber(localStorage.getItem("babies")));
          this.onPassengerHide()
          this.changeDetectorRef.detectChanges();
        }
      }
    })

    }

  updateFilteredOptions() {
    const selectedDepartureId = this.formGroup.get('departureAirportId')?.value;
    const selectedArrivalId = this.formGroup.get('arrivalAirportId')?.value;

    this.filteredArrivalOptions = this.airportOptions.filter(
      airport => airport.value !== selectedDepartureId
    );

    this.filteredDepartureOptions = this.airportOptions.filter(
      airport => airport.value !== selectedArrivalId
    );
    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.markForCheck();
  }

  submit() {
    const outwardFlightTime = this.formGroup.get('outwardFlightTime')?.value;
    const now = new Date();
    outwardFlightTime.setHours(now.getHours(), now.getMinutes(), now.getSeconds());


    localStorage.setItem("departure_airport_id", this.formGroup.get('departureAirportId')?.value);
    localStorage.setItem("arrival_airport_id", this.formGroup.get('arrivalAirportId')?.value);
    localStorage.setItem("outward_flight_time", outwardFlightTime.getTime().toString());
    if (this.formGroup.get('returnFlightTime')?.value != null) {
      const returnFlightTimeValue = this.formGroup.get('returnFlightTime')?.value;
      const returnFlightDate = new Date(returnFlightTimeValue);
      returnFlightDate.setHours(23, 59, 59);
      localStorage.setItem("return_flight_time", returnFlightDate.getTime().toString());
    }
    localStorage.setItem("adults", this.formGroup.get('adults')?.value);
    localStorage.setItem("children", this.formGroup.get('children')?.value);
    localStorage.setItem("babies", this.formGroup.get('babies')?.value);
    localStorage.setItem("current_step", "1");
    localStorage.setItem("current_step_description", "outgoing-flight")
    if(this.router.url.includes('/select-flight')){
      window.location.reload()
    }
    this.router.navigate(['/select-flight']);
  }

  checkFieldsAndShowPassengers() {
    const departureAirportId = this.formGroup.get('departureAirportId')?.value;
    const arrivalAirportId = this.formGroup.get('arrivalAirportId')?.value;
    if (departureAirportId && arrivalAirportId) {
      this.showPassengers = true;
    }
  }

  onPassengerHide() {
    const departureAirportId = this.formGroup.get('departureAirportId')?.value;
    const arrivalAirportId = this.formGroup.get('arrivalAirportId')?.value;
    const numberOfPassengers = this.formGroup.get('adults')?.value + this.formGroup.get('children')?.value;
    if (numberOfPassengers != 0) {
      if (departureAirportId && arrivalAirportId) {
        this.flightService.getByFlightSearch(
          new FlightSearch(
            departureAirportId,
            arrivalAirportId,
            numberOfPassengers
          )
        ).subscribe((response: Flight[]) => {
          this.invalidOutwardFlightDateOptions = [];
          this.createInvalidDatesArray(response, this.invalidOutwardFlightDateOptions);
        });

        this.flightService.getByFlightSearch(
          new FlightSearch(
            arrivalAirportId,
            departureAirportId,
            numberOfPassengers
          )
        ).subscribe((response: Flight[]) => {
          this.invalidReturnFlightDateOptions = [];
          this.createInvalidDatesArray(response, this.invalidReturnFlightDateOptions);
        });
      }
    }
  }

  onPassengerClick(){
      this.formGroup.patchValue({
        outwardFlightTime: null,
        returnFlightTime: null
      })
    if(this.formGroup.get('adults')?.value < this.formGroup.get('babies')?.value){
      this.formGroup.get('babies')?.setValue(this.formGroup.get('adults')?.value)
    }
  }

  private createInvalidDatesArray(response: Flight[], invalidDates: Date[]) {

    const departureTimes = response.map(flight => new Date(flight.departureTime).toDateString());

    const currentDate = new Date(this.minDate); // Start from minDate
    const endDate = new Date(this.maxDate); // End at maxDate

    while (currentDate <= endDate) {
      const isValidDate = !departureTimes.includes(currentDate.toDateString());

      if (isValidDate) {
        invalidDates.push(new Date(currentDate));
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.changeDetectorRef.detectChanges()
  }

}
