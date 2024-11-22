import { Routes } from '@angular/router';
import { FlightOverviewComponent } from './flight/flight-overview/flight-overview.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorComponent } from './error/error.component';
import { FlightUnavailableComponent } from './flight/flight-unavailable/flight-unavailable.component';
import { FlightSearchContainerComponent } from './flight/flight-search-container/flight-search-container.component';
import { BookingSelectComponent } from './booking/booking-select/booking-select.component';
import { BookingAdminOverviewComponent } from './booking/booking-admin-overview/booking-admin-overview.component';
import { BookingOverviewComponent } from './booking/booking-overview/booking-overview.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { adminGuard, userGuard } from './user/AuthGuard';

export const routes: Routes = [
  {
    path: 'all-flights',
    component: FlightOverviewComponent,
    canActivate: [adminGuard],
  },
  { path: 'book-flight', component: BookingSelectComponent },
  { path: 'search-flight', component: FlightSearchContainerComponent },
  { path: 'flight-unavailable', component: FlightUnavailableComponent },

  {
    path: 'all-bookings',
    component: BookingAdminOverviewComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'my-bookings',
    component: BookingOverviewComponent,
    canActivate: [userGuard],
  },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: 'error', component: ErrorComponent },
  { path: '', component: LandingPageComponent },
  { path: '*', component: LandingPageComponent },
];
