import { Routes } from '@angular/router';
import {FlightOverviewComponent} from "./flight/flight-overview/flight-overview.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import { SignupRegisterComponent } from './signup-register/signup-register.component';
import {BookingSuccessComponent} from "./booking/booking-success/booking-success.component";
import {ErrorComponent} from "./error/error.component";
import {FlightUnavailableComponent} from "./flight/flight-unavailable/flight-unavailable.component";
import {FlightSearchContainerComponent} from "./flight/flight-search-container/flight-search-container.component";
import {BookingSelectComponent} from "./booking/booking-select/booking-select.component";

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent },
  { path: 'book-flight', component: BookingSelectComponent },
  { path: '', component: LandingPageComponent },
  { path: 'app-signup-register', component: SignupRegisterComponent },
  { path: 'search-flight', component: FlightSearchContainerComponent },
  { path: 'booking-success', component: BookingSuccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'flight-unavailable', component: FlightUnavailableComponent },
  { path: '', component: LandingPageComponent },
  { path: '*', component: LandingPageComponent }
];
