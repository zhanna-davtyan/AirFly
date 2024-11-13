import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {

}
