import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  FormBuilder,
  FormGroup,
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
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonDirective,
    InputTextModule,
    ReactiveFormsModule,
    DividerModule,
    TooltipModule,
    PasswordModule,
    TranslateModule,
  ],
  providers: [DynamicDialogRef],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public formGroup!: FormGroup;
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  constructor(
    public formBuilder: FormBuilder,
    protected translateService: TranslateService,
    protected userService: UserService,
    protected router: Router,
    protected messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
      password_rep: [
        '',
        [Validators.required, Validators.pattern(this.StrongPasswordRegx)],
      ],
    });
  }

  register(): void {
    if (!this.isFormValid()) return;
    const password = this.formGroup.get('password')?.value;
    const password_rep = this.formGroup.get('password_rep')?.value;

    if (password !== password_rep) {
      this.messageService.add({
        severity: 'error',
        summary: this.translateService.instant('Password-are-not-same'),
        life: 2000,
      });
      return;
    }

    const signUpModel = new SignUpModel(
      this.formGroup.get('firstName')?.value,
      this.formGroup.get('lastName')?.value,
      this.formGroup.get('email')?.value,
      password
    );
    this.userService.register(signUpModel).subscribe({
      next: (user) => {
        this.userService.setToken(user.token);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: this.translateService.instant('Error'),
          life: 2000,
        });
      },
    });
  }

  public isFormValid() {
    return this.formGroup.valid;
  }
}
