import { Component, makeEnvironmentProviders } from '@angular/core';
import { Location } from '@angular/common';
import { PanService } from 'src/app/services/panService/pan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-pan',
  templateUrl: './add-pan.component.html',
  styleUrls: ['./add-pan.component.css'],
})
export class AddPanComponent {
  panform: FormGroup;
  isEdit: boolean = false;
  id: any;

  constructor(
    private location: Location,
    private panService: PanService,
    private fb: FormBuilder,
    private router: Router,
    private mat: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.panform = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
        ],
      ],
      dateOfBirth: ['', Validators.required],
      panNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
        ],
      ],
    });
    this.id = this.route.snapshot.paramMap.get('id');
    {
      if (this.id != null || this.id != undefined) {
        this.isEdit = true;
      }
    }
    this.getById(this.id);
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
        confirmButtonText: 'Encrypt',
      }).then((result) => {
        if (result.isConfirmed) {
          this.panService.addPan(this.panform.value).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Encrypted!',
                text: 'Pan Details has been Encrypted Successfully.',
                icon: 'success',
              });
              console.log('Submitted !', res);
              this.panform.reset();
              this.router.navigate(['user/dashboard/pan/view_pan']);
            },
            error: (error) => {
              if (error.status == 412) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Warning',
                  text: 'User with same PAN number already exist in system !',
                });
                // this.mat.open('User with same PAN number already exist in system !','',{duration:2000,horizontalPosition:'center'})
              } else {
                Swal.fire({
                  title: 'Failed !',
                  text: 'Failed to Encrypt Pan details !',
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

  getById(id: any) {
    this.panService.getByid(id).subscribe({
      next: (res) => {
        if (res) {
          this.panform.patchValue({
            name: res.name,
            dateOfBirth: res.dateOfBirth,
            panNumber: res.panNumber,
          });
        }
      },
      error: (error) => {
        console.log('Data with id Not found !', error);
      },
    });
  }
  updatepan() {
    if (this.panform.valid) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
      }).then((result) => {
        if (result.isConfirmed) {
          this.panService.updatePan(this.id, this.panform.value).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Updated !',
                text: 'Pan Details has been updated .',
                icon: 'success',
              });
              console.log('Submitted !');
              this.panform.reset();
              this.router.navigate(['user/dashboard/pan/view_pan', this.id]);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                title: 'Failed !',
                text: 'Failed to update the Pan details !',
                icon: 'error',
              });
            },
          });
        }
      });
    } else {
      this.panform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }
}
