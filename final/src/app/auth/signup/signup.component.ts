import { Component } from '@angular/core';
import { FormBuilder ,FormGroup ,Validators} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/services/signup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm:FormGroup;
constructor(private fb:FormBuilder ,private signupService:SignupService ,private snack:MatSnackBar, private router:Router) {
  this.signupForm=this.fb.group({
    Name:['',Validators.required],
    userName:['' ,[Validators.required ,Validators.minLength(4)]],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    phone:[null,Validators.required]
  })
}
get controls(){
  return this.signupForm.controls;
}

signup(){
  if(this.signupForm.valid){
    this.signupService.signup(this.signupForm.value).subscribe({
      next:(res)=>{
      this.snack.open('user registered succesfully !');
      this.router.navigate(['../login']);
      console.log('success',res);
      },
      error:(error)=>{
        this.snack.open('Something went Wrong !','',{duration:2000 ,verticalPosition:'top'});
        console.log('error',error);
        
      }
    })
  }
  else{
    this.signupForm.markAllAsTouched();
    alert('Fill all manadatory fields !');
  }
}
}
