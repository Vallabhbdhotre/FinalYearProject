import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PanRoutingModule } from './pan-routing.module';
import { PanComponent } from './pan/pan.component';
import { AddPanComponent } from './add-pan/add-pan.component';
import { ViewPanComponent } from './view-pan/view-pan.component';


@NgModule({
  declarations: [
    PanComponent,
    AddPanComponent,
    ViewPanComponent
  ],
  imports: [
    CommonModule,
    PanRoutingModule,
    ReactiveFormsModule
  ]
})
export class PanModule { }
