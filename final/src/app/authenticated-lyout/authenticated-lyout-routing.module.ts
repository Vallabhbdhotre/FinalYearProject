import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'admin', loadChildren:()=>import('./../Authenticated/adminr/adminr.module').then((m)=>m.AdminrModule)
  },
  {
    path:'user',loadChildren:()=>import('./../Authenticated/user/user.module').then((m)=>m.UserModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedLyoutRoutingModule {}
