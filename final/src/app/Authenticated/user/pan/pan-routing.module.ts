import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanComponent } from './pan/pan.component';
import { AddPanComponent } from './add-pan/add-pan.component';
import { ViewPanComponent } from './view-pan/view-pan.component';

const routes: Routes = [
  {
    path:'',component:PanComponent,pathMatch:'full'
  },
  {
    path:'add_pan',component:AddPanComponent,pathMatch:'full'
  },
  {
    path:'view_pan',component:ViewPanComponent,pathMatch:'full'
  },
  {
    path:'update_pan/:id',component:AddPanComponent,pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanRoutingModule { }
