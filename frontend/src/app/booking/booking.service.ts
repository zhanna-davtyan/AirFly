import {Injectable} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Booking} from "./booking.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookingForInsert} from "./booking-for-insert.model";
import {Passenger} from "../passenger/passenger.model";
import {FormGroup} from "@angular/forms";


@Injectable({providedIn: 'root'})
export class BookingService extends AbstractCrudService<Booking> {

  numberOfSteps: Subject<number> = new Subject<number>();
  currentStep: Subject<number> = new Subject<number>();
  currentStepDescription: Subject<string> = new Subject<string>();

  travelInsurance!: boolean;
  passengers!: Passenger[];
  selectedOutwardFlightId!: number;
  selectedOutwardCategoryId!: number;
  selectedReturnFlightId!: number;
  selectedReturnCategoryId!: number;


  constructor(httpClient: HttpClient) {
    super(httpClient, "bookings");
  }

  updateCurrentStep(currentStep: number) {
    this.currentStep.next(currentStep);
    localStorage.setItem('current_step', currentStep.toString());
  }

  updateCurrentStepDescription(currentStepDescription: string) {
    this.currentStepDescription.next(currentStepDescription);
    localStorage.setItem('current_step_description', currentStepDescription);
  }

  submitOrder(billingAddressForm: FormGroup) {
    let booking = new BookingForInsert(
      this.travelInsurance,
      this.passengers,
      this.selectedOutwardFlightId,
      this.selectedOutwardCategoryId,
      this.selectedReturnFlightId,
      this.selectedReturnCategoryId,
      billingAddressForm.get('billingFirstname')?.value,
      billingAddressForm.get('billingLastname')?.value,
      billingAddressForm.get('billingPostcode')?.value,
      billingAddressForm.get('billingCity')?.value,
      billingAddressForm.get('billingStreet')?.value,
      billingAddressForm.get('billingHousenumber')?.value,
    )
    this.deleteBookingDataFromLocalStorage();
    return this.httpClient
      .post<number>(this.URL_FOR_TYPE + '/submit-order', booking)
  }

  jsonToDto(json: any): Booking {
    return new Booking(
      json.id,
      json.user,
      json.totalPrice,
      json.travelInsurance,
      json.category,
      json.passengers,
      json.bookingFlightMappings,
      json.billingFirstname,
      json.billingLastname,
      json.billingPostcode,
      json.billingCity,
      json.billingStreet,
      json.billingHousenumber
    )
  }

  deleteBookingDataFromLocalStorage() {
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
