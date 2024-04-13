import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanService {

  constructor(private http:HttpClient) { }
   //add pan data
   baseUrl: any = 'http://localhost:8001/pancard';
   addPan(data: any) {
    return this.http.post(`${this.baseUrl}/add`, data);
   }
   //get pan
   getPan():Observable<any>{
     return this.http.get<any>(`${this.baseUrl}/all`)
   }
   //get pan by id
   getByid(id:any):Observable<any>{
     return this.http.get<any>(`${this.baseUrl}/${id}`)
   }
 
   //update pan 
   updatePan(id:any ,data:any):Observable<any>{
     return this.http.put(`${this.baseUrl}/${id}`,data)
   }
   deletePan(id:any){
     return this.http.delete(`${this.baseUrl}/${id}`)
   }
}
