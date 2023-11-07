import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  baseUrl: any = '';
  login(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
