import { Component } from '@angular/core';
import { BankService } from 'src/app/services/bankService/bank.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css'],
})
export class ViewBankComponent {
  constructor(
    private service: BankService,
    private location: Location,
    private router: Router
  ) {
    this.getData();
  }
  bankData: any[] = [];

  getData() {
    this.service.getBankdetails().subscribe({
      next: (res) => {
        if (res) {
          this.bankData = res;
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
    this.router.navigate(['']);
  }
  update(id: any) {
    // this.router.navigate(['aadhar/update_aadhar',id])
    this.router.navigate([]);
  }
  delete(id: any) {
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
        this.service.deleteBank(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Bank Details Deleted !',
            });
          },
          error: (error) => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              text: 'Failed to delete Bank Details',
              title: 'Failed',
            });
          },
        });
      }
    });
  }
}
