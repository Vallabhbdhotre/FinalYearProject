import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private router: Router
  ) {
    
    this.signupForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
        ],
      ],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  get controls() {
    return this.signupForm.controls;
  }

  signup() {
    if (this.signupForm.valid) {
      // localStorage.setItem('userData',JSON.stringify(this.signupForm.value))
      this.signupService.signup(this.signupForm.value).subscribe({
        next: (res:any) => {
          if(res){
            sessionStorage.setItem('username',res.username)
            // localStorage.setItem('username',res.username);
          }
          this.Toast.fire({
            icon: 'success',
            title: 'User registered successfully',
          });
          this.router.navigate(['auth/login']);
        },
        error: (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong !',
          });
          console.log('error', error);
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
      Swal.fire({
        text: 'Fill all manadatory fields !',
      });
    }
  }
}
