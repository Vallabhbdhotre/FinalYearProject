import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanService } from 'src/app/services/panService/pan.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-pan',
  templateUrl: './view-pan.component.html',
  styleUrls: ['./view-pan.component.css'],
})
export class ViewPanComponent {
  viewIndividual: boolean = false;
  individualData: any = {};
  id: any;
  constructor(
    private service: PanService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null || this.id != undefined) {
      this.viewIndividual = true;
    }
    this.getData();
    this.getById(this.id);
  }
  panData: any[] = [];

  getData() {
    this.service.getPan().subscribe({
      next: (res) => {
        if (res) {
          this.panData = res;
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
    this.router.navigate(['user/dashboard/pan/view_pan', id]);
  }
  update(id: any) {
    this.router.navigate(['user/dashboard/pan/update_pan', id]);
  }

  getById(id: any) {
    this.service.getByid(id).subscribe({
      next: (result) => {
        this.individualData = result;
        console.log('data with id received !',);
      },
      error: (error) => {
        console.log(error);
      },
    });
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
        this.service.deletePan(id).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (error) => {
            console.log(error);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'PAN Details Deleted !',
            });
            //   Swal.fire({
            //   icon:'error',
            //   text:'Failed to delete PAN Details',
            //   title:'Failed'
            //  })
          },
        });
      }
    });
  }
}
