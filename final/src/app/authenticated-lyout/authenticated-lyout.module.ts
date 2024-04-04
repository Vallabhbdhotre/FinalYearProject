import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticatedLyoutRoutingModule } from './authenticated-lyout-routing.module';
import { AuthenticatedLyoutComponent } from './authenticated-lyout/authenticated-lyout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActualBodyComponent } from './actual-body/actual-body.component';
import { FooterComponent } from './footer/footer.component';
console.warn('Authenticated loaded');

@NgModule({
  declarations: [
    AuthenticatedLyoutComponent,
    NavbarComponent,
    SidebarComponent,
    ActualBodyComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthenticatedLyoutRoutingModule
  ]
})
export class AuthenticatedLyoutModule { }
