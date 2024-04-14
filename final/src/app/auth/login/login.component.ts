import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  username:any;
  constructor(
    private fb: FormBuilder,
    private loginservice: LoginService,
    private snack: MatSnackBar,
    private router: Router
  ) {
    localStorage.clear();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  //toast like sweetalert
    Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  get controls() {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.valid) {
      // localStorage.setItem("userData",JSON.stringify(this.loginForm.value))
      // this.router.navigate(['user']);
      let buttonContent = document.getElementById('button');
      if (buttonContent) {
        buttonContent.innerHTML = '<b>Logging in ...</b>';
      }
      this.loginservice.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username',res.username)
            this.Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
            this.router.navigate(['user']);
          }
        },
        error: (error) => {
          if (buttonContent) {
            buttonContent.innerHTML = '<b>Login</b>';
          }
          console.log(error);
          if (error.status == 412 || error.status ==500) {
            this.Toast.fire({
              icon: "error",
              title: "Invalid Username or Password !"
            });
          } else {
            this.Toast.fire({
              icon: "error",
              title: "Something went wrong",
              position:"top"
            });
          }
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Fill all mandate Fields !');
    }
  }
}
