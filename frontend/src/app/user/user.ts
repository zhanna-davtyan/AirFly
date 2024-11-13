export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  token: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    token: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.token = token;
  }
}
