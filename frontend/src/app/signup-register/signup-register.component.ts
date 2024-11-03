import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-signup-register',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './signup-register.component.html',
  styleUrl: './signup-register.component.css'
})
export class SignupRegisterComponent {
  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    email: '',
    password: ''
  };

  onLoginSubmit() {
  }

  onRegisterSubmit() {
  }
}

