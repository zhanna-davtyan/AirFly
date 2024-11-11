import { Routes } from '@angular/router';
import {FlightOverviewComponent} from "./flight/flight-overview/flight-overview.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import { SignupRegisterComponent } from './signup-register/signup-register.component';
import {ErrorComponent} from "./error/error.component";
import {FlightUnavailableComponent} from "./flight/flight-unavailable/flight-unavailable.component";
import {FlightSearchContainerComponent} from "./flight/flight-search-container/flight-search-container.component";
import {BookingSelectComponent} from "./booking/booking-select/booking-select.component";
import {BookingAdminOverviewComponent} from "./booking/booking-admin-overview/booking-admin-overview.component";
import {BookingOverviewComponent} from "./booking/booking-overview/booking-overview.component";

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent },
  { path: 'book-flight', component: BookingSelectComponent },
  { path: 'search-flight', component: FlightSearchContainerComponent },
  { path: 'flight-unavailable', component: FlightUnavailableComponent },

  { path: 'all-bookings', component:  BookingAdminOverviewComponent},
  { path: 'my-bookings', component:  BookingOverviewComponent},

  { path: 'app-signup-register', component: SignupRegisterComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', component: LandingPageComponent },
  { path: '*', component: LandingPageComponent }
];
