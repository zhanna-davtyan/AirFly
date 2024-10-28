import { Routes } from '@angular/router';
import {FlightOverviewComponent} from "./flight/flight-overview/flight-overview.component";

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent }
];
