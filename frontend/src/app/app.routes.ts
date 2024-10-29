import { Routes } from '@angular/router';
import {FlightOverviewComponent} from "./flight/flight-overview/flight-overview.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

export const routes: Routes = [
  { path: 'all-flights', component: FlightOverviewComponent },
  { path: '', component: LandingPageComponent }

];
