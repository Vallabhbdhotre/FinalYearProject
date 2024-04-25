import { Component } from '@angular/core';
import { BankService } from 'src/app/services/bankService/bank.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-bank',
  templateUrl: './view-bank.component.html',
  styleUrls: ['./view-bank.component.css'],
})
export class ViewBankComponent {
  id: any;
  viewIndividual: boolean = false;
  individualData: any = {};
  EncryptedData: any = {};
  viewEncrypted:boolean=true;
  viewPlain:boolean= false;


  constructor(
    private service: BankService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getData();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id != null || this.id != undefined) {
      this.viewIndividual = true;
    }
    this.getById(this.id);
    this.getEncrypted(this.id);
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

  getById(id: any) {
    this.service.getByid(id).subscribe({
      next: (result) => {
        this.individualData = result;
        console.log('Data with id received !');
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
    this.router.navigate(['user/dashboard/bank/view_bank', id]);
  }
  update(id: any) {
    this.router.navigate(['user/dashboard/bank/update_bank', id]);
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
  decrypt() {
    this.getById(this.id);
  }

  getEncrypted(id: any) {
    this.service.getEncryptedById(id).subscribe({
      next: (res) => {
        if (res) {
          this.EncryptedData = res;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  changeStatus(){
    this.viewEncrypted = !this.viewEncrypted;
    this.viewPlain = !this.viewPlain;
  }
}
