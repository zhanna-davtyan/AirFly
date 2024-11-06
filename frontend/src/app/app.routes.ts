import { Routes } from '@angular/router';
import { FlightOverviewComponent } from './flight/flight-overview/flight-overview.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
