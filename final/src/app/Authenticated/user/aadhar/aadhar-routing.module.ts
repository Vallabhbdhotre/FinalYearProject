import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAadharComponent } from './add-aadhar/add-aadhar.component';
import { AadharComponent } from './aadhar/aadhar.component';
import { ViewAadharComponent } from './view-aadhar/view-aadhar.component';

const routes: Routes = [
  {
    path:'',component:AadharComponent
  },
  {
    path:'add_aadhar',component:AddAadharComponent,pathMatch:'full'
  },
  {
    path:'view_aadhar',component:ViewAadharComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AadharRoutingModule { }
