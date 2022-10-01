/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, Output, EventEmitter } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// Child component
@Component({
  selector: "textfield",
  template:
    '<input type="text" value="" [(ngModel)]="field" (ngModelChange)="nameChanged($event)"/>',
})
export class TextField {
  field: string = "";
  @Output() titleEvent = new EventEmitter<{ title: string }>();

  ngOnInit(): void {}

  nameChanged($event) {
    this.titleEvent.emit($event);
  }
}

// child component
@Component({
  selector: "child-component",
  template: `<h2>
    Title:
    <h2><br /><textfield (titleEvent)="onTitleChanged($event)"></textfield></h2>
  </h2>`,
})
export class ChildComponent {
  @Output() titleEvent = new EventEmitter<any>();
  title = "this is the app title";
  ngOnInit(): void {}
  onTitleChanged(title: string) {
    this.title = title;
    this.titleEvent.emit(title);
  }
}

// Parent component
@Component({
  selector: "ng-app",
  template: `<div>
    <child-component (titleEvent)="onTitleChanged($event)"></child-component>
    <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = "";
  incomingItem = "";

  onTitleChanged(title: string) {
    this.title = title;
  }
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
