import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailData } from './email-data';

@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor(private http: HttpClient) {}

  sendEmail(emailData: EmailData): Observable<any> {
    return this.http.post('/api/send-email', emailData, { responseType: 'text' });
  }
}
