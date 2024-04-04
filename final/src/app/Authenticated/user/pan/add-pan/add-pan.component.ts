import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-pan',
  templateUrl: './add-pan.component.html',
  styleUrls: ['./add-pan.component.css']
})
export class AddPanComponent {
constructor(private location:Location){

}

back(){
this.location.back()
  }
}
