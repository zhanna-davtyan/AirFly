import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../user.service';
import { LoginModel } from '../login.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonDirective,
    InputTextModule,
    ReactiveFormsModule,
    TooltipModule,
    PasswordModule,
    TranslateModule,
  ],
  providers: [DynamicDialogRef],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public formGroup: any;
  constructor(
    public formBuilder: FormBuilder,
    protected translateService: TranslateService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    const loginModel = new LoginModel(
      this.formGroup.get('email')?.value,
      this.formGroup.get('password')?.value
    );
    this.userService.login(loginModel).subscribe((user) => {
      localStorage.setItem('authToken', user.token);
    });
  }
}
