import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from "../../booking/booking.model";
import { CurrencyPipe, DatePipe } from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-email-content',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    TranslateModule,
    ProgressSpinnerModule
  ],
  templateUrl: './email-content.component.html',
  styleUrls: ['./email-content.component.css']
})
export class EmailContentComponent implements OnInit {
  @Input() booking!: Booking;
  isLoading = true;
  error: string | null = null;

  constructor() {}

  ngOnInit() {
    if (this.booking) {
      this.isLoading = false;
    } else {
      this.error = 'Fehler: Keine Buchungsdaten gefunden.';
      this.isLoading = false;
    }
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
      if(passenger.type === 'adult'){
        numberOfAdults++;
      }
    })
    return numberOfAdults;
  }

  getNumberOfChildren(): number {
    let numberOfChildren = 0;
    this.booking.passengers.forEach(passenger => {
      if(passenger.type === 'child'){
        numberOfChildren++;
      }
    })
    return numberOfChildren;
  }

  getNumberOfBabies(): number {
    let numberOfBabies = 0;
    this.booking.passengers.forEach(passenger => {
      if(passenger.type === 'baby'){
        numberOfBabies++;
      }
    })
    return numberOfBabies;
  }

  calculateTotalOutgoingPrice(){
    return (this.getNumberOfAdults() + this.getNumberOfChildren()) * this.booking.bookingFlightMappings[0].flight.price
  }

  calculateTotalReturnPrice(){
    return (this.getNumberOfAdults() + this.getNumberOfChildren()) * this.booking.bookingFlightMappings[1].flight.price
  }

  calculateTotal(){
    if(this.booking.bookingFlightMappings.length === 1){
      return this.calculateTotalOutgoingPrice();
    }
    return this.calculateTotalOutgoingPrice() + this.calculateTotalReturnPrice();
  }
}
