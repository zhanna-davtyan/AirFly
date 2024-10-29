import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";
import {FloatLabelModule} from "primeng/floatlabel";
import {SidebarModule} from "primeng/sidebar";
import {FlightService} from "../flight.service";
import {AirportService} from "../../airport/airport.service";
import {Airport} from "../../airport/airport.model";
import {FlightSearchByAirports} from "../flight-search-by-airports.model";
import {Flight} from "../flight.model";

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
    protected formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.maxDate.setDate(this.maxDate.getDate() + 60);
    this.formGroup = this.formBuilder.group({
      departureAirportId: [null, [Validators.required]],
      arrivalAirportId: [null, [Validators.required]],
      departureTime: [null, [Validators.required]],
      arrivalTime: [null],
      adults: [1, [Validators.required]],
      children: [0],
      babies: [0, Validators.required]
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
  }

  submit() {
  }

  checkFieldsAndShowPassengers() {
    const departureAirportId = this.formGroup.get('departureAirportId')?.value;
    const arrivalAirportId = this.formGroup.get('arrivalAirportId')?.value;
    const departureTime = this.formGroup.get('departureTime')?.value;
    if (departureAirportId && arrivalAirportId && departureTime) {
      this.showPassengers = true;
    }
  }

  onAirportSelect() {
    const departureAirportId = this.formGroup.get('departureAirportId')?.value;
    const arrivalAirportId = this.formGroup.get('arrivalAirportId')?.value;
    if (departureAirportId && arrivalAirportId) {
      this.flightService.getFlightsByAirports(
        new FlightSearchByAirports(
          departureAirportId,
          arrivalAirportId
        )
      ).subscribe((response: Flight[]) => {
        this.invalidOutwardFlightDateOptions = [];
        this.createInvalidDatesArray(response, this.invalidOutwardFlightDateOptions);
      });

      this.flightService.getFlightsByAirports(
        new FlightSearchByAirports(
          arrivalAirportId,
          departureAirportId
        )
      ).subscribe((response: Flight[]) => {
        this.invalidReturnFlightDateOptions = [];
        this.createInvalidDatesArray(response, this.invalidReturnFlightDateOptions);
      });
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

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    this.changeDetectorRef.detectChanges()
  }

}
