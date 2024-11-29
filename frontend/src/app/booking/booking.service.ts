import {Injectable, OnInit} from "@angular/core";
import {AbstractCrudService} from "../common/service/abstract-crud.service";
import {Booking} from "./booking.model";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BookingForInsert} from "./booking-for-insert.model";
import {map} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class BookingService extends AbstractCrudService<Booking> implements OnInit {
  numberOfSteps: Subject<number> = new Subject<number>();
  currentStep: Subject<number> = new Subject<number>();
  currentStepDescription: Subject<string> = new Subject<string>();
  travelInsurance: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(httpClient: HttpClient) {
    super(httpClient, "bookings");
  }

  ngOnInit(): void {
    if(localStorage.getItem('travel_insurance')){
      if(localStorage.getItem('travel_insurance') === "true"){
        this.travelInsurance.next(true);
      }
      else{
        this.travelInsurance.next(false);
      }
    }
    if (localStorage.getItem('travel_insurance')) {
    }
  }

  updateTravelInsuranceSubject(status: boolean) {
    this.travelInsurance.next(status);
  }


  updateCurrentStep(currentStep: number) {
    this.currentStep.next(currentStep);
    localStorage.setItem('current_step', currentStep.toString());
  }

  updateCurrentStepDescription(currentStepDescription: string) {
    this.currentStepDescription.next(currentStepDescription);
    localStorage.setItem('current_step_description', currentStepDescription);
  }

  submitOrder() {
    let booking = new BookingForInsert(
      Boolean(localStorage.getItem('travel_insurance')),
      JSON.parse(localStorage.getItem('passengers')!),
      Number(localStorage.getItem('outward_flight_id')),
      Number(localStorage.getItem('outward_category_id')),
      localStorage.getItem('return_flight_id') ? Number(localStorage.getItem('return_flight_id')) : null,
      localStorage.getItem('return_category_id') ? Number(localStorage.getItem('return_category_id')) : null,
      localStorage.getItem('billing_firstname')!,
      localStorage.getItem('billing_lastname')!,
      localStorage.getItem('billing_postcode')!,
      localStorage.getItem('billing_city')!,
      localStorage.getItem('billing_street')!,
      localStorage.getItem('billing_housenumber')!
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

    localStorage.removeItem('billing_firstname');
    localStorage.removeItem('billing_lastname');
    localStorage.removeItem('billing_postcode');
    localStorage.removeItem('billing_city');
    localStorage.removeItem('billing_street');
    localStorage.removeItem('billing_housenumber');
    this.travelInsurance.next(false);
  }

  getAllByUser(): Observable<Booking[]> {
    return this.httpClient
      .get<Booking[]>(this.URL_FOR_TYPE + '/get-all-by-user')
      .pipe(map((dtos: Booking[]) => dtos.map((json: any) => this.jsonToDto(json))));
  }

}
