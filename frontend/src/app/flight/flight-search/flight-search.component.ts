import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {TranslateModule} from "@ngx-translate/core";
import {FloatLabelModule} from "primeng/floatlabel";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CardModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    NgClass,
    CalendarModule,
    InputTextModule,
    TranslateModule,
    FloatLabelModule,
    SidebarModule
  ],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent {
  passengers: boolean = false;

}
