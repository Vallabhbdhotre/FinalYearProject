import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AadharService {
  constructor(private http: HttpClient) {}
  //add aadhar data
  baseUrl: any = 'http://localhost:8001/aadhar';
  addAadhar(data: any) {
   return this.http.post(`${this.baseUrl}/add`, data);
  }
  //get aadhar
  getAadhar():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/all`)
  }
  //get aadhar by id
  getByid(id:any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`)
  }

  //update aadhar 
  updateAadhar(id:any ,data:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,data)
  }
  deleteAadhar(id:any){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

}
