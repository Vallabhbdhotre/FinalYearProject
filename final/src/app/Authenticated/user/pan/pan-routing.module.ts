import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanComponent } from './pan/pan.component';
import { AddPanComponent } from './add-pan/add-pan.component';

const routes: Routes = [
  {
    path:'',component:PanComponent,pathMatch:'full'
  },
  {
    path:'add_pan',component:AddPanComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanRoutingModule { }
