import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-abou',
  templateUrl: './abou.component.html',
  styleUrls: ['./abou.component.css']
})
export class AbouComponent {
constructor(private location : Location){}
back(){
  this.location.back()
}
}
