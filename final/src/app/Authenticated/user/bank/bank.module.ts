import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank/bank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { ViewBankComponent } from './view-bank/view-bank.component';


@NgModule({
  declarations: [
    BankComponent,
    AddBankComponent,
    ViewBankComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
    ReactiveFormsModule
  ]
})
export class BankModule { }
