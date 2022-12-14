/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "ng-app",
  template: `<div>
    <h2>Loan Details</h2>
    <b>Monthly Payment:</b>
    <ng-container *ngIf="monthly_payment; else monthlyelse">
      {{ monthly_payment | currency }}<br />
    </ng-container>
    <ng-template #monthlyelse> N/A </ng-template><br />

    <b>Late Payment Fee : </b>
    <ng-container *ngIf="late_payment; else lateelse">
      {{ late_payment | currency }}<br />
    </ng-container>
    <ng-template #lateelse> N/A </ng-template>
    <br />
  </div>`,
})
export class Test01Component {
  loan_amount: number = 0;
  monthly_payment: number = 20000;
  late_payment = 10000;

  ngOnInit(): void {
    if (this.loan_amount == 0 || this.loan_amount == null) {
      this.monthly_payment = null;
      this.late_payment = null;
    } else if (this.loan_amount != null) {
      this.monthly_payment = 0.02 * this.loan_amount;
      this.late_payment = 0.05 * this.loan_amount;
    }
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
    CommonModule,
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
