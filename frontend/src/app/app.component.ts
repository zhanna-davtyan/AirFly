import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { HeaderComponent } from './common/shared/header/header.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CalendarModule,
    HeaderComponent,
    RouterLink,
    MessageModule,
    MessagesModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
