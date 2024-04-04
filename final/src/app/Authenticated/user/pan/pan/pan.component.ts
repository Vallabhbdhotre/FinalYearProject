import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.css']
})
export class PanComponent {
constructor(private location:Location)
{

}
back(){
this.location.back()
}
}
