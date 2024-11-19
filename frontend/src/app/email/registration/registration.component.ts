import { Component } from '@angular/core';
import {EmailService} from "../email.service";
import {EmailData} from "../email-data";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  constructor(private emailService: EmailService) { }

  onRegistrationSuccess(userData: any) {
    const emailData: EmailData = {
      bookingId: userData.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      htmlContent: this.generateEmailContent(userData)
    };

    this.emailService.sendEmail(emailData).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }

  generateEmailContent(userData: any): string {
    return `
      <h1>Willkommen bei AirFly, ${userData.firstname}!</h1>
      <p>Vielen Dank für deine Registrierung.</p>
      <p>Du kannst dich jetzt anmelden und deine Reise buchen.</p>
    `;
  }
}

