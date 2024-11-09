import {Component, OnInit} from '@angular/core';
import {FlightSearchComponent} from "../flight/flight-search/flight-search.component";
import {CardModule} from "primeng/card";
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {AvatarModule} from "primeng/avatar";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {RouterLink} from "@angular/router";
import {ButtonDirective} from "primeng/button";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FlightSearchComponent,
    CardModule,
    AvatarModule,
    OverlayPanelModule,
    RouterLink,
    ButtonDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
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

  showContinueBooking: Boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('outward_flight_id')){
      this.showContinueBooking = true;
    }


  }


}
