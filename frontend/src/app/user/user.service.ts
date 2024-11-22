import { AbstractCrudService } from '../common/service/abstract-crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { SignUpModel } from './signup.model';
import { LoginModel } from './login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractCrudService<User> {
  constructor(httpClient: HttpClient, protected messageService: MessageService, protected translateService: TranslateService) {
    super(httpClient, '/api');
    const token = localStorage.getItem('AuthToken');
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!token);
  }

  jsonToDto(json: any): User {
    return new User(
      json.id,
      json.firstName,
      json.lastName,
      json.email,
      json.token
    );
  }

  register(signUpModel: SignUpModel): Observable<User> {
    return this.httpClient.post<User>('/api/register', signUpModel);
  }

  login(loginModel: LoginModel): Observable<User> {
    return this.httpClient.post<User>('/api/login', loginModel);
  }

  private isLoggedInSubject: BehaviorSubject<boolean>;

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem('AuthToken', token);
    this.isLoggedInSubject.next(true);
  }

  deleteToken(): void {
    localStorage.removeItem('AuthToken');
    this.isLoggedInSubject.next(false);
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant('successfully-logged-out'),
      life: 2000,
    })
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('AuthToken');
    if (!token) return false;
    const decode: any = jwtDecode(token);
    return decode.isAdmin;
  }
}
