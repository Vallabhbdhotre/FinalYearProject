import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snack: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      Name: ['', Validators.required],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: [null, Validators.required],
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
      this.signupService.signup(this.signupForm.value).subscribe({
        next:(res)=>{
          this.Toast.fire({
            icon: 'success',
            title: 'User registered successfully',
          });
          this.router.navigate(['auth/login']);
        },
        error:(error)=>{
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong !',
          });
          console.log('error',error);

        }
      })
    } else {
      this.signupForm.markAllAsTouched();
      Swal.fire({
        text: 'Fill all manadatory fields !',
      });
    }
  }
}
