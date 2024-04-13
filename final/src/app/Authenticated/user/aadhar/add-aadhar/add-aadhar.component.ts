import { Component } from '@angular/core';
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
export class AddAadharComponent {
  aadharBodyStatus: boolean = false;
  aadharform: FormGroup;
  id:any=null;
  isEdit:boolean=false;

  constructor(
    private route:ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private aadharService: AadharService,
    private router: Router,
   
  ) {
    this.aadharform = this.fb.group({
      holderName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      cardNumber: [null, Validators.required],
      gender: ['', Validators.required],
    });
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.isEdit=true;
    }
    this.getById()
  }

  back() {
    this.location.back();
  }
  get controls() {
    return this.aadharform.controls;
  }
  getById(){
  this.aadharService.getByid(this.id).subscribe({
    next:(res)=>{
     if(res){
      this.aadharform.patchValue({
        holderName:res.holderName,
        dateOfBirth:res.dateOfBirth,
        cardNumber:res.cardNumber,
        gender:res.gender
      })
     }
    },
    error:(error)=>{
    console.log('Data with id Not found !',error);
    }
  })
  }
  updateAadhar(){
    if(this.aadharform.valid){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.aadharService.updateAadhar(this.aadharform.value,this.id).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Submited !',
                text: 'Aadhar Details has been updated .',
                icon: 'success',
              });
              console.log('Submitted !');
              this.aadharform.reset();
              this.router.navigate(['aadhar/view_aadhar']);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                title: 'Failed !',
                text: 'Failed to update the aadhar details !',
                icon: 'error',
              });
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
        confirmButtonText: 'Submit',
      }).then((result) => {
        if (result.isConfirmed) {
          this.aadharService.addAadhar(this.aadharform.value).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Submited !',
                text: 'Aadhar Details has been submitted.',
                icon: 'success',
              });
              console.log('Submitted !');
              this.aadharform.reset();
              this.router.navigate(['aadhar/view_aadhar']);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                title: 'Failed !',
                text: 'Failed to submit the aadhar details !',
                icon: 'error',
              });
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
