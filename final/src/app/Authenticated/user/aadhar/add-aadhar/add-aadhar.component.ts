import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { LoadChildren } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-aadhar',
  templateUrl: './add-aadhar.component.html',
  styleUrls: ['./add-aadhar.component.css'],
})
export class AddAadharComponent {
  constructor(private location: Location) {}
  

  back() {
    this.location.back();
  }
  submit(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submited!",
          text: "Aadhar Details has been submitted.",
          icon: "success"
        });
        console.log("Submitted !")
      }
    });
  }
  
}
