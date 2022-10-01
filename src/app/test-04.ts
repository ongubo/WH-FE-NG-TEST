/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, HostListener, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `
    <h2>Enter your first and last name</h2>
    <div>
      <form>
        <input
          type="text"
          value=""
          [(ngModel)]="firstname"
          name="firstname"
          required
        />
        <br />
        <input
          type="text"
          value=""
          [(ngModel)]="lastname"
          name="lastname"
          required
        />
        <br />
        <div *ngIf="show">{{ derived_name }}</div>
        <br /><br />
      </form>
    </div>
  `,
  styles: [],
})
export class UserNameComponent {
  firstname: string;
  lastname: string;
  derived_name: string;
  show = false;

  @HostListener("click") onClick() {
    if (this.firstname && this.lastname) {
      this.derived_name =
        this.firstname +
        "_" +
        this.lastname +
        "_" +
        Math.floor(Math.random() * (10 - 1 + 1) + 1);
      this.show = true;
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
        component: UserNameComponent,
      },
    ]),
  ],
  declarations: [UserNameComponent],
})
export class UserNameModule {}
