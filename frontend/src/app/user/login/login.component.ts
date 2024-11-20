import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { SidebarModule } from 'primeng/sidebar';
import { MessageService } from 'primeng/api';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonDirective,
    InputTextModule,
    ReactiveFormsModule,
    SidebarModule,
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
    protected userService: UserService,
    protected messageService: MessageService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login(): void {
    const loginModel = new LoginModel(
      this.formGroup.get('email')?.value,
      this.formGroup.get('password')?.value
    );
    this.userService.login(loginModel).subscribe({
      next: (user) => {
        this.userService.setToken(user.token);
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
}
