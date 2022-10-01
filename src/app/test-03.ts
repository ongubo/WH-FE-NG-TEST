/**
 * Update the following components to meet the requirements :
 *
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 *
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 *
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AbstractControl, FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `<form (ngSubmit)="submit()">
    <h2>Login</h2>
    <br />
    <input type="email" value="" [(ngModel)]="email" name="email" required />
    <div *ngIf="!email_valid">Invalid Email!</div>
    <br />
    <input
      type="password"
      value=""
      [(ngModel)]="password"
      name="password"
      required
    />
    <div *ngIf="!password_valid">Invalid Password!</div>
    <button type="submit">Submit</button>
    <br /><br />
    <div *ngIf="logged_in">Logged In!</div>
  </form>`,
})
export class Test03Component {
  email: string = "";
  password: string = "";

  logged_in = false;
  valid_auth = false;
  email_valid = true;
  password_valid = true;
  ngOnInit(): void {}
  submit() {
    this.email_valid = this.emailValidator(this.email);
    this.password_valid = this.passwordValidator(this.password);
    this.valid_auth = true;

    if (
      this.emailValidator(this.email) &&
      this.passwordValidator(this.password)
    ) {
      this.logged_in = true;
    }
  }

  passwordValidator(password) {
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15})"
    );
    const isStrong = pattern.test(password);
    if (!isStrong) {
      return false;
    } else {
      return true;
    }
  }

  emailValidator(email) {
    const pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
    const isStrong = pattern.test(email);
    if (!isStrong) {
      return false;
    } else {
      return true;
    }
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test03Component,
      },
    ]),
  ],
  declarations: [Test03Component],
})
export class Test03Module {}
