import {Component, OnInit} from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    Button
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {


  constructor(
  ) {}

  ngOnInit() {
  }
}
