import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { FlightSearchComponent } from '../flight/flight-search/flight-search.component';
import { MenuSidebarService } from './menu-sidebar.service';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'flights', component: FlightSearchComponent },
];
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, SidebarModule, RouterModule],
  templateUrl: './menu.component.html',

  styleUrls: ['./menu.component.css'],
})

export class MenuComponent implements OnInit {
  constructor(private menusidebarService: MenuSidebarService) {}
  visibleSidebar: boolean = false;

  items = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Flüge', icon: 'pi pi-send', routerLink: '/flights' },
    {
      label: 'Reiseziele',
      icon: 'pi pi-map-marker',
      routerLink: '/destinations',
    },
  ];

  ngOnInit() {
    this.menusidebarService.isSidebarVisible$.subscribe((value) => {
      this.visibleSidebar = value;
    });
  }

  toggleSidebar() {
    this.menusidebarService.toggleSidebar();
  }
}
