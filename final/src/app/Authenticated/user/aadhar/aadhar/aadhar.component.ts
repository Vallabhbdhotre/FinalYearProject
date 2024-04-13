import { Component , } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-aadhar',
  templateUrl: './aadhar.component.html',
  styleUrls: ['./aadhar.component.css']
})
export class AadharComponent {
constructor(private location:Location){
  
}
back(){
  this.location.back();
}
}
