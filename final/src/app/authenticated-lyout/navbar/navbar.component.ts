import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName;
 constructor(public loginService:LoginService,private router:Router){
  this.userName=localStorage.getItem('username')
 }
  logOut(){
    this.loginService.logout();
    this.router.navigate(['auth/login'])
  }
  
}
