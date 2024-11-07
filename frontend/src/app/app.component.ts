import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MenuSidebarService } from './menu/menu-sidebar.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CalendarModule,
    RouterLink,
    MessageModule,
    MessagesModule,
    FlightSearchComponent,
    LandingPageComponent,
    MenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  isSidebarVisible: boolean = false;

  constructor(
    private menuSidebarService: MenuSidebarService,
    private router: Router
  ) {
    this.menuSidebarService.isSidebarVisible$.subscribe((value) => {
      this.isSidebarVisible = value;
    });
  }

  shouldShowMenuAndFooter(): boolean {
    return this.router.url !== '/select-flight';
  }
}
