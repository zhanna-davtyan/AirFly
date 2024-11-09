import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {FlightSearchComponent} from "../flight-search/flight-search.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-flight-search-container',
  standalone: true,
    imports: [
        CardModule,
        FlightSearchComponent,
        TranslateModule
    ],
  templateUrl: './flight-search-container.component.html',
  styleUrl: './flight-search-container.component.css'
})
export class FlightSearchContainerComponent {

}
