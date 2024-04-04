import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedLyoutComponent } from './authenticated-lyout/authenticated-lyout/authenticated-lyout.component';

const routes: Routes = [
  {
    path:'', redirectTo:'auth' ,pathMatch:'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path:"", component:AuthenticatedLyoutComponent ,children:[
      {
        path:"",loadChildren:()=>import('./authenticated-lyout/authenticated-lyout.module').then((m)=>m.AuthenticatedLyoutModule)
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
