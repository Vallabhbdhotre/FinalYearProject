import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankComponent } from './bank/bank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { ViewBankComponent } from './view-bank/view-bank.component';

const routes: Routes = [
  {
    path: '',
    component: BankComponent,
    pathMatch: 'full',
  },
  {
    path: 'add_bank',
    component: AddBankComponent,
    pathMatch: 'full',
  },
  {
    path: 'view_bank',
    component: ViewBankComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingModule {}
