import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AadharService } from 'src/app/services/aadharService/aadhar.service';
import { Router, TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-aadhar',
  templateUrl: './view-aadhar.component.html',
  styleUrls: ['./view-aadhar.component.css'],
})
export class ViewAadharComponent {
  constructor(private location: Location, private service: AadharService, private router:Router) {
    this.getData();
  }
  aadharData: any[] = [];

  getData() {
    this.service.getAadhar().subscribe({
      next: (res) => {
        if (res) {
          this.aadharData = res;
          console.log('Data received !');
        }
      },
      error: (error) => {
        console.log('Failed to receive the data', error);
      },
    });
  }

  back() {
    this.location.back();
  }
  view(id: any) {
    this.router.navigate([''])
  }
  update(id: any) {
    // this.router.navigate(['aadhar/update_aadhar',id])
    this.router.navigate(['aadhar/update_aadhar',id])
  }
  delete(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then((result)=>{
      if(result.isConfirmed){
        this.service.deleteAadhar(id).subscribe({
          next:()=>{
            
          },
          error:(error)=>{
            Swal.fire({
              icon:"success",
              title:"Success",
              text:"Aadhar Details Deleted !"
            })
          }
        })
      }
    })
      
    
  }
}
