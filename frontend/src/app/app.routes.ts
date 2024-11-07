import { Routes } from '@angular/router';
import { FlightOverviewComponent } from './flight/flight-overview/flight-overview.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FlightSelectComponent } from './flight/flight-select/flight-select.component';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent },
  { path: 'select-flight', component: FlightSelectComponent },
  { path: '', component: LandingPageComponent },
  { path: 'app-flight-search', component: FlightSearchComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
