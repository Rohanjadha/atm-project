import { Component } from '@angular/core';

interface Transaction {
  type: 'deposit' | 'withdraw';
  amount: number;
  timestamp: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atm-project';

  note2000Count: number = 0;
  note500Count: number = 0;
  note200Count: number = 0;
  note100Count: number = 0;
  totalAmount: number = 0;
  transactions: Transaction[] = [];
  withDrawalAmount:number=0;

  calculateTotal() {
    this.totalAmount = (
      this.note2000Count * 2000 +
      this.note500Count * 500 +
      this.note200Count * 200 +
      this.note100Count * 100
    );
  }

  deposit() {
    this.transactions.push({
      type: 'deposit',
      amount: +this.totalAmount,
      timestamp: new Date()
    });
    this.resetCounts();
  }

  withdraw() {
   if(this.withDrawalAmount <= this.totalAmount){
    this.transactions.push({
      type: 'withdraw',
      amount: -this.totalAmount,
      timestamp: new Date()
    });
    let remainingAmount = this.withDrawalAmount;
    this.note2000Count = Math.floor(remainingAmount / 2000);
    remainingAmount %= 2000;
    this.note500Count = Math.floor(remainingAmount / 500);
    remainingAmount %= 500;
    this.note200Count = Math.floor(remainingAmount / 200);
    remainingAmount %= 200;
    this.note100Count = Math.floor(remainingAmount / 100);

    this.withDrawalAmount = 0;
   }else {
    console.log('Insufficient funds for withdrawal.');
  }
    this.resetCounts();
  }

  resetCounts() {
    this.note2000Count = 0;
    this.note500Count = 0;
    this.note200Count = 0;
    this.note100Count = 0;
    this.totalAmount = 0;
  }
}
