import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  baseUrl: any = 'http://localhost:8001/login';
  login(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }


  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.clear();
  }
  isloggedin(){
    let loginToken = localStorage.getItem('token');
    if(loginToken){
      return true;
    }
    else{
      return false
    }
  }
}
