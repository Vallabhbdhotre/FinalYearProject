import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
