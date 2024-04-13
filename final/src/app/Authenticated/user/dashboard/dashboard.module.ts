import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AbouComponent } from './abou/abou.component';
import { ContactComponent } from './contact/contact.component';
import { NgxTypedJsModule } from 'ngx-typed-js';


@NgModule({
  declarations: [
    DashboardComponent,
    AbouComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxTypedJsModule
  ]
})
export class DashboardModule { }
