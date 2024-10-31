import { Component } from '@angular/core';
import {FlightSearchComponent} from "../flight/flight-search/flight-search.component";
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
    imports: [
    FlightSearchComponent, MenuComponent,
    FooterComponent
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
