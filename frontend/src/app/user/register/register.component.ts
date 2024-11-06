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
import { SignUpModel } from '../signup.model';
import { UserService } from '../user.service';

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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public formGroup: any;
  constructor(
    public formBuilder: FormBuilder,
    protected translateService: TranslateService,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register(): void {
    const signUpModel = new SignUpModel(
      this.formGroup.get('firstName')?.value,
      this.formGroup.get('lastName')?.value,
      this.formGroup.get('email')?.value,
      this.formGroup.get('password')?.value
    );
    this.userService.register(signUpModel).subscribe((user) => {
      localStorage.setItem('authToken', user.token);
    });
  }
}
