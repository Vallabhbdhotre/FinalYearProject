import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanRoutingModule } from './pan-routing.module';
import { PanComponent } from './pan/pan.component';
import { AddPanComponent } from './add-pan/add-pan.component';


@NgModule({
  declarations: [
    PanComponent,
    AddPanComponent
  ],
  imports: [
    CommonModule,
    PanRoutingModule
  ]
})
export class PanModule { }
