import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AbouComponent } from './abou/abou.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    
  },
  {
    path: 'aadhar',
    loadChildren: () =>
      import('./../aadhar/aadhar.module').then((m) => m.AadharModule),
  },
  {
    path: 'bank',
    loadChildren: () =>
      import('./../bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'pan',
    loadChildren: () => import('./../pan/pan.module').then((m) => m.PanModule),
  },
  {
    path:'About',component:AbouComponent,pathMatch:'full'
  },
  {
    path:'contact_us',component:ContactComponent,pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
