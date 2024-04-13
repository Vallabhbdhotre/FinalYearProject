import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http:HttpClient) { }
   //add bank data
   baseUrl: any = 'http://localhost:8001/bankcard';
   addBank(data: any) {
    return this.http.post(`${this.baseUrl}/add`, data);
   }
   //get Bank
   getBankdetails():Observable<any>{
     return this.http.get<any>(`${this.baseUrl}/all`)
   }
   //get Bank by id
   getByid(id:any):Observable<any>{
     return this.http.get<any>(`${this.baseUrl}/${id}`)
   }
 
   //update Bank 
   updateBank(id:any ,data:any):Observable<any>{
     return this.http.put(`${this.baseUrl}/${id}`,data)
   }
   deleteBank(id:any){
     return this.http.delete(`${this.baseUrl}/${id}`)
   }
}
