import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css'],
})
export class AddBankComponent {
  creditStatus:boolean=true;
  debitStatus:boolean=true;
  bankform: FormGroup;
  constructor(private location: Location, private fb: FormBuilder) {
    this.bankform = this.fb.group({
      bankinfo: this.fb.group({
        bankName: ['', Validators.required],
        accountNo: [null, Validators.required],
        accountHoldersName: ['', Validators.required],
        ifsc: ['', Validators.required],
      }),
      creditcard: this.fb.array([]),
    });
  }
  back() {
    this.location.back();
  }
  cardfields() {
    return this.fb.group({
      cardNo: [null],
      pin: [null],
      cvv: [null],
      expiry: [Date],
    });
  }
  get cardArray(){
    return this.bankform.get('creditcard') as FormArray;
  }
  addCredit(){
    this.creditStatus=!this.creditStatus
    this.cardArray.push(this.cardfields())
    console.log(this.creditStatus);

  }
  adddebit(){
    this.debitStatus=!this.debitStatus
    this.cardArray.push(this.cardfields())
  }
  removecard(index:number){
    this.creditStatus=!this.creditStatus
    this.cardArray.removeAt(index);
  }

  submit(){
    if(this.bankform.valid){
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
            text: "Bank Details has been submitted.",
            icon: "success"
          });
          console.log("Submitted !")
          this.bankform.reset()
        }
      });
      
    }
    else{
      this.bankform.markAllAsTouched();
      alert('All fields are required !');
    }
    
  }
}
