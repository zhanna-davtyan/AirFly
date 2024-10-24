import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
