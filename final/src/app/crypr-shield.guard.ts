import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const cryprShieldGuard: CanActivateFn = (route, state) => {
  
  const auth=inject(LoginService)
  const router =inject(Router)
  const Mat =inject(MatSnackBar)
  if(auth.isloggedin()){
    return true
  }
  else{
    Mat.open('You need to sign in first !');
    return false;
    
  }

};
