export class LoginModel {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.password = password;
    this.email = email;
  }
}
