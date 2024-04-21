import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  username:any;
constructor(private service:LoginService){
 if(service.isloggedin())
 this.username= localStorage.getItem('username');
}

}
