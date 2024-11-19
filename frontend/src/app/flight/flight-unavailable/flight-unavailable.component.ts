import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-flight-unavailable',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonDirective,
    RouterLink
  ],
  templateUrl: './flight-unavailable.component.html',
  styleUrl: './flight-unavailable.component.css'
})
export class FlightUnavailableComponent {

}
