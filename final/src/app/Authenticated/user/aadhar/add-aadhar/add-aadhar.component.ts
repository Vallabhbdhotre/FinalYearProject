import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AadharService } from 'src/app/services/aadharService/aadhar.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-aadhar',
  templateUrl: './add-aadhar.component.html',
  styleUrls: ['./add-aadhar.component.css'],
})
export class AddAadharComponent implements OnInit {
  aadharBodyStatus: boolean = false;
  aadharform: FormGroup;
  id: any;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private aadharService: AadharService,
    private router: Router
  ) {
    this.aadharform = this.fb.group({
      holderName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$")]],
      dateOfBirth: ['', Validators.required],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      gender: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id != null || this.id != undefined) { 
      this.isEdit = true;
    }
    this.getById(this.id);
    console.log('id:', this.id);
  }

  back() {
    this.location.back();
  }
  get controls() {
    return this.aadharform.controls;
  }
  getById(id: any) {
    this.aadharService.getByid(id).subscribe({
      next: (res) => {
        if (res) {
          this.aadharform.patchValue({
            holderName: res.holderName,
            dateOfBirth: res.dateOfBirth,
            cardNumber: res.cardNumber,
            gender: res.gender,
          });
        }
      },
      error: (error) => {
        console.log('Data with id Not found !', error);
      },
    });
  }
  updateAadhar() {
    if (this.aadharform.valid) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
      }).then((result) => {
        if (result.isConfirmed) {
          this.aadharService
            .updateAadhar(this.id, this.aadharform.value)
            .subscribe({
              next: (res) => {
                Swal.fire({
                  title: 'Updated !',
                  text: 'Aadhar Details has been updated .',
                  icon: 'success',
                });
                console.log('Submitted !');
                this.aadharform.reset();
                this.router.navigate([
                  'user/dashboard/aadhar/view_aadhar',
                  this.id,
                ]);
                // this.router.navigate(['user/dashboard/aadhar/view_aadhar'])
              },
              error: (error) => {
                if (error.status == 401) {
                  Swal.fire({
                    // title: 'Failed !',
                    text: 'You need to Sign-in first to update the aadhar details !',
                    icon: 'warning',
                  });
                } else {
                  console.log(error);
                  Swal.fire({
                    title: 'Failed !',
                    text: 'Failed to update the aadhar details !',
                    icon: 'error',
                  });
                }
              },
            });
        }
      });
    } else {
      this.aadharform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }

  submit() {
    if (this.aadharform.valid) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Encrypt',
      }).then((result) => {
        if (result.isConfirmed) {
          this.aadharService.addAadhar(this.aadharform.value).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Encrypted!',
                text: 'Aadhar Details has been Encrypted Successfully.',
                icon: 'success',
              });
              console.log('Submitted !');
              this.aadharform.reset();
              this.router.navigate(['aadhar/view_aadhar']);
            },
            error: (error) => {
              if (error.status == 401) {
                Swal.fire({
                  text: 'You need to Sign-in first to add aadhar details !',
                  icon: 'warning',
                });
              } else {
                console.log(error);
                Swal.fire({
                  title: 'Failed !',
                  text: 'Failed to Encrypt the aadhar details !',
                  icon: 'error',
                });
              }
            },
          });
        }
      });
    } else {
      this.aadharform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }
}
