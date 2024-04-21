import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { BankService } from 'src/app/services/bankService/bank.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css'],
})
export class AddBankComponent {
  creditStatus: boolean = true;
  debitStatus: boolean = true;
  bankform: FormGroup;
  id: any;
  isEdit: boolean = false;
  constructor(
    private location: Location,
    private fb: FormBuilder,
    private bankService: BankService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.bankform = this.fb.group({
      bankName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
        ],
      ],
      accountNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(9),Validators.maxLength(18)]],
      accountHolderName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+(?:\\s[a-zA-Z]+)*$'),
        ],
      ],
      ifscCode: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
        ],
      ],
      debitCardNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(16),
          Validators.pattern("^[0-9]*$")
        ],
      ],
      pin: [null, [Validators.required,Validators.pattern('^[0-9]*$')]],
      cvv: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(3),Validators.pattern("^[0-9]*$")],
      ],
      expiryDate: ['', [Validators.required,]],
      // creditcard: this.fb.array([]),
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null || this.id != undefined) {
      this.isEdit = true;
    }
    this.getById(this.id);
  }
  back() {
    this.location.back();
  }
  // cardfields() {
  //   return this.fb.group({
  //     cardNo: [null],
  //     pin: [null],
  //     cvv: [null],
  //     expiry: [Date],
  //   });
  // }
  // get cardArray() {
  //   return this.bankform.get('creditcard') as FormArray;
  // }
  // addCredit() {
  //   this.creditStatus = !this.creditStatus;
  //   this.cardArray.push(this.cardfields());
  //   console.log(this.creditStatus);
  // }
  // adddebit() {
  //   this.debitStatus = !this.debitStatus;
  //   this.cardArray.push(this.cardfields());
  // }
  // removecard(index: number) {
  //   this.creditStatus = !this.creditStatus;
  //   this.cardArray.removeAt(index);
  // }

  submit() {
    if (this.bankform.valid) {
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
          this.bankService.addBank(this.bankform.value).subscribe({
            next: () => {
              Swal.fire({
                title: 'Encrypted!',
                text: 'Bank Details has been Encrypted Successfully.',
                icon: 'success',
              });
              console.log('Submitted !');
              this.bankform.reset();
            },
            error: (error) => {
              Swal.fire({
                title: 'Failed !',
                text: 'Failed to Encrypt bank details !',
                icon: 'error',
              });
              console.log(error);
            },
          });
        }
      });
    } else {
      this.bankform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }
  get controls() {
    return this.bankform.controls;
  }

  getById(id: any) {
    this.bankService.getByid(id).subscribe({
      next: (res) => {
        if (res) {
          this.bankform.patchValue({
            bankName: res.bankName,
            accountNumber: res.accountNumber,
            accountHolderName: res.accountHolderName,
            ifscCode: res.ifscCode,
            debitCardNumber: res.debitCardNumber,
            pin: res.pin,
            cvv: res.cvv,
            expiryDate: res.expiryDate,
          });
        }
      },
      error: (error) => {
        console.log('Data with id Not found !', error);
      },
    });
  }
  updatebank() {
    if (this.bankform.valid) {
      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Update',
      }).then((result) => {
        if (result.isConfirmed) {
          this.bankService.updateBank(this.id, this.bankform.value).subscribe({
            next: (res) => {
              Swal.fire({
                title: 'Updated !',
                text: 'Bank Details has been updated .',
                icon: 'success',
              });
              console.log('Submitted !');
              this.bankform.reset();
              this.router.navigate(['user/dashboard/bank/view_bank', this.id]);
            },
            error: (error) => {
              console.log(error);
              Swal.fire({
                title: 'Failed !',
                text: 'Failed to update the Bank details !',
                icon: 'error',
              });
            },
          });
        }
      });
    } else {
      this.bankform.markAllAsTouched();
      alert('Fill all mandatory fields !');
    }
  }
}
