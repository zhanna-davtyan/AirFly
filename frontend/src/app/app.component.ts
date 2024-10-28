import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {HeaderComponent} from "./common/shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, HeaderComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
