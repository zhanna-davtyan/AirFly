import { Component } from '@angular/core';
import {FlightSearchComponent} from "../flight/flight-search/flight-search.component";
import {CardModule} from "primeng/card";
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
    imports: [
    FlightSearchComponent,
    CardModule,
    CarouselModule,
    TranslateModule,
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  destinations = [
    { 
        image: 'assets/img/Tokio.jpg', 
        name: 'Tokyo', 
        price: 1300 
    },
    { 
      image: 'assets/img/Paris.jpg', 
      name: 'Paris', 
        price: 290 
    },
    { 
      image: 'assets/img/Malediven.jpg', 
      name: 'Malediven', 
        price: 537 
    },

];
}
