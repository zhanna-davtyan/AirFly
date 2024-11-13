import { AbstractCrudService } from '../common/service/abstract-crud.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { SignUpModel } from './signup.model';
import { LoginModel } from './login.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService extends AbstractCrudService<User> {
  constructor(httpClient: HttpClient) {
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
    console.log(signUpModel);
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
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
