import { Component } from '@angular/core';
import {FlightSearchComponent} from "../flight/flight-search/flight-search.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
    imports: [
        FlightSearchComponent
    ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
