import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginservice: LoginService,
    private snack: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get controls() {
    return this.loginForm.controls;
  }
  login() {
    if (this.loginForm.valid) {
      this.loginservice.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            console.log('logged in');
            localStorage.setItem('token', res.token);
            this.snack.open('Succesfully logged in', '', {
              duration: 2000,
              verticalPosition: 'top',
            });
          }
        },
        error: (error) => {
          console.log(error);
          if (error.status == 412) {
            this.snack.open('Invalid Username or Password !', '', {
              duration: 2000,
              verticalPosition: 'top',
            });
          } else {
            this.snack.open('Something went wrong !', '', {
              duration: 2000,
              verticalPosition: 'top',
            });
          }
        },
      });
    }
    else{
      this.loginForm.markAllAsTouched();
      alert('Fill all mandate Fields !')
    }
  }
}
