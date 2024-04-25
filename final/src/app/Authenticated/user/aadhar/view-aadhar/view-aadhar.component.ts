import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AadharService } from 'src/app/services/aadharService/aadhar.service';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-aadhar',
  templateUrl: './view-aadhar.component.html',
  styleUrls: ['./view-aadhar.component.css'],
})
export class ViewAadharComponent {
  viewIndividual: boolean = false;
  viewPlain:boolean=false;
  viewEncrypted:boolean=true;
  id: any;
  constructor(
    private location: Location,
    private service: AadharService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getData();
    
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null || this.id != undefined) {
      this.viewIndividual = true;
    }
    this.getAadharById(this.id);
    this.getEncrypted(this.id);
  }
  aadharData: any[] = [];
  individualData: any = {};
  EncryptedData:any={};

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
  getAadharById(id: any) {
    this.service.getByid(id).subscribe({
      next: (result) => {
        this.individualData = result;
        console.log('data received!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  back() {
    this.location.back();
  }
  view(id: any) {
    this.router.navigate(['user/dashboard/aadhar/view_aadhar', id]);
  }
  update(id: any) {
    // this.router.navigate(['aadhar/update_aadhar',id])
    this.router.navigate(['user/dashboard/aadhar/update_aadhar', id]);
  }
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteAadhar(id).subscribe({
          next: () => {},
          error: (error) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Aadhar Details Deleted !',
            });
          },
        });
      }
    });
  }
  getEncrypted(id: any) {
    this.service.getEncryptedById(id).subscribe({
      next: (res) => {
        if (res) {
          this.EncryptedData = res;
          console.log(this.EncryptedData);
          
        }
      },
      error: (error) => {
        console.log(error);

        console.log(error.message);
      },
    });
  }
  changeStatus(){
    this.viewEncrypted = !this.viewEncrypted;
    this.viewPlain = !this.viewPlain;
  }
}
