import { Component } from '@angular/core';
import {FlightSearchComponent} from "../flight/flight-search/flight-search.component";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-landing-page',
  standalone: true,
    imports: [
        FlightSearchComponent,
        CardModule
    ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
