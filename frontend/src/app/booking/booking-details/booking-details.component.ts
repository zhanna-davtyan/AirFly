import {Component, Input, OnInit, Optional} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {BookingService} from "../booking.service";
import {Booking} from "../booking.model";
import {Router} from "@angular/router";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TranslateModule} from "@ngx-translate/core";
import {CurrencyPipe, DatePipe, NgClass, NgIf} from "@angular/common";
import {AccordionModule} from "primeng/accordion";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {FieldsetModule} from "primeng/fieldset";
import {Big} from "big.js";

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    TranslateModule,
    DatePipe,
    CurrencyPipe,
    AccordionModule,
    DividerModule,
    CardModule,
    PanelModule,
    NgClass,
    NgIf,
    FieldsetModule,
  ],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit {

  @Input() bookingIdFromSuccessPage!: number;
  booking!: Booking;
  isFromOverviewPage!: boolean;

  constructor(
    @Optional() private dynamicDialogConfig: DynamicDialogConfig,
    private bookingService: BookingService,
    private router: Router,
    @Optional() private dynamicDialogRef: DynamicDialogRef,
  ) {
  }

  ngOnInit(): void {
    let bookingIdToTake: number;
    if (this.bookingIdFromSuccessPage) {
      bookingIdToTake = this.bookingIdFromSuccessPage; //From success page after ordering
      this.isFromOverviewPage = false;
    } else {
      bookingIdToTake = this.dynamicDialogConfig.data.bookingId //From BookingOverview
      this.isFromOverviewPage = true;
    }
    this.bookingService.getById(bookingIdToTake).subscribe({
      next: (booking: Booking) => {
        this.booking = booking;
      },
      error: () => {
        this.dynamicDialogRef.close();
        this.router.navigate(['/error'])
      }
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

  getNumberOfAdults(): number {
    let numberOfAdults = 0;
    this.booking.passengers.forEach(passenger => {
      if (passenger.type === 'adult') {
        numberOfAdults++;
      }
    })
    return numberOfAdults;
  }

  getNumberOfChildren(): number {
    let numberOfChildren = 0;
    this.booking.passengers.forEach(passenger => {
      if (passenger.type === 'child') {
        numberOfChildren++;
      }
    })
    return numberOfChildren;
  }

  getNumberOfBabies(): number {
    let numberOfBabies = 0;
    this.booking.passengers.forEach(passenger => {
      if (passenger.type === 'baby') {
        numberOfBabies++;
      }
    })
    return numberOfBabies;
  }

  calculateTotalOutgoingPrice() {
    return Number(
      Big(this.getNumberOfAdults())
        .plus(this.getNumberOfChildren())
        .times(
          Big(this.booking.bookingFlightMappings[0].flight.price)
            .plus(this.booking.bookingFlightMappings[0].category.price)
        )
    );
  }

  calculateTotalReturnPrice() {
    return Number(
      Big(this.getNumberOfAdults())
        .plus(this.getNumberOfChildren())
        .times(
          Big(this.booking.bookingFlightMappings[1].flight.price)
            .plus(this.booking.bookingFlightMappings[0].category.price)
        )
    );
  }

  calculateTotal() {
    let total = Big(0);
    if(this.booking.travelInsurance){
      total = total.add(50);
    }
    if (this.booking.bookingFlightMappings.length === 1) {
      return Number(total.add(this.calculateTotalOutgoingPrice()));
    }
    return Number(total.add(
      Big(this.calculateTotalOutgoingPrice()).plus(
        this.calculateTotalReturnPrice()))
    );
  }
}
