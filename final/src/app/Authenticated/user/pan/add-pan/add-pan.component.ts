import { Component, makeEnvironmentProviders } from '@angular/core';
import { Location } from '@angular/common';
import { PanService } from 'src/app/services/panService/pan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-pan',
  templateUrl: './add-pan.component.html',
  styleUrls: ['./add-pan.component.css'],
})
export class AddPanComponent {
  panform: FormGroup;
  constructor(
    private location: Location,
    private panService: PanService,
    private fb: FormBuilder,
    private router: Router,
    private mat:MatSnackBar
  ) {
    this.panform = this.fb.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      panNumber: [null, Validators.required],
    });
  }

  get controls() {
    return this.panform.controls;
  }
  submit() {
    if (this.panform.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        position: 'center',
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.panService.addPan(this.panform.value).subscribe({
            next: () => {
              Swal.fire({
                title: 'Submited!',
                text: 'Pan Details has been submitted.',
                icon: 'success',
              });
              console.log('Submitted !');
              this.panform.reset();
              this.router.navigate(['pan/view_pan']);
            },
            error: (error) => {
              if (error.status == 412) {
                Swal.fire({
                  icon:'warning',
                  title:'Warning',
                  text:'User with same PAN number already exist in system !'
                })
                // this.mat.open('User with same PAN number already exist in system !','',{duration:2000,horizontalPosition:'center'})
              }
              else{
                Swal.fire({
                  title: 'Failed !',
                  text: 'Failed to submit Pan details !',
                  icon: 'error',
                });
              }
              
              console.log(error);
            },
          });
        }
      });
    } else {
      this.panform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }
  back() {
    this.location.back();
  }
}
